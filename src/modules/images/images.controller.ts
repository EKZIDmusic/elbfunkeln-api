import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { ImagesService } from './images.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('product/:productId')
  @ApiOperation({ summary: 'Upload product image' })
  @ApiConsumes('multipart/form-data')
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
        },
        isPrimary: {
          type: 'boolean',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
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
  async uploadProductImage(
    @Param('productId') productId: string,
    @UploadedFile() file: Express.Multer.File,
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

  @Get(':imageId')
  @ApiOperation({ summary: 'Get image by ID' })
  async getImage(@Param('imageId') imageId: string, @Res() res: Response) {
    const { data, mimeType } = await this.imagesService.getImage(imageId);

    res.set({
      'Content-Type': mimeType,
      'Content-Length': data.length,
      'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
    });

    res.send(data);
  }

  @Delete(':imageId')
  @ApiOperation({ summary: 'Delete image' })
  async deleteImage(@Param('imageId') imageId: string) {
    return this.imagesService.deleteImage(imageId);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get all images for a product' })
  async getProductImages(@Param('productId') productId: string) {
    return this.imagesService.getProductImages(productId);
  }
}
