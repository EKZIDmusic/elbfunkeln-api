import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/subscribe.dto';
export declare class NewsletterController {
    private readonly newsletterService;
    constructor(newsletterService: NewsletterService);
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
}
