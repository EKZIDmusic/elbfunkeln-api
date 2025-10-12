import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createReviewDto: CreateReviewDto): Promise<{
        user: {
            id: string;
            firstName: string;
            lastName: string;
        };
        product: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            sku: string;
            price: import("@prisma/client/runtime/library").Decimal;
            discountPrice: import("@prisma/client/runtime/library").Decimal | null;
            stock: number;
            isActive: boolean;
            isFeatured: boolean;
            giftboxavailable: boolean;
            categoryId: string;
            isDeleted: boolean;
            deletedAt: Date | null;
        };
    } & {
        id: string;
        isVerified: boolean;
        createdAt: Date;
        userId: string;
        productId: string;
        rating: number;
        comment: string | null;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            firstName: string;
            lastName: string;
        };
        product: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            sku: string;
            price: import("@prisma/client/runtime/library").Decimal;
            discountPrice: import("@prisma/client/runtime/library").Decimal | null;
            stock: number;
            isActive: boolean;
            isFeatured: boolean;
            giftboxavailable: boolean;
            categoryId: string;
            isDeleted: boolean;
            deletedAt: Date | null;
        };
    } & {
        id: string;
        isVerified: boolean;
        createdAt: Date;
        userId: string;
        productId: string;
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
        isVerified: boolean;
        createdAt: Date;
        userId: string;
        productId: string;
        rating: number;
        comment: string | null;
    })[]>;
    findByUser(userId: string): Promise<({
        product: {
            images: {
                id: string;
                createdAt: Date;
                isPrimary: boolean;
                productId: string;
                url: string;
                alt: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            sku: string;
            price: import("@prisma/client/runtime/library").Decimal;
            discountPrice: import("@prisma/client/runtime/library").Decimal | null;
            stock: number;
            isActive: boolean;
            isFeatured: boolean;
            giftboxavailable: boolean;
            categoryId: string;
            isDeleted: boolean;
            deletedAt: Date | null;
        };
    } & {
        id: string;
        isVerified: boolean;
        createdAt: Date;
        userId: string;
        productId: string;
        rating: number;
        comment: string | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            firstName: string;
            lastName: string;
        };
        product: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            sku: string;
            price: import("@prisma/client/runtime/library").Decimal;
            discountPrice: import("@prisma/client/runtime/library").Decimal | null;
            stock: number;
            isActive: boolean;
            isFeatured: boolean;
            giftboxavailable: boolean;
            categoryId: string;
            isDeleted: boolean;
            deletedAt: Date | null;
        };
    } & {
        id: string;
        isVerified: boolean;
        createdAt: Date;
        userId: string;
        productId: string;
        rating: number;
        comment: string | null;
    }>;
    update(id: string, userId: string, updateReviewDto: UpdateReviewDto): Promise<{
        user: {
            id: string;
            firstName: string;
            lastName: string;
        };
        product: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            sku: string;
            price: import("@prisma/client/runtime/library").Decimal;
            discountPrice: import("@prisma/client/runtime/library").Decimal | null;
            stock: number;
            isActive: boolean;
            isFeatured: boolean;
            giftboxavailable: boolean;
            categoryId: string;
            isDeleted: boolean;
            deletedAt: Date | null;
        };
    } & {
        id: string;
        isVerified: boolean;
        createdAt: Date;
        userId: string;
        productId: string;
        rating: number;
        comment: string | null;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        isVerified: boolean;
        createdAt: Date;
        userId: string;
        productId: string;
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
