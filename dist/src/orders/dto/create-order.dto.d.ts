declare class OrderItemDto {
    productId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    addressId: string;
    items: OrderItemDto[];
    notes?: string;
}
export {};
