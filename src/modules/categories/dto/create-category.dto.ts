import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Ringe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'ringe' })
  @IsString()
  slug!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  parentId?: string;
}
