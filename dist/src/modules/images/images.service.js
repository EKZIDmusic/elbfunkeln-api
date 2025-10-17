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
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma/prisma.service");
let ImagesService = class ImagesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadProductImage(productId, file, alt, isPrimary) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        if (isPrimary) {
            await this.prisma.productImage.updateMany({
                where: { productId, isPrimary: true },
                data: { isPrimary: false },
            });
        }
        const image = await this.prisma.productImage.create({
            data: {
                productId,
                data: file.buffer,
                mimeType: file.mimetype,
                alt: alt || file.originalname,
                isPrimary: isPrimary || false,
            },
        });
        return {
            id: image.id,
            url: `/api/images/${image.id}`,
            alt: image.alt,
            isPrimary: image.isPrimary,
            mimeType: image.mimeType,
            createdAt: image.createdAt,
        };
    }
    async getImage(imageId) {
        const image = await this.prisma.productImage.findUnique({
            where: { id: imageId },
            select: {
                data: true,
                mimeType: true,
            },
        });
        if (!image || !image.data) {
            throw new common_1.NotFoundException('Image not found');
        }
        return {
            data: image.data,
            mimeType: image.mimeType || 'image/jpeg',
        };
    }
    async deleteImage(imageId) {
        const image = await this.prisma.productImage.findUnique({
            where: { id: imageId },
        });
        if (!image) {
            throw new common_1.NotFoundException('Image not found');
        }
        await this.prisma.productImage.delete({
            where: { id: imageId },
        });
        return { message: 'Image deleted successfully' };
    }
    async getProductImages(productId) {
        const images = await this.prisma.productImage.findMany({
            where: { productId },
            select: {
                id: true,
                alt: true,
                isPrimary: true,
                mimeType: true,
                createdAt: true,
            },
            orderBy: [{ isPrimary: 'desc' }, { createdAt: 'asc' }],
        });
        return images.map((img) => ({
            ...img,
            url: `/api/images/${img.id}`,
        }));
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ImagesService);
//# sourceMappingURL=images.service.js.map