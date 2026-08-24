"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Lock, 
  KeyRound, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Check, 
  AlertCircle, 
  DollarSign, 
  Eye, 
  Database, 
  Sparkles, 
  ArrowLeft, 
  Search,
  CheckCircle2,
  RefreshCw,
  Power
} from "lucide-react";
import { MenuItem, MENU_CATEGORIES } from "@/data/menuData";
import { formatCurrency } from "@/lib/utils";
import { 
  getLiveMenuItems, 
  saveLiveMenuItem, 
  deleteLiveMenuItem, 
  toggleLiveItemAvailability, 
  updateLiveItemPrice 
} from "@/lib/menuService";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State for Add / Edit
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");

  // Check login from session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("bar_elias_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch Menu Data
  const loadData = async () => {
    setLoading(true);
    const data = await getLiveMenuItems();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "elias2010" || passwordInput === process.env.NEXT_PUBLIC_ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("bar_elias_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Senha incorreta. Verifique e tente novamente.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("bar_elias_admin_auth");
  };

  // Quick Price Adjust
  const handlePriceChange = async (id: string, newPrice: number) => {
    if (newPrice < 0) return;
    const rounded = Math.round(newPrice * 100) / 100;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, price: rounded } : i)));
    await updateLiveItemPrice(id, rounded);
  };

  // Quick Toggle Availability
  const handleToggleAvailability = async (id: string, current: boolean) => {
    const nextState = !current;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, isAvailable: nextState } : i)));
    await toggleLiveItemAvailability(id, nextState);
  };

  // Open Modal for New Item
  const handleOpenNewModal = () => {
    setEditingItem({
      id: `custom_${Date.now()}`,
      name: "",
      category: "porcoes",
      description: "",
      price: 25.0,
      image: "/images/real/bar-iluminacao-noturna.jpg",
      isAvailable: true,
      isBestSeller: false,
      isChefSpecial: false,
      tags: [],
      serves: "",
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  // Save Modal Item
  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim()) return;

    await saveLiveMenuItem(editingItem);
    await loadData();
    setIsModalOpen(false);
    setSaveSuccessMessage(`"${editingItem.name}" salvo com sucesso!`);
    setTimeout(() => setSaveSuccessMessage(""), 3000);
  };

  // Delete Item
  const handleDeleteItem = async (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir "${name}" do cardápio?`)) {
      await deleteLiveMenuItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setSaveSuccessMessage(`"${name}" removido.`);
      setTimeout(() => setSaveSuccessMessage(""), 3000);
    }
  };

  // Filtered Items
  const filteredItems = items.filter((i) => {
    const matchCat = selectedCategory === "todos" || i.category === selectedCategory;
    const matchSearch =
      searchQuery === "" ||
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // ===========================================================================
  // TELA DE LOGIN ADMIN
  // ===========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 pt-28 pb-16">
        <div className="max-w-md w-full bezel-outer">
          <div className="bezel-inner p-8 text-center space-y-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-bezel-amber border border-amber-400/50 mx-auto bg-dark-950">
              <Image
                src="/images/logo.png"
                alt="Logo Bar do Elias"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="font-heading font-black text-2xl text-white">
                Painel Administrativo
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Gestão do cardápio, preços e disponibilidade em tempo real
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  Senha de Acesso
                </label>
                <input
                  type="password"
                  required
                  placeholder="Digite a senha do Elias..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-dark-950 font-bold text-sm shadow-bezel-amber hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all"
              >
                Acessar Painel do Cardápio
              </button>
            </form>

            <p className="text-[11px] text-zinc-500">
              Dica: A senha padrão inicial configurada é <code className="text-amber-400 font-mono">elias2010</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // PAINEL DE GESTÃO DO CARDÁPIO
  // ===========================================================================
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-bezel-amber border border-amber-400/40 bg-dark-950 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo Bar do Elias"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Gestão do Cardápio
            </h1>
            <div className="flex items-center gap-2 text-xs">
              <span className={`inline-flex items-center gap-1 font-medium ${
                isSupabaseConfigured ? "text-emerald-400" : "text-amber-400"
              }`}>
                <Database className="w-3.5 h-3.5" />
                {isSupabaseConfigured ? "Conectado ao Supabase Cloud" : "Modo Híbrido / Local"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/cardapio"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Ver Cardápio Público</span>
          </Link>

          <button
            onClick={handleOpenNewModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 text-xs font-bold transition-all shadow-bezel-amber"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Novo Prato</span>
          </button>

          <button
            onClick={handleLogout}
            title="Sair do painel"
            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10 transition-colors"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Success Notification Toast */}
      {saveSuccessMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveSuccessMessage}</span>
          </div>
          <button onClick={() => setSaveSuccessMessage("")} className="text-emerald-400">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Categories Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
        <div className="md:col-span-4 bezel-outer">
          <div className="bezel-inner flex items-center px-3.5 py-2 gap-2">
            <Search className="w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-white placeholder-zinc-500 focus:outline-none w-full"
            />
          </div>
        </div>

        <div className="md:col-span-8 flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => setSelectedCategory("todos")}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "todos"
                ? "bg-amber-500 text-dark-950 font-bold"
                : "bg-dark-900 text-zinc-400 border border-white/10 hover:text-white"
            }`}
          >
            Todos ({items.length})
          </button>
          {MENU_CATEGORIES.filter((c) => c.id !== "todos").map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-amber-500 text-dark-950 font-bold"
                  : "bg-dark-900 text-zinc-400 border border-white/10 hover:text-white"
              }`}
            >
              {cat.label} ({items.filter((i) => i.category === cat.id).length})
            </button>
          ))}
        </div>
      </div>

      {/* Items Table / List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isAvailable = item.isAvailable !== false;

          return (
            <div
              key={item.id}
              className={`bezel-outer transition-all duration-300 ${
                !isAvailable ? "opacity-60 border-zinc-800" : "hover:border-amber-400/30"
              }`}
            >
              <div className="bezel-inner p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-dark-900 flex-shrink-0 border border-white/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/5 text-amber-400 border border-white/10">
                        {item.category}
                      </span>
                      {item.isBestSeller && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                          Mais Pedido
                        </span>
                      )}
                      {item.isChefSpecial && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600/20 text-red-300">
                          Chef Elias
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-base text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center / Right: Price Edit & Quick Actions */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                  {/* Price Controls */}
                  <div className="flex items-center gap-1.5 bg-dark-950 px-3 py-1.5 rounded-xl border border-white/10">
                    <button
                      onClick={() => handlePriceChange(item.id, item.price - 1)}
                      className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-zinc-300 font-bold text-xs"
                      title="Diminuir R$ 1,00"
                    >
                      -
                    </button>
                    <span className="font-heading font-black text-sm text-amber-400 min-w-[70px] text-center">
                      {formatCurrency(item.price)}
                    </span>
                    <button
                      onClick={() => handlePriceChange(item.id, item.price + 1)}
                      className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-zinc-300 font-bold text-xs"
                      title="Aumentar R$ 1,00"
                    >
                      +
                    </button>
                  </div>

                  {/* Availability Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleAvailability(item.id, isAvailable)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                      isAvailable
                        ? "bg-emerald-950/70 border border-emerald-500/30 text-emerald-300"
                        : "bg-red-950/70 border border-red-500/30 text-red-300"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isAvailable ? "bg-emerald-400" : "bg-red-400"}`} />
                    <span>{isAvailable ? "Disponível" : "Esgotado"}</span>
                  </button>

                  {/* Edit & Delete Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      title="Editar detalhes completos"
                      className="p-2 rounded-xl bg-white/5 hover:bg-amber-400/10 text-zinc-300 hover:text-amber-400 border border-white/10 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id, item.name)}
                      title="Excluir prato"
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================================= */}
      {/* MODAL DE CRIAÇÃO / EDIÇÃO DE PRATO */}
      {/* ======================================================================= */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-dark-950/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="max-w-xl w-full bezel-outer my-8">
            <div className="bezel-inner p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <h2 className="font-heading font-bold text-xl text-white">
                  {editingItem.id.startsWith("custom_") ? "Novo Prato no Cardápio" : "Editar Prato"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveModal} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Nome do Prato / Bebida *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Porção de Camarão Empanado"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Categoria *
                    </label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                    >
                      <option value="porcoes">Porções & Petiscos</option>
                      <option value="pratos">Pratos, Risotos & Massas</option>
                      <option value="destilados">Whiskies, Gins & Drinks</option>
                      <option value="cervejas">Cervejas & Vinhos</option>
                      <option value="bebidas">Não Alcoólicos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Preço (R$) *
                    </label>
                    <input
                      type="number"
                      step="0.10"
                      min="0"
                      required
                      placeholder="Ex: 48.90"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Descrição dos Ingredientes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Porção crocante com molho tártaro especial da casa..."
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Serve (Pessoas)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 2 a 3 pessoas"
                      value={editingItem.serves || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, serves: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      URL da Foto
                    </label>
                    <input
                      type="text"
                      placeholder="/images/real/... ou link"
                      value={editingItem.image}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Badges Toggle */}
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                    <input
                      type="checkbox"
                      checked={editingItem.isBestSeller}
                      onChange={(e) => setEditingItem({ ...editingItem, isBestSeller: e.target.checked })}
                      className="rounded border-zinc-700 text-amber-500 focus:ring-0"
                    />
                    <span>Selo "Mais Pedido"</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                    <input
                      type="checkbox"
                      checked={editingItem.isChefSpecial}
                      onChange={(e) => setEditingItem({ ...editingItem, isChefSpecial: e.target.checked })}
                      className="rounded border-zinc-700 text-red-500 focus:ring-0"
                    />
                    <span>Selo "Chef Elias"</span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-dark-950 text-xs font-bold shadow-bezel-amber"
                  >
                    Salvar Prato
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
