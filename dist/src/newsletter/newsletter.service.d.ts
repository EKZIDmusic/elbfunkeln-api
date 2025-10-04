import { PrismaService } from '../prisma/prisma.service';
import { SubscribeDto } from './dto/subscribe.dto';
export declare class NewsletterService {
    private prisma;
    constructor(prisma: PrismaService);
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
}
