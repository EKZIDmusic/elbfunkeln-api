import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ValidateDiscountDto } from './dto/validate-discount.dto';
import { ApplyDiscountDto } from './dto/apply-discount.dto';
export declare class DiscountsController {
    private readonly discountsService;
    constructor(discountsService: DiscountsService);
    create(createDiscountDto: CreateDiscountDto): Promise<{
        id: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        type: string;
        code: string;
        expiresAt: Date | null;
        value: import("@prisma/client/runtime/library").Decimal;
        minAmount: import("@prisma/client/runtime/library").Decimal | null;
        maxUses: number | null;
        usedCount: number;
        startsAt: Date | null;
    }>;
    findAll(): Promise<{
        id: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        type: string;
        code: string;
        expiresAt: Date | null;
        value: import("@prisma/client/runtime/library").Decimal;
        minAmount: import("@prisma/client/runtime/library").Decimal | null;
        maxUses: number | null;
        usedCount: number;
        startsAt: Date | null;
    }[]>;
    findByCode(code: string): Promise<{
        id: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        type: string;
        code: string;
        expiresAt: Date | null;
        value: import("@prisma/client/runtime/library").Decimal;
        minAmount: import("@prisma/client/runtime/library").Decimal | null;
        maxUses: number | null;
        usedCount: number;
        startsAt: Date | null;
    }>;
    update(id: string, updateDiscountDto: UpdateDiscountDto): Promise<{
        id: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        type: string;
        code: string;
        expiresAt: Date | null;
        value: import("@prisma/client/runtime/library").Decimal;
        minAmount: import("@prisma/client/runtime/library").Decimal | null;
        maxUses: number | null;
        usedCount: number;
        startsAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        type: string;
        code: string;
        expiresAt: Date | null;
        value: import("@prisma/client/runtime/library").Decimal;
        minAmount: import("@prisma/client/runtime/library").Decimal | null;
        maxUses: number | null;
        usedCount: number;
        startsAt: Date | null;
    }>;
    validate(validateDiscountDto: ValidateDiscountDto): Promise<{
        valid: boolean;
        discount: {
            id: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            type: string;
            code: string;
            expiresAt: Date | null;
            value: import("@prisma/client/runtime/library").Decimal;
            minAmount: import("@prisma/client/runtime/library").Decimal | null;
            maxUses: number | null;
            usedCount: number;
            startsAt: Date | null;
        };
        discountAmount: number;
        originalAmount: number;
        finalAmount: number;
    }>;
    apply(applyDiscountDto: ApplyDiscountDto): Promise<{
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
}
