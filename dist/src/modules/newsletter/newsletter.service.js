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
var NewsletterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma/prisma.service");
const email_service_1 = require("../../shared/email/email.service");
let NewsletterService = NewsletterService_1 = class NewsletterService {
    prisma;
    emailService;
    logger = new common_1.Logger(NewsletterService_1.name);
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async subscribe(subscribeDto) {
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
    async unsubscribe(email) {
        return this.prisma.newsletter.update({
            where: { email },
            data: { isActive: false },
        });
    }
    async remove(id) {
        return this.prisma.newsletter.delete({
            where: { id },
        });
    }
    async sendNewsletter(sendNewsletterDto) {
        const subscribers = await this.prisma.newsletter.findMany({
            where: { isActive: true },
        });
        this.logger.log(`Sending newsletter to ${subscribers.length} subscribers`);
        const results = {
            total: subscribers.length,
            sent: 0,
            failed: 0,
            errors: [],
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
            }
            catch (error) {
                results.failed++;
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                results.errors.push(`Failed to send to ${subscriber.email}: ${errorMessage}`);
                this.logger.error(`Failed to send newsletter to ${subscriber.email}`, error);
            }
        }
        this.logger.log(`Newsletter sent: ${results.sent} successful, ${results.failed} failed`);
        return results;
    }
};
exports.NewsletterService = NewsletterService;
exports.NewsletterService = NewsletterService = NewsletterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], NewsletterService);
//# sourceMappingURL=newsletter.service.js.map