import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscribeDto } from './dto/subscribe.dto';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async subscribe(subscribeDto: SubscribeDto) {
    const existing = await this.prisma.newsletter.findUnique({
      where: { email: subscribeDto.email },
    });

    if (existing) {
      if (!existing.isActive) {
        return this.prisma.newsletter.update({
          where: { email: subscribeDto.email },
          data: { isActive: true },
        });
      }
      return { message: 'Already subscribed' };
    }

    return this.prisma.newsletter.create({
      data: subscribeDto,
    });
  }

  async findAll() {
    return this.prisma.newsletter.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async unsubscribe(email: string) {
    return this.prisma.newsletter.update({
      where: { email },
      data: { isActive: false },
    });
  }

  async remove(id: string) {
    return this.prisma.newsletter.delete({
      where: { id },
    });
  }
}
