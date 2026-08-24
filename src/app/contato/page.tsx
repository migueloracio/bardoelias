"use client";

import { useState } from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ArrowUpRight 
} from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/Icons";
import { RESTAURANT_INFO } from "@/data/restaurantInfo";
import { FAQ_ITEMS } from "@/data/faqData";
import { FAQAccordion } from "@/components/FAQAccordion";

export default function ContatoPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "Reserva de Mesa",
    message: "",
  });

  const currentDayIndex = new Date().getDay(); // 0 = Dom, 1 = Seg ...

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate direct WhatsApp link or confirmation
    const textMsg = `Olá! Meu nome é ${formData.name} (${formData.phone}). Assunto: ${formData.subject}. Mensagem: ${formData.message}`;
    const targetUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(textMsg)}`;
    
    setFormSubmitted(true);
    setTimeout(() => {
      window.open(targetUrl, "_blank");
    }, 800);
  };

  const whatsappDirectUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    RESTAURANT_INFO.whatsappDefaultMessage
  )}`;

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-3">
          <Phone className="w-3.5 h-3.5" />
          Atendimento & Localização
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mb-3">
          Fale com o Bar do Elias
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
          Tire dúvidas, faça reservas para eventos ou comemorações e confira nossa localização exata.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
        {/* Left Column: Direct Contacts & Operating Hours (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Direct Card */}
          <div className="bezel-outer border-emerald-500/30">
            <div className="bezel-inner p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Atendimento WhatsApp
                  </h3>
                  <p className="text-xs text-zinc-400">Resposta rápida para reservas</p>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                Prefere conversar diretamente com nossa equipe? Clique abaixo para abrir uma conversa no WhatsApp oficial.
              </p>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp: {RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Opening Hours Card */}
          <div className="bezel-outer">
            <div className="bezel-inner p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Horários de Funcionamento
                  </h3>
                  <p className="text-xs text-zinc-400">Destaque para o dia de hoje</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                {RESTAURANT_INFO.openingHours.map((h) => {
                  const isToday = h.dayIndex === currentDayIndex;
                  return (
                    <div
                      key={h.day}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                        isToday
                          ? "bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold"
                          : "text-zinc-400"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isToday && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                        {h.day}
                      </span>
                      <span>{h.open} às {h.close}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Address & Socials Card */}
          <div className="bezel-outer">
            <div className="bezel-inner p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Endereço
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {RESTAURANT_INFO.address.fullFormatted}
                  </p>
                  <a
                    href={RESTAURANT_INFO.address.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold mt-2"
                  >
                    <span>Abrir no Google Maps / Waze</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Siga nossas redes:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={RESTAURANT_INFO.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-amber-400/10 text-zinc-300 hover:text-amber-400 transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={RESTAURANT_INFO.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-amber-400/10 text-zinc-300 hover:text-amber-400 transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${RESTAURANT_INFO.email}`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-amber-400/10 text-zinc-300 hover:text-amber-400 transition-colors"
                    aria-label="E-mail"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form & Google Map Embed (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Interactive Form */}
          <div className="bezel-outer">
            <div className="bezel-inner p-6 sm:p-8">
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                Envie uma Mensagem ou Solicite Reserva
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Preencha os campos abaixo e nosso time entrará em contato prontamente via WhatsApp.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3 animate-in zoom-in-95 duration-300">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-heading font-bold text-lg text-white">Mensagem Enviada!</h4>
                  <p className="text-xs text-zinc-300">
                    Estamos redirecionando você para o WhatsApp oficial para concluir seu atendimento com prioridade.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Carlos Eduardo"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-950/70 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        WhatsApp (com DDD) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: (11) 98765-4321"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-950/70 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Assunto
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950/70 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    >
                      <option value="Reserva de Mesa">Reserva de Mesa</option>
                      <option value="Comemoração de Aniversário">Comemoração de Aniversário (6+ pessoas)</option>
                      <option value="Evento Corporativo / Confraternização">Evento Corporativo / Confraternização</option>
                      <option value="Dúvidas sobre o Cardápio">Dúvidas sobre o Cardápio</option>
                      <option value="Outros Assuntos">Outros Assuntos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Mensagem / Detalhes (Data, Horário e Número de Pessoas)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Ex: Gostaria de reservar uma mesa para 8 pessoas no próximo sábado às 20h para comemorar aniversário..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950/70 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-dark-950 font-bold text-xs sm:text-sm shadow-bezel-amber hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar e Abrir no WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="bezel-outer">
            <div className="bezel-inner p-2 overflow-hidden rounded-2xl">
              <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-dark-900">
                <iframe
                  title="Localização do Bar do Elias no Google Maps"
                  src={RESTAURANT_INFO.address.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(100%)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="pt-12 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-2">
            Tire Suas Dúvidas
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Respostas rápidas sobre reservas, formas de pagamento, couvert e estrutura do bar.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </div>
    </div>
  );
}
