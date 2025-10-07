import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
      include: { parent: true, children: true },
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        children: true,
        _count: {
          select: { products: true },
        },
      },
      where: { parentId: null },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        products: {
          where: { isActive: true },
          include: {
            images: { where: { isPrimary: true } },
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
      include: { parent: true, children: true },
    });
  }

  async remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
