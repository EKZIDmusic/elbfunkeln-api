import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminUsersController } from './users/admin-users.controller';
import { AdminUsersService } from './users/admin-users.service';
import { AdminAnalyticsController } from './analytics/admin-analytics.controller';
import { AdminAnalyticsService } from './analytics/admin-analytics.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminUsersController, AdminAnalyticsController],
  providers: [AdminUsersService, AdminAnalyticsService],
  exports: [AdminUsersService, AdminAnalyticsService],
})
export class AdminModule {}
