import Image from "next/image";
import Pill from "./Pill";
import type { SiteContent } from "@/lib/content";
export default function Hero({ content }: { content: SiteContent["hero"] }) {
  return <section id="top" className="relative flex min-h-[calc(100dvh-76px)] items-center justify-center overflow-hidden bg-ink"><Image src="/img/hero.png" alt="" fill loading="eager" fetchPriority="high" quality={70} sizes="100vw" className="object-cover object-[center_60%] opacity-70" /><div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/50 to-ink/90" /><div className="hero-reveal relative z-10 mx-auto max-w-3xl px-6 text-center text-paper"><h1 className="display text-4xl text-balance sm:text-6xl lg:text-7xl">{content.title.split("\n").map((line) => <span className="block" key={line}>{line}</span>)}</h1><p className="mx-auto mt-6 max-w-xl text-base text-paper/80 sm:text-lg">{content.description}</p><div className="mt-9 flex flex-wrap justify-center gap-4"><Pill href="#oferta" data-track="hero-oferta">oferta</Pill><Pill href="#kontakt" variant="outline" data-track="hero-kontakt">kontakt</Pill></div></div></section>;
}
