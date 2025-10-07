import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    }>;
    findAll(page?: number, limit?: number, categoryId?: string, search?: string): Promise<{
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
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
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
    }>;
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
    })[]>;
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
