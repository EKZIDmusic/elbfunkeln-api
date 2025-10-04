export class CreateGiftCardDto {
  code!: string;
  amount!: number; // Decimal
  purchasedBy?: string; // UUID of purchaser
  expiresAt?: Date;
}
