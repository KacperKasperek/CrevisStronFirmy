import Image from "next/image";

const links = [
  { label: "Kontakt", href: "#kontakt" },
  { label: "Oferta", href: "#oferta" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
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
        <ul className="flex items-center gap-6 sm:gap-12">
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
      </nav>
    </header>
  );
}
