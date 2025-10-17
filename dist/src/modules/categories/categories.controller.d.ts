import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<({
        _count: {
            products: number;
        };
        children: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            slug: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        slug: string;
        parentId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        parent: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            slug: string;
            parentId: string | null;
        };
        children: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            slug: string;
            parentId: string | null;
        }[];
        products: ({
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
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        slug: string;
        parentId: string | null;
    }>;
    create(createCategoryDto: CreateCategoryDto): Promise<{
        parent: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            slug: string;
            parentId: string | null;
        };
        children: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            slug: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        slug: string;
        parentId: string | null;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        parent: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            slug: string;
            parentId: string | null;
        };
        children: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            slug: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        slug: string;
        parentId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        slug: string;
        parentId: string | null;
    }>;
}
