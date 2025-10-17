import { PrismaService } from '../../core/database/prisma/prisma.service';
export declare class ImagesService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadProductImage(productId: string, file: Express.Multer.File, alt?: string, isPrimary?: boolean): Promise<{
        id: string;
        url: string;
        alt: string;
        isPrimary: boolean;
        mimeType: string;
        createdAt: Date;
    }>;
    getImage(imageId: string): Promise<{
        data: Uint8Array<ArrayBufferLike>;
        mimeType: string;
    }>;
    deleteImage(imageId: string): Promise<{
        message: string;
    }>;
    getProductImages(productId: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        mimeType: string;
        alt: string;
        isPrimary: boolean;
    }[]>;
}
