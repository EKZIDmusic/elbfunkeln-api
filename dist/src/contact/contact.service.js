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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContactService = class ContactService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createInquiry(createContactInquiryDto) {
        return this.prisma.contactInquiry.create({
            data: createContactInquiryDto,
        });
    }
    async getInquiries(query) {
        const { page, limit, status, search, sortBy, sortOrder } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (status) {
            where.status = status;
        }
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { email: { contains: search } },
                { subject: { contains: search } },
                { message: { contains: search } },
            ];
        }
        const [inquiries, total] = await Promise.all([
            this.prisma.contactInquiry.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            this.prisma.contactInquiry.count({ where }),
        ]);
        return {
            data: inquiries,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getInquiryById(id) {
        const inquiry = await this.prisma.contactInquiry.findUnique({
            where: { id },
        });
        if (!inquiry) {
            throw new common_1.NotFoundException(`Contact inquiry with ID ${id} not found`);
        }
        return inquiry;
    }
    async updateInquiry(id, updateContactInquiryDto) {
        const inquiry = await this.prisma.contactInquiry.findUnique({
            where: { id },
        });
        if (!inquiry) {
            throw new common_1.NotFoundException(`Contact inquiry with ID ${id} not found`);
        }
        return this.prisma.contactInquiry.update({
            where: { id },
            data: updateContactInquiryDto,
        });
    }
    async deleteInquiry(id) {
        const inquiry = await this.prisma.contactInquiry.findUnique({
            where: { id },
        });
        if (!inquiry) {
            throw new common_1.NotFoundException(`Contact inquiry with ID ${id} not found`);
        }
        await this.prisma.contactInquiry.delete({ where: { id } });
        return { message: 'Contact inquiry deleted successfully' };
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactService);
//# sourceMappingURL=contact.service.js.map