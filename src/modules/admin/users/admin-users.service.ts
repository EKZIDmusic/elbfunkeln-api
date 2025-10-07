import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminUsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(query: UserQueryDto) {
    const { page, limit, search, role, status, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

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

  async getUserById(id: string) {
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
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }
    }

    const data: any = { ...updateUserDto };

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

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.prisma.user.delete({ where: { id } });

    return { message: 'User deleted successfully' };
  }

  async getUserSessions(userId: string, activeOnly: boolean = false) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const where: any = { userId };

    if (activeOnly) {
      where.isActive = true;
      where.expiresAt = { gte: new Date() };
    }

    return this.prisma.userSession.findMany({
      where,
      orderBy: { lastUsedAt: 'desc' },
    });
  }

  async revokeSession(sessionId: string) {
    const session = await this.prisma.userSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }

    await this.prisma.userSession.update({
      where: { id: sessionId },
      data: { isActive: false },
    });

    return { message: 'Session revoked successfully' };
  }

  async revokeAllUserSessions(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.prisma.userSession.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });

    return { message: 'All user sessions revoked successfully' };
  }

  async getUserActivities(userId: string, limit: number = 50) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.prisma.userActivity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
