import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { favorites, products, categories } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, and, desc } from "drizzle-orm";

// Get user's favorites
export async function GET() {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const favs = await db
    .select({
      id: favorites.id,
      createdAt: favorites.createdAt,
      product: {
        id: products.id,
        name: products.name,
        slug: products.slug,
        price: products.price,
        originalPrice: products.originalPrice,
        discount: products.discount,
        brand: products.brand,
        images: products.images,
        amazonUrl: products.amazonUrl,
        rating: products.rating,
        categoryName: categories.name,
      },
    })
    .from(favorites)
    .innerJoin(products, eq(favorites.productId, products.id))
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(favorites.userId, session.id))
    .orderBy(desc(favorites.createdAt));

  return NextResponse.json(favs);
}

// Add to favorites
export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { productId } = await request.json();

    // Check if already favorited
    const existing = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, session.id),
          eq(favorites.productId, productId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ success: true, action: "already_exists" });
    }

    await db.insert(favorites).values({
      userId: session.id,
      productId,
    });

    return NextResponse.json({ success: true, action: "added" });
  } catch (error) {
    console.error("Add favorite error:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

// Remove from favorites
export async function DELETE(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { productId } = await request.json();

    await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.userId, session.id),
          eq(favorites.productId, productId)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Remove favorite error:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
