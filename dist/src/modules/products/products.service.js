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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        const existingSku = await this.prisma.product.findUnique({
            where: { sku: createProductDto.sku },
        });
        if (existingSku) {
            throw new common_1.BadRequestException('SKU already exists');
        }
        const category = await this.prisma.category.findUnique({
            where: { id: createProductDto.categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Kategorie mit ID ${createProductDto.categoryId} nicht gefunden`);
        }
        const { images, ...productData } = createProductDto;
        return this.prisma.product.create({
            data: {
                ...productData,
                images: images && images.length > 0
                    ? {
                        create: images.map((img) => ({
                            url: img.url,
                            alt: img.alt,
                            isPrimary: img.isPrimary ?? false,
                        })),
                    }
                    : undefined,
            },
            include: { category: true, images: true },
        });
    }
    async findAll(page = 1, limit = 20, categoryId, search) {
        const skip = (page - 1) * limit;
        const where = { isActive: true, isDeleted: false };
        if (categoryId) {
            where.categoryId = categoryId;
        }
        if (search) {
            where.OR = [{ name: { contains: search } }, { description: { contains: search } }];
        }
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                skip,
                take: limit,
                where,
                include: {
                    category: true,
                    images: {
                        orderBy: [
                            { isPrimary: 'desc' },
                            { createdAt: 'asc' }
                        ],
                        take: 1
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            data: products,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const product = await this.prisma.product.findFirst({
            where: {
                id,
                isDeleted: false,
            },
            include: {
                category: true,
                images: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async findFeatured() {
        return this.prisma.product.findMany({
            where: { isFeatured: true, isActive: true, isDeleted: false },
            include: {
                category: true,
                images: {
                    orderBy: [
                        { isPrimary: 'desc' },
                        { createdAt: 'asc' }
                    ],
                    take: 1
                },
            },
            take: 10,
        });
    }
    async search(query) {
        return this.prisma.product.findMany({
            where: {
                AND: [
                    { isActive: true },
                    { isDeleted: false },
                    {
                        OR: [
                            { name: { contains: query } },
                            { description: { contains: query } },
                            { sku: { contains: query } },
                        ],
                    },
                ],
            },
            include: {
                category: true,
                images: {
                    orderBy: [
                        { isPrimary: 'desc' },
                        { createdAt: 'asc' }
                    ],
                    take: 1
                },
            },
        });
    }
    async update(id, updateProductDto) {
        await this.findOne(id);
        if (updateProductDto.categoryId) {
            const category = await this.prisma.category.findUnique({
                where: { id: updateProductDto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException(`Kategorie mit ID ${updateProductDto.categoryId} nicht gefunden`);
            }
        }
        const { images, ...productData } = updateProductDto;
        if (images !== undefined) {
            await this.prisma.productImage.deleteMany({
                where: { productId: id },
            });
        }
        return this.prisma.product.update({
            where: { id },
            data: {
                ...productData,
                images: images && images.length > 0
                    ? {
                        create: images.map((img) => ({
                            url: img.url,
                            alt: img.alt,
                            isPrimary: img.isPrimary ?? false,
                        })),
                    }
                    : undefined,
            },
            include: { category: true, images: true },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.product.update({
            where: { id },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
            },
            include: { category: true, images: true },
        });
    }
    async findArchived() {
        return this.prisma.product.findMany({
            where: { isDeleted: true },
            include: {
                category: true,
                images: {
                    orderBy: [
                        { isPrimary: 'desc' },
                        { createdAt: 'asc' }
                    ],
                    take: 1
                },
            },
            orderBy: { deletedAt: 'desc' },
        });
    }
    async restore(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true, images: true },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Produkt mit ID ${id} nicht gefunden`);
        }
        if (!product.isDeleted) {
            throw new common_1.BadRequestException(`Produkt mit ID ${id} ist nicht archiviert`);
        }
        return this.prisma.product.update({
            where: { id },
            data: {
                isDeleted: false,
                deletedAt: null,
            },
            include: { category: true, images: true },
        });
    }
    async permanentDelete(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                orderItems: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Produkt mit ID ${id} nicht gefunden`);
        }
        if (product.orderItems && product.orderItems.length > 0) {
            throw new common_1.BadRequestException('Produkt kann nicht gelöscht werden, da es Teil von Bestellungen ist. Bitte archivieren Sie das Produkt stattdessen.');
        }
        await this.prisma.cartItem.deleteMany({
            where: { productId: id },
        });
        return this.prisma.product.delete({
            where: { id },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map