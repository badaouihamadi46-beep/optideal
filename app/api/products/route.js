import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      prices: true,
      reviews: true,
    },
  });

  return Response.json(products);
}

export async function POST(request) {
  const body = await request.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      category: body.category,
      brand: body.brand,
      description: body.description || "",
      score: body.score,
      quality: body.quality || 0,
      popularity: body.popularity || 0,
      prices: {
        create: (body.prices || []).map((p) => ({
          shop: p.shop,
          amount: p.amount,
          link: p.link || "",
        })),
      },
      reviews: body.review
        ? {
            create: [
              {
                rating: body.review.rating,
                summary: body.review.summary,
              },
            ],
          }
        : undefined,
    },
    include: { prices: true, reviews: true },
  });

  return Response.json(product, { status: 201 });
}
