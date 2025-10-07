import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../core/auth/decorators/current-user.decorator';
import type { UserPayload } from '../../core/auth/interfaces/user-payload.interface';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: UserPayload, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(user.id, createReviewDto);
  }

  @Get()
  findAll(@Query('productId') productId?: string, @Query('userId') userId?: string) {
    if (productId) {
      return this.reviewsService.findByProduct(productId);
    }
    if (userId) {
      return this.reviewsService.findByUser(userId);
    }
    return this.reviewsService.findAll();
  }

  @Get('product/:productId/stats')
  getProductStats(@Param('productId') productId: string) {
    return this.reviewsService.getProductRatingStats(productId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(id, user.id, updateReviewDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return this.reviewsService.remove(id, user.id);
  }
}
