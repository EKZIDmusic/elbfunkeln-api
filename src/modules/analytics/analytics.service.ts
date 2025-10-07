import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getSalesData(startDate: string, endDate: string) {
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

  async getTicketData(startDate: string, endDate: string) {
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
}
