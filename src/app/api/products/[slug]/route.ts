import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const result = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      shortDescription: products.shortDescription,
      price: products.price,
      originalPrice: products.originalPrice,
      discount: products.discount,
      categoryId: products.categoryId,
      brand: products.brand,
      images: products.images,
      features: products.features,
      specs: products.specs,
      extraInfo: products.extraInfo,
      prosAndCons: products.prosAndCons,
      amazonUrl: products.amazonUrl,
      rating: products.rating,
      reviewCount: products.reviewCount,
      inStock: products.inStock,
      isFeatured: products.isFeatured,
      isBestseller: products.isBestseller,
      isNew: products.isNew,
      isActive: products.isActive,
      clickCount: products.clickCount,
      createdAt: products.createdAt,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, slug))
    .limit(1);

  if (result.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product: result[0] });
}
