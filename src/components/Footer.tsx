import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart, 
  ArrowUpRight 
} from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/Icons";
import { RESTAURANT_INFO } from "@/data/restaurantInfo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    RESTAURANT_INFO.whatsappDefaultMessage
  )}`;

  return (
    <footer className="relative bg-dark-950 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute inset-0 bg-ambient-glow pointer-events-none opacity-40" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
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
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {RESTAURANT_INFO.shortDescription}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Bar do Elias"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-400/10 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Bar do Elias"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-400/10 transition-all"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="/cardapio" className="hover:text-amber-300 transition-colors">
                  Cardápio & Preços
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-amber-300 transition-colors">
                  Nossa História & Ambiente
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="hover:text-amber-300 transition-colors">
                  Galeria de Fotos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-amber-300 transition-colors">
                  Contato, Mapa & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Opening Hours */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Horários
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              {RESTAURANT_INFO.openingHours.map((h) => (
                <li key={h.day} className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-300">{h.day}:</span>
                  <span className="font-medium text-amber-300/90">{h.open} às {h.close}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & WhatsApp CTA */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-base mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Onde Estamos
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <p className="leading-relaxed text-zinc-300">
                {RESTAURANT_INFO.address.fullFormatted}
              </p>
              <div className="flex items-center gap-2 text-amber-300/90">
                <Phone className="w-3.5 h-3.5" />
                <span>{RESTAURANT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Mail className="w-3.5 h-3.5" />
                <span>{RESTAURANT_INFO.email}</span>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold text-xs hover:bg-amber-500 hover:text-dark-950 transition-all group"
            >
              <span>Fazer Pedido / Reserva</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {currentYear} Bar do Elias. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-zinc-400">
              Feito com <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> para a boemia
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-300">
              ▲ Vercel Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
