import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/subscribe.dto';
export declare class NewsletterController {
    private readonly newsletterService;
    constructor(newsletterService: NewsletterService);
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
}
