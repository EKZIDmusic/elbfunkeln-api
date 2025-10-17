import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import type { UserPayload } from '../../core/auth/interfaces/user-payload.interface';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(user: UserPayload, createReviewDto: CreateReviewDto): Promise<{
        product: {
            id: string;
            sku: string;
            name: string;
            description: string;
            price: import("@prisma/client/runtime/library").Decimal;
            discountPrice: import("@prisma/client/runtime/library").Decimal | null;
            stock: number;
            isActive: boolean;
            isFeatured: boolean;
            categoryId: string;
            createdAt: Date;
            updatedAt: Date;
            giftboxavailable: boolean;
            deletedAt: Date | null;
            isDeleted: boolean;
        };
        user: {
            id: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        isVerified: boolean;
        userId: string;
        rating: number;
        comment: string | null;
    }>;
    findAll(productId?: string, userId?: string): Promise<({
        user: {
            id: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        isVerified: boolean;
        userId: string;
        rating: number;
        comment: string | null;
    })[]> | Promise<({
        product: {
            images: {
                id: string;
                createdAt: Date;
                data: Uint8Array | null;
                url: string | null;
                mimeType: string | null;
                alt: string | null;
                isPrimary: boolean;
                productId: string;
            }[];
        } & {
            id: string;
            sku: string;
            name: string;
            description: string;
            price: import("@prisma/client/runtime/library").Decimal;
            discountPrice: import("@prisma/client/runtime/library").Decimal | null;
            stock: number;
            isActive: boolean;
            isFeatured: boolean;
            categoryId: string;
            createdAt: Date;
            updatedAt: Date;
            giftboxavailable: boolean;
            deletedAt: Date | null;
            isDeleted: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        isVerified: boolean;
        userId: string;
        rating: number;
        comment: string | null;
    })[]>;
    getProductStats(productId: string): Promise<{
        averageRating: number;
        totalReviews: number;
        ratingDistribution: {
            1: number;
            2: number;
            3: number;
            4: number;
            5: number;
        };
    }>;
    findOne(id: string): Promise<{
        product: {
            id: string;
            sku: string;
            name: string;
            description: string;
            price: import("@prisma/client/runtime/library").Decimal;
            discountPrice: import("@prisma/client/runtime/library").Decimal | null;
            stock: number;
            isActive: boolean;
            isFeatured: boolean;
            categoryId: string;
            createdAt: Date;
            updatedAt: Date;
            giftboxavailable: boolean;
            deletedAt: Date | null;
            isDeleted: boolean;
        };
        user: {
            id: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        isVerified: boolean;
        userId: string;
        rating: number;
        comment: string | null;
    }>;
    update(id: string, user: UserPayload, updateReviewDto: UpdateReviewDto): Promise<{
        product: {
            id: string;
            sku: string;
            name: string;
            description: string;
            price: import("@prisma/client/runtime/library").Decimal;
            discountPrice: import("@prisma/client/runtime/library").Decimal | null;
            stock: number;
            isActive: boolean;
            isFeatured: boolean;
            categoryId: string;
            createdAt: Date;
            updatedAt: Date;
            giftboxavailable: boolean;
            deletedAt: Date | null;
            isDeleted: boolean;
        };
        user: {
            id: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        isVerified: boolean;
        userId: string;
        rating: number;
        comment: string | null;
    }>;
    remove(id: string, user: UserPayload): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        isVerified: boolean;
        userId: string;
        rating: number;
        comment: string | null;
    }>;
}
