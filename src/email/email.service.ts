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
