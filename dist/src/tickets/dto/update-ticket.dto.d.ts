import { TicketStatus, TicketPriority } from '@prisma/client';
export declare class UpdateTicketDto {
    subject?: string;
    status?: TicketStatus;
    priority?: TicketPriority;
    assignedTo?: string;
}
