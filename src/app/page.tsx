import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Oferta from "@/components/Oferta";
import DlaczegoMy from "@/components/DlaczegoMy";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content-server";

export const dynamic = "force-dynamic";
export default async function Home() {
  const content = await getSiteContent();
  return <><Nav /><main className="flex-1"><Hero content={content.hero} /><DlaczegoMy content={content.why} /><Oferta content={content.offer} /><Faq content={content.faq} /><Cta content={content.contact} /></main><Footer contact={content.contact} /></>;
}
