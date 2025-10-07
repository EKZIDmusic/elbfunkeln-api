import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createReviewDto: CreateReviewDto) {
    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: createReviewDto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Check if user already reviewed this product
    const existingReview = await this.prisma.review.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: createReviewDto.productId,
        },
      },
    });

    if (existingReview) {
      throw new ConflictException('You have already reviewed this product');
    }

    return this.prisma.review.create({
      data: {
        ...createReviewDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        product: true,
      },
    });
  }

  async findAll() {
    return this.prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        product: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByProduct(productId: string) {
    return this.prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.review.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        product: true,
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(id: string, userId: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.userId !== userId) {
      throw new ForbiddenException('You can only update your own reviews');
    }

    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        product: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.userId !== userId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    return this.prisma.review.delete({
      where: { id },
    });
  }

  async getProductRatingStats(productId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { productId },
    });

    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    const ratingDistribution = reviews.reduce(
      (acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    return {
      averageRating: Number(averageRating.toFixed(2)),
      totalReviews: reviews.length,
      ratingDistribution: {
        1: ratingDistribution[1] || 0,
        2: ratingDistribution[2] || 0,
        3: ratingDistribution[3] || 0,
        4: ratingDistribution[4] || 0,
        5: ratingDistribution[5] || 0,
      },
    };
  }
}
