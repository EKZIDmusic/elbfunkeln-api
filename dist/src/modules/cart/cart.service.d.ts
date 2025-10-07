import { PrismaService } from '../../core/database/prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartService {
    private prisma;
    private productsService;
    constructor(prisma: PrismaService, productsService: ProductsService);
    getCart(userId: string): Promise<any>;
    addItem(userId: string, addToCartDto: AddToCartDto): Promise<any>;
    updateItem(userId: string, itemId: string, updateCartItemDto: UpdateCartItemDto): Promise<any>;
    removeItem(userId: string, itemId: string): Promise<any>;
    clearCart(userId: string): Promise<{
        message: string;
    }>;
    private calculateCartTotals;
}
