import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma/prisma.service';
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

    const { images, ...productData } = createProductDto;

    return this.prisma.product.create({
      data: {
        ...productData,
        images: images && images.length > 0
          ? {
              create: images.map((img) => ({
                url: img.url,
                alt: img.alt,
                isPrimary: img.isPrimary ?? false,
              })),
            }
          : undefined,
      },
      include: { category: true, images: true },
    });
  }

  async findAll(page = 1, limit = 20, categoryId?: string, search?: string) {
    const skip = (page - 1) * limit;
    const where: {
      isActive: boolean;
      isDeleted: boolean;
      categoryId?: string;
      OR?: Array<{ name?: { contains: string }; description?: { contains: string } }>;
    } = { isActive: true, isDeleted: false };

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
    const product = await this.prisma.product.findFirst({
      where: {
        id,
        isDeleted: false,
      },
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
      where: { isFeatured: true, isActive: true, isDeleted: false },
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
          { isDeleted: false },
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

    const { images, ...productData } = updateProductDto;

    // Wenn Bilder bereitgestellt werden, ersetze alle bestehenden Bilder
    if (images !== undefined) {
      // Lösche alle bestehenden Bilder
      await this.prisma.productImage.deleteMany({
        where: { productId: id },
      });
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        images: images && images.length > 0
          ? {
              create: images.map((img) => ({
                url: img.url,
                alt: img.alt,
                isPrimary: img.isPrimary ?? false,
              })),
            }
          : undefined,
      },
      include: { category: true, images: true },
    });
  }

  async remove(id: string) {
    // Prüfe ob Produkt existiert
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
      include: { category: true, images: true },
    });
  }

  async findArchived() {
    return this.prisma.product.findMany({
      where: { isDeleted: true },
      include: {
        category: true,
        images: { where: { isPrimary: true } },
      },
      orderBy: { deletedAt: 'desc' },
    });
  }

  async restore(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true, images: true },
    });

    if (!product) {
      throw new NotFoundException(`Produkt mit ID ${id} nicht gefunden`);
    }

    if (!product.isDeleted) {
      throw new BadRequestException(`Produkt mit ID ${id} ist nicht archiviert`);
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        isDeleted: false,
        deletedAt: null,
      },
      include: { category: true, images: true },
    });
  }

  async permanentDelete(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        orderItems: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Produkt mit ID ${id} nicht gefunden`);
    }

    // Prevent deletion if product has order history
    if (product.orderItems && product.orderItems.length > 0) {
      throw new BadRequestException(
        'Produkt kann nicht gelöscht werden, da es Teil von Bestellungen ist. Bitte archivieren Sie das Produkt stattdessen.',
      );
    }

    // Delete related cart items first
    await this.prisma.cartItem.deleteMany({
      where: { productId: id },
    });

    // Delete the product (cascades will handle images, favorites, reviews)
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
