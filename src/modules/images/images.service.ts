import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async uploadProductImage(
    productId: string,
    file: any,
    alt?: string,
    isPrimary?: boolean,
  ) {
    // Verify product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // If this is set as primary, unset all other primary images for this product
    if (isPrimary) {
      await this.prisma.productImage.updateMany({
        where: { productId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    // Create the image record with BLOB data (stored directly in database)
    const image = await this.prisma.productImage.create({
      data: {
        productId,
        data: file.buffer, // Store file buffer as BLOB
        mimeType: file.mimetype,
        alt: alt || file.originalname,
        isPrimary: isPrimary || false,
        url: null, // We don't use URL anymore, only BLOB storage
      },
    });

    return {
      id: image.id,
      url: `/api/images/${image.id}`,
      alt: image.alt,
      isPrimary: image.isPrimary,
      mimeType: image.mimeType,
      size: file.size,
      createdAt: image.createdAt,
    };
  }

  async getImage(imageId: string) {
    const image = await this.prisma.productImage.findUnique({
      where: { id: imageId },
      select: {
        data: true,
        mimeType: true,
      },
    });

    if (!image || !image.data) {
      throw new NotFoundException('Image not found');
    }

    return {
      data: image.data,
      mimeType: image.mimeType || 'image/jpeg',
    };
  }

  async deleteImage(imageId: string) {
    const image = await this.prisma.productImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    await this.prisma.productImage.delete({
      where: { id: imageId },
    });

    return { message: 'Image deleted successfully' };
  }

  async getProductImages(productId: string) {
    const images = await this.prisma.productImage.findMany({
      where: { productId },
      select: {
        id: true,
        alt: true,
        isPrimary: true,
        mimeType: true,
        createdAt: true,
      },
      orderBy: [{ isPrimary: 'desc' }, { createdAt: 'asc' }],
    });

    return images.map((img) => ({
      ...img,
      url: `/api/images/${img.id}`,
    }));
  }
}
