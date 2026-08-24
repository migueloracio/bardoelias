import { MetadataRoute } from "next";
import { RESTAURANT_INFO } from "@/data/restaurantInfo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = RESTAURANT_INFO.seo.siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
