"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = EmailService_1 = class EmailService {
    configService;
    logger = new common_1.Logger(EmailService_1.name);
    transporter;
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST'),
            port: this.configService.get('SMTP_PORT'),
            secure: false,
            auth: {
                user: this.configService.get('SMTP_USER'),
                pass: this.configService.get('SMTP_PASSWORD'),
            },
        });
    }
    async send(sendEmailDto) {
        try {
            const info = await this.transporter.sendMail({
                from: this.configService.get('EMAIL_FROM'),
                to: sendEmailDto.to,
                subject: sendEmailDto.subject,
                text: sendEmailDto.text,
                html: sendEmailDto.html,
            });
            this.logger.log(`Email sent to ${sendEmailDto.to}: ${info.messageId}`);
            return {
                success: true,
                message: 'Email sent successfully',
                messageId: info.messageId,
            };
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${sendEmailDto.to}:`, error);
            throw error;
        }
    }
    async sendTicketConfirmation(to, ticketData) {
        const html = `
      <h2>Support Ticket erstellt</h2>
      <p>Ihr Support-Ticket wurde erfolgreich erstellt.</p>
      <h3>Ticket-Details:</h3>
      <ul>
        <li><strong>Ticket-ID:</strong> ${ticketData.id}</li>
        <li><strong>Betreff:</strong> ${ticketData.subject}</li>
        <li><strong>Priorität:</strong> ${ticketData.priority}</li>
      </ul>
      <p>Wir werden uns schnellstmöglich bei Ihnen melden.</p>
      <p>Mit freundlichen Grüßen,<br>Ihr Elbfunkeln Team</p>
    `;
        return this.send({
            to,
            subject: 'Support Ticket erstellt - Elbfunkeln',
            text: `Ihr Support-Ticket wurde erstellt. Ticket-ID: ${ticketData.id}`,
            html,
        });
    }
    async sendWelcomeEmail(to) {
        const html = `
      <h2>Willkommen bei Elbfunkeln!</h2>
      <p>Vielen Dank für Ihre Registrierung.</p>
      <p>Wir freuen uns, Sie in unserem Shop begrüßen zu dürfen.</p>
      <p>Mit freundlichen Grüßen,<br>Ihr Elbfunkeln Team</p>
    `;
        return this.send({
            to,
            subject: 'Willkommen bei Elbfunkeln',
            text: 'Vielen Dank für Ihre Registrierung!',
            html,
        });
    }
    async sendOrderConfirmation(to, orderData) {
        const itemsList = orderData.items
            .map(item => `<li>${item.product.name} - ${item.quantity}x ${item.price}€</li>`)
            .join('');
        const html = `
      <h2>Bestellbestätigung</h2>
      <p>Vielen Dank für Ihre Bestellung!</p>
      <h3>Bestelldetails:</h3>
      <p><strong>Bestell-ID:</strong> ${orderData.id}</p>
      <h4>Artikel:</h4>
      <ul>${itemsList}</ul>
      <p><strong>Gesamtbetrag:</strong> ${orderData.total}€</p>
      <p>Mit freundlichen Grüßen,<br>Ihr Elbfunkeln Team</p>
    `;
        return this.send({
            to,
            subject: `Bestellbestätigung - ${orderData.id}`,
            text: `Vielen Dank für Ihre Bestellung. Bestell-ID: ${orderData.id}`,
            html,
        });
    }
    async sendPasswordResetEmail(to, resetToken) {
        const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`;
        const html = `
      <h2>Passwort zurücksetzen</h2>
      <p>Sie haben eine Anfrage zum Zurücksetzen Ihres Passworts gestellt.</p>
      <p>Klicken Sie auf den folgenden Link, um Ihr Passwort zurückzusetzen:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Dieser Link ist 1 Stunde gültig.</p>
      <p>Falls Sie diese Anfrage nicht gestellt haben, können Sie diese E-Mail ignorieren.</p>
      <p>Mit freundlichen Grüßen,<br>Ihr Elbfunkeln Team</p>
    `;
        return this.send({
            to,
            subject: 'Passwort zurücksetzen - Elbfunkeln',
            text: `Passwort zurücksetzen: ${resetUrl}`,
            html,
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map