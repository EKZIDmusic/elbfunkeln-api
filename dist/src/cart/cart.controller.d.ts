import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import type { UserPayload } from '../common/interfaces/user-payload.interface';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    getCart(user: UserPayload): Promise<any>;
    addItem(user: UserPayload, addToCartDto: AddToCartDto): Promise<any>;
    updateItem(user: UserPayload, id: string, updateCartItemDto: UpdateCartItemDto): Promise<any>;
    removeItem(user: UserPayload, id: string): Promise<any>;
    clearCart(user: UserPayload): Promise<{
        message: string;
    }>;
}
