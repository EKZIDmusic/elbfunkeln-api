"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
let EmailService = class EmailService {
    send(sendEmailDto) {
        console.log('Sending email to:', sendEmailDto.to);
        console.log('Subject:', sendEmailDto.subject);
        return {
            success: true,
            message: 'Email sent successfully',
        };
    }
    sendTicketConfirmation(to, ticketData) {
        return this.send({
            to,
            subject: 'Support Ticket Created - Elbfunkeln',
            text: 'Your support ticket has been created.',
        });
    }
    sendWelcomeEmail(to) {
        return this.send({
            to,
            subject: 'Willkommen bei Elbfunkeln',
            text: 'Vielen Dank für Ihre Registrierung!',
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
//# sourceMappingURL=email.service.js.map