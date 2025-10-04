#!/bin/bash

echo "🔧 Creating all missing modules for Elbfunkeln API..."

# Navigate to src directory
cd "$(dirname "$0")/src" || exit 1

# =============================================================================
# DISCOUNTS MODULE
# =============================================================================
echo "📦 Creating Discounts Module..."
mkdir -p discounts/dto discounts/entities

cat > discounts/discounts.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { Discount } from './entities/discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discount])],
  controllers: [DiscountsController],
  providers: [DiscountsService],
  exports: [DiscountsService],
})
export class DiscountsModule {}
EOF

cat > discounts/discounts.controller.ts << 'EOF'
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountsService.create(createDiscountDto);
  }

  @Get()
  findAll() {
    return this.discountsService.findAll();
  }

  @Get(':code')
  findByCode(@Param('code') code: string) {
    return this.discountsService.findByCode(code);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    return this.discountsService.update(+id, updateDiscountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountsService.remove(+id);
  }
}
EOF

cat > discounts/discounts.service.ts << 'EOF'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './entities/discount.entity';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountsRepository: Repository<Discount>,
  ) {}

  create(createDiscountDto: CreateDiscountDto) {
    const discount = this.discountsRepository.create(createDiscountDto);
    return this.discountsRepository.save(discount);
  }

  findAll() {
    return this.discountsRepository.find({ where: { isActive: true } });
  }

  findByCode(code: string) {
    return this.discountsRepository.findOne({ where: { code, isActive: true } });
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return this.discountsRepository.update(id, updateDiscountDto);
  }

  remove(id: number) {
    return this.discountsRepository.delete(id);
  }
}
EOF

cat > discounts/entities/discount.entity.ts << 'EOF'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column('decimal', { precision: 5, scale: 2 })
  percentage: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({ default: 0 })
  usageLimit: number;

  @Column({ default: 0 })
  usageCount: number;

  @CreateDateColumn()
  createdAt: Date;
}
EOF

cat > discounts/dto/create-discount.dto.ts << 'EOF'
export class CreateDiscountDto {
  code: string;
  percentage: number;
  expiresAt?: Date;
  usageLimit?: number;
}
EOF

cat > discounts/dto/update-discount.dto.ts << 'EOF'
export class UpdateDiscountDto {
  percentage?: number;
  isActive?: boolean;
  usageLimit?: number;
}
EOF

# =============================================================================
# TICKETS MODULE
# =============================================================================
echo "🎫 Creating Tickets Module..."
mkdir -p tickets/dto tickets/entities

cat > tickets/tickets.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
EOF

cat > tickets/tickets.controller.ts << 'EOF'
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.ticketsService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}
EOF

cat > tickets/tickets.service.ts << 'EOF'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) {}

  create(createTicketDto: CreateTicketDto) {
    const ticket = this.ticketsRepository.create(createTicketDto);
    return this.ticketsRepository.save(ticket);
  }

  findAll(status?: string) {
    if (status) {
      return this.ticketsRepository.find({ where: { status } });
    }
    return this.ticketsRepository.find();
  }

  findOne(id: number) {
    return this.ticketsRepository.findOne({ where: { id } });
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.ticketsRepository.update(id, updateTicketDto);
  }

  remove(id: number) {
    return this.ticketsRepository.delete(id);
  }
}
EOF

cat > tickets/entities/ticket.entity.ts << 'EOF'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticketNumber: string;

  @Column()
  userId: number;

  @Column()
  eventDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 'valid' })
  status: string;

  @Column({ default: false })
  isUsed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
EOF

cat > tickets/dto/create-ticket.dto.ts << 'EOF'
export class CreateTicketDto {
  userId: number;
  eventDate: Date;
  price: number;
}
EOF

cat > tickets/dto/update-ticket.dto.ts << 'EOF'
export class UpdateTicketDto {
  status?: string;
  isUsed?: boolean;
}
EOF

# =============================================================================
# NEWSLETTER MODULE
# =============================================================================
echo "📧 Creating Newsletter Module..."
mkdir -p newsletter/dto newsletter/entities

