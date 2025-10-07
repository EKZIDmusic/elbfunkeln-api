import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ValidateDiscountDto {
  @IsString()
  code!: string;

  @IsNumber()
  orderTotal!: number;

  @IsOptional()
  @IsString()
  userId?: string;
}
