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
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma/prisma.service");
let AddressesService = class AddressesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createAddressDto) {
        if (createAddressDto.isDefault) {
            await this.prisma.address.updateMany({
                where: { userId, isDefault: true },
                data: { isDefault: false },
            });
        }
        return this.prisma.address.create({
            data: {
                ...createAddressDto,
                userId,
            },
        });
    }
    async findAll(userId) {
        return this.prisma.address.findMany({
            where: { userId },
            orderBy: { isDefault: 'desc' },
        });
    }
    async findOne(id, userId) {
        const address = await this.prisma.address.findFirst({
            where: { id, userId },
        });
        if (!address) {
            throw new common_1.NotFoundException('Address not found');
        }
        return address;
    }
    async update(id, userId, updateAddressDto) {
        await this.findOne(id, userId);
        if (updateAddressDto.isDefault) {
            await this.prisma.address.updateMany({
                where: { userId, isDefault: true, id: { not: id } },
                data: { isDefault: false },
            });
        }
        return this.prisma.address.update({
            where: { id },
            data: updateAddressDto,
        });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.address.delete({
            where: { id },
        });
    }
};
exports.AddressesService = AddressesService;
exports.AddressesService = AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressesService);
//# sourceMappingURL=addresses.service.js.map