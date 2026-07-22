"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { label: "Kontakt", href: "#kontakt" },
  { label: "Oferta", href: "#oferta" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-ink">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 md:py-5" aria-label="Główna nawigacja">
        <a href="#top" aria-label="CREVIS - strona główna" className="shrink-0">
          <Image
            src="/img/logo-white.png"
            alt="CREVIS"
            width={150}
            height={32}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </a>
        <ul className="hidden items-center gap-12 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-bold text-paper transition-colors hover:text-rust sm:text-lg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((value) => !value)}
          className="relative grid h-11 w-11 place-items-center border border-paper/25 text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-rust md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden="true" className="grid gap-1.5">
            <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
        <div
          id="mobile-menu"
          className={`absolute left-0 right-0 top-full border-t border-paper/10 bg-ink px-6 transition-[max-height,opacity,visibility] duration-300 md:hidden ${open ? "visible max-h-[calc(100dvh-4.75rem)] opacity-100" : "invisible max-h-0 overflow-hidden opacity-0"}`}
        >
          <ul className="grid py-5">
            {links.map((link, index) => <li key={link.href} className="border-b border-paper/10 last:border-none">
              <a href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-5 text-2xl font-bold text-paper focus:outline-none focus-visible:text-rust">
                <span>{link.label}</span><span className="font-mono text-xs text-rust">0{index + 1}</span>
              </a>
            </li>)}
          </ul>
        </div>
      </nav>
      {open && <button type="button" aria-hidden="true" tabIndex={-1} onClick={() => setOpen(false)} className="fixed inset-x-0 bottom-0 top-[76px] -z-10 bg-ink/55 md:hidden" />}
    </header>
  );
}
