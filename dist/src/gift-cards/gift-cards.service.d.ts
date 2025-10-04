import { PrismaService } from '../prisma/prisma.service';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';
export declare class GiftCardsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createGiftCardDto: CreateGiftCardDto): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        expiresAt: Date | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        usedAt: Date | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        expiresAt: Date | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        usedAt: Date | null;
    }[]>;
    findByCode(code: string): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        expiresAt: Date | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        usedAt: Date | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        expiresAt: Date | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        usedAt: Date | null;
    }>;
    update(id: string, updateGiftCardDto: UpdateGiftCardDto): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        expiresAt: Date | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        usedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        code: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        purchasedBy: string | null;
        expiresAt: Date | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        usedAt: Date | null;
    }>;
}
