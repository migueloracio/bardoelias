"use client";

import Image from "next/image";
import { MessageCircle, Sparkles, Users, Ban } from "lucide-react";
import { MenuItem } from "@/data/menuData";
import { formatCurrency } from "@/lib/utils";
import { RESTAURANT_INFO } from "@/data/restaurantInfo";

interface DishCardProps {
  item: MenuItem;
}

export function DishCard({ item }: DishCardProps) {
  const isAvailable = item.isAvailable !== false;

  const itemWhatsAppUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Olá Elias! Gostaria de pedir/saber mais sobre: *${item.name}* (${formatCurrency(item.price)}).`
  )}`;

  return (
    <div
      className={`bezel-outer group transition-all duration-500 flex flex-col h-full ${
        isAvailable ? "hover:border-amber-500/40" : "opacity-75 border-zinc-800"
      }`}
    >
      <div className="bezel-inner flex flex-col h-full overflow-hidden p-4 sm:p-5">
        {/* Image Container with Badges */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-4 bg-dark-900">
          <Image
            src={item.image || "/images/real/bar-iluminacao-noturna.jpg"}
            alt={item.name}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ease-fluid ${
              isAvailable ? "group-hover:scale-105" : "grayscale contrast-125"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="flex flex-wrap gap-1.5">
              {!isAvailable ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-900/90 text-red-400 border border-red-500/40 backdrop-blur-md">
                  <Ban className="w-3 h-3 text-red-400" />
                  Esgotado Hoje
                </span>
              ) : (
                <>
                  {item.isBestSeller && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-dark-950 shadow-md">
                      <Sparkles className="w-3 h-3" />
                      Mais Pedido
                    </span>
                  )}
                  {item.isChefSpecial && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-600/90 text-white backdrop-blur-md">
                      Chef Elias
                    </span>
                  )}
                </>
              )}
            </div>
            {item.serves && isAvailable && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-dark-950/80 text-zinc-300 backdrop-blur-md border border-white/10">
                <Users className="w-3 h-3 text-amber-400" />
                {item.serves}
              </span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="flex flex-col flex-1">
          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3
            className={`font-heading font-bold text-lg mb-2 transition-colors ${
              isAvailable ? "text-white group-hover:text-amber-400" : "text-zinc-400 line-through decoration-zinc-600"
            }`}
          >
            {item.name}
          </h3>

          <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-1">
            {item.description}
          </p>

          {/* Price & Action Row */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3 mt-auto">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-zinc-300">Valor</span>
              <span className="font-heading font-black text-xl text-amber-400">
                {formatCurrency(item.price)}
              </span>
            </div>

            {isAvailable ? (
              <a
                href={itemWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-emerald-600 hover:text-white border border-white/10 hover:border-emerald-500/50 text-zinc-200 text-xs font-semibold transition-all duration-300 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                <span>Pedir</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-900 text-zinc-500 text-xs font-medium border border-white/5 cursor-not-allowed">
                Esgotado
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
