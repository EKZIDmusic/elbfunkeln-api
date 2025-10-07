import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactInquiryDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Product inquiry' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  subject: string;

  @ApiProperty({ example: 'I would like to know more about your products...' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  message: string;
}
