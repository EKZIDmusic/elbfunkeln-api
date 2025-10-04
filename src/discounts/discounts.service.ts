import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Injectable()
export class DiscountsService {
  constructor(private prisma: PrismaService) {}

  async create(createDiscountDto: CreateDiscountDto) {
    return this.prisma.discount.create({
      data: createDiscountDto,
    });
  }

  async findAll() {
    return this.prisma.discount.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCode(code: string) {
    return this.prisma.discount.findUnique({
      where: { code },
    });
  }

  async findOne(id: string) {
    return this.prisma.discount.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateDiscountDto: UpdateDiscountDto) {
    return this.prisma.discount.update({
      where: { id },
      data: updateDiscountDto,
    });
  }

  async remove(id: string) {
    return this.prisma.discount.delete({
      where: { id },
    });
  }
}
