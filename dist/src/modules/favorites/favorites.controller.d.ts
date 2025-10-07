import { FavoritesService } from './favorites.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import type { UserPayload } from '../../core/auth/interfaces/user-payload.interface';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    addToFavorites(user: UserPayload, addFavoriteDto: AddFavoriteDto): Promise<{
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
            giftboxavailable: boolean;
            categoryId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }>;
    findAll(user: UserPayload): Promise<({
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
            giftboxavailable: boolean;
            categoryId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    })[]>;
    isFavorite(user: UserPayload, productId: string): Promise<boolean>;
    remove(user: UserPayload, productId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }>;
}
