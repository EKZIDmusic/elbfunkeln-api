import type { Response } from 'express';
import { ImagesService } from './images.service';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    uploadProductImage(productId: string, file: Express.Multer.File, alt?: string, isPrimary?: string): Promise<{
        id: string;
        url: string;
        alt: string;
        isPrimary: boolean;
        mimeType: string;
        createdAt: Date;
    }>;
    getImage(imageId: string, res: Response): Promise<void>;
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
