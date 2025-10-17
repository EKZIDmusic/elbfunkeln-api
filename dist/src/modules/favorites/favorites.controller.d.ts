import { FavoritesService } from './favorites.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import type { UserPayload } from '../../core/auth/interfaces/user-payload.interface';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    addToFavorites(user: UserPayload, addFavoriteDto: AddFavoriteDto): Promise<{
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
            category: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                slug: string;
                parentId: string | null;
            };
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
        userId: string;
    }>;
    findAll(user: UserPayload): Promise<({
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
            category: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                slug: string;
                parentId: string | null;
            };
            reviews: {
                id: string;
                createdAt: Date;
                productId: string;
                isVerified: boolean;
                userId: string;
                rating: number;
                comment: string | null;
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
        userId: string;
    })[]>;
    isFavorite(user: UserPayload, productId: string): Promise<boolean>;
    remove(user: UserPayload, productId: string): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
    }>;
}
