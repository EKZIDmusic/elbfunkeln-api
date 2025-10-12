import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    findAll(page?: string, limit?: string, categoryId?: string, search?: string): Promise<{
        data: ({
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
            isDeleted: boolean;
            deletedAt: Date | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findArchived(): Promise<({
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
        isDeleted: boolean;
        deletedAt: Date | null;
    })[]>;
    findFeatured(): Promise<({
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
        isDeleted: boolean;
        deletedAt: Date | null;
    })[]>;
    search(query: string): Promise<({
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
        isDeleted: boolean;
        deletedAt: Date | null;
    })[]>;
    findOne(id: string): Promise<{
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
        isDeleted: boolean;
        deletedAt: Date | null;
    }>;
    create(createProductDto: CreateProductDto): Promise<{
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
        isDeleted: boolean;
        deletedAt: Date | null;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
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
        isDeleted: boolean;
        deletedAt: Date | null;
    }>;
    remove(id: string): Promise<{
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
        isDeleted: boolean;
        deletedAt: Date | null;
    }>;
    restore(id: string): Promise<{
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
        isDeleted: boolean;
        deletedAt: Date | null;
    }>;
    permanentDelete(id: string): Promise<{
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
    }>;
}
