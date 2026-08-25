import { supabase, isSupabaseConfigured } from "./supabase";
import { MenuItem, MenuCategory, MENU_CATEGORIES, MENU_ITEMS } from "@/data/menuData";

const STORAGE_KEY = "bar_do_elias_menu_override_v1";

// Helpers para sincronização híbrida (Supabase -> LocalStorage -> Mock)
export async function getLiveMenuItems(): Promise<MenuItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("order_index", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          name: d.name,
          category: d.category,
          description: d.description || "",
          price: Number(d.price),
          image: d.image || "/images/real/bar-iluminacao-noturna.jpg",
          isAvailable: d.is_available ?? true,
          isBestSeller: d.is_best_seller ?? false,
          isChefSpecial: d.is_chef_special ?? false,
          tags: d.tags || [],
          serves: d.serves || undefined,
        }));
      }
    } catch (err) {
      console.warn("Falha ao buscar dados do Supabase. Usando fallback local.", err);
    }
  }

  // Fallback LocalStorage no navegador
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
  }

  return MENU_ITEMS;
}

export async function saveLiveMenuItem(item: MenuItem): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const payload = {
        id: item.id,
        name: item.name,
        category: item.category,
        description: item.description,
        price: item.price,
        image: item.image,
        is_available: item.isAvailable !== false,
        is_best_seller: Boolean(item.isBestSeller),
        is_chef_special: Boolean(item.isChefSpecial),
        tags: item.tags || [],
        serves: item.serves || null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("menu_items")
        .upsert(payload, { onConflict: "id" });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  // Fallback Local
  if (typeof window !== "undefined") {
    const current = await getLiveMenuItems();
    const existingIndex = current.findIndex((i) => i.id === item.id);
    let updated: MenuItem[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = item;
    } else {
      updated = [item, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true };
  }

  return { success: false, error: "Ambiente sem suporte a persistência" };
}

export async function deleteLiveMenuItem(id: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("menu_items").delete().eq("id", id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  if (typeof window !== "undefined") {
    const current = await getLiveMenuItems();
    const filtered = current.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return { success: true };
  }

  return { success: false, error: "Não foi possível excluir" };
}

export async function toggleLiveItemAvailability(id: string, isAvailable: boolean): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from("menu_items")
        .update({ is_available: isAvailable, updated_at: new Date().toISOString() })
        .eq("id", id);
      return !error;
    } catch (e) {
      return false;
    }
  }

  if (typeof window !== "undefined") {
    const current = await getLiveMenuItems();
    const updated = current.map((i) => (i.id === id ? { ...i, isAvailable } : i));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  }
  return false;
}

export async function updateLiveItemPrice(id: string, newPrice: number): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from("menu_items")
        .update({ price: newPrice, updated_at: new Date().toISOString() })
        .eq("id", id);
      return !error;
    } catch (e) {
      return false;
    }
  }

  if (typeof window !== "undefined") {
    const current = await getLiveMenuItems();
    const updated = current.map((i) => (i.id === id ? { ...i, price: newPrice } : i));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  }
  return false;
}

// Upload de Fotos para o Supabase Storage com Fallback Base64
export async function uploadMenuImage(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `dish_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
  const filePath = `${fileName}`;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.storage
        .from("menu-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.warn("Aviso ao fazer upload no Supabase Storage:", error.message);
        // Tenta fallback para Data URL Base64
      } else {
        const { data: publicData } = supabase.storage
          .from("menu-images")
          .getPublicUrl(filePath);

        if (publicData?.publicUrl) {
          return { success: true, url: publicData.publicUrl };
        }
      }
    } catch (err: any) {
      console.warn("Erro no Storage:", err.message);
    }
  }

  // Fallback: Leitura local como DataURL (Base64)
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ success: true, url: reader.result as string });
    };
    reader.onerror = () => {
      resolve({ success: false, error: "Falha ao ler arquivo de imagem local" });
    };
    reader.readAsDataURL(file);
  });
}
