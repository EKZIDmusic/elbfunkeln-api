import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../core/auth/decorators/current-user.decorator';
import type { UserPayload } from '../../core/auth/interfaces/user-payload.interface';

@ApiTags('addresses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@CurrentUser() user: UserPayload, @Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(user.id, createAddressDto);
  }

  @Get()
  findAll(@CurrentUser() user: UserPayload) {
    return this.addressesService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return this.addressesService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressesService.update(id, user.id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return this.addressesService.remove(id, user.id);
  }
}
