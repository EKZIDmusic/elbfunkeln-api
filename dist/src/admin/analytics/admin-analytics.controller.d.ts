import { AdminAnalyticsService } from './admin-analytics.service';
import { DateRangeQueryDto } from './dto/date-range-query.dto';
export declare class AdminAnalyticsController {
    private readonly adminAnalyticsService;
    constructor(adminAnalyticsService: AdminAnalyticsService);
    getDashboardStats(): Promise<{
        totalRevenue: number | import("@prisma/client/runtime/library").Decimal;
        totalOrders: number;
        totalCustomers: number;
        pendingOrders: number;
        newsletterSubscribers: number;
        pendingInquiries: number;
        recentOrders: number;
        topProducts: {
            productId: any;
            name: string;
            sku: string;
            unitsSold: any;
            orders: any;
        }[];
    }>;
    getSalesData(query: DateRangeQueryDto): Promise<{
        date: string;
        revenue: number;
        orders: number;
    }[]>;
    getCustomerInsights(query: DateRangeQueryDto): Promise<{
        newCustomers: number;
        returningCustomers: number;
        topCustomers: {
            id: string;
            email: string;
            name: string;
            totalSpent: number;
            orderCount: number;
        }[];
    }>;
    getProductPerformance(query: DateRangeQueryDto): Promise<{
        productId: string;
        name: string;
        sku: string;
        unitsSold: number;
        revenue: number;
        orders: number;
        currentStock: number;
    }[]>;
    getOrderStatistics(query: DateRangeQueryDto): Promise<{
        ordersByStatus: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.OrderGroupByOutputType, "status"[]> & {
            _count: number;
        })[];
        ordersByPaymentStatus: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.OrderGroupByOutputType, "paymentStatus"[]> & {
            _count: number;
        })[];
        averageOrderValue: number | import("@prisma/client/runtime/library").Decimal;
    }>;
}
