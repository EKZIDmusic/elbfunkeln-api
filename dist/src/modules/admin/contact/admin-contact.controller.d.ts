import { ContactService } from '../../contact/contact.service';
import { UpdateContactInquiryDto } from '../../contact/dto/update-contact-inquiry.dto';
import { ContactQueryDto } from '../../contact/dto/contact-query.dto';
export declare class AdminContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
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
