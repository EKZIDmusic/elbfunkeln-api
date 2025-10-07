import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../auth-module/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: { sub: string; email: string; role: string }) {
    const user = await this.authService.validateUser(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // UserPayload Interface erfüllen
    return {
      id: user.id,
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
