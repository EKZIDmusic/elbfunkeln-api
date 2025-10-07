import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ValidateDiscountDto } from './dto/validate-discount.dto';
import { ApplyDiscountDto } from './dto/apply-discount.dto';

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

  async validateDiscount(validateDiscountDto: ValidateDiscountDto) {
    const discount = await this.prisma.discount.findUnique({
      where: { code: validateDiscountDto.code },
    });

    if (!discount) {
      throw new NotFoundException('Discount code not found');
    }

    if (!discount.isActive) {
      throw new BadRequestException('Discount code is not active');
    }

    // Check if discount has expired
    if (discount.expiresAt && new Date(discount.expiresAt) < new Date()) {
      throw new BadRequestException('Discount code has expired');
    }

    // Check usage limit
    if (discount.maxUses !== null && discount.usedCount >= discount.maxUses) {
      throw new BadRequestException('Discount code usage limit reached');
    }

    // Check minimum order amount
    const minAmount = discount.minAmount ? Number(discount.minAmount) : 0;
    if (minAmount && validateDiscountDto.orderTotal < minAmount) {
      throw new BadRequestException(
        `Minimum order amount of ${minAmount}€ required for this discount`,
      );
    }

    // Calculate discount amount
    let discountAmount = 0;
    const discountValue = Number(discount.value);
    if (discount.type === 'PERCENTAGE') {
      discountAmount = (validateDiscountDto.orderTotal * discountValue) / 100;
    } else {
      discountAmount = discountValue;
    }

    const finalAmount = Math.max(0, validateDiscountDto.orderTotal - discountAmount);

    return {
      valid: true,
      discount,
      discountAmount,
      originalAmount: validateDiscountDto.orderTotal,
      finalAmount,
    };
  }

  async applyToOrder(applyDiscountDto: ApplyDiscountDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: applyDiscountDto.orderId },
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

    // Validate the discount
    const validation = await this.validateDiscount({
      code: applyDiscountDto.code,
      orderTotal,
      userId: order.userId,
    });

    // Update order with discount
    const updatedOrder = await this.prisma.order.update({
      where: { id: applyDiscountDto.orderId },
      data: {
        discountCode: validation.discount.code,
        discount: validation.discountAmount,
        total: validation.finalAmount,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Increment usage count
    await this.prisma.discount.update({
      where: { id: validation.discount.id },
      data: {
        usedCount: {
          increment: 1,
        },
      },
    });

    return updatedOrder;
  }
}
