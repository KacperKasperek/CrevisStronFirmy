import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://crevis.pl"; // ← zmień na właściwą domenę

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: "monthly", priority: 1 }];
}
