"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Cpu, Flame, User, LogOut, Shield } from "lucide-react";

interface SessionUser {
  id: number;
  email: string;
  name: string | null;
  isAdmin: boolean;
}

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    checkSession();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch {}
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setUserMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/ofertas?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-slate-200/50 shadow-sm" : "bg-white/90 backdrop-blur-sm"}`}>
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white text-xs py-1.5 text-center">
        <p className="tracking-wide flex items-center justify-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          Ofertas verificadas en Amazon España — Actualizadas a diario
          <Flame className="w-3.5 h-3.5 text-amber-400" />
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-600 to-accent-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/25 group-hover:shadow-brand-600/40 transition-shadow">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-brand-700">Tech</span>
              <span className="text-slate-800">Core</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-brand-700 transition-colors">Inicio</Link>
            <Link href="/ofertas" className="text-sm font-medium text-slate-600 hover:text-brand-700 transition-colors">Todas las Ofertas</Link>
            <Link href="/ofertas?featured=true" className="text-sm font-medium text-slate-600 hover:text-brand-700 transition-colors">Top Ofertas</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-slate-500 hover:text-brand-600 rounded-full hover:bg-brand-50 transition-all" aria-label="Buscar">
              <Search className="w-5 h-5" />
            </button>

            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 rounded-full hover:bg-brand-50 transition-all">
                  <div className="w-7 h-7 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block">{user.name || "Mi Cuenta"}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-fade-in">
                    <Link href="/cuenta" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                      <User className="w-4 h-4" /> Mi Cuenta
                    </Link>
                    {user.isAdmin && (
                      <Link href="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-amber-600 hover:bg-amber-50">
                        <Shield className="w-4 h-4" /> Panel Admin
                      </Link>
                    )}
                    <hr className="my-2 border-slate-100" />
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                      <LogOut className="w-4 h-4" /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/cuenta/login" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-full hover:bg-brand-700 transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden sm:block">Entrar</span>
              </Link>
            )}

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-slate-500 hover:text-brand-600 rounded-full hover:bg-brand-50 transition-all" aria-label="Menú">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-slate-100 bg-white animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" placeholder="Buscar ofertas..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" autoFocus />
              </div>
              <button type="submit" className="px-6 py-3 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-600/25">Buscar</button>
            </form>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-fade-in">
          <nav className="px-4 py-4 space-y-1">
            {[{ href: "/", label: "Inicio" }, { href: "/ofertas", label: "Todas las Ofertas" }, { href: "/ofertas?featured=true", label: "Top Ofertas" }].map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-brand-700 hover:bg-brand-50 rounded-xl">{link.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
