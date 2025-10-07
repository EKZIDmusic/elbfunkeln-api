import { IsUUID, IsArray, ValidateNested, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsUUID()
  addressId: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
