import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { AdminUsersService } from './admin-users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';

@ApiTags('Admin - Users')
@ApiBearerAuth()
@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users with filters and pagination' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  getUsers(@Query() query: UserQueryDto) {
    return this.adminUsersService.getUsers(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserById(@Param('id') id: string) {
    return this.adminUsersService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.adminUsersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  deleteUser(@Param('id') id: string) {
    return this.adminUsersService.deleteUser(id);
  }

  @Get(':id/sessions')
  @ApiOperation({ summary: 'Get user sessions' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Sessions retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserSessions(
    @Param('id') id: string,
    @Query('activeOnly') activeOnly?: string,
  ) {
    return this.adminUsersService.getUserSessions(id, activeOnly === 'true');
  }

  @Delete(':id/sessions/:sessionId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke specific user session' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiParam({ name: 'sessionId', description: 'Session ID' })
  @ApiResponse({ status: 200, description: 'Session revoked successfully' })
  @ApiResponse({ status: 404, description: 'Session not found' })
  revokeSession(@Param('sessionId') sessionId: string) {
    return this.adminUsersService.revokeSession(sessionId);
  }

  @Delete(':id/sessions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke all user sessions' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'All sessions revoked successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  revokeAllSessions(@Param('id') id: string) {
    return this.adminUsersService.revokeAllUserSessions(id);
  }

  @Get(':id/activities')
  @ApiOperation({ summary: 'Get user activity log' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Activities retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserActivities(
    @Param('id') id: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminUsersService.getUserActivities(
      id,
      limit ? parseInt(limit) : 50,
    );
  }
}
