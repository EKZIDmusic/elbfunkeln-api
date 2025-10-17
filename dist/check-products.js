"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function checkProducts() {
    try {
        const products = await prisma.product.findMany({
            include: {
                images: true,
                category: true,
            },
            where: {
                isDeleted: false,
            },
        });
        console.log('Products found:', products.length);
        console.log('\n');
        products.forEach((product) => {
            console.log('Product:', product.name);
            console.log('  ID:', product.id);
            console.log('  SKU:', product.sku);
            console.log('  Category:', product.category?.name || 'N/A');
            console.log('  Images:', product.images.length);
            if (product.images.length > 0) {
                product.images.forEach((img, idx) => {
                    console.log(`    ${idx + 1}. URL:`, img.url);
                    console.log(`       Alt:`, img.alt);
                    console.log(`       Primary:`, img.isPrimary);
                });
            }
            else {
                console.log('    No images found!');
            }
            console.log('\n');
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
checkProducts();
//# sourceMappingURL=check-products.js.map