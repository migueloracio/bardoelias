export interface OpeningHour {
  day: string;
  shortDay: string;
  dayIndex: number; // 0 = Domingo, 1 = Segunda, ...
  open: string;
  close: string;
  isOpen: boolean;
}

export const RESTAURANT_INFO = {
  name: "Bar do Elias",
  tagline: "Drinks, Música ao Vivo, Caraoquê e Comida de Boteco",
  shortDescription: "O ponto de encontro perfeito em Ferraz de Vasconcelos. Coquetelaria, cerveja gelada, noites de caraoquê, transmissão de esportes e música ao vivo.",
  longDescription: "O Bar do Elias é o espaço ideal em Ferraz de Vasconcelos para reunir a turma, curtir boa música ao vivo, soltar a voz no caraoquê, acompanhar jogos e saborear drinks exclusivos acompanhados dos melhores petiscos.",
  
  phone: "(11) 99949-7546",
  whatsappNumber: "5511999497546",
  whatsappDefaultMessage: "Olá! Gostaria de reservar uma mesa ou saber mais sobre a programação do Bar do Elias.",
  email: "contato@bardoelias.com.br",
  
  address: {
    street: "R. Sete de Setembro, 595",
    neighborhood: "Vila Romanopolis",
    city: "Ferraz de Vasconcelos",
    state: "SP",
    zipCode: "08529-300",
    country: "Brasil",
    fullFormatted: "R. Sete de Setembro, 595 - Vila Romanopolis, Ferraz de Vasconcelos - SP, 08529-300",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.348425251648!2d-46.37858972377334!3d-23.547200078809425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce65cebab8c0a7%3A0x674405cbe6e4d75c!2sBar%20do%20Elias!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr",
    googleMapsLink: "https://www.google.com/maps/place/Bar+do+Elias/@-23.5472,-46.3760148,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce65cebab8c0a7:0x674405cbe6e4d75c!8m2!3d-23.5472!4d-46.3760148!16s%2Fg%2F11yt8wxvty?hl=pt-BR",
  },
  
  social: {
    instagram: "https://instagram.com/bardoeliasoficial",
    instagramHandle: "@bardoeliasoficial",
    facebook: "https://facebook.com/bardoeliasoficial",
  },

  openingHours: [
    { day: "Segunda-feira", shortDay: "Seg", dayIndex: 1, open: "Fechado", close: "Fechado", isOpen: false },
    { day: "Terça-feira", shortDay: "Ter", dayIndex: 2, open: "Fechado", close: "Fechado", isOpen: false },
    { day: "Quarta-feira", shortDay: "Qua", dayIndex: 3, open: "19:00", close: "02:00", isOpen: true },
    { day: "Quinta-feira", shortDay: "Qui", dayIndex: 4, open: "Fechado", close: "Fechado", isOpen: false },
    { day: "Sexta-feira", shortDay: "Sex", dayIndex: 5, open: "19:00", close: "02:00", isOpen: true },
    { day: "Sábado", shortDay: "Sáb", dayIndex: 6, open: "19:00", close: "02:00", isOpen: true },
    { day: "Domingo", shortDay: "Dom", dayIndex: 0, open: "Fechado", close: "Fechado", isOpen: false },
  ] as OpeningHour[],

  differentiators: [
    {
      icon: "Mic",
      title: "Noites de Caraoquê",
      description: "Solte a voz com os amigos! Estrutura completa de som e repertório atualizado para você brilhar.",
    },
    {
      icon: "Music",
      title: "Música & Shows ao Vivo",
      description: "Apresentações com artistas da região, trazendo o melhor do sertanejo, pagode, pop e MPB.",
    },
    {
      icon: "Tv",
      title: "Transmissão de Esportes",
      description: "Telões e televisores para você não perder nenhum lance dos jogos do seu time com cerveja gelada.",
    },
    {
      icon: "GlassWater",
      title: "Coquetéis & Bebidas Selecionadas",
      description: "Drinks autorais, caipirinhas, destilados premium e chopp tirado na temperatura ideal.",
    },
  ],

  seo: {
    siteUrl: "https://bardoelias.vercel.app",
    ogImage: "/images/real/deck-piscina-noite.jpg",
    keywords: [
      "Bar do Elias",
      "bar em Ferraz de Vasconcelos",
      "caraoquê Ferraz de Vasconcelos",
      "música ao vivo Ferraz",
      "Vila Romanopolis bar",
      "comida de boteco",
      "drinks e coquetéis",
      "assistir jogos no bar",
      "bar para grupos",
    ],
  }
};
