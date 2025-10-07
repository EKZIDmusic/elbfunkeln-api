import { TicketPriority } from '@prisma/client';
export declare class CreateTicketDto {
    userId: string;
    subject: string;
    priority?: TicketPriority;
}
