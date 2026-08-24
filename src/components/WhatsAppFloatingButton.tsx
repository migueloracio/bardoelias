"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurantInfo";

export function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    RESTAURANT_INFO.whatsappDefaultMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-auto">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-3 bg-dark-900/95 border border-emerald-500/30 text-white pl-4 pr-3 py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-emerald-400">Atendimento Bar do Elias</span>
            <span className="text-[11px] text-zinc-300">Dúvidas, pedidos ou reservas? Fale conosco!</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Fechar dica do WhatsApp"
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button with Pulse Waves */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp do Bar do Elias"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-[0_8px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_12px_35px_rgba(16,185,129,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Radar Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none opacity-60" />
        
        {/* Unread Message Badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 text-dark-950 text-[10px] font-black items-center justify-center border-2 border-dark-950">
            1
          </span>
        </span>

        <MessageCircle className="w-7 h-7 fill-white/20 text-white group-hover:scale-105 transition-transform" />
      </a>
    </div>
  );
}
