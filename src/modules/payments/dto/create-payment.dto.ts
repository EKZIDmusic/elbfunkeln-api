export class CreatePaymentDto {
  orderId!: string; // UUID
  amount!: number;
  method!: string;
  transactionId?: string;
}
