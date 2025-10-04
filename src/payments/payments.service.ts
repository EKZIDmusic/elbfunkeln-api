import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return this.prisma.order.update({
      where: { id: createPaymentDto.orderId },
      data: {
        paymentStatus: 'COMPLETED',
        stripePaymentId: createPaymentDto.transactionId,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      where: {
        paymentStatus: {
          in: ['COMPLETED', 'PENDING', 'FAILED'],
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}
