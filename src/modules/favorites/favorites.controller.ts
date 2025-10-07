import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../core/auth/decorators/current-user.decorator';
import type { UserPayload } from '../../core/auth/interfaces/user-payload.interface';

@ApiTags('favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  addToFavorites(@CurrentUser() user: UserPayload, @Body() addFavoriteDto: AddFavoriteDto) {
    return this.favoritesService.addToFavorites(user.id, addFavoriteDto);
  }

  @Get()
  findAll(@CurrentUser() user: UserPayload) {
    return this.favoritesService.findAll(user.id);
  }

  @Get(':productId/check')
  isFavorite(@CurrentUser() user: UserPayload, @Param('productId') productId: string) {
    return this.favoritesService.isFavorite(user.id, productId);
  }

  @Delete(':productId')
  remove(@CurrentUser() user: UserPayload, @Param('productId') productId: string) {
    return this.favoritesService.remove(user.id, productId);
  }
}
