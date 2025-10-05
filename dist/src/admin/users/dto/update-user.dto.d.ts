import { UserRole, UserStatus } from '@prisma/client';
export declare class UpdateUserDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    phone?: string;
    role?: UserRole;
    status?: UserStatus;
    isVerified?: boolean;
    isBanned?: boolean;
    twoFactorEnabled?: boolean;
    password?: string;
}
