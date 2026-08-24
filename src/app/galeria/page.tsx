"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, ZoomIn, Sparkles } from "lucide-react";
import { GALLERY_ITEMS, GalleryItem } from "@/data/galleryData";
import { GalleryModal } from "@/components/GalleryModal";

const CATEGORIES = [
  { id: "todos", label: "Todas as Fotos" },
  { id: "pratos", label: "Pratos & Petiscos" },
  { id: "drinks", label: "Drinks & Coquetéis" },
  { id: "ambiente", label: "Nosso Ambiente" },
  { id: "eventos", label: "Eventos & Música" },
];

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const filteredGallery = GALLERY_ITEMS.filter((item) =>
    selectedCategory === "todos" ? true : item.category === selectedCategory
  );

  const handleOpenModal = (item: GalleryItem) => {
    const idx = GALLERY_ITEMS.findIndex((g) => g.id === item.id);
    setActiveModalIndex(idx);
  };

  const handlePrev = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((prev) =>
        prev === 0 ? GALLERY_ITEMS.length - 1 : (prev as number) - 1
      );
    }
  };

  const handleNext = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((prev) =>
        prev === GALLERY_ITEMS.length - 1 ? 0 : (prev as number) + 1
      );
    }
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-3">
          <ImageIcon className="w-3.5 h-3.5" />
          Registros Visuais
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mb-3">
          Galeria do Bar do Elias
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
          Dê uma espiada em nossos pratos mais famosos, na preparação dos drinks e no clima acolhedor que espera por você.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                isSelected
                  ? "bg-amber-500 text-dark-950 shadow-bezel-amber scale-105"
                  : "bg-dark-900 hover:bg-white/10 text-zinc-300 border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenModal(item)}
            className="bezel-outer cursor-pointer group hover:border-amber-400/40 transition-all duration-500"
          >
            <div className="bezel-inner relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-fluid"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-dark-950/80 text-amber-400 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Zoom Hover Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-500 text-dark-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Title & Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <h3 className="font-heading font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeModalIndex !== null && (
        <GalleryModal
          item={GALLERY_ITEMS[activeModalIndex]}
          onClose={() => setActiveModalIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
