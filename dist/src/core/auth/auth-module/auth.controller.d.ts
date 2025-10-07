import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { UserPayload } from '../interfaces/user-payload.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        displayName: string | null;
        phone: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        isVerified: boolean;
        isBanned: boolean;
        twoFactorEnabled: boolean;
        lastLogin: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
        };
    }>;
    getProfile(user: UserPayload): UserPayload;
}
