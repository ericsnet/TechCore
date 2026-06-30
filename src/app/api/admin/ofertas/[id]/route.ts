import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const productId = parseInt(id);

  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (result.length === 0) {
    return NextResponse.json({ error: "Oferta no encontrada" }, { status: 404 });
  }

  return NextResponse.json(result[0]);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const productId = parseInt(id);

  try {
    const data = await request.json();

    const result = await db
      .update(products)
      .set({
        name: data.name,
        description: data.description,
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
        updatedAt: new Date(),
      })
      .where(eq(products.id, productId))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Oferta no encontrada" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Error al actualizar la oferta" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const productId = parseInt(id);

  try {
    await db.delete(products).where(eq(products.id, productId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Error al eliminar la oferta" },
      { status: 500 }
    );
  }
}
