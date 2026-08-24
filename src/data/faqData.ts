export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "reservas" | "pagamento" | "espaco" | "cardapio";
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "f1",
    category: "reservas",
    question: "É necessário fazer reserva de mesa com antecedência?",
    answer: "Trabalhamos tanto com reservas quanto por ordem de chegada. Para sextas, sábados e aniversários/grupos com mais de 6 pessoas, recomendamos fortemente reservar com pelo menos 24h de antecedência via WhatsApp.",
  },
  {
    id: "f2",
    category: "reservas",
    question: "Como funciona a comemoração de aniversários no Bar do Elias?",
    answer: "Aniversariantes acompanhados de 6 ou mais convidados ganham uma sobremesa especial da casa ou um drink autoral à escolha, além de condições especiais de reserva para a mesa.",
  },
  {
    id: "f3",
    category: "pagamento",
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos Pix, cartões de crédito e débito (Mastercard, Visa, Elo, American Express), além dos principais vales-refeição (Ticket Restaurante, Sodexo/Pluxee, Alelo e VR).",
  },
  {
    id: "f4",
    category: "espaco",
    question: "O Bar do Elias é Pet Friendly?",
    answer: "Sim! Seu melhor amigo de quatro patas é muito bem-vindo em nossa área externa e deck coberto. Disponibilizamos potinhos de água fresca com carinho.",
  },
  {
    id: "f5",
    category: "cardapio",
    question: "Vocês possuem opções vegetarianas ou sem glúten?",
    answer: "Sim! Nosso cardápio conta com opções vegetarianas consagradas (como os Dadinhos de Tapioca com Queijo Coalho e pastéis de queijo/palmito), além de opções sem glúten sinalizadas.",
  },
  {
    id: "f6",
    category: "espaco",
    question: "Há música ao vivo? Cobram couvert artístico?",
    answer: "Temos apresentações acústicas (Samba, MPB e Pop/Rock) de quinta a sábado a partir das 20h. Cobramos um couvert simbólico de R$ 12 por pessoa apenas nos horários das apresentações.",
  },
];
