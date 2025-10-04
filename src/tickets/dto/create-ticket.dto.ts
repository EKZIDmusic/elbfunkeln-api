import { TicketPriority } from '@prisma/client';

export class CreateTicketDto {
  userId!: string; // UUID
  subject!: string;
  priority?: TicketPriority;
}