cat > newsletter/newsletter.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { NewsletterSubscriber } from './entities/newsletter-subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsletterSubscriber])],
  controllers: [NewsletterController],
  providers: [NewsletterService],
  exports: [NewsletterService],
})
export class NewsletterModule {}
EOF

cat > newsletter/newsletter.controller.ts << 'EOF'
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/subscribe.dto';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  subscribe(@Body() subscribeDto: SubscribeDto) {
    return this.newsletterService.subscribe(subscribeDto);
  }

  @Get()
  findAll() {
    return this.newsletterService.findAll();
  }

  @Delete(':email')
  unsubscribe(@Param('email') email: string) {
    return this.newsletterService.unsubscribe(email);
  }
}
EOF

cat > newsletter/newsletter.service.ts << 'EOF'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscribeDto } from './dto/subscribe.dto';
import { NewsletterSubscriber } from './entities/newsletter-subscriber.entity';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(NewsletterSubscriber)
    private subscribersRepository: Repository<NewsletterSubscriber>,
  ) {}

  async subscribe(subscribeDto: SubscribeDto) {
    const existing = await this.subscribersRepository.findOne({
      where: { email: subscribeDto.email },
    });

    if (existing) {
      return { message: 'Already subscribed' };
    }

    const subscriber = this.subscribersRepository.create(subscribeDto);
    await this.subscribersRepository.save(subscriber);
    return { message: 'Successfully subscribed' };
  }

  findAll() {
    return this.subscribersRepository.find({ where: { isActive: true } });
  }

  async unsubscribe(email: string) {
    await this.subscribersRepository.update({ email }, { isActive: false });
    return { message: 'Successfully unsubscribed' };
  }
}
EOF

cat > newsletter/entities/newsletter-subscriber.entity.ts << 'EOF'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('newsletter_subscribers')
export class NewsletterSubscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  subscribedAt: Date;
}
EOF

cat > newsletter/dto/subscribe.dto.ts << 'EOF'
export class SubscribeDto {
  email: string;
}
EOF

# =============================================================================
# ANALYTICS MODULE
# =============================================================================
echo "📊 Creating Analytics Module..."
mkdir -p analytics/dto

cat > analytics/analytics.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
EOF

cat > analytics/analytics.controller.ts << 'EOF'
import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('sales')
  getSalesData(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.analyticsService.getSalesData(startDate, endDate);
  }

  @Get('tickets')
  getTicketData(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.analyticsService.getTicketData(startDate, endDate);
  }

  @Get('overview')
  getOverview() {
    return this.analyticsService.getOverview();
  }
}
EOF

cat > analytics/analytics.service.ts << 'EOF'
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  getSalesData(startDate: string, endDate: string) {
    // Implementierung für Verkaufsdaten
    return {
      totalSales: 0,
      period: { startDate, endDate },
      data: [],
    };
  }

  getTicketData(startDate: string, endDate: string) {
    // Implementierung für Ticket-Daten
    return {
      totalTickets: 0,
      period: { startDate, endDate },
      data: [],
    };
  }

  getOverview() {
    // Implementierung für Übersicht
    return {
      totalRevenue: 0,
      totalTickets: 0,
      activeDiscounts: 0,
      newsletterSubscribers: 0,
    };
  }
}
EOF

# =============================================================================
# PAYMENTS MODULE
# =============================================================================
echo "💳 Creating Payments Module..."
mkdir -p payments/dto payments/entities

cat > payments/payments.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
EOF

cat > payments/payments.controller.ts << 'EOF'
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }
}
EOF

cat > payments/payments.service.ts << 'EOF'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentsRepository.create({
      ...createPaymentDto,
      status: 'pending',
    });
    return this.paymentsRepository.save(payment);
  }

  findAll() {
    return this.paymentsRepository.find();
  }

  findOne(id: number) {
    return this.paymentsRepository.findOne({ where: { id } });
  }
}
EOF

