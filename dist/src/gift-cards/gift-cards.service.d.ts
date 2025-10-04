import { PrismaService } from '../prisma/prisma.service';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';
export declare class GiftCardsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createGiftCardDto: CreateGiftCardDto): Promise<{
        id: string;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        isActive: boolean;
        expiresAt: Date | null;
        createdAt: Date;
        usedAt: Date | null;
    }>;
    findAll(): Promise<{
        id: string;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        isActive: boolean;
        expiresAt: Date | null;
        createdAt: Date;
        usedAt: Date | null;
    }[]>;
    findByCode(code: string): Promise<{
        id: string;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        isActive: boolean;
        expiresAt: Date | null;
        createdAt: Date;
        usedAt: Date | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        isActive: boolean;
        expiresAt: Date | null;
        createdAt: Date;
        usedAt: Date | null;
    }>;
    update(id: string, updateGiftCardDto: UpdateGiftCardDto): Promise<{
        id: string;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        isActive: boolean;
        expiresAt: Date | null;
        createdAt: Date;
        usedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        isActive: boolean;
        expiresAt: Date | null;
        createdAt: Date;
        usedAt: Date | null;
    }>;
}
