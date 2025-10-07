export class CreateDiscountDto {
  code!: string;
  type!: string; // 'percentage' or 'fixed'
  value!: number; // Decimal value (percentage or fixed amount)
  description?: string;
  minAmount?: number; // Minimum order amount
  maxUses?: number; // Maximum number of uses
  startsAt?: Date;
  expiresAt?: Date;
}
