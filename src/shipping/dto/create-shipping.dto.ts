export class CreateShippingDto {
  orderId!: string; // UUID
  trackingNumber!: string;
  carrier!: string;
}
