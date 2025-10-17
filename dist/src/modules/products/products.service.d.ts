import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
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
    }>;
    findAll(page?: number, limit?: number, categoryId?: string, search?: string): Promise<{
        data: {
            images: {
                url: string;
                id: string;
                alt: string;
                isPrimary: boolean;
            }[];
            category: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                slug: string;
                parentId: string | null;
            };
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
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        images: {
            url: string;
            id: string;
            alt: string;
            isPrimary: boolean;
        }[];
        category: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            slug: string;
            parentId: string | null;
        };
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
    }>;
    findFeatured(): Promise<{
        images: {
            url: string;
            id: string;
            alt: string;
            isPrimary: boolean;
        }[];
        category: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            slug: string;
            parentId: string | null;
        };
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
    }[]>;
    search(query: string): Promise<{
        images: {
            url: string;
            id: string;
            alt: string;
            isPrimary: boolean;
        }[];
        category: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            slug: string;
            parentId: string | null;
        };
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
    }[]>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    findArchived(): Promise<({
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
    })[]>;
    restore(id: string): Promise<{
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
    }>;
    permanentDelete(id: string): Promise<{
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
    }>;
}
