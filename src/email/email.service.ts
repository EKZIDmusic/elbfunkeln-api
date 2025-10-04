import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  send(sendEmailDto: SendEmailDto) {
    console.log('Sending email to:', sendEmailDto.to);
    console.log('Subject:', sendEmailDto.subject);

    return {
      success: true,
      message: 'Email sent successfully',
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendTicketConfirmation(to: string, ticketData: unknown) {
    return this.send({
      to,
      subject: 'Support Ticket Created - Elbfunkeln',
      text: 'Your support ticket has been created.',
    });
  }

  sendWelcomeEmail(to: string) {
    return this.send({
      to,
      subject: 'Willkommen bei Elbfunkeln',
      text: 'Vielen Dank für Ihre Registrierung!',
    });
  }
}
