/**
 * Recommande jusqu'à 3 produits selon un budget et une catégorie,
 * classés par score OptiDeal décroissant.
 *
 * @param {Array} products - liste de produits (avec price, category, score)
 * @param {{ budget: number, category: string }} userRequest
 * @returns {Array} top 3 produits recommandés
 */
export function recommendProducts(products, userRequest) {
  let results = products.filter((product) => {
    if (product.price > userRequest.budget) {
      return false;
    }
    if (product.category !== userRequest.category) {
      return false;
    }
    return true;
  });

  results.sort((a, b) => b.score - a.score);

  return results.slice(0, 3);
}
