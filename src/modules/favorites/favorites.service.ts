import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma/prisma.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addToFavorites(userId: string, addFavoriteDto: AddFavoriteDto) {
    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: addFavoriteDto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Check if already in favorites
    const existing = await this.prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: addFavoriteDto.productId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Product already in favorites');
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        productId: addFavoriteDto.productId,
      },
      include: {
        product: {
          include: {
            images: true,
            category: true,
          },
        },
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            images: true,
            category: true,
            reviews: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(userId: string, productId: string) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    return this.prisma.favorite.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }

  async isFavorite(userId: string, productId: string): Promise<boolean> {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    return !!favorite;
  }
}
