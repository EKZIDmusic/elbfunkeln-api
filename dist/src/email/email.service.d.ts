import { SendEmailDto } from './dto/send-email.dto';
export declare class EmailService {
    send(sendEmailDto: SendEmailDto): {
        success: boolean;
        message: string;
    };
    sendTicketConfirmation(to: string, ticketData: unknown): {
        success: boolean;
        message: string;
    };
    sendWelcomeEmail(to: string): {
        success: boolean;
        message: string;
    };
}
