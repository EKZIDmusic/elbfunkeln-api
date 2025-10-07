import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/auth/guards/roles.guard';
import { Roles } from '../../core/auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { Public } from '../../core/auth/decorators/public.decorator';

@ApiTags('newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @Public()
  subscribe(@Body() subscribeDto: SubscribeDto) {
    return this.newsletterService.subscribe(subscribeDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.newsletterService.findAll();
  }

  @Delete(':email')
  @Public()
  unsubscribe(@Param('email') email: string) {
    return this.newsletterService.unsubscribe(email);
  }
}
