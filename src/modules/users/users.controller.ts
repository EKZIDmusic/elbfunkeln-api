import { Controller, Get, Patch, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../core/auth/decorators/current-user.decorator';
import type { UserPayload } from '../../core/auth/interfaces/user-payload.interface';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@CurrentUser() user: UserPayload) {
    return this.usersService.findOne(user.id);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  updateProfile(@CurrentUser() user: UserPayload, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.findOne(id);
  }
}

@ApiTags('account-settings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('account-settings')
export class AccountSettingsController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get account settings by user ID' })
  getAccountSettings(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update account settings by user ID' })
  updateAccountSettings(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}
