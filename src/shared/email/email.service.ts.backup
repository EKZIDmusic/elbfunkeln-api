import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  send(sendEmailDto: SendEmailDto) {
    // Implementierung für E-Mail-Versand (z.B. mit nodemailer)
    console.log('Sending email to:', sendEmailDto.to);
    console.log('Subject:', sendEmailDto.subject);

    return {
      success: true,
      message: 'Email sent successfully',
    };
  }

  sendTicketConfirmation(to: string) {
    return this.send({
      to,
      subject: 'Ticket Bestätigung - Elbfunkeln',
      text: `Ihre Tickets wurden erfolgreich gebucht.`,
    });
  }

  sendWelcomeEmail(to: string) {
    return this.send({
      to,
      subject: 'Willkommen bei Elbfunkeln',
      text: `Vielen Dank für Ihre Registrierung!`,
    });
  }
}
