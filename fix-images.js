const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Aktualisiere Produktbilder mit stabilen URLs...\n');

  // Verwende placehold.co für stabile, zuverlässige Placeholder-Bilder
  const updates = [
    {
      name: 'Drahtarmband Kupfer',
      imageUrl: 'https://placehold.co/400x400/D4A574/FFFFFF?text=Armband+Kupfer',
      alt: 'Drahtarmband Kupfer',
    },
    {
      name: 'Drahtkette Bronze Anhänger',
      imageUrl: 'https://placehold.co/400x400/CD7F32/FFFFFF?text=Kette+Bronze',
      alt: 'Drahtkette Bronze Anhänger',
    },
    {
      name: 'TEST',
      imageUrl: 'https://placehold.co/400x400/FF6B6B/FFFFFF?text=TEST+Produkt',
      alt: 'TEST Produkt',
    },
  ];

  for (const update of updates) {
    const product = await prisma.product.findFirst({
      where: { name: update.name },
      include: { images: true },
    });

    if (product && product.images.length > 0) {
      // Update existing image
      await prisma.productImage.update({
        where: { id: product.images[0].id },
        data: {
          url: update.imageUrl,
          alt: update.alt,
        },
      });
      console.log(`✅ Bild aktualisiert für: ${product.name}`);
    } else if (product) {
      // Create new image
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: update.imageUrl,
          alt: update.alt,
          isPrimary: true,
        },
      });
      console.log(`✅ Neues Bild erstellt für: ${product.name}`);
    } else {
      console.log(`❌ Produkt nicht gefunden: ${update.name}`);
    }
  }

  console.log('\n✨ Fertig! Die Bilder sollten jetzt konsistent angezeigt werden.');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
