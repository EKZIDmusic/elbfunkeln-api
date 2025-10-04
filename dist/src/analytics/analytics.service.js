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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSalesData(startDate, endDate) {
        const orders = await this.prisma.order.findMany({
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
                paymentStatus: 'COMPLETED',
            },
        });
        const totalSales = orders.reduce((sum, order) => sum + Number(order.total), 0);
        return {
            totalSales,
            orderCount: orders.length,
            period: { startDate, endDate },
            data: orders,
        };
    }
    async getTicketData(startDate, endDate) {
        const tickets = await this.prisma.ticket.findMany({
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
        });
        return {
            totalTickets: tickets.length,
            period: { startDate, endDate },
            statusBreakdown: {
                open: tickets.filter((t) => t.status === 'OPEN').length,
                inProgress: tickets.filter((t) => t.status === 'IN_PROGRESS').length,
                closed: tickets.filter((t) => t.status === 'CLOSED').length,
            },
        };
    }
    async getOverview() {
        const [totalOrders, activeDiscounts, newsletterCount] = await Promise.all([
            this.prisma.order.count(),
            this.prisma.discount.count({ where: { isActive: true } }),
            this.prisma.newsletter.count({ where: { isActive: true } }),
        ]);
        const totalRevenue = await this.prisma.order.aggregate({
            where: { paymentStatus: 'COMPLETED' },
            _sum: { total: true },
        });
        return {
            totalRevenue: Number(totalRevenue._sum.total || 0),
            totalOrders,
            activeDiscounts,
            newsletterSubscribers: newsletterCount,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map