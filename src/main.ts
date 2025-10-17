import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DecimalToNumberInterceptor } from './core/interceptors/decimal-to-number.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: true,
  });

  // Security middleware
  // Note: helmet, compression, cookieParser werden erst nach Installation verwendet
  // Uncomment when packages are installed:
  // import helmet from 'helmet';
  // import compression from 'compression';
  // import cookieParser from 'cookie-parser';
  // app.use(helmet());
  // app.use(compression());
  // app.use(cookieParser());

  // Increase body size limits for file uploads
  app.use(require('express').json({ limit: '50mb' }));
  app.use(require('express').urlencoded({ limit: '50mb', extended: true }));

  // CORS configuration
  app.enableCors({
    origin: ['https://elbfunkeln.de', 'http://localhost:4200'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false, // Allow extra fields but strip them out
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global interceptor to convert Decimal to number
  app.useGlobalInterceptors(new DecimalToNumberInterceptor());

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Elbfunkeln E-Commerce API')
    .setDescription('REST API für Elbfunkeln Drahtschmuck Shop')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('products', 'Product catalog')
    .addTag('categories', 'Product categories')
    .addTag('cart', 'Shopping cart')
    .addTag('orders', 'Order management')
    .addTag('payments', 'Payment processing')
    .addTag('shipping', 'Shipping & tracking')
    .addTag('gift-cards', 'Gift card management')
    .addTag('discounts', 'Discount codes')
    .addTag('tickets', 'Support tickets')
    .addTag('newsletter', 'Newsletter subscriptions')
    .addTag('analytics', 'Analytics & tracking')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

void bootstrap();
