import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
export declare class AdminUsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(query: UserQueryDto): Promise<{
        data: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            displayName: string;
            phone: string;
            role: import("@prisma/client").$Enums.UserRole;
            status: import("@prisma/client").$Enums.UserStatus;
            isVerified: boolean;
            isBanned: boolean;
            twoFactorEnabled: boolean;
            lastLogin: Date;
            createdAt: Date;
            updatedAt: Date;
            _count: {
                orders: number;
                sessions: number;
            };
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getUserById(id: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        displayName: string;
        phone: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        isVerified: boolean;
        isBanned: boolean;
        twoFactorEnabled: boolean;
        lastLogin: Date;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            orders: number;
            favorites: number;
            reviews: number;
            sessions: number;
            activities: number;
        };
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        displayName: string;
        phone: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        isVerified: boolean;
        isBanned: boolean;
        twoFactorEnabled: boolean;
        lastLogin: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    getUserSessions(userId: string, activeOnly?: boolean): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
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
        createdAt: Date;
        description: string | null;
        userId: string;
        ipAddress: string | null;
        userAgent: string | null;
        actionType: string;
        success: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
}
