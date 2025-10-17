import { IsString, IsNumber, IsBoolean, IsOptional, IsUUID, Min, IsArray, IsUrl, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ProductImageDto {
  @ApiProperty({ example: 'https://i.imgur.com/example.jpg', required: false })
  @IsUrl({}, { message: 'URL muss eine gültige URL sein' })
  @IsOptional()
  url?: string;

  @ApiProperty({ example: 'Produktbild Vorderansicht', required: false })
  @IsString()
  @IsOptional()
  alt?: string;

  @ApiProperty({ example: true, required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

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
  @IsUUID('4', { message: 'categoryId muss eine gültige UUID sein' })
  categoryId!: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  giftboxavailable?: boolean;

  @ApiProperty({
    type: [ProductImageDto],
    required: false,
    example: [
      { url: 'https://i.imgur.com/example1.jpg', alt: 'Vorderansicht', isPrimary: true },
      { url: 'https://i.imgur.com/example2.jpg', alt: 'Seitenansicht', isPrimary: false }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  @IsOptional()
  images?: ProductImageDto[];
}
