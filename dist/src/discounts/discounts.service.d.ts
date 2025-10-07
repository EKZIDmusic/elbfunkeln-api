import { PrismaService } from '../prisma/prisma.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ValidateDiscountDto } from './dto/validate-discount.dto';
import { ApplyDiscountDto } from './dto/apply-discount.dto';
export declare class DiscountsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDiscountDto: CreateDiscountDto): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        code: string;
        type: string;
        value: import("@prisma/client/runtime/library").Decimal;
        minAmount: import("@prisma/client/runtime/library").Decimal | null;
        maxUses: number | null;
        usedCount: number;
        startsAt: Date | null;
        expiresAt: Date | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        code: string;
        type: string;
        value: import("@prisma/client/runtime/library").Decimal;
        minAmount: import("@prisma/client/runtime/library").Decimal | null;
        maxUses: number | null;
        usedCount: number;
        startsAt: Date | null;
        expiresAt: Date | null;
    }[]>;
    findByCode(code: string): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        code: string;
        type: string;
        value: import("@prisma/client/runtime/library").Decimal;
        minAmount: import("@prisma/client/runtime/library").Decimal | null;
        maxUses: number | null;
        usedCount: number;
        startsAt: Date | null;
        expiresAt: Date | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        code: string;
        type: string;
        value: import("@prisma/client/runtime/library").Decimal;
        minAmount: import("@prisma/client/runtime/library").Decimal | null;
        maxUses: number | null;
        usedCount: number;
        startsAt: Date | null;
        expiresAt: Date | null;
    }>;
    update(id: string, updateDiscountDto: UpdateDiscountDto): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        code: string;
        type: string;
        value: import("@prisma/client/runtime/library").Decimal;
        minAmount: import("@prisma/client/runtime/library").Decimal | null;
        maxUses: number | null;
        usedCount: number;
        startsAt: Date | null;
        expiresAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        code: string;
        type: string;
        value: import("@prisma/client/runtime/library").Decimal;
        minAmount: import("@prisma/client/runtime/library").Decimal | null;
        maxUses: number | null;
        usedCount: number;
        startsAt: Date | null;
        expiresAt: Date | null;
    }>;
    validateDiscount(validateDiscountDto: ValidateDiscountDto): Promise<{
        valid: boolean;
        discount: {
            id: string;
            createdAt: Date;
            description: string | null;
            isActive: boolean;
            code: string;
            type: string;
            value: import("@prisma/client/runtime/library").Decimal;
            minAmount: import("@prisma/client/runtime/library").Decimal | null;
            maxUses: number | null;
            usedCount: number;
            startsAt: Date | null;
            expiresAt: Date | null;
        };
        discountAmount: number;
        originalAmount: number;
        finalAmount: number;
    }>;
    applyToOrder(applyDiscountDto: ApplyDiscountDto): Promise<{
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
}
