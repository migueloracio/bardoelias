"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Flame, 
  Utensils, 
  Info, 
  Image as ImageIcon, 
  Phone, 
  MessageCircle, 
  ArrowUpRight 
} from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurantInfo";
import { OpeningStatusBadge } from "./OpeningStatusBadge";

const NAV_LINKS = [
  { href: "/", label: "Início", icon: Flame },
  { href: "/cardapio", label: "Cardápio", icon: Utensils },
  { href: "/sobre", label: "Sobre Nós", icon: Info },
  { href: "/galeria", label: "Galeria", icon: ImageIcon },
  { href: "/contato", label: "Contato & FAQ", icon: Phone },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    RESTAURANT_INFO.whatsappDefaultMessage
  )}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 sm:pt-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Floating Island Shell */}
        <nav
          className={`pointer-events-auto w-full mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-full transition-all duration-500 glass-pill ${
            scrolled
              ? "bg-dark-900/90 shadow-[0_15px_30px_rgba(0,0,0,0.8)] border-white/15"
              : "bg-dark-900/70 border-white/10"
          }`}
        >
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-bezel-amber border border-amber-400/40 group-hover:scale-105 transition-transform duration-300 bg-dark-950 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Logo Bar do Elias"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base sm:text-lg tracking-wide text-white group-hover:text-amber-400 transition-colors">
                Bar do Elias
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80 font-semibold -mt-1 hidden sm:block">
                Desde 2010 • Boteco & Bar
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-dark-850/60 px-3 py-1.5 rounded-full border border-white/5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-amber-500 text-dark-950 font-semibold shadow-[0_2px_10px_rgba(245,158,11,0.3)]"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-dark-950" : "text-amber-400/70"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action: Status & WhatsApp Button-in-Button */}
          <div className="hidden md:flex items-center gap-3">
            <OpeningStatusBadge />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-dark-950 font-semibold text-xs transition-all duration-300 hover:shadow-bezel-amber active:scale-[0.98]"
            >
              <span>Reservar Mesa</span>
              <div className="w-6 h-6 rounded-full bg-dark-950/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5 text-dark-950" />
              </div>
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar Menu" : "Abrir Menu"}
            className="lg:hidden relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 text-white hover:bg-white/10 transition-colors"
          >
            <span
              className={`w-4 h-0.5 bg-amber-400 rounded-full transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-amber-400 rounded-full transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-amber-400 rounded-full transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="pointer-events-auto fixed inset-0 z-50 lg:hidden bg-dark-950/95 backdrop-blur-2xl flex flex-col p-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-bezel-amber border border-amber-400/40 bg-dark-950 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Logo Bar do Elias"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white">Bar do Elias</span>
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">Desde 2010</span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white"
            >
              ✕
            </button>
          </div>

          <div className="py-6 flex flex-col gap-2 flex-1 overflow-y-auto">
            <div className="mb-4">
              <OpeningStatusBadge />
            </div>
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3.5 p-3.5 rounded-2xl text-base font-medium transition-all ${
                    isActive
                      ? "bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-amber-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-dark-950 font-bold text-sm shadow-bezel-amber"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pedir / Reservar no WhatsApp</span>
            </a>
            <p className="text-center text-xs text-zinc-400">
              {RESTAURANT_INFO.address.neighborhood} • {RESTAURANT_INFO.phone}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
