import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createAddressDto: CreateAddressDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
        userId: string;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
        userId: string;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
        userId: string;
    }>;
    update(id: string, userId: string, updateAddressDto: UpdateAddressDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
        userId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
        userId: string;
    }>;
}
