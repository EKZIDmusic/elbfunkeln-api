import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateContactInquiryDto } from './dto/create-contact-inquiry.dto';
import { UpdateContactInquiryDto } from './dto/update-contact-inquiry.dto';
import { ContactQueryDto } from './dto/contact-query.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createInquiry(createContactInquiryDto: CreateContactInquiryDto) {
    return this.prisma.contactInquiry.create({
      data: createContactInquiryDto,
    });
  }

  async getInquiries(query: ContactQueryDto) {
    const { page, limit, status, search, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { subject: { contains: search } },
        { message: { contains: search } },
      ];
    }

    const [inquiries, total] = await Promise.all([
      this.prisma.contactInquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.contactInquiry.count({ where }),
    ]);

    return {
      data: inquiries,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getInquiryById(id: string) {
    const inquiry = await this.prisma.contactInquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      throw new NotFoundException(`Contact inquiry with ID ${id} not found`);
    }

    return inquiry;
  }

  async updateInquiry(id: string, updateContactInquiryDto: UpdateContactInquiryDto) {
    const inquiry = await this.prisma.contactInquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      throw new NotFoundException(`Contact inquiry with ID ${id} not found`);
    }

    return this.prisma.contactInquiry.update({
      where: { id },
      data: updateContactInquiryDto,
    });
  }

  async deleteInquiry(id: string) {
    const inquiry = await this.prisma.contactInquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      throw new NotFoundException(`Contact inquiry with ID ${id} not found`);
    }

    await this.prisma.contactInquiry.delete({ where: { id } });

    return { message: 'Contact inquiry deleted successfully' };
  }
}
