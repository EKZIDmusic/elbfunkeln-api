import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/auth/guards/roles.guard';
import { Roles } from '../../core/auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('shipping')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createShippingDto: CreateShippingDto) {
    return this.shippingService.create(createShippingDto);
  }

  @Get()
  findAll() {
    return this.shippingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateShippingDto: UpdateShippingDto) {
    return this.shippingService.update(id, updateShippingDto);
  }
}
