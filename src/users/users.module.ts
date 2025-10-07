import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController, AccountSettingsController } from './users.controller';

@Module({
  controllers: [UsersController, AccountSettingsController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
