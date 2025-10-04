import { IsNumber, IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class UpdateGiftCardDto {
  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDateString()
  @IsOptional()
  expiresAt?: Date;
}
