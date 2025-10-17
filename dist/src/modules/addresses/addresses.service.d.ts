import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createAddressDto: CreateAddressDto): Promise<{
        id: string;
        createdAt: Date;
        firstName: string;
        lastName: string;
        userId: string;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        firstName: string;
        lastName: string;
        userId: string;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        firstName: string;
        lastName: string;
        userId: string;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
    }>;
    update(id: string, userId: string, updateAddressDto: UpdateAddressDto): Promise<{
        id: string;
        createdAt: Date;
        firstName: string;
        lastName: string;
        userId: string;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        firstName: string;
        lastName: string;
        userId: string;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
    }>;
}
