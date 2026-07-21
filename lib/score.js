/**
 * Calcule le score OptiDeal d'un produit.
 * Pondération : qualité 40%, avis 30%, prix 20%, popularité 10%.
 *
 * @param {{ quality: number, reviews: number, priceScore: number, popularity: number }} product
 * @returns {number} score sur 10, arrondi à 2 décimales
 */
export function calculateOptiDealScore(product) {
  const quality = product.quality * 0.4;
  const reviews = product.reviews * 0.3;
  const price = product.priceScore * 0.2;
  const popularity = product.popularity * 0.1;

  const total = quality + reviews + price + popularity;

  return Number(total.toFixed(2));
}
