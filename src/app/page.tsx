import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Oferta from "@/components/Oferta";
import DlaczegoMy from "@/components/DlaczegoMy";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import SeoJsonLd from "@/components/SeoJsonLd";
import { getSiteContent } from "@/lib/content-server";
import { SEO_DESCRIPTION, SEO_TITLE, SITE_NAME, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: SEO_DESCRIPTION,
  alternates: { canonical: SITE_URL, languages: { "pl-PL": SITE_URL } },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: SEO_TITLE, description: SEO_DESCRIPTION },
};

export default async function Home() {
  const content = await getSiteContent();
  return <><SeoJsonLd content={content} /><Nav /><main className="flex-1"><Hero content={content.hero} /><DlaczegoMy content={content.why} /><Oferta content={content.offer} /><Faq content={content.faq} /><Cta content={content.contact} /></main><Footer contact={content.contact} /></>;
}
