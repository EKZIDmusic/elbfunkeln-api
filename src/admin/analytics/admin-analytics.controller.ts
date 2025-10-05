import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { AdminAnalyticsService } from './admin-analytics.service';
import { DateRangeQueryDto } from './dto/date-range-query.dto';

@ApiTags('Admin - Analytics')
@ApiBearerAuth()
@Controller('admin/analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SHOP_OWNER')
export class AdminAnalyticsController {
  constructor(private readonly adminAnalyticsService: AdminAnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard stats retrieved successfully' })
  getDashboardStats() {
    return this.adminAnalyticsService.getDashboardStats();
  }

  @Get('sales')
  @ApiOperation({ summary: 'Get sales data with date range filter' })
  @ApiResponse({ status: 200, description: 'Sales data retrieved successfully' })
  getSalesData(@Query() query: DateRangeQueryDto) {
    return this.adminAnalyticsService.getSalesData(query);
  }

  @Get('customers')
  @ApiOperation({ summary: 'Get customer insights' })
  @ApiResponse({ status: 200, description: 'Customer insights retrieved successfully' })
  getCustomerInsights(@Query() query: DateRangeQueryDto) {
    return this.adminAnalyticsService.getCustomerInsights(query);
  }

  @Get('products')
  @ApiOperation({ summary: 'Get product performance data' })
  @ApiResponse({ status: 200, description: 'Product performance retrieved successfully' })
  getProductPerformance(@Query() query: DateRangeQueryDto) {
    return this.adminAnalyticsService.getProductPerformance(query);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get order statistics' })
  @ApiResponse({ status: 200, description: 'Order statistics retrieved successfully' })
  getOrderStatistics(@Query() query: DateRangeQueryDto) {
    return this.adminAnalyticsService.getOrderStatistics(query);
  }
}
