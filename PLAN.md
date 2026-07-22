# Plan: Landing page CREVIS (webdev)

## Stack (nowoczesny)
- **Next.js 15** (App Router, TypeScript) + **Tailwind CSS v4** + **Framer Motion** (animacje).
- `next/font` (Google) — display: Archivo Black / Anton; tekst: grotesk (np. Inter/Geist). Logo z PNG.
- `next/image` dla zdjęć tła/logo.
- Statyczna strona (`output: export` możliwy) — gotowa pod deploy na Vercel.
- FAQ: natywny `<details>` LUB komponent z `framer-motion` (animowane rozwijanie). Domyślnie animowany komponent.
- Init: `create-next-app` (TS, Tailwind, App Router, src/, alias `@/`).

## Struktura
```
app/layout.tsx        # fonty, metadata, <html lang="pl">
app/page.tsx          # składa sekcje
app/globals.css       # Tailwind + zmienne kolorów (tokens)
components/
  Nav.tsx  Hero.tsx  Oferta.tsx  DlaczegoMy.tsx  Faq.tsx  Cta.tsx  Footer.tsx
public/                # logo + grafiki skopiowane ze Zrzuty/
```

## Design tokens (Tailwind theme)
- `ink #0D0D0D`, `paper #FFFFFF`, `rust #BD4A2B`, `mist #F2F2F2`.

## Sekcje (kolejność wg zrzutów)
1. **Nav** (sticky, czarny): logo CREVIS + linki `kontakt / portfolio / FAQ`.
2. **Hero**: tło laptop (next/image), "TWÓJ SUKCES ZACZYNA SIĘ TUTAJ" + podtekst + 2 pigułki (oferta, kontakt) + strzałka; subtelny fade/slide-in (Framer Motion).
3. **Nasza oferta** (szare tło): 3 białe karty (Strona internetowa / Projekt strony / Grafika) — ikona, lista z ptaszkami, przycisk "zobacz"; stagger on scroll.
4. **Dlaczego my?**: nagłówek + akapit + 4 bloki (Responsywność, Szybkość, Indywidualne podejście, Wsparcie techniczne).
5. **FAQ**: "NAJCZĘŚCIEJ ZADAWANE PYTANIA" — accordion 5 pytań (animowany).
6. **CTA**: "CZY MASZ JESZCZE PYTANIA?" + baner "GOTOWY, BY ZACZĄĆ?" na tle klawiatury + przycisk kontakt.
7. **Stopka** (czarna): logo, tel/email, pole zapisu na e-mail, kolumny linków, social (Instagram, Facebook, Twitter).

## Responsywność
- Mobile-first, breakpointy Tailwind: karty/feature'y/stopka w kolumnę na mobile, skalowanie nagłówków (`clamp`/`text-*`).

## Animacje (Framer Motion, oszczędnie)
- `whileInView` fade+slide dla sekcji, stagger dla kart oferty, hover-scale na przyciskach, animowany FAQ. Bez przesady.

## Skille dobrane do zadania
- **industrial-brutalist-ui** — główny sterownik stylu (ciężki grotesk, akcent rdzawy, wysoki kontrast, surowa typografia). Dokładnie ten język wizualny.
- **design-taste-frontend** — anti-slop, landing który nie wygląda szablonowo.
- **full-output-enforcement** — pełne, nieucięte komponenty (bez placeholderów/`// ...`).

Pominięte: `high-end-visual-design`, `minimalist-ui` (zakazują pigułek i sekcji w kolorze akcentu — rdzeń tego designu); `image-to-code` (generuje referencje, a my mamy zrzuty).

## Kroki realizacji
1. `create-next-app` + instalacja `framer-motion`.
2. Skopiowanie grafik ze `Zrzuty/` do `public/`.
3. Tokens + fonty (globals.css, layout.tsx).
4. Komponenty sekcji (Nav → Footer) wg zrzutów.
5. Złożenie w `page.tsx`, responsywność, animacje.
6. `npm run dev` — weryfikacja wizualna ze zrzutami.
