import {
  Controller,
  Get,
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
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ContactService } from '../../contact/contact.service';
import { UpdateContactInquiryDto } from '../../contact/dto/update-contact-inquiry.dto';
import { ContactQueryDto } from '../../contact/dto/contact-query.dto';

@ApiTags('Admin - Contact')
@ApiBearerAuth()
@Controller('admin/contact')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SHOP_OWNER')
export class AdminContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @ApiOperation({ summary: 'Get all contact inquiries (admin only)' })
  @ApiResponse({ status: 200, description: 'Inquiries retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' })
  getInquiries(@Query() query: ContactQueryDto) {
    return this.contactService.getInquiries(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contact inquiry by ID (admin only)' })
  @ApiParam({ name: 'id', description: 'Inquiry ID' })
  @ApiResponse({ status: 200, description: 'Inquiry retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' })
  @ApiResponse({ status: 404, description: 'Inquiry not found' })
  getInquiryById(@Param('id') id: string) {
    return this.contactService.getInquiryById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update contact inquiry status (admin only)' })
  @ApiParam({ name: 'id', description: 'Inquiry ID' })
  @ApiResponse({ status: 200, description: 'Inquiry updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' })
  @ApiResponse({ status: 404, description: 'Inquiry not found' })
  updateInquiry(
    @Param('id') id: string,
    @Body() updateContactInquiryDto: UpdateContactInquiryDto,
  ) {
    return this.contactService.updateInquiry(id, updateContactInquiryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete contact inquiry (admin only)' })
  @ApiParam({ name: 'id', description: 'Inquiry ID' })
  @ApiResponse({ status: 200, description: 'Inquiry deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role only' })
  @ApiResponse({ status: 404, description: 'Inquiry not found' })
  @Roles('ADMIN')
  deleteInquiry(@Param('id') id: string) {
    return this.contactService.deleteInquiry(id);
  }
}
