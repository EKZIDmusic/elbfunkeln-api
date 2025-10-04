import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  async send(sendEmailDto: SendEmailDto) {
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
      subject: 'Support Ticket Created - Elbfunkeln',
      text: 'Your support ticket has been created.',
    });
  }

  async sendWelcomeEmail(to: string) {
    return this.send({
      to,
      subject: 'Willkommen bei Elbfunkeln',
      text: 'Vielen Dank für Ihre Registrierung!',
    });
  }
}
