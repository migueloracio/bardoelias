"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurantInfo";

export function OpeningStatusBadge() {
  const [status, setStatus] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "Verificando...",
  });

  useEffect(() => {
    function checkStatus() {
      const now = new Date();
      const currentDayIndex = now.getDay(); // 0: Dom, 1: Seg, ...
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeVal = currentHours * 60 + currentMinutes;

      const schedule = RESTAURANT_INFO.openingHours.find(
        (h) => h.dayIndex === currentDayIndex
      );

      if (!schedule || !schedule.isOpen || schedule.open === "Fechado") {
        // Encontrar próximo dia aberto
        const nextOpenDay = RESTAURANT_INFO.openingHours.find((h) => h.isOpen);
        setStatus({
          isOpen: false,
          message: nextOpenDay
            ? `Fechado hoje • Abre ${nextOpenDay.shortDay} às ${nextOpenDay.open}`
            : "Fechado hoje",
        });
        return;
      }

      const [openHour, openMin] = schedule.open.split(":").map(Number);
      const [closeHour, closeMin] = schedule.close.split(":").map(Number);

      const openTimeVal = openHour * 60 + (openMin || 0);
      // Se fecha na madrugada (ex: 02:00)
      const closeTimeVal =
        closeHour < openHour
          ? (closeHour + 24) * 60 + (closeMin || 0)
          : closeHour * 60 + (closeMin || 0);

      const effectiveCurrentTimeVal =
        currentHours < openHour && closeHour < openHour
          ? (currentHours + 24) * 60 + currentMinutes
          : currentTimeVal;

      if (effectiveCurrentTimeVal >= openTimeVal && effectiveCurrentTimeVal < closeTimeVal) {
        setStatus({
          isOpen: true,
          message: `Aberto agora até ${schedule.close}`,
        });
      } else {
        setStatus({
          isOpen: false,
          message: `Fechado • Abre hoje às ${schedule.open}`,
        });
      }
    }

    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
        status.isOpen
          ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-300"
          : "bg-amber-950/50 border-amber-500/30 text-amber-300"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            status.isOpen ? "bg-emerald-400" : "bg-amber-400"
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            status.isOpen ? "bg-emerald-500" : "bg-amber-500"
          }`}
        />
      </span>
      <Clock className="w-3.5 h-3.5 opacity-70" />
      <span>{status.message}</span>
    </div>
  );
}
