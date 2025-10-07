import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateMessageDto } from './dto/create-message.dto';
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
            displayName: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            status: import("@prisma/client").$Enums.UserStatus;
            isVerified: boolean;
            isBanned: boolean;
            twoFactorEnabled: boolean;
            lastLogin: Date | null;
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
        status: import("@prisma/client").$Enums.TicketStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
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
            displayName: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            status: import("@prisma/client").$Enums.UserStatus;
            isVerified: boolean;
            isBanned: boolean;
            twoFactorEnabled: boolean;
            lastLogin: Date | null;
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
        status: import("@prisma/client").$Enums.TicketStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
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
            displayName: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            status: import("@prisma/client").$Enums.UserStatus;
            isVerified: boolean;
            isBanned: boolean;
            twoFactorEnabled: boolean;
            lastLogin: Date | null;
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
        status: import("@prisma/client").$Enums.TicketStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    }>;
    update(id: string, updateTicketDto: UpdateTicketDto): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.TicketStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.TicketStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    }>;
    addMessage(ticketId: string, createMessageDto: CreateMessageDto): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        isStaff: boolean;
        ticketId: string;
    }>;
    getMessages(ticketId: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        isStaff: boolean;
        ticketId: string;
    }[]>;
}
