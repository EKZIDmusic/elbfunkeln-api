import { UserRole, UserStatus } from '@prisma/client';
export declare class UserQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    role?: UserRole;
    status?: UserStatus;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
