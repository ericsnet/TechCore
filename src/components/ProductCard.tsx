"use client";
import Link from "next/link";
import { Star, ExternalLink, Zap, Award, Sparkles } from "lucide-react";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const rating = parseFloat(product.rating || "0");
  const price = parseFloat(product.price);
  const originalPrice = product.originalPrice ? parseFloat(product.originalPrice) : null;
  const savings = originalPrice ? (originalPrice - price).toFixed(2) : null;

  return (
    <div
      className={`group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300 animate-fade-in opacity-0 flex flex-col`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image */}
      <Link href={`/oferta/${product.slug}`} className="relative block overflow-hidden">
        <div className="aspect-[4/3] bg-slate-50">
          <img
            src={product.images[0] || ""}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount && product.discount > 0 && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-[11px] font-bold rounded-lg shadow-lg">
              -{product.discount}%
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2.5 py-1 bg-amber-500 text-white text-[11px] font-bold rounded-lg shadow-lg flex items-center gap-1">
              <Award className="w-3 h-3" /> Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 bg-emerald-500 text-white text-[11px] font-bold rounded-lg shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Nuevo
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-medium text-brand-600 uppercase tracking-wider">
            {product.brand}
          </span>
          {product.categoryName && (
            <>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] text-slate-400">
                {product.categoryName}
              </span>
            </>
          )}
        </div>

        <Link href={`/oferta/${product.slug}`}>
          <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 hover:text-brand-600 transition-colors leading-snug mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= Math.round(rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-slate-200 fill-slate-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-500">
              {rating} ({product.reviewCount?.toLocaleString("es-ES")})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-slate-900">
              {price.toFixed(2)}€
            </span>
            {originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                {originalPrice.toFixed(2)}€
              </span>
            )}
          </div>
          {savings && (
            <p className="text-xs text-emerald-600 font-medium mb-3">
              Ahorras {savings}€
            </p>
          )}
          <div className="flex items-center gap-2">
            <a
              href={product.amazonUrl || "#"}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/20"
            >
              Ver en Amazon <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              href={`/oferta/${product.slug}`}
              className="px-3 py-2.5 text-xs font-medium text-brand-600 border border-brand-200 rounded-xl hover:bg-brand-50 transition-colors"
            >
              Detalles
            </Link>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Zap className="w-3 h-3 text-amber-500" />
            <span className="text-[10px] text-slate-400">
              Envío y venta por Amazon España
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
