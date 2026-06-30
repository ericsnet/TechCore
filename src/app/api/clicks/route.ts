import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { clickHistory, products } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, sql } from "drizzle-orm";

// Record a click
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const { productId, amazonUrl } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    // Increment click count on product
    await db
      .update(products)
      .set({ clickCount: sql`${products.clickCount} + 1` })
      .where(eq(products.id, productId));

    // If user is logged in, save to history
    if (session) {
      await db.insert(clickHistory).values({
        userId: session.id,
        productId,
        amazonUrl: amazonUrl || null,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Click error:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
