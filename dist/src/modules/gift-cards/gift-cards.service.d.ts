import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';
import { RedeemGiftCardDto } from './dto/redeem-gift-card.dto';
export declare class GiftCardsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createGiftCardDto: CreateGiftCardDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        expiresAt: Date | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        usedAt: Date | null;
    }>;
    findAll(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        expiresAt: Date | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        usedAt: Date | null;
    }[]>;
    findByCode(code: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        expiresAt: Date | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        usedAt: Date | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        expiresAt: Date | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        usedAt: Date | null;
    }>;
    update(id: string, updateGiftCardDto: UpdateGiftCardDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        expiresAt: Date | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        usedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        expiresAt: Date | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        usedAt: Date | null;
    }>;
    redeem(redeemGiftCardDto: RedeemGiftCardDto): Promise<{
        order: {
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
        };
        giftCard: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            code: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            purchasedBy: string | null;
            expiresAt: Date | null;
            balance: import("@prisma/client/runtime/library").Decimal;
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
