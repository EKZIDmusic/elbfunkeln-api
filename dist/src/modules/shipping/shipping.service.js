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
exports.ShippingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma/prisma.service");
let ShippingService = class ShippingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createShippingDto) {
        return this.prisma.order.update({
            where: { id: createShippingDto.orderId },
            data: {
                trackingNumber: createShippingDto.trackingNumber,
                shippingStatus: 'LABEL_CREATED',
            },
        });
    }
    async findAll() {
        return this.prisma.order.findMany({
            where: {
                shippingStatus: {
                    not: 'PENDING',
                },
            },
            include: {
                user: true,
                address: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                user: true,
                address: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
    async update(id, updateShippingDto) {
        return this.prisma.order.update({
            where: { id },
            data: {
                trackingNumber: updateShippingDto.trackingNumber,
                shippingStatus: updateShippingDto.status,
            },
        });
    }
};
exports.ShippingService = ShippingService;
exports.ShippingService = ShippingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShippingService);
//# sourceMappingURL=shipping.service.js.map