import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../auth-module/auth.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(payload: {
        sub: string;
        email: string;
        role: string;
    }): Promise<{
        id: string;
        userId: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        firstName: string;
        lastName: string;
    }>;
}
export {};
