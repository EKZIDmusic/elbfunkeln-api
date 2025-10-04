import { GiftCardsService } from './gift-cards.service';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';
import type { UserPayload } from '../common/interfaces/user-payload.interface';
export declare class GiftCardsController {
    private readonly giftCardsService;
    constructor(giftCardsService: GiftCardsService);
    create(user: UserPayload, createGiftCardDto: CreateGiftCardDto): Promise<{
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
}
