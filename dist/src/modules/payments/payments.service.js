"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../core/database/prisma/prisma.service");
const stripe_1 = __importDefault(require("stripe"));
let PaymentsService = class PaymentsService {
    prisma;
    configService;
    stripe;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        const stripeSecretKey = this.configService.get('STRIPE_SECRET_KEY');
        if (!stripeSecretKey) {
            throw new Error('STRIPE_SECRET_KEY is not configured');
        }
        this.stripe = new stripe_1.default(stripeSecretKey, {
            apiVersion: '2025-09-30.clover',
        });
    }
    async create(createPaymentDto) {
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
            throw new common_1.BadRequestException('Order not found');
        }
        const totalAmount = order.items.reduce((sum, item) => {
            return sum + item.quantity * Number(item.price);
        }, 0);
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100),
            currency: 'eur',
            metadata: {
                orderId: createPaymentDto.orderId,
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });
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
    async findOne(id) {
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
    async handleWebhook(rawBody, signature) {
        const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
        if (!webhookSecret) {
            throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
        }
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            throw new common_1.BadRequestException(`Webhook signature verification failed: ${errorMessage}`);
        }
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                await this.handlePaymentSuccess(paymentIntent);
                break;
            case 'payment_intent.payment_failed':
                const failedPayment = event.data.object;
                await this.handlePaymentFailed(failedPayment);
                break;
            case 'charge.refunded':
                const refund = event.data.object;
                await this.handleRefund(refund);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        return { received: true };
    }
    async handlePaymentSuccess(paymentIntent) {
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
    async handlePaymentFailed(paymentIntent) {
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
    async handleRefund(charge) {
        const paymentIntentId = charge.payment_intent;
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
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map