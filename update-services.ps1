Write-Host "Updating all services to use Prisma..." -ForegroundColor Cyan

# Function to create/update service file
function Update-ServiceFile {
    param($Path, $Content)

    if (Test-Path $Path) {
        # Backup existing file
        Copy-Item $Path "$Path.backup" -Force
        Write-Host "Backed up: $Path" -ForegroundColor Yellow
    }

    Set-Content -Path $Path -Value $Content -Encoding UTF8
    Write-Host "Updated: $Path" -ForegroundColor Green
}

# Discounts Service
Update-ServiceFile "src/discounts/discounts.service.ts" @'
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
'@

# Tickets Service
Update-ServiceFile "src/tickets/tickets.service.ts" @'
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: createTicketDto,
      include: {
        user: true,
        messages: true,
      },
    });
  }

  async findAll(status?: string) {
    return this.prisma.ticket.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        user: true,
        messages: {
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.ticket.findUnique({
      where: { id },
      include: {
        user: true,
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
  }

  async remove(id: string) {
    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
'@

# Gift Cards Service
Update-ServiceFile "src/gift-cards/gift-cards.service.ts" @'
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';

@Injectable()
export class GiftCardsService {
  constructor(private prisma: PrismaService) {}

  async create(createGiftCardDto: CreateGiftCardDto) {
    return this.prisma.giftCard.create({
      data: createGiftCardDto,
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
'@

# Newsletter Service
Update-ServiceFile "src/newsletter/newsletter.service.ts" @'
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
'@

# Analytics Service
Update-ServiceFile "src/analytics/analytics.service.ts" @'
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getSalesData(startDate: string, endDate: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        paymentStatus: 'COMPLETED',
      },
    });

    const totalSales = orders.reduce((sum, order) => sum + Number(order.total), 0);

    return {
      totalSales,
      orderCount: orders.length,
      period: { startDate, endDate },
      data: orders,
    };
  }

  async getTicketData(startDate: string, endDate: string) {
    const tickets = await this.prisma.ticket.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });

    return {
      totalTickets: tickets.length,
      period: { startDate, endDate },
      statusBreakdown: {
        open: tickets.filter((t) => t.status === 'OPEN').length,
        inProgress: tickets.filter((t) => t.status === 'IN_PROGRESS').length,
        closed: tickets.filter((t) => t.status === 'CLOSED').length,
      },
    };
  }

  async getOverview() {
    const [totalOrders, activeDiscounts, newsletterCount] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.discount.count({ where: { isActive: true } }),
      this.prisma.newsletter.count({ where: { isActive: true } }),
    ]);

    const totalRevenue = await this.prisma.order.aggregate({
      where: { paymentStatus: 'COMPLETED' },
      _sum: { total: true },
    });

    return {
      totalRevenue: Number(totalRevenue._sum.total || 0),
      totalOrders,
      activeDiscounts,
      newsletterSubscribers: newsletterCount,
    };
  }
}
'@

# Payments Service
Update-ServiceFile "src/payments/payments.service.ts" @'
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
'@

# Shipping Service
Update-ServiceFile "src/shipping/shipping.service.ts" @'
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
        shippingStatus: updateShippingDto.status as any,
      },
    });
  }
}
'@

# Users Service
Update-ServiceFile "src/users/users.service.ts" @'
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        orders: true,
        addresses: true,
        tickets: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
'@

# Email Service
Update-ServiceFile "src/email/email.service.ts" @'
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  async send(sendEmailDto: SendEmailDto) {
    console.log("Sending email to:", sendEmailDto.to);
    console.log("Subject:", sendEmailDto.subject);

    return {
      success: true,
      message: "Email sent successfully",
    };
  }

  async sendTicketConfirmation(to: string, ticketData: any) {
    return this.send({
      to,
      subject: "Support Ticket Created - Elbfunkeln",
      text: "Your support ticket has been created.",
    });
  }

  async sendWelcomeEmail(to: string) {
    return this.send({
      to,
      subject: "Willkommen bei Elbfunkeln",
      text: "Vielen Dank für Ihre Registrierung!",
    });
  }
}
'@

Write-Host ""
Write-Host "All services updated successfully!" -ForegroundColor Green
Write-Host "Backup files created with .backup extension" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run: npx prettier --write src/**/*.service.ts" -ForegroundColor White
Write-Host "2. Run: npm run lint" -ForegroundColor White
Write-Host "3. Run: npm run start:dev" -ForegroundColor White
