// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Insert data into Users table
  await prisma.users.create({
    data: {
      email: 'hawater@gmail.com',
      name: 'Ahmed Hawater',
      password: 'user1',
      address: 'Cairo',
      carts: {
        create: {},
      },
      orders: {
        create: [],
      },
    },
  });

  // Insert data into Products table
  await prisma.products.createMany({
    data: [
      {
        name: 'Smartphone X200',
        description:
          'Latest model smartphone with 128GB storage, 6GB RAM, and a powerful camera.',
        price: 699.99,
        stock: 150,
      },
      {
        name: 'Laptop Pro 15',
        description:
          'High-performance laptop with 15.6-inch display, 16GB RAM, 512GB SSD, and Intel i7 processor.',
        price: 1299.99,
        stock: 75,
      },
      {
        name: 'Wireless Earbuds',
        description:
          'Noise-cancelling wireless earbuds with 24-hour battery life and Bluetooth 5.0.',
        price: 149.99,
        stock: 200,
      },
    ],
  });

  // Insert data into Coupons table
  await prisma.coupons.createMany({
    data: [
      {
        code: 'SUMMER21',
        discount: 15.5,
        expiry: new Date('2024-08-01T00:00:00Z'),
      },
      {
        code: 'WINTER21',
        discount: 20.0,
        expiry: new Date('2024-12-01T00:00:00Z'),
      },
      {
        code: 'SPRING22',
        discount: 10.25,
        expiry: new Date('2024-04-01T00:00:00Z'),
      },
    ],
  });

  console.log('Seed data inserted successfully');
}

seed()
  .catch((error) => {
    console.error('Error seeding data:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
