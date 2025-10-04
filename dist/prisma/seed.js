"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@elbfunkeln.de' },
        update: {},
        create: {
            email: 'admin@elbfunkeln.de',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN',
            isVerified: true,
        },
    });
    const customer = await prisma.user.upsert({
        where: { email: 'kunde@example.de' },
        update: {},
        create: {
            email: 'kunde@example.de',
            password: await bcrypt.hash('kunde123', 10),
            firstName: 'Max',
            lastName: 'Mustermann',
            phone: '+49 151 12345678',
            role: 'CUSTOMER',
            isVerified: true,
        },
    });
    console.log('✅ Users created:', admin.email, customer.email);
    const ringCategory = await prisma.category.upsert({
        where: { slug: 'ringe' },
        update: {},
        create: {
            name: 'Ringe',
            slug: 'ringe',
            description: 'Handgefertigte Drahtringe in verschiedenen Designs und Größen'
        },
    });
    const earringCategory = await prisma.category.upsert({
        where: { slug: 'ohrringe' },
        update: {},
        create: {
            name: 'Ohrringe',
            slug: 'ohrringe',
            description: 'Elegante Drahtohrringe für jeden Anlass'
        },
    });
    const necklaceCategory = await prisma.category.upsert({
        where: { slug: 'ketten' },
        update: {},
        create: {
            name: 'Ketten',
            slug: 'ketten',
            description: 'Filigrane Drahtketten und Anhänger'
        },
    });
    const braceletCategory = await prisma.category.upsert({
        where: { slug: 'armbänder' },
        update: {},
        create: {
            name: 'Armbänder',
            slug: 'armbänder',
            description: 'Handgefertigte Drahtarmbänder'
        },
    });
    console.log('✅ Categories created');
    const silverRing = await prisma.product.upsert({
        where: { sku: 'RING-SILVER-001' },
        update: {},
        create: {
            name: 'Drahtring Silber Klassisch',
            description: 'Handgefertigter Ring aus hochwertigem Silberdraht. Jedes Stück ist ein Unikat mit einzigartiger Wicklung.',
            price: 49.99,
            sku: 'RING-SILVER-001',
            stock: 10,
            categoryId: ringCategory.id,
            isFeatured: true,
        },
    });
    await prisma.productImage.createMany({
        data: [
            { productId: silverRing.id, url: '/images/products/ring-silver-1.jpg', alt: 'Silberring Vorderansicht', isPrimary: true },
            { productId: silverRing.id, url: '/images/products/ring-silver-2.jpg', alt: 'Silberring Seitenansicht' },
        ],
        skipDuplicates: true,
    });
    const goldEarrings = await prisma.product.upsert({
        where: { sku: 'EARR-GOLD-001' },
        update: {},
        create: {
            name: 'Drahtohrringe Gold Spirale',
            description: 'Elegante Ohrringe aus vergoldetem Draht in Spiralform. Leicht und komfortabel zu tragen.',
            price: 59.99,
            discountPrice: 49.99,
            sku: 'EARR-GOLD-001',
            stock: 8,
            categoryId: earringCategory.id,
            isFeatured: true,
        },
    });
    await prisma.productImage.createMany({
        data: [
            { productId: goldEarrings.id, url: '/images/products/earrings-gold-1.jpg', alt: 'Goldene Ohrringe', isPrimary: true },
        ],
        skipDuplicates: true,
    });
    const bronzeNecklace = await prisma.product.upsert({
        where: { sku: 'NECK-BRONZE-001' },
        update: {},
        create: {
            name: 'Drahtkette Bronze Anhänger',
            description: 'Filigrane Kette aus Bronzedraht mit handgearbeitetem Anhänger.',
            price: 39.99,
            sku: 'NECK-BRONZE-001',
            stock: 15,
            categoryId: necklaceCategory.id,
        },
    });
    const copperBracelet = await prisma.product.upsert({
        where: { sku: 'BRAC-COPPER-001' },
        update: {},
        create: {
            name: 'Drahtarmband Kupfer',
            description: 'Einzigartiges Armband aus Kupferdraht mit verstellbarer Größe.',
            price: 29.99,
            sku: 'BRAC-COPPER-001',
            stock: 20,
            categoryId: braceletCategory.id,
        },
    });
    console.log('✅ Products created');
    const address = await prisma.address.create({
        data: {
            userId: customer.id,
            firstName: 'Max',
            lastName: 'Mustermann',
            street: 'Musterstraße 123',
            city: 'Hamburg',
            zip: '20095',
            country: 'DE',
            isDefault: true,
        },
    });
    console.log('✅ Address created');
    await prisma.discount.upsert({
        where: { code: 'WELCOME10' },
        update: {},
        create: {
            code: 'WELCOME10',
            description: 'Willkommensrabatt für Neukunden',
            type: 'PERCENTAGE',
            value: 10,
            minAmount: 30,
            maxUses: 100,
            usedCount: 0,
            isActive: true,
            expiresAt: new Date('2025-12-31'),
        },
    });
    await prisma.discount.upsert({
        where: { code: 'SOMMER2025' },
        update: {},
        create: {
            code: 'SOMMER2025',
            description: 'Sommerrabatt 15%',
            type: 'PERCENTAGE',
            value: 15,
            minAmount: 50,
            maxUses: 200,
            isActive: true,
            startsAt: new Date('2025-06-01'),
            expiresAt: new Date('2025-08-31'),
        },
    });
    console.log('✅ Discounts created');
    await prisma.giftCard.upsert({
        where: { code: 'GIFT-50-2025' },
        update: {},
        create: {
            code: 'GIFT-50-2025',
            amount: 50,
            balance: 50,
            isActive: true,
            expiresAt: new Date('2026-12-31'),
        },
    });
    console.log('✅ Gift cards created');
    await prisma.newsletter.upsert({
        where: { email: 'newsletter@example.de' },
        update: {},
        create: {
            email: 'newsletter@example.de',
            isActive: true,
            preferences: { categories: ['neue-produkte', 'angebote'] },
        },
    });
    console.log('✅ Newsletter subscribers created');
    const order = await prisma.order.create({
        data: {
            orderNumber: 'ORD-2025-001',
            userId: customer.id,
            addressId: address.id,
            status: 'PAID',
            paymentStatus: 'COMPLETED',
            shippingStatus: 'DELIVERED',
            subtotal: 49.99,
            tax: 9.50,
            shipping: 4.99,
            discount: 5.00,
            total: 59.48,
            discountCode: 'WELCOME10',
            items: {
                create: [
                    {
                        productId: silverRing.id,
                        quantity: 1,
                        price: 49.99,
                    },
                ],
            },
        },
    });
    console.log('✅ Sample order created:', order.orderNumber);
    await prisma.review.create({
        data: {
            userId: customer.id,
            productId: silverRing.id,
            rating: 5,
            comment: 'Wunderschöner Ring! Sehr hochwertig verarbeitet und genau wie beschrieben.',
            isVerified: true,
        },
    });
    console.log('✅ Reviews created');
    await prisma.favorite.create({
        data: {
            userId: customer.id,
            productId: goldEarrings.id,
        },
    });
    console.log('✅ Favorites created');
    const cart = await prisma.cart.create({
        data: {
            userId: customer.id,
            items: {
                create: [
                    {
                        productId: bronzeNecklace.id,
                        quantity: 2,
                    },
                    {
                        productId: copperBracelet.id,
                        quantity: 1,
                    },
                ],
            },
        },
    });
    console.log('✅ Cart created with items');
    const ticket = await prisma.ticket.create({
        data: {
            userId: customer.id,
            subject: 'Frage zur Lieferzeit',
            status: 'IN_PROGRESS',
            priority: 'MEDIUM',
            assignedTo: admin.id,
            messages: {
                create: [
                    {
                        content: 'Hallo, ich würde gerne wissen, wie lange die Lieferung ungefähr dauert?',
                        isStaff: false,
                    },
                    {
                        content: 'Hallo! Die Lieferung dauert in der Regel 3-5 Werktage innerhalb Deutschlands.',
                        isStaff: true,
                    },
                ],
            },
        },
    });
    console.log('✅ Support ticket created');
    await prisma.analytics.createMany({
        data: [
            {
                event: 'page_view',
                data: { page: '/products', category: 'ringe' },
                ip: '192.168.1.1',
                userAgent: 'Mozilla/5.0',
            },
            {
                event: 'product_view',
                data: { productId: silverRing.id, productName: 'Drahtring Silber Klassisch' },
                ip: '192.168.1.1',
                userAgent: 'Mozilla/5.0',
            },
            {
                event: 'add_to_cart',
                data: { productId: goldEarrings.id, quantity: 1 },
                ip: '192.168.1.1',
                userAgent: 'Mozilla/5.0',
            },
        ],
        skipDuplicates: true,
    });
    console.log('✅ Analytics events created');
    console.log('🎉 Seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('- Users: 2 (1 Admin, 1 Customer)');
    console.log('- Categories: 4');
    console.log('- Products: 4 with images');
    console.log('- Addresses: 1');
    console.log('- Discounts: 2');
    console.log('- Gift Cards: 1');
    console.log('- Newsletter Subscribers: 1');
    console.log('- Orders: 1 with items');
    console.log('- Reviews: 1');
    console.log('- Favorites: 1');
    console.log('- Carts: 1 with 2 items');
    console.log('- Tickets: 1 with 2 messages');
    console.log('- Analytics: 3 events');
}
main()
    .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map