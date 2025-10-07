import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createAddressDto: CreateAddressDto) {
    // If this is set as default, unset other default addresses
    if (createAddressDto.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    return this.prisma.address.create({
      data: {
        ...createAddressDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const address = await this.prisma.address.findFirst({
      where: { id, userId },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  async update(id: string, userId: string, updateAddressDto: UpdateAddressDto) {
    await this.findOne(id, userId); // Check if exists

    // If setting as default, unset other default addresses
    if (updateAddressDto.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId, isDefault: true, id: { not: id } },
        data: { isDefault: false },
      });
    }

    return this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // Check if exists

    return this.prisma.address.delete({
      where: { id },
    });
  }
}
