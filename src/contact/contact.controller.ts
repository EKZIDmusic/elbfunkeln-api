import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';
import { ContactService } from './contact.service';
import { CreateContactInquiryDto } from './dto/create-contact-inquiry.dto';
import { UpdateContactInquiryDto } from './dto/update-contact-inquiry.dto';
import { ContactQueryDto } from './dto/contact-query.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create contact inquiry (public endpoint)' })
  @ApiResponse({ status: 201, description: 'Inquiry created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  createInquiry(@Body() createContactInquiryDto: CreateContactInquiryDto) {
    return this.contactService.createInquiry(createContactInquiryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SHOP_OWNER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all contact inquiries (admin only)' })
  @ApiResponse({ status: 200, description: 'Inquiries retrieved successfully' })
  getInquiries(@Query() query: ContactQueryDto) {
    return this.contactService.getInquiries(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SHOP_OWNER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get contact inquiry by ID (admin only)' })
  @ApiParam({ name: 'id', description: 'Inquiry ID' })
  @ApiResponse({ status: 200, description: 'Inquiry retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Inquiry not found' })
  getInquiryById(@Param('id') id: string) {
    return this.contactService.getInquiryById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SHOP_OWNER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update contact inquiry status (admin only)' })
  @ApiParam({ name: 'id', description: 'Inquiry ID' })
  @ApiResponse({ status: 200, description: 'Inquiry updated successfully' })
  @ApiResponse({ status: 404, description: 'Inquiry not found' })
  updateInquiry(
    @Param('id') id: string,
    @Body() updateContactInquiryDto: UpdateContactInquiryDto,
  ) {
    return this.contactService.updateInquiry(id, updateContactInquiryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete contact inquiry (admin only)' })
  @ApiParam({ name: 'id', description: 'Inquiry ID' })
  @ApiResponse({ status: 200, description: 'Inquiry deleted successfully' })
  @ApiResponse({ status: 404, description: 'Inquiry not found' })
  deleteInquiry(@Param('id') id: string) {
    return this.contactService.deleteInquiry(id);
  }
}
