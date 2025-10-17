const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateProductImage() {
  // ========================================
  // HIER ANPASSEN:
  // ========================================

  const productName = 'TEST';  // Name des Produkts
  const imgurUrl = 'https://i.imgur.com/YOUR-IMAGE.jpg';  // Ihre Imgur URL
  const altText = 'Produktbeschreibung';  // Alternative Beschreibung

  // ========================================

  console.log(`🔍 Suche Produkt: ${productName}...`);

  const product = await prisma.product.findFirst({
    where: { name: productName },
    include: { images: true },
  });

  if (!product) {
    console.log(`❌ Produkt "${productName}" nicht gefunden!`);
    console.log('\n📋 Verfügbare Produkte:');

    const allProducts = await prisma.product.findMany({
      where: { isDeleted: false },
      select: { name: true, id: true },
    });

    allProducts.forEach(p => console.log(`  - ${p.name} (ID: ${p.id})`));
    await prisma.$disconnect();
    return;
  }

  console.log(`✓ Produkt gefunden: ${product.name} (ID: ${product.id})`);

  // Update oder erstelle Bild
  if (product.images.length > 0) {
    console.log(`📝 Aktualisiere bestehendes Bild...`);
    await prisma.productImage.update({
      where: { id: product.images[0].id },
      data: {
        url: imgurUrl,
        alt: altText,
      },
    });
  } else {
    console.log(`➕ Erstelle neues Bild...`);
    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: imgurUrl,
        alt: altText,
        isPrimary: true,
      },
    });
  }

  console.log(`\n✅ Bild erfolgreich aktualisiert!`);
  console.log(`   URL: ${imgurUrl}`);
  console.log(`   Produkt: ${product.name}`);

  await prisma.$disconnect();
}

updateProductImage().catch((e) => {
  console.error('❌ Fehler:', e);
  process.exit(1);
});
