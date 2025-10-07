import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-09-30.clover',
    });
  }

  async create(createPaymentDto: CreatePaymentDto) {
    // Get the order to validate and get the amount
    const order = await this.prisma.order.findUnique({
      where: { id: createPaymentDto.orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    // Calculate total amount from order items
    const totalAmount = order.items.reduce((sum, item) => {
      return sum + item.quantity * Number(item.price);
    }, 0);

    // Create Stripe Payment Intent
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'eur',
      metadata: {
        orderId: createPaymentDto.orderId,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Update order with payment intent ID
    const updatedOrder = await this.prisma.order.update({
      where: { id: createPaymentDto.orderId },
      data: {
        stripePaymentId: paymentIntent.id,
        paymentStatus: 'PENDING',
      },
    });

    return {
      order: updatedOrder,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
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

  async handleWebhook(rawBody: Buffer, signature: string) {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      throw new BadRequestException(`Webhook signature verification failed: ${errorMessage}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.handlePaymentSuccess(paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        await this.handlePaymentFailed(failedPayment);
        break;

      case 'charge.refunded':
        const refund = event.data.object as Stripe.Charge;
        await this.handleRefund(refund);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  }

  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    const orderId = paymentIntent.metadata.orderId;

    if (!orderId) {
      console.error('No orderId found in payment intent metadata');
      return;
    }

    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'COMPLETED',
        stripePaymentId: paymentIntent.id,
      },
    });

    console.log(`Payment succeeded for order ${orderId}`);
  }

  private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    const orderId = paymentIntent.metadata.orderId;

    if (!orderId) {
      console.error('No orderId found in payment intent metadata');
      return;
    }

    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'FAILED',
      },
    });

    console.log(`Payment failed for order ${orderId}`);
  }

  private async handleRefund(charge: Stripe.Charge) {
    const paymentIntentId = charge.payment_intent as string;

    if (!paymentIntentId) {
      console.error('No payment intent found in charge');
      return;
    }

    const order = await this.prisma.order.findFirst({
      where: { stripePaymentId: paymentIntentId },
    });

    if (!order) {
      console.error(`No order found for payment intent ${paymentIntentId}`);
      return;
    }

    await this.prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: 'REFUNDED',
      },
    });

    console.log(`Refund processed for order ${order.id}`);
  }
}
