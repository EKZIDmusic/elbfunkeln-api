import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GiftCardsService } from './gift-cards.service';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../core/auth/decorators/current-user.decorator';
import type { UserPayload } from '../../core/auth/interfaces/user-payload.interface';

@ApiTags('gift-cards')
@Controller('gift-cards')
export class GiftCardsController {
  constructor(private readonly giftCardsService: GiftCardsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: UserPayload, @Body() createGiftCardDto: CreateGiftCardDto) {
    return this.giftCardsService.create(createGiftCardDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.giftCardsService.findAll();
  }

  @Get(':code')
  findByCode(@Param('code') code: string) {
    return this.giftCardsService.findByCode(code);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateGiftCardDto: UpdateGiftCardDto) {
    return this.giftCardsService.update(id, updateGiftCardDto);
  }
}
