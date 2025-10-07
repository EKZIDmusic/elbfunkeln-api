"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/database/prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let AdminUsersService = class AdminUsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers(query) {
        const { page, limit, search, role, status, sortBy, sortOrder } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { email: { contains: search } },
                { firstName: { contains: search } },
                { lastName: { contains: search } },
                { displayName: { contains: search } },
            ];
        }
        if (role) {
            where.role = role;
        }
        if (status) {
            where.status = status;
        }
        const users = await this.prisma.user.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortBy]: sortOrder },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                displayName: true,
                phone: true,
                role: true,
                status: true,
                isVerified: true,
                isBanned: true,
                twoFactorEnabled: true,
                lastLogin: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        orders: true,
                        sessions: true,
                    },
                },
            },
        });
        return users;
    }
    async getUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                displayName: true,
                phone: true,
                role: true,
                status: true,
                isVerified: true,
                isBanned: true,
                twoFactorEnabled: true,
                lastLogin: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        orders: true,
                        sessions: true,
                        activities: true,
                        reviews: true,
                        favorites: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async updateUser(id, updateUserDto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: updateUserDto.email },
            });
            if (existingUser) {
                throw new common_1.BadRequestException('Email already in use');
            }
        }
        const data = { ...updateUserDto };
        if (updateUserDto.password) {
            data.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        return this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                displayName: true,
                phone: true,
                role: true,
                status: true,
                isVerified: true,
                isBanned: true,
                twoFactorEnabled: true,
                lastLogin: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async deleteUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        await this.prisma.user.delete({ where: { id } });
        return { message: 'User deleted successfully' };
    }
    async getUserSessions(userId, activeOnly = false) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const where = { userId };
        if (activeOnly) {
            where.isActive = true;
            where.expiresAt = { gte: new Date() };
        }
        return this.prisma.userSession.findMany({
            where,
            orderBy: { lastUsedAt: 'desc' },
        });
    }
    async revokeSession(sessionId) {
        const session = await this.prisma.userSession.findUnique({
            where: { id: sessionId },
        });
        if (!session) {
            throw new common_1.NotFoundException(`Session with ID ${sessionId} not found`);
        }
        await this.prisma.userSession.update({
            where: { id: sessionId },
            data: { isActive: false },
        });
        return { message: 'Session revoked successfully' };
    }
    async revokeAllUserSessions(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        await this.prisma.userSession.updateMany({
            where: { userId, isActive: true },
            data: { isActive: false },
        });
        return { message: 'All user sessions revoked successfully' };
    }
    async getUserActivities(userId, limit = 50) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        return this.prisma.userActivity.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    }
};
exports.AdminUsersService = AdminUsersService;
exports.AdminUsersService = AdminUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminUsersService);
//# sourceMappingURL=admin-users.service.js.map