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
        address: {
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
        };
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                sku: string;
                price: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                stock: number;
                isActive: boolean;
                isFeatured: boolean;
                giftboxavailable: boolean;
                categoryId: string;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        discount: import("@prisma/client/runtime/library").Decimal;
        orderNumber: string;
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
        addressId: string;
    }>;
    getUserOrders(user: UserPayload): Promise<({
        address: {
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
        };
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    isPrimary: boolean;
                    productId: string;
                    url: string;
                    alt: string | null;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                sku: string;
                price: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                stock: number;
                isActive: boolean;
                isFeatured: boolean;
                giftboxavailable: boolean;
                categoryId: string;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        discount: import("@prisma/client/runtime/library").Decimal;
        orderNumber: string;
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
        addressId: string;
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
        };
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    isPrimary: boolean;
                    productId: string;
                    url: string;
                    alt: string | null;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                sku: string;
                price: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                stock: number;
                isActive: boolean;
                isFeatured: boolean;
                giftboxavailable: boolean;
                categoryId: string;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        discount: import("@prisma/client/runtime/library").Decimal;
        orderNumber: string;
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
        addressId: string;
    }>;
    cancel(id: string, user: UserPayload): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        discount: import("@prisma/client/runtime/library").Decimal;
        orderNumber: string;
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
        addressId: string;
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
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    description: string;
                    sku: string;
                    price: import("@prisma/client/runtime/library").Decimal;
                    discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                    stock: number;
                    isActive: boolean;
                    isFeatured: boolean;
                    giftboxavailable: boolean;
                    categoryId: string;
                };
            } & {
                id: string;
                price: import("@prisma/client/runtime/library").Decimal;
                quantity: number;
                productId: string;
                orderId: string;
            })[];
        } & {
            id: string;
            status: import("@prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            discount: import("@prisma/client/runtime/library").Decimal;
            orderNumber: string;
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
            addressId: string;
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
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                sku: string;
                price: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                stock: number;
                isActive: boolean;
                isFeatured: boolean;
                giftboxavailable: boolean;
                categoryId: string;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        discount: import("@prisma/client/runtime/library").Decimal;
        orderNumber: string;
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
        addressId: string;
    }>;
}
