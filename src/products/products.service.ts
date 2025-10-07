import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const existingSku = await this.prisma.product.findUnique({
      where: { sku: createProductDto.sku },
    });

    if (existingSku) {
      throw new BadRequestException('SKU already exists');
    }

    // Prüfe, ob Kategorie existiert
    const category = await this.prisma.category.findUnique({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Kategorie mit ID ${createProductDto.categoryId} nicht gefunden`,
      );
    }

    return this.prisma.product.create({
      data: createProductDto,
      include: { category: true, images: true },
    });
  }

  async findAll(page = 1, limit = 20, categoryId?: string, search?: string) {
    const skip = (page - 1) * limit;
    const where: {
      isActive: boolean;
      categoryId?: string;
      OR?: Array<{ name?: { contains: string }; description?: { contains: string } }>;
    } = { isActive: true };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [{ name: { contains: search } }, { description: { contains: search } }];
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: limit,
        where,
        include: {
          category: true,
          images: { where: { isPrimary: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findFeatured() {
    return this.prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      include: {
        category: true,
        images: { where: { isPrimary: true } },
      },
      take: 10,
    });
  }

  async search(query: string) {
    return this.prisma.product.findMany({
      where: {
        AND: [
          { isActive: true },
          {
            OR: [
              { name: { contains: query } },
              { description: { contains: query } },
              { sku: { contains: query } },
            ],
          },
        ],
      },
      include: {
        category: true,
        images: { where: { isPrimary: true } },
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    // Wenn categoryId aktualisiert wird, prüfe ob sie existiert
    if (updateProductDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: updateProductDto.categoryId },
      });

      if (!category) {
        throw new NotFoundException(
          `Kategorie mit ID ${updateProductDto.categoryId} nicht gefunden`,
        );
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: { category: true, images: true },
    });
  }

  async remove(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
