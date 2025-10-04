"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:4200',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}
void bootstrap();
//# sourceMappingURL=main.js.map