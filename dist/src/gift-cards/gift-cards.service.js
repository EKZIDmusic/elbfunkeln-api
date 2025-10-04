"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftCardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GiftCardsService = class GiftCardsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createGiftCardDto) {
        return this.prisma.giftCard.create({
            data: {
                code: createGiftCardDto.code,
                amount: createGiftCardDto.amount,
                balance: createGiftCardDto.amount,
                purchasedBy: createGiftCardDto.purchasedBy ?? undefined,
                expiresAt: createGiftCardDto.expiresAt ?? undefined,
            },
        });
    }
    async findAll() {
        return this.prisma.giftCard.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByCode(code) {
        return this.prisma.giftCard.findUnique({
            where: { code },
        });
    }
    async findOne(id) {
        return this.prisma.giftCard.findUnique({
            where: { id },
        });
    }
    async update(id, updateGiftCardDto) {
        return this.prisma.giftCard.update({
            where: { id },
            data: {
                balance: updateGiftCardDto.balance ?? undefined,
                isActive: updateGiftCardDto.isActive ?? undefined,
                expiresAt: updateGiftCardDto.expiresAt ?? undefined,
            },
        });
    }
    async remove(id) {
        return this.prisma.giftCard.delete({
            where: { id },
        });
    }
};
exports.GiftCardsService = GiftCardsService;
exports.GiftCardsService = GiftCardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GiftCardsService);
//# sourceMappingURL=gift-cards.service.js.map