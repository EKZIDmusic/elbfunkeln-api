import { Injectable } from '@nestjs/common';
import { ProductsService } from '../../products/products.service';

@Injectable()
export class AdminProductsService {
  constructor(private readonly productsService: ProductsService) {}

  // Admin-specific methods can be added here if needed
  // For now, we delegate to the main ProductsService
}
