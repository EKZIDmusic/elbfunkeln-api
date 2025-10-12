import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';
import { RedeemGiftCardDto } from './dto/redeem-gift-card.dto';
export declare class GiftCardsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createGiftCardDto: CreateGiftCardDto): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        code: string;
        expiresAt: Date | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        usedAt: Date | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        code: string;
        expiresAt: Date | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        usedAt: Date | null;
    }[]>;
    findByCode(code: string): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        code: string;
        expiresAt: Date | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        usedAt: Date | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        code: string;
        expiresAt: Date | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        usedAt: Date | null;
    }>;
    update(id: string, updateGiftCardDto: UpdateGiftCardDto): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        code: string;
        expiresAt: Date | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        usedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        code: string;
        expiresAt: Date | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        usedAt: Date | null;
    }>;
    redeem(redeemGiftCardDto: RedeemGiftCardDto): Promise<{
        order: {
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
        };
        giftCard: {
            id: string;
            createdAt: Date;
            isActive: boolean;
            code: string;
            expiresAt: Date | null;
            amount: import("@prisma/client/runtime/library").Decimal;
            balance: import("@prisma/client/runtime/library").Decimal;
            purchasedBy: string | null;
            usedAt: Date | null;
        };
        redeemedAmount: number;
        remainingBalance: import("@prisma/client/runtime/library").Decimal;
    }>;
    checkBalance(code: string): Promise<{
        code: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        isActive: boolean;
        expiresAt: Date;
    }>;
}
