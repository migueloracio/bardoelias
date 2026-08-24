export interface MenuItem {
  id: string;
  name: string;
  category: "petiscos" | "pratos" | "drinks" | "cervejas" | "sobremesas";
  description: string;
  price: number;
  promotionalPrice?: number;
  image: string;
  tags?: string[];
  isAvailable?: boolean;
  isChefSpecial?: boolean;
  isBestSeller?: boolean;
  serves?: string;
}

export interface MenuCategory {
  id: "todos" | "petiscos" | "pratos" | "drinks" | "cervejas" | "sobremesas";
  label: string;
  iconName: string;
  description: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "todos", label: "Tudo", iconName: "Flame", description: "Explore o cardápio completo do Elias" },
  { id: "petiscos", label: "Petiscos & Porções", iconName: "Utensils", description: "Para compartilhar no happy hour e celebrar com amigos" },
  { id: "pratos", label: "Pratos Principais", iconName: "Beef", description: "Almoços e jantares fartos preparados com amor" },
  { id: "drinks", label: "Drinks & Coquetéis", iconName: "GlassWater", description: "Coquetelaria autoral e clássicos atemporais" },
  { id: "cervejas", label: "Chopps & Cervejas", iconName: "Beer", description: "Rótulos artesanais e chopp servido no copo trincando" },
  { id: "sobremesas", label: "Sobremesas", iconName: "CakeSlice", description: "Finalize a sua experiência com doçura artesanal" },
];

