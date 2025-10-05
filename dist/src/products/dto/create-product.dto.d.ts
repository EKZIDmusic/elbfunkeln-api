export declare class CreateProductDto {
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    sku: string;
    stock: number;
    categoryId: string;
    isActive?: boolean;
    isFeatured?: boolean;
    giftboxavailable?: boolean;
}
