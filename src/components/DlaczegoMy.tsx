"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Devices, Lightning, Target, Headset, type Icon } from "@phosphor-icons/react";
import type { SiteContent } from "@/lib/content";
const icons: Icon[] = [Devices, Lightning, Target, Headset];
export default function DlaczegoMy({ content }: { content: SiteContent["why"] }) {
  const reduce = useReducedMotion();
  return <section className="bg-mist px-6 py-20 sm:px-10 sm:py-28"><div className="mx-auto max-w-7xl"><motion.h2 initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="display text-center text-3xl text-rust sm:text-5xl">{content.title}</motion.h2><p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-ink/70">{content.description}</p><div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">{content.features.map((feature, index) => { const Glyph = icons[index % icons.length]; return <motion.article key={`${feature.title}-${index}`} initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-paper p-8 shadow-[0_20px_50px_-30px_rgba(0,0,0,.4)] ring-1 ring-ink/5"><Glyph size={44} weight="duotone" className="text-rust" /><h3 className="mt-6 text-xl font-bold">{feature.title}</h3><p className="mt-3 text-[15px] leading-relaxed text-ink/70">{feature.text}</p></motion.article>; })}</div></div></section>;
}
