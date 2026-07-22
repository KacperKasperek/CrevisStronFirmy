"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import type { SiteContent } from "@/lib/content";
export default function Faq({ content }: { content: SiteContent["faq"] }) {
  const [open, setOpen] = useState<number | null>(null); const reduce = useReducedMotion();
  return <section id="faq" className="bg-paper px-6 py-20 sm:px-10 sm:py-28"><div className="mx-auto max-w-4xl"><h2 className="display text-3xl sm:text-5xl">{content.title.split("\n").map((line) => <span className="block" key={line}>{line}</span>)}</h2><div className="mt-12">{content.items.map((item, i) => { const isOpen = open === i; return <div key={`${item.q}-${i}`} className="border-b border-ink/10"><button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full justify-between gap-6 py-6 text-left"><span className="text-lg font-bold text-rust sm:text-xl">{item.q}</span><motion.span animate={reduce ? undefined : { rotate: isOpen ? 45 : 0 }}><Plus size={26} /></motion.span></button><AnimatePresence>{isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="pb-6 pr-10 text-[15px] leading-relaxed text-ink/70">{item.a}</p></motion.div>}</AnimatePresence></div>; })}</div></div></section>;
}
