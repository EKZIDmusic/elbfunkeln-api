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
exports.DiscountsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma/prisma.service");
let DiscountsService = class DiscountsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDiscountDto) {
        return this.prisma.discount.create({
            data: createDiscountDto,
        });
    }
    async findAll() {
        return this.prisma.discount.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByCode(code) {
        return this.prisma.discount.findUnique({
            where: { code },
        });
    }
    async findOne(id) {
        return this.prisma.discount.findUnique({
            where: { id },
        });
    }
    async update(id, updateDiscountDto) {
        return this.prisma.discount.update({
            where: { id },
            data: updateDiscountDto,
        });
    }
    async remove(id) {
        return this.prisma.discount.delete({
            where: { id },
        });
    }
    async validateDiscount(validateDiscountDto) {
        const discount = await this.prisma.discount.findUnique({
            where: { code: validateDiscountDto.code },
        });
        if (!discount) {
            throw new common_1.NotFoundException('Discount code not found');
        }
        if (!discount.isActive) {
            throw new common_1.BadRequestException('Discount code is not active');
        }
        if (discount.expiresAt && new Date(discount.expiresAt) < new Date()) {
            throw new common_1.BadRequestException('Discount code has expired');
        }
        if (discount.maxUses !== null && discount.usedCount >= discount.maxUses) {
            throw new common_1.BadRequestException('Discount code usage limit reached');
        }
        const minAmount = discount.minAmount ? Number(discount.minAmount) : 0;
        if (minAmount && validateDiscountDto.orderTotal < minAmount) {
            throw new common_1.BadRequestException(`Minimum order amount of ${minAmount}€ required for this discount`);
        }
        let discountAmount = 0;
        const discountValue = Number(discount.value);
        if (discount.type === 'PERCENTAGE') {
            discountAmount = (validateDiscountDto.orderTotal * discountValue) / 100;
        }
        else {
            discountAmount = discountValue;
        }
        const finalAmount = Math.max(0, validateDiscountDto.orderTotal - discountAmount);
        return {
            valid: true,
            discount,
            discountAmount,
            originalAmount: validateDiscountDto.orderTotal,
            finalAmount,
        };
    }
    async applyToOrder(applyDiscountDto) {
        const order = await this.prisma.order.findUnique({
            where: { id: applyDiscountDto.orderId },
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
        const validation = await this.validateDiscount({
            code: applyDiscountDto.code,
            orderTotal,
            userId: order.userId,
        });
        const updatedOrder = await this.prisma.order.update({
            where: { id: applyDiscountDto.orderId },
            data: {
                discountCode: validation.discount.code,
                discount: validation.discountAmount,
                total: validation.finalAmount,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        await this.prisma.discount.update({
            where: { id: validation.discount.id },
            data: {
                usedCount: {
                    increment: 1,
                },
            },
        });
        return updatedOrder;
    }
};
exports.DiscountsService = DiscountsService;
exports.DiscountsService = DiscountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiscountsService);
//# sourceMappingURL=discounts.service.js.map