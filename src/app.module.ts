import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
// import { AuthModule } from './auth/auth.module'; // Temporarily commented until auth module is migrated
// import { UsersModule } from './users/users.module'; // Temporarily commented until users module is migrated
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
// import { GiftCardsModule } from './gift-cards/gift-cards.module'; // Temporarily commented until gift-cards module is migrated
import { DiscountsModule } from './discounts/discounts.module';
import { TicketsModule } from './tickets/tickets.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PaymentsModule } from './payments/payments.module';
import { ShippingModule } from './shipping/shipping.module';
import { EmailModule } from './email/email.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

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
    // AuthModule, // Temporarily commented until auth module is migrated
    // UsersModule, // Temporarily commented until users module is migrated
    ProductsModule,
    CategoriesModule,
    CartModule,
    OrdersModule,
    // GiftCardsModule, // Temporarily commented until gift-cards module is migrated
    DiscountsModule,
    TicketsModule,
    NewsletterModule,
    AnalyticsModule,
    PaymentsModule,
    ShippingModule,
    EmailModule,
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
