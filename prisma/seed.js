const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.review.deleteMany();
  await prisma.price.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.create({
    data: {
      name: "Casque Bluetooth Sony",
      category: "High-tech",
      brand: "Sony",
      description: "Casque Bluetooth avec réduction de bruit active.",
      score: 9.3,
      quality: 9,
      popularity: 8,
      prices: {
        create: [
          { shop: "Boutique A", amount: 89.99 },
          { shop: "Boutique B", amount: 99.99 },
        ],
      },
      reviews: {
        create: [
          {
            rating: 4.7,
            summary: "Très bonne qualité sonore et bonne autonomie.",
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Smartphone Galaxy A55",
      category: "Smartphone",
      brand: "Samsung",
      description: "Smartphone milieu de gamme avec bon appareil photo.",
      score: 9.1,
      quality: 8.8,
      popularity: 8.5,
      prices: {
        create: [
          { shop: "Boutique A", amount: 399.99 },
          { shop: "Boutique C", amount: 429.0 },
        ],
      },
      reviews: {
        create: [
          {
            rating: 4.5,
            summary: "Très bon appareil photo et grande autonomie.",
          },
        ],
      },
    },
  });

  console.log("Seed terminé ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
