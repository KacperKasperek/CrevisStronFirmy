import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/img/hero.png`],
    },
    {
      url: `${SITE_URL}/polityka-prywatnosci`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
