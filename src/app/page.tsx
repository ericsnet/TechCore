import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, desc, sql, and } from "drizzle-orm";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const allCategories = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        image: categories.image,
        icon: categories.icon,
        createdAt: categories.createdAt,
        productCount: sql<number>`(SELECT count(*) FROM products WHERE products.category_id = ${categories.id} AND products.is_active = true)::int`,
      })
      .from(categories)
      .orderBy(categories.name);

    const featuredProducts = await db
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
        createdAt: products.createdAt,
        categoryName: categories.name,
        categorySlug: categories.slug,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(eq(products.isFeatured, true), eq(products.isActive, true)))
      .orderBy(desc(products.createdAt))
      .limit(6);

    const bestsellerProducts = await db
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
        createdAt: products.createdAt,
        categoryName: categories.name,
        categorySlug: categories.slug,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(eq(products.isBestseller, true), eq(products.isActive, true)))
      .orderBy(desc(sql`${products.rating}::numeric`))
      .limit(4);

    return { categories: allCategories, featuredProducts, bestsellerProducts };
  } catch {
    return { categories: [], featuredProducts: [], bestsellerProducts: [] };
  }
}

export default async function HomePage() {
  const data = await getData();
  return <HomeClient {...data} />;
}
