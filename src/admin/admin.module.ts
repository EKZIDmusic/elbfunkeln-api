import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ContactModule } from '../contact/contact.module';
import { ProductsModule } from '../products/products.module';
import { AdminUsersController } from './users/admin-users.controller';
import { AdminUsersService } from './users/admin-users.service';
import { AdminAnalyticsController } from './analytics/admin-analytics.controller';
import { AdminAnalyticsService } from './analytics/admin-analytics.service';
import { AdminContactController } from './contact/admin-contact.controller';
import { AdminProductsController } from './products/admin-products.controller';
import { AdminProductsService } from './products/admin-products.service';

@Module({
  imports: [PrismaModule, ContactModule, ProductsModule],
  controllers: [AdminUsersController, AdminAnalyticsController, AdminContactController, AdminProductsController],
  providers: [AdminUsersService, AdminAnalyticsService, AdminProductsService],
  exports: [AdminUsersService, AdminAnalyticsService, AdminProductsService],
})
export class AdminModule {}
