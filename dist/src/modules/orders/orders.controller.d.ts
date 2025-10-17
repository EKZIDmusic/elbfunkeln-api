import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from '@prisma/client';
import type { UserPayload } from '../../core/auth/interfaces/user-payload.interface';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    create(user: UserPayload, createOrderDto: CreateOrderDto): Promise<{
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
        address: {
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
        };
        items: ({
            product: {
                id: string;
                sku: string;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                stock: number;
                isActive: boolean;
                isFeatured: boolean;
                categoryId: string;
                createdAt: Date;
                updatedAt: Date;
                giftboxavailable: boolean;
                deletedAt: Date | null;
                isDeleted: boolean;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            orderId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
        userId: string;
        orderNumber: string;
        addressId: string;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        shippingStatus: import("@prisma/client").$Enums.ShippingStatus;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        total: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        trackingNumber: string | null;
        stripePaymentId: string | null;
        discountCode: string | null;
    }>;
    getUserOrders(user: UserPayload): Promise<({
        address: {
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
        };
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    data: Uint8Array | null;
                    url: string | null;
                    mimeType: string | null;
                    alt: string | null;
                    isPrimary: boolean;
                    productId: string;
                }[];
            } & {
                id: string;
                sku: string;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                stock: number;
                isActive: boolean;
                isFeatured: boolean;
                categoryId: string;
                createdAt: Date;
                updatedAt: Date;
                giftboxavailable: boolean;
                deletedAt: Date | null;
                isDeleted: boolean;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            orderId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
        userId: string;
        orderNumber: string;
        addressId: string;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        shippingStatus: import("@prisma/client").$Enums.ShippingStatus;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        total: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        trackingNumber: string | null;
        stripePaymentId: string | null;
        discountCode: string | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        address: {
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
        };
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    data: Uint8Array | null;
                    url: string | null;
                    mimeType: string | null;
                    alt: string | null;
                    isPrimary: boolean;
                    productId: string;
                }[];
            } & {
                id: string;
                sku: string;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                stock: number;
                isActive: boolean;
                isFeatured: boolean;
                categoryId: string;
                createdAt: Date;
                updatedAt: Date;
                giftboxavailable: boolean;
                deletedAt: Date | null;
                isDeleted: boolean;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            orderId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
        userId: string;
        orderNumber: string;
        addressId: string;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        shippingStatus: import("@prisma/client").$Enums.ShippingStatus;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        total: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        trackingNumber: string | null;
        stripePaymentId: string | null;
        discountCode: string | null;
    }>;
    cancel(id: string, user: UserPayload): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
        userId: string;
        orderNumber: string;
        addressId: string;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        shippingStatus: import("@prisma/client").$Enums.ShippingStatus;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        total: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        trackingNumber: string | null;
        stripePaymentId: string | null;
        discountCode: string | null;
    }>;
    findAll(page?: string, limit?: string, status?: OrderStatus): Promise<{
        data: ({
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            };
            items: ({
                product: {
                    id: string;
                    sku: string;
                    name: string;
                    description: string;
                    price: import("@prisma/client/runtime/library").Decimal;
                    discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                    stock: number;
                    isActive: boolean;
                    isFeatured: boolean;
                    categoryId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    giftboxavailable: boolean;
                    deletedAt: Date | null;
                    isDeleted: boolean;
                };
            } & {
                id: string;
                price: import("@prisma/client/runtime/library").Decimal;
                productId: string;
                orderId: string;
                quantity: number;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            discount: import("@prisma/client/runtime/library").Decimal;
            status: import("@prisma/client").$Enums.OrderStatus;
            userId: string;
            orderNumber: string;
            addressId: string;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
            shippingStatus: import("@prisma/client").$Enums.ShippingStatus;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            shipping: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            notes: string | null;
            trackingNumber: string | null;
            stripePaymentId: string | null;
            discountCode: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<{
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
        items: ({
            product: {
                id: string;
                sku: string;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                stock: number;
                isActive: boolean;
                isFeatured: boolean;
                categoryId: string;
                createdAt: Date;
                updatedAt: Date;
                giftboxavailable: boolean;
                deletedAt: Date | null;
                isDeleted: boolean;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            orderId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
        userId: string;
        orderNumber: string;
        addressId: string;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        shippingStatus: import("@prisma/client").$Enums.ShippingStatus;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        total: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        trackingNumber: string | null;
        stripePaymentId: string | null;
        discountCode: string | null;
    }>;
}
