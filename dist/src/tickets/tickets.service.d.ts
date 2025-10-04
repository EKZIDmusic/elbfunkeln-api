import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
export declare class TicketsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTicketDto: CreateTicketDto): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            isVerified: boolean;
            isBanned: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        messages: {
            id: string;
            createdAt: Date;
            content: string;
            isStaff: boolean;
            ticketId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.TicketStatus;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    }>;
    findAll(status?: string): Promise<({
        user: {
            id: string;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            isVerified: boolean;
            isBanned: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        messages: {
            id: string;
            createdAt: Date;
            content: string;
            isStaff: boolean;
            ticketId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.TicketStatus;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            isVerified: boolean;
            isBanned: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        messages: {
            id: string;
            createdAt: Date;
            content: string;
            isStaff: boolean;
            ticketId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.TicketStatus;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    }>;
    update(id: string, updateTicketDto: UpdateTicketDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.TicketStatus;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.TicketStatus;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    }>;
}
