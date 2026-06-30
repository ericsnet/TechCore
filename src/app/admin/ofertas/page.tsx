"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Cpu, Plus, ArrowLeft, Pencil, Trash2, ExternalLink, Search, Eye, EyeOff, MousePointer } from "lucide-react";

interface Oferta {
  id: number;
  name: string;
  slug: string;
  price: string;
  originalPrice: string | null;
  discount: number | null;
  brand: string | null;
  images: string[];
  amazonUrl: string | null;
  isFeatured: boolean | null;
  isBestseller: boolean | null;
  isNew: boolean | null;
  isActive: boolean | null;
  clickCount: number | null;
  createdAt: string;
  categoryName: string | null;
}

export default function AdminOfertasPage() {
  const router = useRouter();
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    const res = await fetch("/api/auth/session");
    if (!res.ok) { router.push("/admin/login"); return; }
    const data = await res.json();
    if (!data.user?.isAdmin) { router.push("/admin/login"); return; }
    loadOfertas();
  };

  const loadOfertas = async () => {
    try {
      const res = await fetch("/api/admin/ofertas");
      setOfertas(await res.json());
    } catch {} finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/ofertas/${id}`, { method: "DELETE" });
      setOfertas(ofertas.filter((o) => o.id !== id));
    } catch { alert("Error"); } finally { setDeleting(null); }
  };

  const filteredOfertas = ofertas.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase()) || o.brand?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="min-h-screen bg-slate-100 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full" /></div>;

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="p-2 hover:bg-slate-100 rounded-lg"><ArrowLeft className="w-5 h-5 text-slate-600" /></Link>
            <div className="w-9 h-9 bg-gradient-to-br from-brand-600 to-accent-600 rounded-xl flex items-center justify-center"><Cpu className="w-5 h-5 text-white" /></div>
            <span className="font-bold text-slate-800">Ofertas</span>
          </div>
          <Link href="/admin/ofertas/nueva" className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700"><Plus className="w-4 h-4" />Nueva Oferta</Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        {filteredOfertas.length === 0 ? (
          <div className="bg-white rounded-xl border p-12 text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No hay ofertas</h3>
            <Link href="/admin/ofertas/nueva" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl"><Plus className="w-4 h-4" />Crear</Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase px-6 py-3">Producto</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase px-6 py-3">Precio</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase px-6 py-3">Clicks</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase px-6 py-3">Estado</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOfertas.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden">{o.images[0] ? <img src={o.images[0]} className="w-full h-full object-cover" /> : <span className="flex items-center justify-center h-full text-slate-300">📷</span>}</div>
                        <div>
                          <div className="font-medium text-slate-800 text-sm line-clamp-1">{o.name}</div>
                          <div className="text-xs text-slate-400">{o.brand} {o.categoryName && `• ${o.categoryName}`}</div>
                          <div className="flex gap-1 mt-1">
                            {o.isFeatured && <span className="px-1.5 py-0.5 bg-red-50 text-red-600 text-[10px] font-semibold rounded">⭐</span>}
                            {o.isBestseller && <span className="px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-semibold rounded">🏆</span>}
                            {o.isNew && <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-semibold rounded">✨</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold">{parseFloat(o.price).toFixed(2)}€</div>
                      {o.discount && <div className="text-xs text-emerald-600">-{o.discount}%</div>}
                    </td>
                    <td className="px-6 py-4"><div className="flex items-center gap-1 text-sm"><MousePointer className="w-4 h-4" />{o.clickCount || 0}</div></td>
                    <td className="px-6 py-4">
                      {o.isActive ? <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full"><Eye className="w-3 h-3" />Visible</span> : <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-full"><EyeOff className="w-3 h-3" />Oculta</span>}
                      {o.amazonUrl && <a href={o.amazonUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-amber-600 mt-1"><ExternalLink className="w-3 h-3" />Amazon</a>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/ofertas/${o.id}`} className="p-2 text-slate-400 hover:text-brand-600 inline-block"><Pencil className="w-4 h-4" /></Link>
                      <button onClick={() => handleDelete(o.id)} disabled={deleting === o.id} className="p-2 text-slate-400 hover:text-red-600 disabled:opacity-50"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
