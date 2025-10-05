import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSalesData(startDate: string, endDate: string): Promise<{
        totalSales: number;
        orderCount: number;
        period: {
            startDate: string;
            endDate: string;
        };
        data: {
            id: string;
            status: import("@prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            discount: import("@prisma/client/runtime/library").Decimal;
            orderNumber: string;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
            shippingStatus: import("@prisma/client").$Enums.ShippingStatus;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            shipping: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            notes: string | null;
            trackingNumber: string | null;
            stripePaymentId: string | null;
            discountCode: string | null;
            addressId: string;
        }[];
    }>;
    getTicketData(startDate: string, endDate: string): Promise<{
        totalTickets: number;
        period: {
            startDate: string;
            endDate: string;
        };
        statusBreakdown: {
            open: number;
            inProgress: number;
            closed: number;
        };
    }>;
    getOverview(): Promise<{
        totalRevenue: number;
        totalOrders: number;
        activeDiscounts: number;
        newsletterSubscribers: number;
    }>;
}
