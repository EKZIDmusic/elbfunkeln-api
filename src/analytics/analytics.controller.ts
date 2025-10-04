import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

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
