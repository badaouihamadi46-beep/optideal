import { prisma } from "@/lib/prisma";

/**
 * Remplace cette fonction par un vrai appel à l'API/scraper de tes partenaires.
 * Doit renvoyer un tableau de { productName, shop, amount, link }.
 */
async function getProductsFromPartners() {
  // Exemple de retour attendu :
  // return [{ productName: "Casque Bluetooth Sony", shop: "Boutique A", amount: 84.99, link: "https://..." }];
  return [];
}

export async function updatePrices() {
  const partnerPrices = await getProductsFromPartners();

  for (const entry of partnerPrices) {
    const product = await prisma.product.findFirst({
      where: { name: entry.productName },
    });

    if (!product) {
      console.warn(`Produit introuvable pour: ${entry.productName}`);
      continue;
    }

    const existingPrice = await prisma.price.findFirst({
      where: { productId: product.id, shop: entry.shop },
    });

    if (existingPrice) {
      await prisma.price.update({
        where: { id: existingPrice.id },
        data: { amount: entry.amount, link: entry.link || existingPrice.link },
      });
    } else {
      await prisma.price.create({
        data: {
          shop: entry.shop,
          amount: entry.amount,
          link: entry.link || "",
          productId: product.id,
        },
      });
    }
  }

  console.log("Prix mis à jour !");
}
