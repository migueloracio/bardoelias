export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl?: string;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "r1",
    author: "Marcelo Albuquerque",
    role: "Local Guide Google (140+ reviews)",
    rating: 5,
    text: "O melhor torresmo de rolo que já comi em São Paulo! Chopp trincando de gelado e o atendimento do próprio Elias na mesa faz toda a diferença. Ambiente incrível.",
    date: "Há 1 semana",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "r2",
    author: "Juliana Mendes",
    role: "Cliente Frequente",
    rating: 5,
    text: "Comemorei meu aniversário com 15 amigos no deck. A comida chegou quentinha, os drinks autorais são maravilhosos (peçam o de cachaça com amburana) e a equipe foi impecável!",
    date: "Há 2 semanas",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "r3",
    author: "Rodrigo F. Zanetti",
    role: "Crítico Gastronômico Amador",
    rating: 5,
    text: "Comida de boteco elevada a outro patamar. O bolinho de costela com provolone é surreal de saboroso. Preço justo pela qualidade entregue. Voltarei muitas vezes.",
    date: "Há 3 semanas",
    avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "r4",
    author: "Camila Duarte",
    role: "Frequentadora Assídua",
    rating: 5,
    text: "Lugar acolhedor, música ao vivo no volume ideal para conversar e os dadinhos de tapioca mais crocantes da região. Super recomendo para happy hour.",
    date: "Há 1 mês",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
  },
];
