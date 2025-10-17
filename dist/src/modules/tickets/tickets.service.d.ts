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
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            isVerified: boolean;
            isBanned: boolean;
            displayName: string | null;
            lastLogin: Date | null;
            status: import("@prisma/client").$Enums.UserStatus;
            twoFactorEnabled: boolean;
        };
        messages: {
            id: string;
            createdAt: Date;
            content: string;
            ticketId: string;
            isStaff: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TicketStatus;
        userId: string;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    }>;
    findAll(status?: string): Promise<({
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            isVerified: boolean;
            isBanned: boolean;
            displayName: string | null;
            lastLogin: Date | null;
            status: import("@prisma/client").$Enums.UserStatus;
            twoFactorEnabled: boolean;
        };
        messages: {
            id: string;
            createdAt: Date;
            content: string;
            ticketId: string;
            isStaff: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TicketStatus;
        userId: string;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            isVerified: boolean;
            isBanned: boolean;
            displayName: string | null;
            lastLogin: Date | null;
            status: import("@prisma/client").$Enums.UserStatus;
            twoFactorEnabled: boolean;
        };
        messages: {
            id: string;
            createdAt: Date;
            content: string;
            ticketId: string;
            isStaff: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TicketStatus;
        userId: string;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    }>;
    update(id: string, updateTicketDto: UpdateTicketDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TicketStatus;
        userId: string;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TicketStatus;
        userId: string;
        subject: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        assignedTo: string | null;
    }>;
    addMessage(ticketId: string, createMessageDto: CreateMessageDto): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        ticketId: string;
        isStaff: boolean;
    }>;
    getMessages(ticketId: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        ticketId: string;
        isStaff: boolean;
    }[]>;
}
