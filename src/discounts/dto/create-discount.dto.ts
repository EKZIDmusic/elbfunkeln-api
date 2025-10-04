export class CreateDiscountDto {
  code!: string;
  percentage!: number;
  expiresAt?: Date;
  usageLimit?: number;
}
