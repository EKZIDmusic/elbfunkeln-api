"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addProductImages() {
    try {
        const productsToUpdate = [
            {
                sku: 'BRAC-COPPER-001',
                images: [
                    {
                        url: 'https://i.imgur.com/placeholder1.jpg',
                        alt: 'Drahtarmband Kupfer Hauptansicht',
                        isPrimary: true,
                    },
                ],
            },
            {
                sku: 'NECK-BRONZE-001',
                images: [
                    {
                        url: 'https://i.imgur.com/placeholder2.jpg',
                        alt: 'Drahtkette Bronze Anhänger Hauptansicht',
                        isPrimary: true,
                    },
                ],
            },
            {
                sku: 'SKU-1760290720026',
                images: [
                    {
                        url: 'https://i.imgur.com/placeholder3.jpg',
                        alt: 'TEST Produkt Ansicht',
                        isPrimary: true,
                    },
                ],
            },
        ];
        for (const productData of productsToUpdate) {
            const product = await prisma.product.findUnique({
                where: { sku: productData.sku },
            });
            if (product) {
                await prisma.productImage.deleteMany({
                    where: { productId: product.id },
                });
                for (const image of productData.images) {
                    await prisma.productImage.create({
                        data: {
                            productId: product.id,
                            url: image.url,
                            alt: image.alt,
                            isPrimary: image.isPrimary,
                        },
                    });
                }
                console.log(`✓ Bilder hinzugefügt für: ${product.name} (SKU: ${productData.sku})`);
            }
            else {
                console.log(`✗ Produkt nicht gefunden: ${productData.sku}`);
            }
        }
        console.log('\nFertig! Überprüfe die Produkte:');
        const updatedProducts = await prisma.product.findMany({
            where: {
                sku: {
                    in: productsToUpdate.map((p) => p.sku),
                },
            },
            include: {
                images: true,
            },
        });
        updatedProducts.forEach((p) => {
            console.log(`\n${p.name}:`);
            p.images.forEach((img) => {
                console.log(`  - ${img.url} (Primary: ${img.isPrimary})`);
            });
        });
    }
    catch (error) {
        console.error('Fehler:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
addProductImages();
//# sourceMappingURL=add-product-images.js.map