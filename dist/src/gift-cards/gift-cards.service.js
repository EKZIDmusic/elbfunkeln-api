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
        const { code, amount, purchasedBy, expiresAt } = createGiftCardDto;
        return this.prisma.giftCard.create({
            data: {
                code,
                amount,
                balance: amount,
                purchasedBy: purchasedBy ?? undefined,
                expiresAt: expiresAt ?? undefined,
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
        const { balance, isActive, expiresAt } = updateGiftCardDto;
        return this.prisma.giftCard.update({
            where: { id },
            data: {
                balance: balance ?? undefined,
                isActive: isActive ?? undefined,
                expiresAt: expiresAt ?? undefined,
            },
        });
    }
    async remove(id) {
        return this.prisma.giftCard.delete({
            where: { id },
        });
    }
    async redeem(redeemGiftCardDto) {
        const giftCard = await this.prisma.giftCard.findUnique({
            where: { code: redeemGiftCardDto.code },
        });
        if (!giftCard) {
            throw new common_1.NotFoundException('Gift card not found');
        }
        if (!giftCard.isActive) {
            throw new common_1.BadRequestException('Gift card is not active');
        }
        if (giftCard.expiresAt && new Date(giftCard.expiresAt) < new Date()) {
            throw new common_1.BadRequestException('Gift card has expired');
        }
        const currentBalance = Number(giftCard.balance);
        if (currentBalance < redeemGiftCardDto.amount) {
            throw new common_1.BadRequestException('Insufficient gift card balance');
        }
        const order = await this.prisma.order.findUnique({
            where: { id: redeemGiftCardDto.orderId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const orderTotal = order.items.reduce((sum, item) => {
            return sum + item.quantity * Number(item.price);
        }, 0);
        const redemptionAmount = Math.min(redeemGiftCardDto.amount, orderTotal);
        const updatedGiftCard = await this.prisma.giftCard.update({
            where: { id: giftCard.id },
            data: {
                balance: {
                    decrement: redemptionAmount,
                },
            },
        });
        const currentTotal = Number(order.total);
        const updatedOrder = await this.prisma.order.update({
            where: { id: redeemGiftCardDto.orderId },
            data: {
                total: currentTotal - redemptionAmount,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        return {
            order: updatedOrder,
            giftCard: updatedGiftCard,
            redeemedAmount: redemptionAmount,
            remainingBalance: updatedGiftCard.balance,
        };
    }
    async checkBalance(code) {
        const giftCard = await this.prisma.giftCard.findUnique({
            where: { code },
        });
        if (!giftCard) {
            throw new common_1.NotFoundException('Gift card not found');
        }
        return {
            code: giftCard.code,
            balance: giftCard.balance,
            isActive: giftCard.isActive,
            expiresAt: giftCard.expiresAt,
        };
    }
};
exports.GiftCardsService = GiftCardsService;
exports.GiftCardsService = GiftCardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GiftCardsService);
//# sourceMappingURL=gift-cards.service.js.map