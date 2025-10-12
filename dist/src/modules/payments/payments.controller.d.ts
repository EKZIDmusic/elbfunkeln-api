import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(createPaymentDto: CreatePaymentDto): Promise<{
        order: {
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
        };
        clientSecret: string;
        paymentIntentId: string;
    }>;
    findAll(): Promise<{
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
    }[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            displayName: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            status: import("@prisma/client").$Enums.UserStatus;
            isVerified: boolean;
            isBanned: boolean;
            twoFactorEnabled: boolean;
            lastLogin: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                sku: string;
                price: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                stock: number;
                isActive: boolean;
                isFeatured: boolean;
                giftboxavailable: boolean;
                categoryId: string;
                isDeleted: boolean;
                deletedAt: Date | null;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
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
    }>;
    handleWebhook(signature: string, request: any): Promise<{
        received: boolean;
    }>;
}
