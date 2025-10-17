import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(createPaymentDto: CreatePaymentDto): Promise<{
        order: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            discount: import("@prisma/client/runtime/library").Decimal;
            status: import("@prisma/client").$Enums.OrderStatus;
            userId: string;
            orderNumber: string;
            addressId: string;
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
        };
        clientSecret: string;
        paymentIntentId: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
        userId: string;
        orderNumber: string;
        addressId: string;
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
    }[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            isVerified: boolean;
            isBanned: boolean;
            displayName: string | null;
            lastLogin: Date | null;
            status: import("@prisma/client").$Enums.UserStatus;
            twoFactorEnabled: boolean;
        };
        items: ({
            product: {
                id: string;
                sku: string;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                stock: number;
                isActive: boolean;
                isFeatured: boolean;
                categoryId: string;
                createdAt: Date;
                updatedAt: Date;
                giftboxavailable: boolean;
                deletedAt: Date | null;
                isDeleted: boolean;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            orderId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
        userId: string;
        orderNumber: string;
        addressId: string;
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
    }>;
    handleWebhook(signature: string, request: any): Promise<{
        received: boolean;
    }>;
}
