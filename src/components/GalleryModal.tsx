"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/data/galleryData";

interface GalleryModalProps {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function GalleryModal({ item, onClose, onPrev, onNext }: GalleryModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 bg-dark-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar visualização"
        className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-50"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev Button */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Foto anterior"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-amber-500 hover:text-dark-950 border border-white/20 flex items-center justify-center text-white transition-all z-50"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Próxima foto"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-amber-500 hover:text-dark-950 border border-white/20 flex items-center justify-center text-white transition-all z-50"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Card */}
      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="relative w-full aspect-[16/10] max-h-[75vh] rounded-2xl overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-dark-900">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mt-4 text-center">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            {item.categoryLabel}
          </span>
          <h3 className="font-heading font-bold text-xl text-white mt-1">
            {item.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-lg">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
