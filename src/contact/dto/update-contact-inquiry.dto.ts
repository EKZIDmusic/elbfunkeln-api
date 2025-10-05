import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactStatus } from '@prisma/client';

export class UpdateContactInquiryDto {
  @ApiProperty({ enum: ContactStatus, example: ContactStatus.IN_PROGRESS })
  @IsEnum(ContactStatus)
  status: ContactStatus;
}
