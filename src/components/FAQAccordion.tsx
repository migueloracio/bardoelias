"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "@/data/faqData";

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.id}
            className={`bezel-outer transition-all duration-300 ${
              isOpen ? "border-amber-500/40 shadow-card-hover" : ""
            }`}
          >
            <div className="bezel-inner overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 transition-colors hover:bg-white/[0.02]"
              >
                <span className="flex items-center gap-3 font-medium text-sm sm:text-base text-zinc-100">
                  <HelpCircle className={`w-4 h-4 flex-shrink-0 ${isOpen ? "text-amber-400" : "text-zinc-500"}`} />
                  {item.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center bg-white/5 border border-white/10 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-amber-500 text-dark-950 border-amber-400" : "text-zinc-400"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-300">
                  {item.answer}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
