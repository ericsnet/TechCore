"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Search,
  Grid3X3,
  LayoutList,
  Flame,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product, Category } from "@/lib/types";

const sortOptions = [
  { value: "featured", label: "Más relevantes" },
  { value: "discount", label: "Mayor descuento" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
  { value: "newest", label: "Más recientes" },
];

export default function OfertasClient() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(searchParams.get("sort") || "featured");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState(3);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (searchQuery) params.set("search", searchQuery);
    params.set("sort", sort);
    if (searchParams.get("featured")) params.set("featured", "true");
    if (searchParams.get("bestseller")) params.set("bestseller", "true");
    if (searchParams.get("new")) params.set("new", "true");

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery, sort, searchParams]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch {
      setCategories([]);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const getPageTitle = () => {
    if (searchParams.get("featured")) return "🔥 Top Ofertas";
    if (searchParams.get("bestseller")) return "⭐ Los Más Populares";
    if (searchParams.get("new")) return "✨ Novedades";
    if (searchQuery) return `Resultados para "${searchQuery}"`;
    if (selectedCategory) {
      const cat = categories.find((c) => c.slug === selectedCategory);
      return cat ? `Ofertas en ${cat.name}` : "Ofertas";
    }
    return "Todas las Ofertas";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <a href="/" className="hover:text-brand-600 transition-colors">Inicio</a>
        <span>/</span>
        <span className="text-slate-700 font-medium">{getPageTitle()}</span>
      </nav>

      {/* Title & controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            {getPageTitle()}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {loading ? "Buscando ofertas..." : `${products.length} ofertas encontradas`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1 border border-slate-200 rounded-lg p-0.5">
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded ${gridCols === 3 ? "bg-brand-50 text-brand-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(2)}
              className={`p-1.5 rounded ${gridCols === 2 ? "bg-brand-50 text-brand-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filtros
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`${
            filtersOpen
              ? "fixed inset-0 z-50 bg-black/40 lg:bg-transparent lg:relative lg:inset-auto lg:z-auto"
              : "hidden lg:block"
          } lg:w-64 lg:flex-shrink-0`}
        >
          <div
            className={`${
              filtersOpen
                ? "absolute right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto"
                : ""
            } lg:relative lg:w-full lg:shadow-none lg:p-0`}
          >
            {filtersOpen && (
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-lg font-semibold">Filtros</h3>
                <button onClick={() => setFiltersOpen(false)}><X className="w-5 h-5" /></button>
              </div>
            )}

            {/* Search */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Buscar ofertas</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Categoría</label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === "" ? "bg-brand-50 text-brand-700 font-medium" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Todas las categorías
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug ? "bg-brand-50 text-brand-700 font-medium" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-400">{cat.productCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Info box */}
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-800">¿Cómo funciona?</span>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                Seleccionamos las mejores ofertas de Amazon España. Al hacer clic en &ldquo;Ver en Amazon&rdquo;
                serás redirigido para comprar directamente allí con total seguridad.
              </p>
            </div>

            {filtersOpen && (
              <button
                onClick={() => setFiltersOpen(false)}
                className="lg:hidden w-full py-3 bg-brand-600 text-white text-sm font-semibold rounded-xl mt-4"
              >
                Aplicar Filtros
              </button>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-6`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                  <div className="aspect-[4/3] animate-shimmer" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 w-20 animate-shimmer rounded" />
                    <div className="h-4 w-full animate-shimmer rounded" />
                    <div className="h-4 w-2/3 animate-shimmer rounded" />
                    <div className="h-6 w-24 animate-shimmer rounded mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">No se encontraron ofertas</h3>
              <p className="text-slate-500 text-sm mb-6">Intenta con otros filtros o términos de búsqueda</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory(""); }}
                className="px-6 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-6`}>
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
