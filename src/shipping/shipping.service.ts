import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Injectable()
export class ShippingService {
  constructor(private prisma: PrismaService) {}

  async create(createShippingDto: CreateShippingDto) {
    return this.prisma.order.update({
      where: { id: createShippingDto.orderId },
      data: {
        trackingNumber: createShippingDto.trackingNumber,
        shippingStatus: 'LABEL_CREATED',
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      where: {
        shippingStatus: {
          not: 'PENDING',
        },
      },
      include: {
        user: true,
        address: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        address: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async update(id: string, updateShippingDto: UpdateShippingDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        trackingNumber: updateShippingDto.trackingNumber,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        shippingStatus: updateShippingDto.status as any,
      },
    });
  }
}
