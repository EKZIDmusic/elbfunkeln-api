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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TicketsService = class TicketsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTicketDto) {
        return this.prisma.ticket.create({
            data: createTicketDto,
            include: {
                user: true,
                messages: true,
            },
        });
    }
    async findAll(status) {
        return this.prisma.ticket.findMany({
            where: status ? { status: status } : undefined,
            include: {
                user: true,
                messages: {
                    orderBy: { createdAt: 'desc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        return this.prisma.ticket.findUnique({
            where: { id },
            include: {
                user: true,
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
    }
    async update(id, updateTicketDto) {
        return this.prisma.ticket.update({
            where: { id },
            data: updateTicketDto,
        });
    }
    async remove(id) {
        return this.prisma.ticket.delete({
            where: { id },
        });
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map