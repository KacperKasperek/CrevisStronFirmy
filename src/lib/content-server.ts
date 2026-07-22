import "server-only";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import { defaultSiteContent, siteContentSchema, type SiteContent } from "@/lib/content";

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!process.env.DATABASE_URL) return defaultSiteContent;
  try {
    const row = await db.query.siteContent.findFirst({ where: eq(siteContent.id, "main") });
    return row ? siteContentSchema.parse(row.content) : defaultSiteContent;
  } catch (error) {
    console.error("Nie udało się pobrać treści strony", error);
    return defaultSiteContent;
  }
});
