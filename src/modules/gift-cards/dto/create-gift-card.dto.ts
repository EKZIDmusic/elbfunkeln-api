import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateGiftCardDto {
  @IsString()
  code!: string;

  @IsNumber()
  amount!: number;

  @IsString()
  @IsOptional()
  purchasedBy?: string;

  @IsDateString()
  @IsOptional()
  expiresAt?: Date;
}
