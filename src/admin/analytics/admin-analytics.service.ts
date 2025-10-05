import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DateRangeQueryDto } from './dto/date-range-query.dto';

@Injectable()
export class AdminAnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      totalRevenue,
      totalOrders,
      totalCustomers,
      pendingOrders,
      newsletterSubscribers,
      pendingInquiries,
      recentOrders,
      topProducts,
    ] = await Promise.all([
      // Total revenue (from completed orders)
      this.prisma.order.aggregate({
        where: { paymentStatus: 'COMPLETED' },
        _sum: { total: true },
      }),
      // Total orders count
      this.prisma.order.count(),
      // Total customers
      this.prisma.user.count({ where: { role: 'CUSTOMER' } }),
      // Pending orders
      this.prisma.order.count({ where: { status: 'PENDING' } }),
      // Active newsletter subscribers
      this.prisma.newsletter.count({ where: { isActive: true } }),
      // Pending contact inquiries
      this.prisma.contactInquiry.count({ where: { status: 'NEW' } }),
      // Recent orders (last 30 days)
      this.prisma.order.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      // Top selling products
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

  async getSalesData(query: DateRangeQueryDto) {
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

    // Group by date
    const salesByDate = orders.reduce((acc, order) => {
      const date = order.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, revenue: 0, orders: 0 };
      }
      acc[date].revenue += Number(order.total);
      acc[date].orders += 1;
      return acc;
    }, {} as Record<string, { date: string; revenue: number; orders: number }>);

    return Object.values(salesByDate).sort((a, b) => a.date.localeCompare(b.date));
  }

  async getCustomerInsights(query: DateRangeQueryDto) {
    const startDate = query.startDate ? new Date(query.startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
    const endDate = query.endDate ? new Date(query.endDate) : new Date();

    const [newCustomers, returningCustomers, topCustomers] = await Promise.all([
      // New customers in date range
      this.prisma.user.count({
        where: {
          role: 'CUSTOMER',
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      // Returning customers (with more than 1 order)
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
      // Top customers by spending
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

  async getProductPerformance(query: DateRangeQueryDto) {
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

    const enrichedProducts = await Promise.all(
      productStats.map(async (stat) => {
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
          revenue: stat._sum.price || 0,
          orders: stat._count.productId,
          currentStock: product?.stock || 0,
        };
      }),
    );

    return enrichedProducts.sort((a, b) => b.revenue - a.revenue);
  }

  async getOrderStatistics(query: DateRangeQueryDto) {
    const startDate = query.startDate ? new Date(query.startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
    const endDate = query.endDate ? new Date(query.endDate) : new Date();

    const [ordersByStatus, ordersByPaymentStatus, averageOrderValue] = await Promise.all([
      // Orders grouped by status
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
      // Orders grouped by payment status
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
      // Average order value
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

  private async enrichTopProducts(topProducts: any[]) {
    return Promise.all(
      topProducts.map(async (item) => {
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
      }),
    );
  }
}
