import { IsEmail, IsOptional, IsEnum, IsBoolean, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserStatus } from '@prisma/client';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 'Johnny' })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiPropertyOptional({ example: '+49123456789' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.CUSTOMER })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ enum: UserStatus, example: UserStatus.active })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isBanned?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  twoFactorEnabled?: boolean;

  @ApiPropertyOptional({ example: 'NewPassword123!' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}