export const MENU_ITEMS: MenuItem[] = [
  // PETISCOS
  {
    id: "p1",
    name: "Bolinho de Costela com Provolone",
    category: "petiscos",
    description: "6 unidades de bolinho crocante recheado com costela desfiada cozida por 12h e queijo provolone derretido. Acompanha maionese de alho negro.",
    price: 46.90,
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
    tags: ["Artesanal", "Mais Pedido"],
    isBestSeller: true,
    isChefSpecial: true,
    serves: "2 a 3 pessoas",
  },
  {
    id: "p2",
    name: "Torresmo de Rolo Crocante do Elias",
    category: "petiscos",
    description: "Panceta enrolada e pururucada lentamente na brasa, servida em fatias crocantes com geleia de pimenta defumada e fatias de limão siciliano.",
    price: 52.00,
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80",
    tags: ["Especialidade", "Crocante"],
    isChefSpecial: true,
    serves: "2 a 3 pessoas",
  },
  {
    id: "p3",
    name: "Dadinhos de Tapioca com Queijo Coalho",
    category: "petiscos",
    description: "Crocantes por fora, macios por dentro. Acompanhados de melaço de cana infusionado com gengibre e pimenta dedo-de-moça.",
    price: 38.50,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegetariano", "Sem Glúten"],
    isBestSeller: true,
    serves: "2 pessoas",
  },
  {
    id: "p4",
    name: "Frango a Passarinho Crocante com Alho Frito",
    category: "petiscos",
    description: "Cortes selecionados de frango marinados em ervas e especiarias, empanados e cobertos com generosa camada de alho dourado e salsinha fresca.",
    price: 44.00,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    tags: ["Clássico de Boteco"],
    serves: "2 a 3 pessoas",
  },
  {
    id: "p5",
    name: "Picanha na Chapa com Mandioca na Manteiga",
    category: "petiscos",
    description: "Tiras suculentas de picanha nobre grelhadas na chapa com cebola caramelizada, acompanhadas de mandioca frita na manteiga de garrafa e farofa crocante.",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    tags: ["Premium", "Farto"],
    isBestSeller: true,
    serves: "3 a 4 pessoas",
  },
  {
    id: "p6",
    name: "Pastéis Sortidos do Elias (8 un)",
    category: "petiscos",
    description: "Massa fininha e super crocante recheada com carne seca com catupiry, queijo meia cura com orégano e palmito cremoso.",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    tags: ["Tradicional"],
    serves: "2 pessoas",
  },

  // PRATOS PRINCIPAIS
  {
    id: "m1",
    name: "Parmegiana da Casa com Arroz e Fritas",
    category: "pratos",
    description: "Filé mignon empanado artesanalmente, coberto com molho de tomate rústico da casa e queijo muçarela gratinado. Acompanha arroz branco e batatas fritas crocantes.",
    price: 78.90,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
    tags: ["Individual Generoso", "Favorito"],
    isBestSeller: true,
    serves: "1 a 2 pessoas",
  },
  {
    id: "m2",
    name: "Baião de Dois Sertanejo do Elias",
    category: "pratos",
    description: "Feijão fradinho, arroz, carne de sol desfiada, queijo coalho tostado, bacon crocante, linguiça artesanal e toque de coentro fresco.",
    price: 68.00,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    tags: ["Prato Típico", "Sabor Raiz"],
    isChefSpecial: true,
    serves: "2 pessoas",
  },
  {
    id: "m3",
    name: "Risoto de Costela com Agrião e Parmesão",
    category: "pratos",
    description: "Arroz arbóreo cremoso enriquecido com redução de vinho tinto, costela bovina desfiada no ponto perfeito e folhas de agrião fresco.",
    price: 64.90,
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    tags: ["Gourmet"],
    serves: "1 pessoa",
  },

  // DRINKS
  {
    id: "d1",
    name: "Caipirinha Imperial do Elias",
    category: "drinks",
    description: "Cachaça artesanal envelhecida em barril de amburana, limão tahiti, limão siciliano, rapadura ralada e ramo de hortelã fresca.",
    price: 29.90,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    tags: ["Autoral", "Mais Pedido"],
    isBestSeller: true,
    isChefSpecial: true,
  },
  {
    id: "d2",
    name: "Gin Tônica Tropical Botanic",
    category: "drinks",
    description: "Gin premium infusionado com zimbro, água tônica artesanal, fatias de maracujá, alecrim fresco e toque cítrico de toranja.",
    price: 34.00,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    tags: ["Refrescante", "Instagramável"],
    isBestSeller: true,
  },
  {
    id: "d3",
    name: "Smoky Old Fashioned",
    category: "drinks",
    description: "Bourbon Whiskey americano, bitter aromático de laranja, xarope de açúcar demerara e finalização com defumação de canela em pau na mesa.",
    price: 38.00,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    tags: ["Clássico Sofisticado"],
    isChefSpecial: true,
  },
  {
    id: "d4",
    name: "Moscow Mule da Boemia",
    category: "drinks",
    description: "Vodka selecionada, suco de limão fresco, xarope artesanal de gengibre e espuma cremosa de gengibre com raspas de limão tahiti na caneca de cobre.",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
    tags: ["Popular"],
    isBestSeller: true,
  },

  // CERVEJAS & CHOPP
  {
    id: "c1",
    name: "Chopp Pilsen Puro Malte (300ml / 500ml)",
    category: "cervejas",
    description: "Chopp extremamente fresco, colarinho cremoso aveludado e temperatura de -2°C no copo previamente ultracongelado.",
    price: 11.90,
    image: "https://images.unsplash.com/photo-1608270119864-1678121a8d05?auto=format&fit=crop&w=800&q=80",
    tags: ["Super Gelado", "Mais Vendido"],
    isBestSeller: true,
  },
  {
    id: "c2",
    name: "Chopp IPA Artesanal (500ml)",
    category: "cervejas",
    description: "Notas cítricas marcantes de lúpulos americanos, amargor equilibrado e corpo dourado aveludado.",
    price: 18.90,
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=800&q=80",
    tags: ["Artesanal", "Amargor Intenso"],
  },
  {
    id: "c3",
    name: "Cervejas Especiais Garrafa (600ml)",
    category: "cervejas",
    description: "Opções selecionadas: Heineken, Stella Artois, Original, Spaten e Corona.",
    price: 17.50,
    image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80",
    tags: ["Garrafa 600ml"],
  },

  // SOBREMESAS
  {
    id: "s1",
    name: "Pudim de Leite Condensado com Calda de Cachaça e Café",
    category: "sobremesas",
    description: "Pudim lisinho e cremoso, sem furinhos, finalizado com calda aveludada de caramelo, café expresso e notas sutis de cachaça envelhecida.",
    price: 22.00,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    tags: ["Autoral", "Incrível"],
    isChefSpecial: true,
    isBestSeller: true,
  },
  {
    id: "s2",
    name: "Churros Artesanais com Doce de Leite Viçosa",
    category: "sobremesas",
    description: "Palitos crocantes de churros passados no açúcar com canela, acompanhados de generoso pote de doce de leite cremoso de Minas Gerais.",
    price: 24.50,
    image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80",
    tags: ["Sobremesa Quente"],
    isBestSeller: true,
  },
];
