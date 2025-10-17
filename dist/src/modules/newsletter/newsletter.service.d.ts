import { PrismaService } from '../../core/database/prisma/prisma.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { SendNewsletterDto } from './dto/send-newsletter.dto';
import { EmailService } from '../../shared/email/email.service';
export declare class NewsletterService {
    private prisma;
    private emailService;
    private readonly logger;
    constructor(prisma: PrismaService, emailService: EmailService);
    subscribe(subscribeDto: SubscribeDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        email: string;
        preferences: string | null;
    } | {
        message: string;
    }>;
    findAll(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        email: string;
        preferences: string | null;
    }[]>;
    unsubscribe(email: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        email: string;
        preferences: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        email: string;
        preferences: string | null;
    }>;
    sendNewsletter(sendNewsletterDto: SendNewsletterDto): Promise<{
        total: number;
        sent: number;
        failed: number;
        errors: string[];
    }>;
}
