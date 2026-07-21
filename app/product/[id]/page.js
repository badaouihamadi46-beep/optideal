import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getProduct(id) {
  return prisma.product.findUnique({
    where: { id: Number(id) },
    include: { prices: true, reviews: true },
  });
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <p style={{ textAlign: "center" }}>Produit introuvable.</p>;
  }

  const bestPrice = product.prices.length
    ? product.prices.reduce((min, p) => (p.amount < min.amount ? p : min))
    : null;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 40 }}>
      <h1>{product.name}</h1>

      <h2>⭐ Score OptiDeal : {product.score}/10</h2>

      <h3>🏆 Notre recommandation</h3>
      <p>{product.reviews[0]?.summary || "Meilleur choix pour cette catégorie."}</p>

      {bestPrice && (
        <>
          <h2>
            💰 Meilleur prix : {bestPrice.amount.toFixed(2)} € ({bestPrice.shop})
          </h2>
          <a href={bestPrice.link || "#"}>
            <button>Acheter au meilleur prix</button>
          </a>
        </>
      )}
    </div>
  );
}
