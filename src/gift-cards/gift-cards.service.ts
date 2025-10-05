import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';
import { RedeemGiftCardDto } from './dto/redeem-gift-card.dto';

@Injectable()
export class GiftCardsService {
  constructor(private prisma: PrismaService) {}

  async create(createGiftCardDto: CreateGiftCardDto) {
    const { code, amount, purchasedBy, expiresAt } = createGiftCardDto;
    return this.prisma.giftCard.create({
      data: {
        code,
        amount,
        balance: amount,
        purchasedBy: purchasedBy ?? undefined,
        expiresAt: expiresAt ?? undefined,
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
    const { balance, isActive, expiresAt } = updateGiftCardDto;
    return this.prisma.giftCard.update({
      where: { id },
      data: {
        balance: balance ?? undefined,
        isActive: isActive ?? undefined,
        expiresAt: expiresAt ?? undefined,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.giftCard.delete({
      where: { id },
    });
  }

  async redeem(redeemGiftCardDto: RedeemGiftCardDto) {
    const giftCard = await this.prisma.giftCard.findUnique({
      where: { code: redeemGiftCardDto.code },
    });

    if (!giftCard) {
      throw new NotFoundException('Gift card not found');
    }

    if (!giftCard.isActive) {
      throw new BadRequestException('Gift card is not active');
    }

    if (giftCard.expiresAt && new Date(giftCard.expiresAt) < new Date()) {
      throw new BadRequestException('Gift card has expired');
    }

    const currentBalance = Number(giftCard.balance);
    if (currentBalance < redeemGiftCardDto.amount) {
      throw new BadRequestException('Insufficient gift card balance');
    }

    const order = await this.prisma.order.findUnique({
      where: { id: redeemGiftCardDto.orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Calculate order total
    const orderTotal = order.items.reduce((sum, item) => {
      return sum + item.quantity * Number(item.price);
    }, 0);

    const redemptionAmount = Math.min(redeemGiftCardDto.amount, orderTotal);

    // Update gift card balance
    const updatedGiftCard = await this.prisma.giftCard.update({
      where: { id: giftCard.id },
      data: {
        balance: {
          decrement: redemptionAmount,
        },
      },
    });

    // Update order with gift card payment
    const currentTotal = Number(order.total);
    const updatedOrder = await this.prisma.order.update({
      where: { id: redeemGiftCardDto.orderId },
      data: {
        total: currentTotal - redemptionAmount,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return {
      order: updatedOrder,
      giftCard: updatedGiftCard,
      redeemedAmount: redemptionAmount,
      remainingBalance: updatedGiftCard.balance,
    };
  }

  async checkBalance(code: string) {
    const giftCard = await this.prisma.giftCard.findUnique({
      where: { code },
    });

    if (!giftCard) {
      throw new NotFoundException('Gift card not found');
    }

    return {
      code: giftCard.code,
      balance: giftCard.balance,
      isActive: giftCard.isActive,
      expiresAt: giftCard.expiresAt,
    };
  }
}
