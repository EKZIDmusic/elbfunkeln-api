import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';

@Injectable()
export class GiftCardsService {
  constructor(private prisma: PrismaService) {}

  async create(createGiftCardDto: CreateGiftCardDto) {
    return this.prisma.giftCard.create({
      data: {
        ...createGiftCardDto,
        balance: createGiftCardDto.amount, // Initialize balance with amount
      },
    });
  }

  async findAll() {
    return this.prisma.giftCard.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCode(code: string) {
    return this.prisma.giftCard.findUnique({
      where: { code },
    });
  }

  async findOne(id: string) {
    return this.prisma.giftCard.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateGiftCardDto: UpdateGiftCardDto) {
    return this.prisma.giftCard.update({
      where: { id },
      data: updateGiftCardDto,
    });
  }

  async remove(id: string) {
    return this.prisma.giftCard.delete({
      where: { id },
    });
  }
}
