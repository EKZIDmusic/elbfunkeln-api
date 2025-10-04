import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
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

  // Create categories
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

  // Create products
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
