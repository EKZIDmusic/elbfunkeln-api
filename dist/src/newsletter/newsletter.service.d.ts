import { PrismaService } from '../prisma/prisma.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { SendNewsletterDto } from './dto/send-newsletter.dto';
import { EmailService } from '../email/email.service';
export declare class NewsletterService {
    private prisma;
    private emailService;
    private readonly logger;
    constructor(prisma: PrismaService, emailService: EmailService);
    subscribe(subscribeDto: SubscribeDto): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        isActive: boolean;
        preferences: import("@prisma/client/runtime/library").JsonValue | null;
    } | {
        message: string;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        isActive: boolean;
        preferences: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    unsubscribe(email: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        isActive: boolean;
        preferences: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        isActive: boolean;
        preferences: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    sendNewsletter(sendNewsletterDto: SendNewsletterDto): Promise<{
        total: number;
        sent: number;
        failed: number;
        errors: string[];
    }>;
}
