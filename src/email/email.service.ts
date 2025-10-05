import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/send-email.dto';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async send(sendEmailDto: SendEmailDto) {
    try {
      const info = await this.transporter.sendMail({
        from: this.configService.get<string>('EMAIL_FROM'),
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
    } catch (error) {
      this.logger.error(`Failed to send email to ${sendEmailDto.to}:`, error);
      throw error;
    }
  }

  async sendTicketConfirmation(to: string, ticketData: { id: string; subject: string; priority: string }) {
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

  async sendWelcomeEmail(to: string) {
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

  async sendOrderConfirmation(to: string, orderData: { id: string; total: number; items: any[] }) {
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

  async sendPasswordResetEmail(to: string, resetToken: string) {
    const resetUrl = `${this.configService.get<string>('FRONTEND_URL')}/reset-password?token=${resetToken}`;

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
}
