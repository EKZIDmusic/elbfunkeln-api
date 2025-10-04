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
    console.log('✅ Admin created:', admin.email);
    const ringCategory = await prisma.category.upsert({
        where: { slug: 'ringe' },
        update: {},
        create: { name: 'Ringe', slug: 'ringe', description: 'Handgefertigte Drahtringe' },
    });
    const earringCategory = await prisma.category.upsert({
        where: { slug: 'ohrringe' },
        update: {},
        create: { name: 'Ohrringe', slug: 'ohrringe', description: 'Elegante Drahtohrringe' },
    });
    const necklaceCategory = await prisma.category.upsert({
        where: { slug: 'ketten' },
        update: {},
        create: { name: 'Ketten', slug: 'ketten', description: 'Filigrane Drahtketten' },
    });
    console.log('✅ Categories created');
    await prisma.product.upsert({
        where: { sku: 'RING-SILVER-001' },
        update: {},
        create: {
            name: 'Drahtring Silber',
            description: 'Handgefertigter Ring aus Silberdraht',
            price: 49.99,
            sku: 'RING-SILVER-001',
            stock: 10,
            categoryId: ringCategory.id,
            isFeatured: true,
        },
    });
    await prisma.product.upsert({
        where: { sku: 'EARR-GOLD-001' },
        update: {},
        create: {
            name: 'Drahtohrringe Gold',
            description: 'Elegante Ohrringe aus Golddraht',
            price: 59.99,
            sku: 'EARR-GOLD-001',
            stock: 8,
            categoryId: earringCategory.id,
            isFeatured: true,
        },
    });
    await prisma.product.upsert({
        where: { sku: 'NECK-BRONZE-001' },
        update: {},
        create: {
            name: 'Drahtkette Bronze',
            description: 'Filigrane Kette aus Bronzedraht',
            price: 39.99,
            sku: 'NECK-BRONZE-001',
            stock: 15,
            categoryId: necklaceCategory.id,
        },
    });
    console.log('✅ Products created');
    console.log('🎉 Seeding completed!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map