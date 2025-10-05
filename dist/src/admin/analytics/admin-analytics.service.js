"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminAnalyticsService = class AdminAnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const [totalRevenue, totalOrders, totalCustomers, pendingOrders, newsletterSubscribers, pendingInquiries, recentOrders, topProducts,] = await Promise.all([
            this.prisma.order.aggregate({
                where: { paymentStatus: 'COMPLETED' },
                _sum: { total: true },
            }),
            this.prisma.order.count(),
            this.prisma.user.count({ where: { role: 'CUSTOMER' } }),
            this.prisma.order.count({ where: { status: 'PENDING' } }),
            this.prisma.newsletter.count({ where: { isActive: true } }),
            this.prisma.contactInquiry.count({ where: { status: 'NEW' } }),
            this.prisma.order.count({
                where: { createdAt: { gte: thirtyDaysAgo } },
            }),
            this.prisma.orderItem.groupBy({
                by: ['productId'],
                _sum: { quantity: true },
                _count: { productId: true },
                orderBy: { _sum: { quantity: 'desc' } },
                take: 5,
            }),
        ]);
        return {
            totalRevenue: totalRevenue._sum.total || 0,
            totalOrders,
            totalCustomers,
            pendingOrders,
            newsletterSubscribers,
            pendingInquiries,
            recentOrders,
            topProducts: await this.enrichTopProducts(topProducts),
        };
    }
    async getSalesData(query) {
        const startDate = query.startDate ? new Date(query.startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
        const endDate = query.endDate ? new Date(query.endDate) : new Date();
        const orders = await this.prisma.order.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
                paymentStatus: 'COMPLETED',
            },
            select: {
                createdAt: true,
                total: true,
            },
        });
        const salesByDate = orders.reduce((acc, order) => {
            const date = order.createdAt.toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = { date, revenue: 0, orders: 0 };
            }
            acc[date].revenue += Number(order.total);
            acc[date].orders += 1;
            return acc;
        }, {});
        return Object.values(salesByDate).sort((a, b) => a.date.localeCompare(b.date));
    }
    async getCustomerInsights(query) {
        const startDate = query.startDate ? new Date(query.startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
        const endDate = query.endDate ? new Date(query.endDate) : new Date();
        const [newCustomers, returningCustomers, topCustomers] = await Promise.all([
            this.prisma.user.count({
                where: {
                    role: 'CUSTOMER',
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            }),
            this.prisma.user.findMany({
                where: {
                    role: 'CUSTOMER',
                    orders: {
                        some: {
                            createdAt: {
                                gte: startDate,
                                lte: endDate,
                            },
                        },
                    },
                },
                select: {
                    _count: {
                        select: { orders: true },
                    },
                },
            }).then((users) => users.filter((u) => u._count.orders > 1).length),
            this.prisma.user.findMany({
                where: {
                    role: 'CUSTOMER',
                    orders: {
                        some: {
                            paymentStatus: 'COMPLETED',
                            createdAt: {
                                gte: startDate,
                                lte: endDate,
                            },
                        },
                    },
                },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    orders: {
                        where: {
                            paymentStatus: 'COMPLETED',
                            createdAt: {
                                gte: startDate,
                                lte: endDate,
                            },
                        },
                        select: {
                            total: true,
                        },
                    },
                },
                take: 10,
            }),
        ]);
        const enrichedTopCustomers = topCustomers.map((customer) => ({
            id: customer.id,
            email: customer.email,
            name: `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'N/A',
            totalSpent: customer.orders.reduce((sum, order) => sum + Number(order.total), 0),
            orderCount: customer.orders.length,
        })).sort((a, b) => b.totalSpent - a.totalSpent);
        return {
            newCustomers,
            returningCustomers,
            topCustomers: enrichedTopCustomers,
        };
    }
    async getProductPerformance(query) {
        const startDate = query.startDate ? new Date(query.startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
        const endDate = query.endDate ? new Date(query.endDate) : new Date();
        const productStats = await this.prisma.orderItem.groupBy({
            by: ['productId'],
            where: {
                order: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                    paymentStatus: 'COMPLETED',
                },
            },
            _sum: {
                quantity: true,
                price: true,
            },
            _count: {
                productId: true,
            },
        });
        const enrichedProducts = await Promise.all(productStats.map(async (stat) => {
            const product = await this.prisma.product.findUnique({
                where: { id: stat.productId },
                select: {
                    name: true,
                    sku: true,
                    price: true,
                    stock: true,
                },
            });
            return {
                productId: stat.productId,
                name: product?.name || 'Unknown',
                sku: product?.sku || 'N/A',
                unitsSold: stat._sum.quantity || 0,
                revenue: Number(stat._sum.price || 0),
                orders: stat._count.productId,
                currentStock: product?.stock || 0,
            };
        }));
        return enrichedProducts.sort((a, b) => Number(b.revenue) - Number(a.revenue));
    }
    async getOrderStatistics(query) {
        const startDate = query.startDate ? new Date(query.startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
        const endDate = query.endDate ? new Date(query.endDate) : new Date();
        const [ordersByStatus, ordersByPaymentStatus, averageOrderValue] = await Promise.all([
            this.prisma.order.groupBy({
                by: ['status'],
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
                _count: true,
            }),
            this.prisma.order.groupBy({
                by: ['paymentStatus'],
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
                _count: true,
            }),
            this.prisma.order.aggregate({
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                    paymentStatus: 'COMPLETED',
                },
                _avg: { total: true },
            }),
        ]);
        return {
            ordersByStatus,
            ordersByPaymentStatus,
            averageOrderValue: averageOrderValue._avg.total || 0,
        };
    }
    async enrichTopProducts(topProducts) {
        return Promise.all(topProducts.map(async (item) => {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
                select: { name: true, sku: true },
            });
            return {
                productId: item.productId,
                name: product?.name || 'Unknown',
                sku: product?.sku || 'N/A',
                unitsSold: item._sum.quantity || 0,
                orders: item._count.productId,
            };
        }));
    }
};
exports.AdminAnalyticsService = AdminAnalyticsService;
exports.AdminAnalyticsService = AdminAnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminAnalyticsService);
//# sourceMappingURL=admin-analytics.service.js.map