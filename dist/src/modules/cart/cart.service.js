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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma/prisma.service");
const products_service_1 = require("../products/products.service");
let CartService = class CartService {
    prisma;
    productsService;
    constructor(prisma, productsService) {
        this.prisma = prisma;
        this.productsService = productsService;
    }
    async getCart(userId) {
        let cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: { where: { isPrimary: true } },
                                category: true,
                            },
                        },
                    },
                },
            },
        });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: { userId },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    images: { where: { isPrimary: true } },
                                    category: true,
                                },
                            },
                        },
                    },
                },
            });
        }
        return this.calculateCartTotals(cart);
    }
    async addItem(userId, addToCartDto) {
        const { productId, quantity } = addToCartDto;
        const product = await this.productsService.findOne(productId);
        if (product.stock < quantity) {
            throw new common_1.BadRequestException('Insufficient stock');
        }
        let cart = await this.prisma.cart.findUnique({
            where: { userId },
        });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: { userId },
            });
        }
        const existingItem = await this.prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });
        if (existingItem) {
            await this.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        }
        else {
            await this.prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                },
            });
        }
        return this.getCart(userId);
    }
    async updateItem(userId, itemId, updateCartItemDto) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        const item = await this.prisma.cartItem.findFirst({
            where: {
                id: itemId,
                cartId: cart.id,
            },
            include: { product: true },
        });
        if (!item) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        if (item.product.stock < updateCartItemDto.quantity) {
            throw new common_1.BadRequestException('Insufficient stock');
        }
        await this.prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity: updateCartItemDto.quantity },
        });
        return this.getCart(userId);
    }
    async removeItem(userId, itemId) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        await this.prisma.cartItem.deleteMany({
            where: {
                id: itemId,
                cartId: cart.id,
            },
        });
        return this.getCart(userId);
    }
    async clearCart(userId) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
        });
        if (cart) {
            await this.prisma.cartItem.deleteMany({
                where: { cartId: cart.id },
            });
        }
        return { message: 'Cart cleared successfully' };
    }
    calculateCartTotals(cart) {
        const items = cart.items.map((item) => {
            const price = item.product.discountPrice || item.product.price;
            return {
                ...item,
                itemTotal: Number(price) * item.quantity,
            };
        });
        const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
        const tax = subtotal * 0.19;
        const total = subtotal + tax;
        return {
            ...cart,
            items,
            summary: {
                subtotal: Math.round(subtotal * 100) / 100,
                tax: Math.round(tax * 100) / 100,
                total: Math.round(total * 100) / 100,
                itemCount: items.length,
                totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
            },
        };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        products_service_1.ProductsService])
], CartService);
//# sourceMappingURL=cart.service.js.map