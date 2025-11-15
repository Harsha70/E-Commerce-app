console.log("Seeding database...");

import "dotenv/config";
import { PrismaClient, Product } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const electronics = await prisma.category.create({
    data: { name: "Electronics", slug: "electronics" },
  });
  console.log("Created category:", electronics);

  const fashion = await prisma.category.create({
    data: { name: "Fashion", slug: "fashion" },
  });
  console.log("Created category:", fashion);
  const home = await prisma.category.create({
    data: { name: "Home", slug: "home" },
  });
  console.log("Created category:", home);

  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Wireless Headphones",
      description:
        "Premium noise-cancelling wireless headphones with long battery life.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      categoryId: electronics.id,
      slug: "wireless-headphones",
      inventory: 50,
    },
    {
      id: "2",
      name: "Smart Watch",
      description:
        "Fitness tracker with heart rate monitoring and sleep analysis.",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      categoryId: electronics.id,
      slug: "smart-watch",
      inventory: 30,
    },
  ];

  for (const productData of mockProducts) {
    const product = await prisma.product.create({ data: productData });
    console.log("Created product:", product);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
