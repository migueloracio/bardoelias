"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  Flame, 
  Utensils, 
  Beef, 
  GlassWater, 
  Beer, 
  CakeSlice, 
  SlidersHorizontal,
  X,
  MessageCircle,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { MENU_CATEGORIES, MenuItem } from "@/data/menuData";
import { DishCard } from "@/components/DishCard";
import { RESTAURANT_INFO } from "@/data/restaurantInfo";
import { getLiveMenuItems } from "@/lib/menuService";

const ICONS_MAP = {
  Flame: Flame,
  Utensils: Utensils,
  Beef: Beef,
  GlassWater: GlassWater,
  Beer: Beer,
  CakeSlice: CakeSlice,
};

export default function CardapioPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getLiveMenuItems();
      setItems(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "todos" || item.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const currentCategoryInfo = MENU_CATEGORIES.find(
    (c) => c.id === selectedCategory
  );

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Cardápio Atualizado
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mb-3">
          Nosso Cardápio
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
          Receitas autorais, porções de boteco, drinks exclusivos e cerveja trincando em Ferraz de Vasconcelos.
        </p>
      </div>

      {/* Search Bar & Filters */}
      <div className="mb-10 space-y-6">
        {/* Search Input with Double Bezel */}
        <div className="max-w-md mx-auto bezel-outer">
          <div className="bezel-inner flex items-center px-4 py-2.5 gap-3">
            <Search className="w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar por nome, ingrediente ou petisco..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-sm text-white placeholder-zinc-500 focus:outline-none w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-zinc-500 hover:text-white p-1"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5">
          {MENU_CATEGORIES.map((cat) => {
            const Icon = ICONS_MAP[cat.iconName as keyof typeof ICONS_MAP] || Flame;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isSelected
                    ? "bg-amber-500 text-dark-950 shadow-bezel-amber scale-105"
                    : "bg-dark-900/80 hover:bg-white/10 text-zinc-300 border border-white/10"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-dark-950" : "text-amber-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Description Banner */}
      {currentCategoryInfo && (
        <div className="mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block">
              Categoria Selecionada
            </span>
            <h2 className="font-heading font-bold text-lg text-white">
              {currentCategoryInfo.label}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              {currentCategoryInfo.description}
            </p>
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            {filteredItems.length} {filteredItems.length === 1 ? "item" : "itens"}
          </span>
        </div>
      )}

      {/* Menu Grid */}
      {loading ? (
        <div className="text-center py-20">
          <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-3" />
          <p className="text-xs text-zinc-400">Carregando cardápio...</p>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <DishCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bezel-outer">
          <div className="bezel-inner p-10 flex flex-col items-center">
            <SlidersHorizontal className="w-10 h-10 text-zinc-600 mb-3" />
            <h3 className="font-heading font-bold text-lg text-white mb-1">
              Nenhum prato encontrado
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mb-4">
              Não encontramos itens para &ldquo;{searchQuery}&rdquo;. Tente buscar por outros termos ou escolha outra categoria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("todos");
              }}
              className="px-4 py-2 rounded-full bg-amber-500 text-dark-950 font-semibold text-xs"
            >
              Resetar Filtros
            </button>
          </div>
        </div>
      )}

      {/* Bottom WhatsApp Order Helper */}
      <div className="mt-16 p-6 rounded-3xl bg-dark-900 border border-amber-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="font-heading font-bold text-base text-white">
            Deseja encomendar para confraternizações ou grupos?
          </h4>
          <p className="text-xs text-zinc-400">
            Montamos tábuas de porções e combos personalizados para você e seus convidados.
          </p>
        </div>
        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
            "Olá! Gostaria de consultar opções de combos e porções para um grupo."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors whitespace-nowrap shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Falar no WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
