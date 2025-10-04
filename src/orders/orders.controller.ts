import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole, OrderStatus } from '@prisma/client';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  create(@CurrentUser() user: UserPayload, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(user.userId, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get user orders' })
  getUserOrders(@CurrentUser() user: UserPayload) {
    return this.ordersService.findUserOrders(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Put(':id/cancel')
  @ApiOperation({ summary: 'Cancel order' })
  cancel(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return this.ordersService.cancel(id, user.userId);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SHOP_OWNER)
  @Get('admin/all')
  @ApiOperation({ summary: 'Get all orders (Admin)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: OrderStatus,
  ) {
    return this.ordersService.findAll(Number(page) || 1, Number(limit) || 20, status);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SHOP_OWNER)
  @Put('admin/:id/status')
  @ApiOperation({ summary: 'Update order status (Admin)' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, dto.status);
  }
}
