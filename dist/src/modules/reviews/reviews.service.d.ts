import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createReviewDto: CreateReviewDto): Promise<{
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
    findAll(): Promise<({
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
    })[]>;
    findByProduct(productId: string): Promise<({
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
    })[]>;
    findByUser(userId: string): Promise<({
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
    update(id: string, userId: string, updateReviewDto: UpdateReviewDto): Promise<{
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
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        isVerified: boolean;
        userId: string;
        rating: number;
        comment: string | null;
    }>;
    getProductRatingStats(productId: string): Promise<{
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
}
