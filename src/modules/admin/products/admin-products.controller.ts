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
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../core/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/auth/guards/roles.guard';
import { Roles } from '../../../core/auth/decorators/roles.decorator';
import { ProductsService } from '../../products/products.service';
import { ImagesService } from '../../images/images.service';
import { CreateProductDto } from '../../products/dto/create-product.dto';
import { UpdateProductDto } from '../../products/dto/update-product.dto';

@ApiTags('Admin - Products')
@ApiBearerAuth()
@Controller('admin/products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SHOP_OWNER')
export class AdminProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly imagesService: ImagesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product (admin only)' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products (admin only)' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' })
  findAll(@Query() query?: any) {
    return this.productsService.findAll(query);
  }

  @Get('archived')
  @ApiOperation({ summary: 'Get archived products (admin only)' })
  @ApiResponse({ status: 200, description: 'Archived products retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' })
  findArchived() {
    return this.productsService.findArchived();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID (admin only)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product (admin only)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete product (admin only)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role only' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Roles('ADMIN', 'SHOP_OWNER')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.productsService.remove(id);
  }

  @Post(':id/restore')
  @ApiOperation({ summary: 'Restore archived product (admin only)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product restored successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  restore(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.productsService.restore(id);
  }

  @Delete(':id/permanent')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Permanently delete product (admin only)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 204, description: 'Product permanently deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role only' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Roles('ADMIN')
  permanentDelete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.productsService.permanentDelete(id);
  }

  @Post(':id/images/upload')
  @ApiOperation({ summary: 'Upload image for product (admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        alt: {
          type: 'string',
          description: 'Alternative text for image',
        },
        isPrimary: {
          type: 'boolean',
          description: 'Set as primary image',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - invalid file' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|jpg|png|gif|webp)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  uploadImage(
    @Param('id', new ParseUUIDPipe({ version: '4' })) productId: string,
    @UploadedFile() file: any,
    @Body('alt') alt?: string,
    @Body('isPrimary') isPrimary?: string,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.imagesService.uploadProductImage(
      productId,
      file,
      alt,
      isPrimary === 'true',
    );
  }

  @Get(':id/images')
  @ApiOperation({ summary: 'Get all images for a product (admin only)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Images retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProductImages(@Param('id', new ParseUUIDPipe({ version: '4' })) productId: string) {
    return this.imagesService.getProductImages(productId);
  }

  @Delete(':productId/images/:imageId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete product image (admin only)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiParam({ name: 'imageId', description: 'Image ID' })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  deleteImage(@Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string) {
    return this.imagesService.deleteImage(imageId);
  }
}
