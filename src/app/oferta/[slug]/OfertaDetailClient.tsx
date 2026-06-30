"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Star,
  ExternalLink,
  Check,
  ChevronRight,
  Shield,
  Truck,
  ThumbsUp,
  Zap,
  Share2,
  Award,
  Sparkles,
} from "lucide-react";
import StarRating from "@/components/StarRating";
import type { Product, Review } from "@/lib/types";

export default function OfertaDetailClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.product) {
          setProduct(data.product);
          setReviews(data.reviews || []);
        }
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: product?.name, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square animate-shimmer rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 w-32 animate-shimmer rounded" />
            <div className="h-8 w-full animate-shimmer rounded" />
            <div className="h-8 w-2/3 animate-shimmer rounded" />
            <div className="h-12 w-40 animate-shimmer rounded mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Oferta no encontrada</h1>
        <p className="text-slate-500 mb-6">Esta oferta ha expirado o no existe.</p>
        <Link
          href="/ofertas"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors"
        >
          Ver Ofertas
        </Link>
      </div>
    );
  }

  const rating = parseFloat(product.rating || "0");
  const price = parseFloat(product.price);
  const originalPrice = product.originalPrice ? parseFloat(product.originalPrice) : null;
  const savings = originalPrice ? originalPrice - price : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 flex-wrap">
        <Link href="/" className="hover:text-brand-600 transition-colors">Inicio</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/ofertas" className="hover:text-brand-600 transition-colors">Ofertas</Link>
        {product.categoryName && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/ofertas?category=${product.categorySlug}`} className="hover:text-brand-600 transition-colors">
              {product.categoryName}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4 animate-fade-in">
          <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden group">
            <img
              src={product.images[selectedImage] || product.images[0] || ""}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.discount && product.discount > 0 && (
              <div className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-xl shadow-lg">
                -{product.discount}% DESCUENTO
              </div>
            )}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {product.isBestseller && (
                <span className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Bestseller
                </span>
              )}
              {product.isNew && (
                <span className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Nuevo
                </span>
              )}
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? "border-brand-500 shadow-lg shadow-brand-500/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="animate-fade-in stagger-1 opacity-0">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">{product.brand}</span>
            {product.categoryName && (
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{product.categoryName}</span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {product.name}
          </h1>

          {rating > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={rating} size="md" />
              <span className="text-sm font-medium text-slate-700">{rating}</span>
              <span className="text-sm text-slate-400">({product.reviewCount?.toLocaleString("es-ES")} valoraciones en Amazon)</span>
            </div>
          )}

          {product.shortDescription && (
            <p className="text-slate-600 leading-relaxed mb-6">{product.shortDescription}</p>
          )}

          {/* Price block */}
          <div className="p-6 bg-gradient-to-br from-slate-50 to-brand-50/30 rounded-2xl border border-slate-100 mb-6">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Precio en Amazon</p>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-3xl font-bold text-slate-900">{price.toFixed(2)}€</span>
              {originalPrice && (
                <span className="text-lg text-slate-400 line-through mb-0.5">{originalPrice.toFixed(2)}€</span>
              )}
            </div>
            {savings && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-full mb-4">
                🎉 Ahorras {savings.toFixed(2)}€
              </div>
            )}

            <a
              href={product.amazonUrl || "#"}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-xl shadow-amber-500/25 text-base mb-3"
            >
              <ExternalLink className="w-5 h-5" />
              Ver Oferta en Amazon
            </a>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {copied ? (
                <><Check className="w-4 h-4 text-emerald-500" /> ¡Enlace copiado!</>
              ) : (
                <><Share2 className="w-4 h-4" /> Compartir esta oferta</>
              )}
            </button>
          </div>

          {product.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">Características Principales</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Truck className="w-5 h-5" />, label: "Envío Amazon" },
              { icon: <Shield className="w-5 h-5" />, label: "Garantía oficial" },
              { icon: <Zap className="w-5 h-5" />, label: "Compra segura" },
            ].map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-1.5 p-3 bg-slate-50 rounded-xl text-center">
                <span className="text-brand-600">{badge.icon}</span>
                <span className="text-xs text-slate-600 font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-1 border-b border-slate-200 mb-8">
          {([
            { key: "desc" as const, label: "Descripción" },
            { key: "specs" as const, label: "Especificaciones" },
            { key: "reviews" as const, label: `Opiniones (${reviews.length})` },
          ]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.key ? "border-brand-600 text-brand-700" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "desc" && (
          <div className="max-w-3xl animate-fade-in">
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">{product.description}</p>
            <div className="mt-8">
              <a
                href={product.amazonUrl || "#"}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25"
              >
                <ExternalLink className="w-5 h-5" /> Ver Precio Actual en Amazon
              </a>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="max-w-2xl animate-fade-in">
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div key={key} className={`flex items-center px-6 py-4 ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                  <span className="text-sm font-medium text-slate-700 w-48 flex-shrink-0">{key}</span>
                  <span className="text-sm text-slate-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-3xl animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 p-6 bg-slate-50 rounded-2xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900">{rating}</div>
                <StarRating rating={rating} size="md" />
                <div className="text-xs text-slate-400 mt-1">{product.reviewCount} opiniones</div>
              </div>
              <div className="flex-1 w-full">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = reviews.filter((r) => r.rating === stars).length;
                  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-500 w-4">{stars}</span>
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-slate-400 w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="p-6 bg-white rounded-2xl border border-slate-100">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-slate-800">{review.author}</span>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-semibold rounded-full">
                            <Check className="w-3 h-3" /> Compra verificada
                          </span>
                        )}
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <span className="text-xs text-slate-400">
                      {new Date(review.createdAt).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  </div>
                  {review.title && <h4 className="text-sm font-semibold text-slate-800 mb-1">{review.title}</h4>}
                  <p className="text-sm text-slate-600 leading-relaxed">{review.content}</p>
                  {review.helpful != null && review.helpful > 0 && (
                    <div className="flex items-center gap-1 mt-3 text-xs text-slate-400">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{review.helpful} personas encontraron esto útil</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href={product.amazonUrl || "#"}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                Ver todas las opiniones en Amazon <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Affiliate notice */}
      <div className="mt-12 p-4 bg-amber-50 border border-amber-100 rounded-xl text-center text-xs text-amber-700">
        Los precios y la disponibilidad son precisos a la fecha/hora indicada y están sujetos a cambios.
        Toda compra se realiza directamente en Amazon.es. TechCore participa en el Programa de Afiliados de Amazon EU.
      </div>
    </div>
  );
}
