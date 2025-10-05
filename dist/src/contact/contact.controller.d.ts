import { ContactService } from './contact.service';
import { CreateContactInquiryDto } from './dto/create-contact-inquiry.dto';
import { UpdateContactInquiryDto } from './dto/update-contact-inquiry.dto';
import { ContactQueryDto } from './dto/contact-query.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    createInquiry(createContactInquiryDto: CreateContactInquiryDto): Promise<{
        id: string;
        email: string;
        status: import("@prisma/client").$Enums.ContactStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        subject: string;
        message: string;
    }>;
    getInquiries(query: ContactQueryDto): Promise<{
        data: {
            id: string;
            email: string;
            status: import("@prisma/client").$Enums.ContactStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            subject: string;
            message: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getInquiryById(id: string): Promise<{
        id: string;
        email: string;
        status: import("@prisma/client").$Enums.ContactStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        subject: string;
        message: string;
    }>;
    updateInquiry(id: string, updateContactInquiryDto: UpdateContactInquiryDto): Promise<{
        id: string;
        email: string;
        status: import("@prisma/client").$Enums.ContactStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        subject: string;
        message: string;
    }>;
    deleteInquiry(id: string): Promise<{
        message: string;
    }>;
}
