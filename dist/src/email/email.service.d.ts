import { SendEmailDto } from './dto/send-email.dto';
export declare class EmailService {
    send(sendEmailDto: SendEmailDto): Promise<{
        success: boolean;
        message: string;
    }>;
    sendTicketConfirmation(to: string, ticketData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    sendWelcomeEmail(to: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
