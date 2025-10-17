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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const images_service_1 = require("./images.service");
const swagger_1 = require("@nestjs/swagger");
let ImagesController = class ImagesController {
    imagesService;
    constructor(imagesService) {
        this.imagesService = imagesService;
    }
    async uploadProductImage(productId, file, alt, isPrimary) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        return this.imagesService.uploadProductImage(productId, file, alt, isPrimary === 'true');
    }
    async getImage(imageId, res) {
        const { data, mimeType } = await this.imagesService.getImage(imageId);
        res.set({
            'Content-Type': mimeType,
            'Content-Length': data.length,
            'Cache-Control': 'public, max-age=31536000',
        });
        res.send(data);
    }
    async deleteImage(imageId) {
        return this.imagesService.deleteImage(imageId);
    }
    async getProductImages(productId) {
        return this.imagesService.getProductImages(productId);
    }
};
exports.ImagesController = ImagesController;
__decorate([
    (0, common_1.Post)('product/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload product image' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                alt: {
                    type: 'string',
                },
                isPrimary: {
                    type: 'boolean',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/^image\/(jpeg|jpg|png|gif|webp)$/)) {
                return cb(new common_1.BadRequestException('Only image files are allowed'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)('alt')),
    __param(3, (0, common_1.Body)('isPrimary')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "uploadProductImage", null);
__decorate([
    (0, common_1.Get)(':imageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get image by ID' }),
    __param(0, (0, common_1.Param)('imageId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "getImage", null);
__decorate([
    (0, common_1.Delete)(':imageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete image' }),
    __param(0, (0, common_1.Param)('imageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all images for a product' }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "getProductImages", null);
exports.ImagesController = ImagesController = __decorate([
    (0, swagger_1.ApiTags)('images'),
    (0, common_1.Controller)('images'),
    __metadata("design:paramtypes", [images_service_1.ImagesService])
], ImagesController);
//# sourceMappingURL=images.controller.js.map