cat > payments/entities/payment.entity.ts << 'EOF'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  method: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  transactionId: string;

  @CreateDateColumn()
  createdAt: Date;
}
EOF

cat > payments/dto/create-payment.dto.ts << 'EOF'
export class CreatePaymentDto {
  orderId: number;
  amount: number;
  method: string;
}
EOF

# =============================================================================
# SHIPPING MODULE
# =============================================================================
echo "📦 Creating Shipping Module..."
mkdir -p shipping/dto shipping/entities

cat > shipping/shipping.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { Shipping } from './entities/shipping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipping])],
  controllers: [ShippingController],
  providers: [ShippingService],
  exports: [ShippingService],
})
export class ShippingModule {}
EOF

cat > shipping/shipping.controller.ts << 'EOF'
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  create(@Body() createShippingDto: CreateShippingDto) {
    return this.shippingService.create(createShippingDto);
  }

  @Get()
  findAll() {
    return this.shippingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShippingDto: UpdateShippingDto) {
    return this.shippingService.update(+id, updateShippingDto);
  }
}
EOF

cat > shipping/shipping.service.ts << 'EOF'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { Shipping } from './entities/shipping.entity';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipping)
    private shippingRepository: Repository<Shipping>,
  ) {}

  create(createShippingDto: CreateShippingDto) {
    const shipping = this.shippingRepository.create(createShippingDto);
    return this.shippingRepository.save(shipping);
  }

  findAll() {
    return this.shippingRepository.find();
  }

  findOne(id: number) {
    return this.shippingRepository.findOne({ where: { id } });
  }

  update(id: number, updateShippingDto: UpdateShippingDto) {
    return this.shippingRepository.update(id, updateShippingDto);
  }
}
EOF

cat > shipping/entities/shipping.entity.ts << 'EOF'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('shipping')
export class Shipping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  trackingNumber: string;

  @Column()
  carrier: string;

  @Column()
  status: string;

  @Column('text')
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
EOF

cat > shipping/dto/create-shipping.dto.ts << 'EOF'
export class CreateShippingDto {
  orderId: number;
  address: string;
  carrier: string;
}
EOF

cat > shipping/dto/update-shipping.dto.ts << 'EOF'
export class UpdateShippingDto {
  trackingNumber?: string;
  status?: string;
}
EOF

# =============================================================================
# EMAIL MODULE
# =============================================================================
echo "✉️ Creating Email Module..."
mkdir -p email/dto

cat > email/email.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
EOF

cat > email/email.controller.ts << 'EOF'
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  send(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.send(sendEmailDto);
  }
}
EOF

cat > email/email.service.ts << 'EOF'
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  async send(sendEmailDto: SendEmailDto) {
    // Implementierung für E-Mail-Versand (z.B. mit nodemailer)
    console.log('Sending email to:', sendEmailDto.to);
    console.log('Subject:', sendEmailDto.subject);

    return {
      success: true,
      message: 'Email sent successfully',
    };
  }

  async sendTicketConfirmation(to: string, ticketData: any) {
    return this.send({
      to,
      subject: 'Ticket Bestätigung - Elbfunkeln',
      text: `Ihre Tickets wurden erfolgreich gebucht.`,
    });
  }

  async sendWelcomeEmail(to: string) {
    return this.send({
      to,
      subject: 'Willkommen bei Elbfunkeln',
      text: `Vielen Dank für Ihre Registrierung!`,
    });
  }
}
EOF

cat > email/dto/send-email.dto.ts << 'EOF'
export class SendEmailDto {
  to: string;
  subject: string;
  text: string;
  html?: string;
}
EOF

echo ""
echo "✅ All modules created successfully!"
echo ""
echo "📋 Created modules:"
echo "   - Discounts Module"
echo "   - Tickets Module"
echo "   - Newsletter Module"
echo "   - Analytics Module"
echo "   - Payments Module"
echo "   - Shipping Module"
echo "   - Email Module"
echo ""
echo "🔄 Next steps:"
echo "   1. Run: npm install"
echo "   2. Update your database configuration"
echo "   3. Run: npm run start:dev"
echo ""
