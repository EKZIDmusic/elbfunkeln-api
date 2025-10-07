import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/send-email.dto';
export declare class EmailService {
    private configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    send(sendEmailDto: SendEmailDto): Promise<{
        success: boolean;
        message: string;
        messageId: any;
    }>;
    sendTicketConfirmation(to: string, ticketData: {
        id: string;
        subject: string;
        priority: string;
    }): Promise<{
        success: boolean;
        message: string;
        messageId: any;
    }>;
    sendWelcomeEmail(to: string): Promise<{
        success: boolean;
        message: string;
        messageId: any;
    }>;
    sendOrderConfirmation(to: string, orderData: {
        id: string;
        total: number;
        items: any[];
    }): Promise<{
        success: boolean;
        message: string;
        messageId: any;
    }>;
    sendPasswordResetEmail(to: string, resetToken: string): Promise<{
        success: boolean;
        message: string;
        messageId: any;
    }>;
}
