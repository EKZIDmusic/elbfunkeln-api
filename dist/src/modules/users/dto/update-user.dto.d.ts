import { UserRole } from '@prisma/client';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: UserRole;
    isVerified?: boolean;
    isBanned?: boolean;
}
