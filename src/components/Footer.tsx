import { Cpu } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Tech<span className="text-brand-400">Core</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Tu radar de ofertas tech. Rastreamos Amazon España cada día para
              encontrarte los mejores descuentos en tecnología.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Categorías
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: "Auriculares", slug: "auriculares" },
                { name: "Portátiles", slug: "portatiles" },
                { name: "Smartphones", slug: "smartphones" },
                { name: "Accesorios", slug: "accesorios" },
                { name: "Smartwatches", slug: "smartwatches" },
                { name: "Fotografía", slug: "fotografia" },
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/ofertas?category=${cat.slug}`}
                    className="text-sm hover:text-brand-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Información
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm hover:text-brand-400 transition-colors">
                  Sobre TechCore
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm hover:text-brand-400 transition-colors">
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm hover:text-brand-400 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm hover:text-brand-400 transition-colors">
                  Aviso Legal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Alertas de Ofertas
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Recibe los mejores chollos tech directamente en tu email.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} TechCore. Todos los derechos reservados.
            </p>
            <p className="text-xs text-slate-500 text-center max-w-xl">
              TechCore participa en el Programa de Afiliados de Amazon EU, un programa de
              publicidad para afiliados diseñado para ofrecer a sitios web un modo de obtener
              comisiones por publicidad, publicitando e incluyendo enlaces a Amazon.es.
              Los precios mostrados son orientativos y pueden variar.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
