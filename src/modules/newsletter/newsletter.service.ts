import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma/prisma.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { SendNewsletterDto } from './dto/send-newsletter.dto';
import { EmailService } from '../../shared/email/email.service';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

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

  async sendNewsletter(sendNewsletterDto: SendNewsletterDto) {
    const subscribers = await this.prisma.newsletter.findMany({
      where: { isActive: true },
    });

    this.logger.log(`Sending newsletter to ${subscribers.length} subscribers`);

    const results = {
      total: subscribers.length,
      sent: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const subscriber of subscribers) {
      try {
        await this.emailService.send({
          to: subscriber.email,
          subject: sendNewsletterDto.subject,
          text: sendNewsletterDto.content,
          html: sendNewsletterDto.htmlContent || sendNewsletterDto.content,
        });
        results.sent++;
      } catch (error) {
        results.failed++;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.errors.push(`Failed to send to ${subscriber.email}: ${errorMessage}`);
        this.logger.error(`Failed to send newsletter to ${subscriber.email}`, error);
      }
    }

    this.logger.log(`Newsletter sent: ${results.sent} successful, ${results.failed} failed`);

    return results;
  }
}
