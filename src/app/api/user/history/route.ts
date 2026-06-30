import { NextResponse } from "next/server";
import { db } from "@/db";
import { clickHistory, products, categories } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const history = await db
    .select({
      id: clickHistory.id,
      clickedAt: clickHistory.clickedAt,
      amazonUrl: clickHistory.amazonUrl,
      product: {
        id: products.id,
        name: products.name,
        slug: products.slug,
        price: products.price,
        originalPrice: products.originalPrice,
        discount: products.discount,
        brand: products.brand,
        images: products.images,
        categoryName: categories.name,
      },
    })
    .from(clickHistory)
    .innerJoin(products, eq(clickHistory.productId, products.id))
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(clickHistory.userId, session.id))
    .orderBy(desc(clickHistory.clickedAt))
    .limit(50);

  return NextResponse.json(history);
}
