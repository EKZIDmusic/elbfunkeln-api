import { TicketStatus, TicketPriority } from '@prisma/client';

export class UpdateTicketDto {
  subject?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedTo?: string; // UUID of assigned user
}
