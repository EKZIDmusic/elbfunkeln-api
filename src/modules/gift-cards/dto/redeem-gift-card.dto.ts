import { IsString, IsNumber, Min } from 'class-validator';

export class RedeemGiftCardDto {
  @IsString()
  code!: string;

  @IsString()
  orderId!: string;

  @IsNumber()
  @Min(0)
  amount!: number;
}
