import Image from "next/image";
import Link from "next/link";
import { 
  History, 
  Sparkles, 
  Award, 
  Users, 
  ArrowUpRight, 
  Heart, 
  ShieldCheck, 
  Smile 
} from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurantInfo";

export const metadata = {
  title: "Sobre Nós | Conheça a História do Bar do Elias",
  description: "Tradição, afeto e comida de boteco de primeira linha. Conheça as origens, os valores e a equipe que faz o Bar do Elias acontecer todos os dias.",
};

export default function SobrePage() {
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    RESTAURANT_INFO.whatsappDefaultMessage
  )}`;

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-3">
          <History className="w-3.5 h-3.5" />
          Nossa Trajetória
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mb-4">
          A Tradição & Paixão por Trás do Bar do Elias
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          Mais do que servir petiscos e bebidas, nosso propósito é criar memórias inesquecíveis ao redor de mesas cheias de afeto, sorrisos e brindes.
        </p>
      </div>

      {/* Origin Story Block */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Das panelas caseiras ao boteco mais querido do bairro
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              O Bar do Elias nasceu do sonho de criar um ponto de encontro onde a simplicidade da culinária de boteco se unisse à técnica gastronômica apurada. Fundado por Elias e sua família, o bar começou com apenas quatro mesas e a famosa receita do <em>Bolinho de Costela com Provolone</em>.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Com o passar dos anos e o boca a boca apaixonado dos clientes, o espaço cresceu, mas o compromisso permaneceu intacto: atender cada cliente pelo nome, servir porções generosas preparadas com ingredientes frescos do dia e garantir que o chopp chegue trincando em copos ultracongelados.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div>
                <span className="font-heading font-black text-2xl text-amber-400 block">15+</span>
                <span className="text-[11px] text-zinc-400">Anos de História</span>
              </div>
              <div>
                <span className="font-heading font-black text-2xl text-amber-400 block">50k+</span>
                <span className="text-[11px] text-zinc-400">Chopps Tirados</span>
              </div>
              <div>
                <span className="font-heading font-black text-2xl text-amber-400 block">4.9★</span>
                <span className="text-[11px] text-zinc-400">Avaliação Média</span>
              </div>
            </div>
          </div>

          <div className="bezel-outer">
            <div className="bezel-inner relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/real/bar-iluminacao-noturna.jpg"
                alt="História do Bar do Elias"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nosso Ambiente */}
      <section className="mb-20 py-16 px-6 sm:px-10 rounded-3xl bg-dark-900 border border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-2">
            Espaços Pensados Para Você
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Um Ambiente Único & Acolhedor
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Espaço com piscina iluminada, área com telões para esportes e varanda ventilada para noites memoráveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bezel-outer">
            <div className="bezel-inner p-5 space-y-3">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-2">
                <Image
                  src="/images/real/deck-piscina-noite.jpg"
                  alt="Deck com Piscina Iluminada"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading font-bold text-base text-white">Deck com Piscina & Iluminação</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Piscina com luzes noturnas, plantas ornamentais e mesas acolhedoras para curtir com os amigos.
              </p>
            </div>
          </div>

          <div className="bezel-outer">
            <div className="bezel-inner p-5 space-y-3">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-2">
                <Image
                  src="/images/real/varanda-externa.jpg"
                  alt="Varanda Externa"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading font-bold text-base text-white">Varanda Externa com Banquetas</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Área arejada com toldos, banquetas altas e cervejeira trincando para seu happy hour.
              </p>
            </div>
          </div>

          <div className="bezel-outer">
            <div className="bezel-inner p-5 space-y-3">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-2">
                <Image
                  src="/images/real/balcao-tv-esportes.jpg"
                  alt="Balcão de Esportes & Telões"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading font-bold text-base text-white">Balcão dos Esportes & Telões</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Múltiplas TVs e telões para acompanhar jogos de futebol e lutas com visão 100% livre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores & Compromissos */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Nossos Pilares
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Princípios que guiam cada prato que sai da cozinha e cada atendimento no salão.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bezel-outer">
            <div className="bezel-inner p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white mb-2">Ingredientes Frescos</h3>
              <p className="text-xs text-zinc-400">Carnes nobres, hortaliças e queijos selecionados diariamente com fornecedores de confiança.</p>
            </div>
          </div>

          <div className="bezel-outer">
            <div className="bezel-inner p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white mb-2">Preparo Artesanal</h3>
              <p className="text-xs text-zinc-400">Nada de produtos ultraprocessados. Nossos molhos e petiscos são 100% feitos na casa.</p>
            </div>
          </div>

          <div className="bezel-outer">
            <div className="bezel-inner p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white mb-2">Hospitalidade Genuína</h3>
              <p className="text-xs text-zinc-400">Recebemos cada cliente como um amigo querido que chega para jantar em nossa própria casa.</p>
            </div>
          </div>

          <div className="bezel-outer">
            <div className="bezel-inner p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white mb-2">Cultura Brasileira</h3>
              <p className="text-xs text-zinc-400">Valorização da boa música, das tradições de boteco e do chopp na temperatura exata.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <div className="text-center p-10 rounded-3xl bg-dark-900 border border-amber-400/20">
        <h3 className="font-heading font-bold text-2xl text-white mb-3">
          Venha nos fazer uma visita hoje mesmo!
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6">
          Estamos de portas abertas na {RESTAURANT_INFO.address.neighborhood} esperando por você e sua turma.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs sm:text-sm transition-all shadow-bezel-amber"
        >
          <span>Falar no WhatsApp & Reservar</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
