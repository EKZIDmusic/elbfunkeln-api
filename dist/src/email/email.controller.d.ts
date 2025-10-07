import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    send(sendEmailDto: SendEmailDto): Promise<{
        success: boolean;
        message: string;
        messageId: any;
    }>;
}
