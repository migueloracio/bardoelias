import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { RESTAURANT_INFO } from "@/data/restaurantInfo";
import { generateRestaurantSchema, generateMenuSchema } from "@/lib/schemaMarkup";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(RESTAURANT_INFO.seo.siteUrl),
  title: {
    default: `${RESTAURANT_INFO.name} | ${RESTAURANT_INFO.tagline}`,
    template: `%s | ${RESTAURANT_INFO.name}`,
  },
  description: RESTAURANT_INFO.shortDescription,
  keywords: RESTAURANT_INFO.seo.keywords,
  authors: [{ name: "Bar do Elias" }],
  creator: "Bar do Elias",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: RESTAURANT_INFO.seo.siteUrl,
    title: `${RESTAURANT_INFO.name} | Comida de Boteco & Coquetelaria`,
    description: RESTAURANT_INFO.shortDescription,
    siteName: RESTAURANT_INFO.name,
    images: [
      {
        url: RESTAURANT_INFO.seo.ogImage,
        width: 1200,
        height: 630,
        alt: "Bar do Elias - Ambiente e Gastronomia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESTAURANT_INFO.name} | Comida de Boteco & Coquetelaria`,
    description: RESTAURANT_INFO.shortDescription,
    images: [RESTAURANT_INFO.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const restaurantSchema = generateRestaurantSchema();
  const menuSchema = generateMenuSchema();

  return (
    <html lang="pt-BR" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(menuSchema),
          }}
        />
        {/* Google Analytics (se configurado) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-dark-950 text-zinc-100 min-h-[100dvh] flex flex-col antialiased selection:bg-amber-400 selection:text-dark-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
