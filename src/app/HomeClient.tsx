"use client";
import Link from "next/link";
import {
  ArrowRight,
  Headphones,
  Laptop,
  Smartphone,
  Mouse,
  Watch,
  Camera,
  Shield,
  Truck,
  Star,
  Zap,
  ChevronRight,
  Award,
  ExternalLink,
  Search,
  TrendingUp,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product, Category } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  headphones: <Headphones className="w-6 h-6" />,
  laptop: <Laptop className="w-6 h-6" />,
  smartphone: <Smartphone className="w-6 h-6" />,
  mouse: <Mouse className="w-6 h-6" />,
  watch: <Watch className="w-6 h-6" />,
  camera: <Camera className="w-6 h-6" />,
};

export default function HomeClient({
  categories,
  featuredProducts,
  bestsellerProducts,
}: {
  categories: Category[];
  featuredProducts: Product[];
  bestsellerProducts: Product[];
}) {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white/90 font-medium">
                Ofertas verificadas y actualizadas a diario
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 animate-fade-in stagger-1 opacity-0"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Encuentra las{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                Mejores Ofertas
              </span>
              <br />
              en Tecnología
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl animate-fade-in stagger-2 opacity-0">
              Rastreamos Amazon España cada día para traerte los descuentos más
              potentes en auriculares, portátiles, smartphones y más.
              Tú eliges, compras directamente en Amazon.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in stagger-3 opacity-0">
              <Link
                href="/ofertas"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-xl shadow-amber-500/30 hover:shadow-amber-500/40"
              >
                <Search className="w-5 h-5" />
                Explorar Ofertas
              </Link>
              <Link
                href="/ofertas?bestseller=true"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <Award className="w-5 h-5" />
                Los Más Populares
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg animate-fade-in stagger-4 opacity-0">
            {[
              { value: "500+", label: "Ofertas rastreadas" },
              { value: "40%", label: "Descuento medio" },
              { value: "Diario", label: "Actualización" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - moved up */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <Search className="w-5 h-5" />,
                title: "Descubrimos Ofertas",
                desc: "Rastreamos Amazon a diario",
              },
              {
                icon: <Star className="w-5 h-5" />,
                title: "Seleccionamos lo Mejor",
                desc: "Solo productos verificados",
              },
              {
                icon: <ExternalLink className="w-5 h-5" />,
                title: "Compras en Amazon",
                desc: "Pago seguro y envío Prime",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{item.title}</div>
                  <div className="text-xs text-slate-400">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                Explora por Categoría
              </h2>
              <p className="text-slate-500 mt-2">Encuentra ofertas en lo que más te interesa</p>
            </div>
            <Link
              href="/ofertas"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              Ver todo <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/ofertas?category=${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] animate-fade-in opacity-0"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute inset-0">
                  <img
                    src={cat.image || ""}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white mb-2 group-hover:bg-brand-600 transition-colors">
                    {iconMap[cat.icon || ""] || <Zap className="w-6 h-6" />}
                  </div>
                  <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                  <p className="text-white/60 text-xs mt-0.5">{cat.productCount} ofertas</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DEALS */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full mb-3">
                🔥 TOP OFERTAS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                Ofertas Destacadas
              </h2>
              <p className="text-slate-500 mt-2">Los descuentos más potentes de hoy</p>
            </div>
            <Link
              href="/ofertas?featured=true"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              Ver todas <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* DEAL BANNER */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-accent-600">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <img
                src="https://images.pexels.com/photos/3619918/pexels-photo-3619918.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative p-8 sm:p-12 lg:p-16">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-4">
                  💡 AHORRA EN GRANDE
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Descuentos de hasta el 40% en Amazon
                </h2>
                <p className="text-brand-100 mb-8 text-lg">
                  Cada día seleccionamos las mejores rebajas en tecnología.
                  Compras directamente en Amazon con envío Prime y garantía completa.
                </p>
                <Link
                  href="/ofertas"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-xl"
                >
                  Descubrir Ofertas <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BESTSELLERS / MOST POPULAR */}
      {bestsellerProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full mb-3">
                  <Award className="w-3 h-3" /> MÁS POPULARES
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Lo Que Más Se Busca
                </h2>
                <p className="text-slate-500 mt-2">Las ofertas que más interesan a nuestros usuarios</p>
              </div>
              <Link
                href="/ofertas?bestseller=true"
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellerProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STEP-BY-STEP */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            ¿Cómo Funciona TechCore?
          </h2>
          <p className="text-slate-500 mb-12 max-w-2xl mx-auto">
            No somos una tienda. Somos tu radar de ofertas tech.
            Todo se compra directamente en Amazon con total seguridad.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Rastreamos Amazon",
                desc: "Nuestro equipo busca y selecciona a diario las mejores ofertas en tecnología de Amazon España.",
                icon: <Search className="w-8 h-8" />,
              },
              {
                step: "02",
                title: "Tú Comparas",
                desc: "Explora ofertas, lee reseñas, compara precios y encuentra el producto perfecto para ti.",
                icon: <Star className="w-8 h-8" />,
              },
              {
                step: "03",
                title: "Compras en Amazon",
                desc: "Haz clic en «Ver en Amazon» y completas tu compra allí con envío Prime y garantía oficial.",
                icon: <ExternalLink className="w-8 h-8" />,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-8 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-brand-400 mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 lg:py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Recibe las Mejores Ofertas
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Suscríbete gratis y te avisamos cuando encontremos chollos irresistibles en tecnología.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button className="px-8 py-3.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/30">
              Suscribirme
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-3">Sin spam. Solo las mejores ofertas, máximo 3 emails por semana.</p>
        </div>
      </section>
    </div>
  );
}
