import { IsString, IsNumber, IsBoolean, IsOptional, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'Drahtring Silber' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Handgefertigter Ring aus Silberdraht' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 49.99 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 39.99, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  discountPrice?: number;

  @ApiProperty({ example: 'RING-SILVER-001' })
  @IsString()
  sku!: string;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock!: number;

  @ApiProperty()
  @IsUUID()
  categoryId!: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}
