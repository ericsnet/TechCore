import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const session = await getSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const result = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      price: products.price,
      originalPrice: products.originalPrice,
      discount: products.discount,
      brand: products.brand,
      images: products.images,
      amazonUrl: products.amazonUrl,
      isFeatured: products.isFeatured,
      isBestseller: products.isBestseller,
      isNew: products.isNew,
      isActive: products.isActive,
      clickCount: products.clickCount,
      createdAt: products.createdAt,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(desc(products.createdAt));

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const data = await request.json();

    const slug = slugify(data.name);

    // Check for duplicate slug
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);

    const finalSlug = existing.length > 0 ? `${slug}-${Date.now()}` : slug;

    const result = await db
      .insert(products)
      .values({
        name: data.name,
        slug: finalSlug,
        description: data.description || "",
        shortDescription: data.shortDescription || null,
        price: data.price,
        originalPrice: data.originalPrice || null,
        discount: data.discount || null,
        categoryId: data.categoryId || null,
        brand: data.brand || null,
        images: data.images || [],
        features: data.features || [],
        specs: data.specs || {},
        extraInfo: data.extraInfo || null,
        prosAndCons: data.prosAndCons || null,
        amazonUrl: data.amazonUrl || null,
        rating: data.rating || "0",
        reviewCount: data.reviewCount || 0,
        inStock: data.inStock ?? true,
        isFeatured: data.isFeatured ?? false,
        isBestseller: data.isBestseller ?? false,
        isNew: data.isNew ?? false,
        isActive: data.isActive ?? true,
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Error al crear la oferta" },
      { status: 500 }
    );
  }
}
