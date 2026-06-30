import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeedInit from "@/components/SeedInit";

export const metadata: Metadata = {
  title: "TechCore — Las Mejores Ofertas Tech en Amazon",
  description:
    "Descubre y compara las mejores ofertas en tecnología de Amazon España. Auriculares, portátiles, smartphones y más, seleccionados y verificados para ti.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">
        <SeedInit />
        <Header />
        <main className="min-h-screen pt-[calc(4rem+2rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
