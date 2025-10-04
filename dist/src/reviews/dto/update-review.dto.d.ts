import { CreateReviewDto } from './create-review.dto';
declare const UpdateReviewDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateReviewDto, "productId">>>;
export declare class UpdateReviewDto extends UpdateReviewDto_base {
}
export {};
