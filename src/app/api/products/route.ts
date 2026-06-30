import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, ilike, desc, asc, and, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const category = params.get("category");
  const search = params.get("search");
  const sort = params.get("sort") || "featured";
  const brand = params.get("brand");
  const featured = params.get("featured");
  const bestseller = params.get("bestseller");
  const isNew = params.get("new");
  const activeOnly = params.get("active") !== "false";

  const conditions = [];

  // Only show active products on public API
  if (activeOnly) {
    conditions.push(eq(products.isActive, true));
  }

  if (category) {
    const cat = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, category))
      .limit(1);
    if (cat.length > 0) {
      conditions.push(eq(products.categoryId, cat[0].id));
    }
  }

  if (search) {
    conditions.push(
      sql`(${products.name} ILIKE ${"%" + search + "%"} OR ${products.description} ILIKE ${"%" + search + "%"} OR ${products.brand} ILIKE ${"%" + search + "%"})`
    );
  }

  if (brand) {
    conditions.push(ilike(products.brand, brand));
  }

  if (featured === "true") {
    conditions.push(eq(products.isFeatured, true));
  }

  if (bestseller === "true") {
    conditions.push(eq(products.isBestseller, true));
  }

  if (isNew === "true") {
    conditions.push(eq(products.isNew, true));
  }

  let orderBy;
  switch (sort) {
    case "price-asc":
      orderBy = asc(sql`${products.price}::numeric`);
      break;
    case "price-desc":
      orderBy = desc(sql`${products.price}::numeric`);
      break;
    case "rating":
      orderBy = desc(sql`${products.rating}::numeric`);
      break;
    case "newest":
      orderBy = desc(products.createdAt);
      break;
    case "discount":
      orderBy = desc(products.discount);
      break;
    default:
      orderBy = desc(products.isFeatured);
  }

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
      amazonUrl: products.amazonUrl,
      rating: products.rating,
      reviewCount: products.reviewCount,
      inStock: products.inStock,
      isFeatured: products.isFeatured,
      isBestseller: products.isBestseller,
      isNew: products.isNew,
      isActive: products.isActive,
      createdAt: products.createdAt,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(orderBy);

  return NextResponse.json(result);
}
