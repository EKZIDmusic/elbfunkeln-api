import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
export declare class DiscountsController {
    private readonly discountsService;
    constructor(discountsService: DiscountsService);
    create(createDiscountDto: CreateDiscountDto): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
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
        createdAt: Date;
        description: string | null;
        isActive: boolean;
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
        createdAt: Date;
        description: string | null;
        isActive: boolean;
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
        createdAt: Date;
        description: string | null;
        isActive: boolean;
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
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        type: string;
        code: string;
        expiresAt: Date | null;
        value: import("@prisma/client/runtime/library").Decimal;
        minAmount: import("@prisma/client/runtime/library").Decimal | null;
        maxUses: number | null;
        usedCount: number;
        startsAt: Date | null;
    }>;
}
