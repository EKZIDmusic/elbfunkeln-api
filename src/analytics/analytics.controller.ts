import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('sales')
  getSalesData(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.analyticsService.getSalesData(startDate, endDate);
  }

  @Get('tickets')
  getTicketData(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.analyticsService.getTicketData(startDate, endDate);
  }

  @Get('overview')
  getOverview() {
    return this.analyticsService.getOverview();
  }
}
