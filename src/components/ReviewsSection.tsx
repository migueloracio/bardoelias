import Image from "next/image";
import { Star, CheckCircle2, MessageSquareQuote } from "lucide-react";
import { REVIEWS_DATA } from "@/data/reviewsData";

export function ReviewsSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header with Google Score Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Depoimentos & Avaliações
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
              O que dizem os frequentadores do Elias
            </h2>
          </div>

          {/* Google Rating Summary Card */}
          <div className="bezel-outer self-start md:self-auto">
            <div className="bezel-inner px-4 py-3 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-amber-400">
                G
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-lg text-white">4.9</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <span className="text-[11px] text-zinc-400">Mais de 180 avaliações no Google</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS_DATA.map((review) => (
            <div key={review.id} className="bezel-outer h-full">
              <div className="bezel-inner p-6 sm:p-7 flex flex-col h-full relative">
                <MessageSquareQuote className="absolute top-6 right-6 w-8 h-8 text-white/5 pointer-events-none" />

                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-zinc-300 italic leading-relaxed mb-6 flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                  {review.avatarUrl && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-400/30">
                      <Image
                        src={review.avatarUrl}
                        alt={review.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading font-bold text-sm text-white">
                        {review.author}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-[11px] text-zinc-500">
                      {review.role} • {review.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
