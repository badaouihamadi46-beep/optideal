# OptiDeal

On cherche, on compare, vous choisissez.

Site de comparaison de produits en Next.js (App Router) + Prisma (SQLite par défaut, facile à basculer sur Postgres/MySQL).

## Démarrage rapide

```bash
npm install
cp .env.example .env
npx prisma generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Le site est ensuite disponible sur http://localhost:3000

## Structure

- `prisma/schema.prisma` — modèles Product / Price / Review
- `prisma/seed.js` — données d'exemple (Casque Sony, Smartphone Galaxy A55)
- `app/page.js` — page d'accueil (liste des produits, catégories, recherche)
- `app/product/[id]/page.js` — fiche produit détaillée
- `app/api/products/route.js` — API REST (GET liste, POST création)
- `lib/score.js` — `calculateOptiDealScore()`, calcul du score pondéré
- `lib/recommend.js` — `recommendProducts()`, filtre par budget/catégorie et classe par score
- `lib/updatePrices.js` — job de synchronisation des prix partenaires (à brancher sur ton vrai flux)

## Exemple d'utilisation de la recommandation

```js
import { recommendProducts } from "@/lib/recommend";

const userRequest = {
  categorie: "Smartphone", // attention : recommendProducts attend "category" (EN)
  budget: 500,
  priorite: "qualité/prix",
};

// À adapter : recommendProducts(products, { budget: 500, category: "Smartphone" })
```

> Note : ta requête utilisateur exemple utilise les clés `categorie`/`budget`/`priorite` (FR),
> alors que `recommendProducts` attend `category`/`budget` (EN). Pense à harmoniser les noms
> de clés entre le front et cette fonction, ou à faire un petit mapping avant l'appel.

## Passer en production (Postgres)

Dans `prisma/schema.prisma`, remplace :

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Puis mets à jour `DATABASE_URL` dans `.env` avec ton URL Postgres (Neon, Supabase, Railway...).
