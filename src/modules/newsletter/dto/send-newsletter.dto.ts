import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SendNewsletterDto {
  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsOptional()
  @IsString()
  htmlContent?: string;
}
