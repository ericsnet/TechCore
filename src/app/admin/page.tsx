"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Cpu,
  Package,
  FolderOpen,
  Plus,
  LogOut,
  TrendingUp,
  Tag,
  Star,
  BarChart3,
  MousePointer,
  Users,
} from "lucide-react";

interface UserInfo {
  id: number;
  email: string;
  name: string | null;
  isAdmin: boolean;
}

interface Stats {
  totalOfertas: number;
  ofertasActivas: number;
  categorias: number;
  destacadas: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/session");
      if (!res.ok) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (!data.user?.isAdmin) {
        router.push("/admin/login");
        return;
      }
      setUser(data.user);
      loadStats();
    } catch {
      router.push("/admin/login");
    }
  };

  const loadStats = async () => {
    try {
      const [ofertasRes, categoriasRes] = await Promise.all([
        fetch("/api/admin/ofertas"),
        fetch("/api/admin/categorias"),
      ]);
      const ofertas = await ofertasRes.json();
      const categorias = await categoriasRes.json();

      setStats({
        totalOfertas: ofertas.length,
        ofertasActivas: ofertas.filter((o: { isActive: boolean }) => o.isActive).length,
        categorias: categorias.length,
        destacadas: ofertas.filter((o: { isFeatured: boolean }) => o.isFeatured).length,
      });
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-600 to-accent-600 rounded-xl flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-slate-800">TechCore</span>
                <span className="text-slate-400 text-sm ml-2">Admin</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            ¡Hola, {user?.name || "Admin"}!
          </h1>
          <p className="text-slate-500 mt-1">
            Gestiona las ofertas de TechCore desde aquí.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Ofertas",
              value: stats?.totalOfertas || 0,
              icon: <Package className="w-5 h-5" />,
              color: "bg-blue-50 text-blue-600",
            },
            {
              label: "Ofertas Activas",
              value: stats?.ofertasActivas || 0,
              icon: <TrendingUp className="w-5 h-5" />,
              color: "bg-green-50 text-green-600",
            },
            {
              label: "Categorías",
              value: stats?.categorias || 0,
              icon: <FolderOpen className="w-5 h-5" />,
              color: "bg-purple-50 text-purple-600",
            },
            {
              label: "Destacadas",
              value: stats?.destacadas || 0,
              icon: <Star className="w-5 h-5" />,
              color: "bg-amber-50 text-amber-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`p-2 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/ofertas"
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-brand-200 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                  <Package className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 mb-1">
                  Gestionar Ofertas
                </h2>
                <p className="text-sm text-slate-500">
                  Añade, edita o elimina ofertas con enlaces de Amazon Afiliados, pros/contras, y más.
                </p>
              </div>
              <Plus className="w-5 h-5 text-slate-300 group-hover:text-brand-600 transition-colors" />
            </div>
          </Link>

          <Link
            href="/admin/categorias"
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-brand-200 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                  <Tag className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 mb-1">
                  Gestionar Categorías
                </h2>
                <p className="text-sm text-slate-500">
                  Administra las categorías para organizar las ofertas.
                </p>
              </div>
              <Plus className="w-5 h-5 text-slate-300 group-hover:text-purple-600 transition-colors" />
            </div>
          </Link>
        </div>

        {/* Link to public site */}
        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-600">
              Ver cómo se ve la web pública
            </span>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            Abrir TechCore →
          </Link>
        </div>
      </main>
    </div>
  );
}
