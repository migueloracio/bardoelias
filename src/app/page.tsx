import Link from "next/link";
import Image from "next/image";
import { 
  Beer, 
  UtensilsCrossed, 
  Music, 
  HeartHandshake, 
  ArrowUpRight, 
  Sparkles, 
  ChevronRight, 
  Clock, 
  MapPin,
  Mic,
  Tv,
  GlassWater
} from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurantInfo";
import { MENU_ITEMS } from "@/data/menuData";
import { DishCard } from "@/components/DishCard";
import { ReviewsSection } from "@/components/ReviewsSection";

export default function HomePage() {
  const featuredDishes = MENU_ITEMS.filter((item) => item.isBestSeller || item.isChefSpecial).slice(0, 4);
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    RESTAURANT_INFO.whatsappDefaultMessage
  )}`;

  return (
    <div className="relative overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92dvh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6">
        {/* Background Image with Dark Vignette & Mesh */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/deck-piscina-noite.jpg"
            alt="Ambiente Real Bar do Elias"
            fill
            priority
            className="object-cover object-center brightness-[0.32] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-transparent" />
          <div className="absolute inset-0 bg-ambient-glow opacity-60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Official Logo Display */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-bezel-amber border-2 border-amber-400/60 mb-5 animate-in zoom-in duration-500 bg-dark-950/80">
            <Image
              src="/images/logo.png"
              alt="Logo Oficial Bar do Elias"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-amber-400/30 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-6 shadow-bezel-amber animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Desde 2010 • O Autêntico Boteco Paulista</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.1] mb-6 max-w-4xl">
            Sabor de verdade, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              cerveja trincando
            </span>{" "}
            e boas histórias.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Petiscos artesanais premiados, cortes nobres na chapa e coquetelaria exclusiva no ponto de encontro mais acolhedor de Ferraz de Vasconcelos.
          </p>

          {/* CTA Button Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/cardapio"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-7 pr-2 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-dark-950 font-bold text-sm sm:text-base shadow-bezel-amber hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-[0.98]"
            >
              <span>Explorar Cardápio</span>
              <div className="w-9 h-9 rounded-full bg-dark-950/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4 text-dark-950" />
              </div>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm sm:text-base backdrop-blur-md transition-all duration-300 active:scale-[0.98]"
            >
              <span>Reservar Mesa via WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </a>
          </div>

          {/* Quick Info Bar */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-6 text-left w-full max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <Beer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-zinc-300">Cerveja & Drinks</div>
                <div className="text-sm font-bold text-white">Super Gelados</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-zinc-300">Qua, Sex e Sáb</div>
                <div className="text-sm font-bold text-white">19:00 às 02:00</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-zinc-300">Vila Romanopolis</div>
                <div className="text-sm font-bold text-white">Ferraz de Vasconcelos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PROPOSTA & HISTÓRIA RESUMIDA */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-dark-900/60 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image Mosaic */}
            <div className="relative">
              <div className="bezel-outer">
                <div className="bezel-inner relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/real/lounge-balcao-principal.jpg"
                    alt="Salão e Balcão do Bar do Elias"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Floating Highlight Card */}
              <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:right-6 bg-dark-950/90 border border-amber-400/30 p-4 sm:p-5 rounded-2xl shadow-bezel-amber backdrop-blur-xl max-w-xs">
                <span className="text-amber-400 font-heading font-black text-2xl sm:text-3xl block">
                  15+ Anos
                </span>
                <span className="text-xs text-zinc-300">
                  De tradição em gastronomia de boteco e amigos reunidos.
                </span>
              </div>
            </div>

            {/* Right Column: Copywriting & Proposta */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20">
                A Alma do Nosso Boteco
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Onde a tradição encontra a excelência culinária.
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                No <strong>Bar do Elias</strong>, cada petisco carrega o afeto das receitas caseiras com o rigor de técnicas gastronômicas profissionais. Nossas costelas são desfiadas após 12 horas de cozimento lento, os torresmos são pururucados na perfeição e o chopp desce trincando na temperatura que você merece.
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Aqui você encontra o ambiente perfeito tanto para uma reunião descontraída pós-trabalho quanto para celebrar aniversários inesquecíveis.
              </p>
              <div className="pt-2">
                <Link
                  href="/sobre"
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm group"
                >
                  <span>Conheça a nossa história completa</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PRATOS EM DESTAQUE */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Favoritos da Casa
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
                Pratos & Porções Mais Pedidos
              </h2>
            </div>
            <Link
              href="/cardapio"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-semibold group self-start md:self-auto"
            >
              <span>Ver cardápio completo com preços</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish) => (
              <DishCard key={dish.id} item={dish} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. DIFERENCIAIS */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-dark-900/80 border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-3">
              Por Que Escolher o Elias
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
              Nossos Diferenciais
            </h2>
            <p className="text-zinc-300 text-sm mt-3">
              Cuidamos de cada detalhe para que sua visita seja impecável do início ao fim.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESTAURANT_INFO.differentiators.map((diff, idx) => {
              const iconsMap = {
                Mic: Mic,
                Music: Music,
                Tv: Tv,
                GlassWater: GlassWater,
                Beer: Beer,
                UtensilsCrossed: UtensilsCrossed,
                HeartHandshake: HeartHandshake,
              };
              const Icon = iconsMap[diff.icon as keyof typeof iconsMap] || Music;

              return (
                <div key={idx} className="bezel-outer group hover:border-amber-400/40 transition-all duration-300">
                  <div className="bezel-inner p-6 sm:p-7 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-dark-950 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {diff.title}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. AVALIAÇÕES (REVIEWS) */}
      {/* ========================================================================= */}
      <ReviewsSection />

      {/* ========================================================================= */}
      {/* 6. CTA FINAL DE CONVERSÃO */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden border border-amber-400/30 bg-gradient-to-br from-dark-900 via-dark-850 to-dark-950 p-8 sm:p-14 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-ambient-glow opacity-80 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30">
                Sua Mesa Está Pronta
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-white leading-tight">
                Venha viver a verdadeira experiência do Bar do Elias.
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                Garanta o seu lugar, traga seus amigos e venha saborear os melhores petiscos e drinks da cidade.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-dark-950 font-bold text-sm sm:text-base shadow-bezel-amber hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all duration-300 active:scale-[0.98]"
                >
                  <span>Reservar Mesa Agora</span>
                  <ArrowUpRight className="w-4 h-4 text-dark-950" />
                </a>
                <Link
                  href="/contato"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm sm:text-base transition-all"
                >
                  Ver Horários & Localização
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
