import { PrismaService } from '../prisma/prisma.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    addToFavorites(userId: string, addFavoriteDto: AddFavoriteDto): Promise<{
        product: {
            category: {
                id: string;
                createdAt: Date;
                name: string;
                slug: string;
                description: string | null;
                parentId: string | null;
            };
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
            categoryId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }>;
    findAll(userId: string): Promise<({
        product: {
            reviews: {
                id: string;
                isVerified: boolean;
                createdAt: Date;
                userId: string;
                productId: string;
                rating: number;
                comment: string | null;
            }[];
            category: {
                id: string;
                createdAt: Date;
                name: string;
                slug: string;
                description: string | null;
                parentId: string | null;
            };
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
            categoryId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    })[]>;
    remove(userId: string, productId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }>;
    isFavorite(userId: string, productId: string): Promise<boolean>;
}
