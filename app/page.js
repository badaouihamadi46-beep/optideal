import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getProducts() {
  const products = await prisma.product.findMany({
    include: { prices: true, reviews: true },
    orderBy: { score: "desc" },
  });
  return products;
}

export default async function HomePage() {
  const products = await getProducts();
  const categories = [
    { emoji: "📱", label: "High-tech" },
    { emoji: "🏠", label: "Maison" },
    { emoji: "🚗", label: "Auto" },
    { emoji: "👟", label: "Sport" },
    { emoji: "💄", label: "Beauté" },
  ];

  return (
    <>
      <header>
        <div className="logo">✓ OptiDeal</div>
        <p className="slogan">On cherche, on compare, vous choisissez.</p>
        <div className="search">
          <input placeholder="Rechercher un produit..." />
        </div>
      </header>

      <h2 className="section-title">Nos catégories</h2>
      <div className="categories">
        {categories.map((c) => (
          <div className="category" key={c.label}>
            {c.emoji} {c.label}
          </div>
        ))}
      </div>

      <h2 className="section-title">Les meilleurs choix du moment</h2>
      <div className="products">
        {products.length === 0 && (
          <p style={{ textAlign: "center", color: "#888" }}>
            Aucun produit pour le moment. Lance <code>npm run prisma:seed</code>.
          </p>
        )}
        {products.map((product) => {
          const bestPrice = product.prices.length
            ? Math.min(...product.prices.map((p) => p.amount))
            : null;
          return (
            <div className="card" key={product.id}>
              <h3>{product.name}</h3>
              <p className="score">Score OptiDeal : {product.score}/10</p>
              {product.reviews[0] && <p>✅ {product.reviews[0].summary}</p>}
              {bestPrice !== null && (
                <p>💰 Prix : {bestPrice.toFixed(2)} €</p>
              )}
              <Link href={`/product/${product.id}`}>
                <button>Voir le comparatif</button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
