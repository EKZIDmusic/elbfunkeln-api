const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('📸 Füge Bilder zu Produkten hinzu...\n');

  // Produkte mit Bild-URLs aktualisieren
  const updates = [
    {
      name: 'Drahtarmband Kupfer',
      imageUrl: 'https://picsum.photos/seed/armband-kupfer/400/400',
      alt: 'Drahtarmband Kupfer Hauptansicht',
    },
    {
      name: 'Drahtkette Bronze Anhänger',
      imageUrl: 'https://picsum.photos/seed/kette-bronze/400/400',
      alt: 'Drahtkette Bronze Anhänger',
    },
    {
      name: 'TEST',
      imageUrl: 'https://picsum.photos/seed/test-produkt/400/400',
      alt: 'Test Produkt',
    },
  ];

  for (const update of updates) {
    const product = await prisma.product.findFirst({
      where: { name: update.name },
    });

    if (product) {
      // Prüfe ob schon ein Bild existiert
      const existingImage = await prisma.productImage.findFirst({
        where: { productId: product.id },
      });

      if (!existingImage) {
        await prisma.productImage.create({
          data: {
            productId: product.id,
            url: update.imageUrl,
            alt: update.alt,
            isPrimary: true,
          },
        });
        console.log(`✅ Bild hinzugefügt für: ${product.name}`);
      } else {
        console.log(`⏭️  Bild existiert bereits für: ${product.name}`);
      }
    } else {
      console.log(`❌ Produkt nicht gefunden: ${update.name}`);
    }
  }

  console.log('\n✨ Fertig!');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
