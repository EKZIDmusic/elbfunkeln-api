const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    where: { isDeleted: false },
    include: {
      images: true,
      category: true,
    },
  });

  console.log(`\nGefundene Produkte: ${products.length}\n`);

  products.forEach((product) => {
    console.log(`Produkt: ${product.name}`);
    console.log(`  ID: ${product.id}`);
    console.log(`  Kategorie: ${product.category?.name}`);
    console.log(`  Bilder: ${product.images.length}`);

    if (product.images.length > 0) {
      product.images.forEach((img, idx) => {
        console.log(`    ${idx + 1}. ${img.url} (Primary: ${img.isPrimary})`);
      });
    } else {
      console.log(`    ❌ KEINE BILDER`);
    }
    console.log('');
  });

  await prisma.$disconnect();
}

main();
