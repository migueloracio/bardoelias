import { RESTAURANT_INFO } from "@/data/restaurantInfo";
import { MENU_ITEMS } from "@/data/menuData";

export function generateRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["BarOrPub", "Restaurant"],
    "@id": `${RESTAURANT_INFO.seo.siteUrl}/#restaurant`,
    "name": RESTAURANT_INFO.name,
    "alternateName": "Bar do Elias - Ferraz de Vasconcelos",
    "description": RESTAURANT_INFO.longDescription,
    "url": RESTAURANT_INFO.seo.siteUrl,
    "telephone": RESTAURANT_INFO.phone,
    "email": RESTAURANT_INFO.email,
    "servesCuisine": [
      "Brasileira",
      "Comida de Boteco",
      "Coquetelaria",
      "Porções",
      "Petiscos"
    ],
    "priceRange": "$$",
    "image": [
      RESTAURANT_INFO.seo.ogImage,
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=85"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": RESTAURANT_INFO.address.street,
      "addressLocality": RESTAURANT_INFO.address.neighborhood,
      "addressRegion": "SP",
      "postalCode": RESTAURANT_INFO.address.zipCode,
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.5472,
      "longitude": -46.3760148
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Wednesday", "Friday", "Saturday"],
        "opens": "19:00",
        "closes": "02:00"
      }
    ],
    "acceptsReservations": "True",
    "hasMenu": `${RESTAURANT_INFO.seo.siteUrl}/cardapio`,
    "sameAs": [
      RESTAURANT_INFO.social.instagram,
      RESTAURANT_INFO.social.facebook,
      RESTAURANT_INFO.address.googleMapsLink
    ]
  };
}

export function generateMenuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Cardápio Principal - Bar do Elias",
    "url": `${RESTAURANT_INFO.seo.siteUrl}/cardapio`,
    "inLanguage": "pt-BR",
    "hasMenuItem": MENU_ITEMS.slice(0, 10).map((item) => ({
      "@type": "MenuItem",
      "name": item.name,
      "description": item.description,
      "image": item.image,
      "offers": {
        "@type": "Offer",
        "price": item.price.toFixed(2),
        "priceCurrency": "BRL"
      }
    }))
  };
}
