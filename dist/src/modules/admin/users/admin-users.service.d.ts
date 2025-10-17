import { PrismaService } from '../../../core/database/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
export declare class AdminUsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(query: UserQueryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            orders: number;
            sessions: number;
        };
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        role: import("@prisma/client").$Enums.UserRole;
        isVerified: boolean;
        isBanned: boolean;
        displayName: string;
        lastLogin: Date;
        status: import("@prisma/client").$Enums.UserStatus;
        twoFactorEnabled: boolean;
    }[]>;
    getUserById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            favorites: number;
            reviews: number;
            orders: number;
            activities: number;
            sessions: number;
        };
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        role: import("@prisma/client").$Enums.UserRole;
        isVerified: boolean;
        isBanned: boolean;
        displayName: string;
        lastLogin: Date;
        status: import("@prisma/client").$Enums.UserStatus;
        twoFactorEnabled: boolean;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        role: import("@prisma/client").$Enums.UserRole;
        isVerified: boolean;
        isBanned: boolean;
        displayName: string;
        lastLogin: Date;
        status: import("@prisma/client").$Enums.UserStatus;
        twoFactorEnabled: boolean;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    getUserSessions(userId: string, activeOnly?: boolean): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        userId: string;
        expiresAt: Date;
        deviceName: string | null;
        deviceType: string | null;
        browserName: string | null;
        ipAddress: string | null;
        userAgent: string | null;
        lastUsedAt: Date;
    }[]>;
    revokeSession(sessionId: string): Promise<{
        message: string;
    }>;
    revokeAllUserSessions(userId: string): Promise<{
        message: string;
    }>;
    getUserActivities(userId: string, limit?: number): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        userId: string;
        ipAddress: string | null;
        userAgent: string | null;
        actionType: string;
        success: boolean;
        metadata: string | null;
    }[]>;
}
