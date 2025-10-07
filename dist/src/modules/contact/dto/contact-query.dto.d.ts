import { ContactStatus } from '@prisma/client';
export declare class ContactQueryDto {
    page?: number;
    limit?: number;
    status?: ContactStatus;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
