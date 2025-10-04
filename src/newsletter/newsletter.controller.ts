import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/subscribe.dto';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  subscribe(@Body() subscribeDto: SubscribeDto) {
    return this.newsletterService.subscribe(subscribeDto);
  }

  @Get()
  findAll() {
    return this.newsletterService.findAll();
  }

  @Delete(':email')
  unsubscribe(@Param('email') email: string) {
    return this.newsletterService.unsubscribe(email);
  }
}
