import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import type { UserPayload } from '../common/interfaces/user-payload.interface';
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    create(user: UserPayload, createAddressDto: CreateAddressDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        userId: string;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
    }>;
    findAll(user: UserPayload): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        userId: string;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
    }[]>;
    findOne(id: string, user: UserPayload): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        userId: string;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
    }>;
    update(id: string, user: UserPayload, updateAddressDto: UpdateAddressDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        userId: string;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
    }>;
    remove(id: string, user: UserPayload): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        userId: string;
        street: string;
        city: string;
        state: string | null;
        zip: string;
        country: string;
        isDefault: boolean;
    }>;
}
