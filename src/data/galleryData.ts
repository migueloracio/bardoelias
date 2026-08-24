export interface GalleryItem {
  id: string;
  title: string;
  category: "pratos" | "drinks" | "ambiente" | "eventos";
  categoryLabel: string;
  image: string;
  description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Deck com Piscina & Iluminação Noturna",
    category: "ambiente",
    categoryLabel: "Ambiente Real",
    image: "/images/real/deck-piscina-noite.jpg",
    description: "Espaço exclusivo com piscina, iluminação ambiente aconchegante e mesas para curtir a noite.",
  },
  {
    id: "g2",
    title: "Balcão dos Esportes & Telões",
    category: "eventos",
    categoryLabel: "Transmissão & Esportes",
    image: "/images/real/balcao-tv-esportes.jpg",
    description: "Assista aos jogos do seu time com visão privilegiada de múltiplos telões e TVs no balcão.",
  },
  {
    id: "g3",
    title: "Lounge & Balcão Principal",
    category: "ambiente",
    categoryLabel: "Ambiente Real",
    image: "/images/real/lounge-balcao-principal.jpg",
    description: "Ambiente acolhedor com luzes âmbar, decoração rústica e balcão amplo de atendimento.",
  },
  {
    id: "g4",
    title: "Varanda Externa com Toldos & Banquetas",
    category: "ambiente",
    categoryLabel: "Ambiente Real",
    image: "/images/real/varanda-externa.jpg",
    description: "Área externa ventilada com banquetas altas, perfeita para reunir a turma e relaxar.",
  },
  {
    id: "g5",
    title: "Clima Noturno & Forno a Lenha",
    category: "ambiente",
    categoryLabel: "Ambiente Real",
    image: "/images/real/bar-iluminacao-noturna.jpg",
    description: "Iluminação festiva com cordões de luz e estrutura completa para porções e petiscos quentinhos.",
  },
  {
    id: "g6",
    title: "Torresmo de Rolo Pururuca",
    category: "pratos",
    categoryLabel: "Pratos & Petiscos",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=85",
    description: "Panceta enrolada e pururucada lentamente servida com geleia de pimenta defumada.",
  },
  {
    id: "g7",
    title: "Coquetéis & Drinks Especiais",
    category: "drinks",
    categoryLabel: "Drinks & Coquetéis",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85",
    description: "Coquetelaria clássica e autoral servida com destilados de primeira linha.",
  },
  {
    id: "g8",
    title: "Bolinhos Artesanais de Costela",
    category: "pratos",
    categoryLabel: "Pratos & Petiscos",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=85",
    description: "Recheio farto de costela com provolone e crosta dourada hiper crocante.",
  },
];
