"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  History,
  Heart,
  LogOut,
  ExternalLink,
  Clock,
  ChevronRight,
  Cpu,
  Settings,
  Shield,
} from "lucide-react";

interface UserInfo {
  id: number;
  email: string;
  name: string | null;
  isAdmin: boolean;
}

interface HistoryItem {
  id: number;
  clickedAt: string;
  amazonUrl: string | null;
  product: {
    id: number;
    name: string;
    slug: string;
    price: string;
    originalPrice: string | null;
    discount: number | null;
    brand: string | null;
    images: string[];
    categoryName: string | null;
  };
}

interface FavoriteItem {
  id: number;
  createdAt: string;
  product: {
    id: number;
    name: string;
    slug: string;
    price: string;
    originalPrice: string | null;
    discount: number | null;
    brand: string | null;
    images: string[];
    amazonUrl: string | null;
    rating: string | null;
    categoryName: string | null;
  };
}

export default function CuentaPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"historial" | "favoritos">("historial");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/session");
      if (!res.ok) {
        router.push("/cuenta/login");
        return;
      }
      const data = await res.json();
      setUser(data.user);
      loadData();
    } catch {
      router.push("/cuenta/login");
    }
  };

  const loadData = async () => {
    try {
      const [historyRes, favsRes] = await Promise.all([
        fetch("/api/user/history"),
        fetch("/api/user/favorites"),
      ]);
      if (historyRes.ok) setHistory(await historyRes.json());
      if (favsRes.ok) setFavorites(await favsRes.json());
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const removeFavorite = async (productId: number) => {
    await fetch("/api/user/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    setFavorites(favorites.filter((f) => f.product.id !== productId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-accent-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
            {user?.name?.charAt(0).toUpperCase() || user?.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {user?.name || "Mi Cuenta"}
            </h1>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {user?.isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-xl hover:bg-amber-600 transition-colors"
            >
              <Shield className="w-4 h-4" />
              Panel Admin
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <History className="w-5 h-5 text-brand-600" />
            <span className="text-sm text-slate-500">Ofertas Visitadas</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{history.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-sm text-slate-500">Favoritos</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{favorites.length}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("historial")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === "historial"
              ? "bg-white text-slate-800 shadow"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <History className="w-4 h-4" />
          Historial
        </button>
        <button
          onClick={() => setActiveTab("favoritos")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === "favoritos"
              ? "bg-white text-slate-800 shadow"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Heart className="w-4 h-4" />
          Favoritos
        </button>
      </div>

      {/* Content */}
      {activeTab === "historial" && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {history.length === 0 ? (
            <div className="p-12 text-center">
              <History className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Sin historial aún
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Cuando hagas clic en "Ver en Amazon" aparecerá aquí.
              </p>
              <Link
                href="/ofertas"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Explorar ofertas <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {history.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-slate-50">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    {item.product.images[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        📷
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/oferta/${item.product.slug}`}
                      className="text-sm font-medium text-slate-800 hover:text-brand-600 line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{item.product.brand}</span>
                      {item.product.categoryName && (
                        <>
                          <span>•</span>
                          <span>{item.product.categoryName}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-semibold text-slate-800">
                        {parseFloat(item.product.price).toFixed(2)}€
                      </span>
                      {item.product.discount && (
                        <span className="text-xs text-emerald-600">-{item.product.discount}%</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
                      <Clock className="w-3 h-3" />
                      {new Date(item.clickedAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    {item.amazonUrl && (
                      <a
                        href={item.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700"
                      >
                        <ExternalLink className="w-3 h-3" /> Amazon
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "favoritos" && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {favorites.length === 0 ? (
            <div className="p-12 text-center">
              <Heart className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Sin favoritos aún
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Guarda ofertas haciendo clic en el corazón.
              </p>
              <Link
                href="/ofertas"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Explorar ofertas <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {favorites.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-slate-50">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    {item.product.images[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        📷
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/oferta/${item.product.slug}`}
                      className="text-sm font-medium text-slate-800 hover:text-brand-600 line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{item.product.brand}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-semibold text-slate-800">
                        {parseFloat(item.product.price).toFixed(2)}€
                      </span>
                      {item.product.discount && (
                        <span className="text-xs text-emerald-600">-{item.product.discount}%</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.product.amazonUrl && (
                      <a
                        href={item.product.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-amber-500 text-white text-xs font-medium rounded-lg hover:bg-amber-600"
                      >
                        Amazon
                      </a>
                    )}
                    <button
                      onClick={() => removeFavorite(item.product.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
