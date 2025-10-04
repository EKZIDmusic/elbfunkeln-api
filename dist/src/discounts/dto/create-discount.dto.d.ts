export declare class CreateDiscountDto {
    code: string;
    type: string;
    value: number;
    description?: string;
    minAmount?: number;
    maxUses?: number;
    startsAt?: Date;
    expiresAt?: Date;
}
