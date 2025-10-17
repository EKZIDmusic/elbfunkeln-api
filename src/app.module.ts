import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './core/database/prisma/prisma.module';
import { AuthModule } from './core/auth/auth-module/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { GiftCardsModule } from './modules/gift-cards/gift-cards.module';
import { DiscountsModule } from './modules/discounts/discounts.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { EmailModule } from './shared/email/email.module';
import { AdminModule } from './modules/admin/admin.module';
import { ContactModule } from './modules/contact/contact.module';
import { ImagesModule } from './modules/images/images.module';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    OrdersModule,
    AddressesModule,
    FavoritesModule,
    ReviewsModule,
    GiftCardsModule,
    DiscountsModule,
    TicketsModule,
    NewsletterModule,
    AnalyticsModule,
    PaymentsModule,
    ShippingModule,
    EmailModule,
    AdminModule,
    ContactModule,
    ImagesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
