import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { sql } from "drizzle-orm";
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
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      image: categories.image,
      icon: categories.icon,
      createdAt: categories.createdAt,
      productCount: sql<number>`(SELECT count(*) FROM products WHERE products.category_id = ${categories.id})::int`,
    })
    .from(categories)
    .orderBy(categories.name);

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

    const result = await db
      .insert(categories)
      .values({
        name: data.name,
        slug,
        description: data.description || null,
        image: data.image || null,
        icon: data.icon || null,
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Create category error:", error);
    return NextResponse.json(
      { error: "Error al crear la categoría" },
      { status: 500 }
    );
  }
}
