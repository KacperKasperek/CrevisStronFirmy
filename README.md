# Crevis

Landing page i prywatny panel operacyjny zbudowane w Next.js 16. Aplikacja wymaga środowiska Node.js oraz MySQL; nie jest już statycznym eksportem.

## Konfiguracja lokalna

1. Skopiuj `.env.example` do `.env.local` i uzupełnij dostęp do MySQL, SMTP oraz sekrety.
2. Zainstaluj pakiety: `npm install`.
3. Uruchom migracje: `npm run db:migrate`.
4. Utwórz jedyne konto administratora: `npm run admin:create`.
5. Uruchom aplikację: `npm run dev`, zaloguj się przez `/panel` i od razu skonfiguruj 2FA.

`ADMIN_PASSWORD` jest potrzebne tylko przy tworzeniu konta. Po wykonaniu skryptu usuń tę zmienną z konfiguracji produkcyjnej.

## Wdrożenie na Hostinger Application Hosting

- Build command: `npm run build` (automatycznie wykonuje migracje i tworzy brakujące konto administratora)
- Start command: `npm run start`
- Runtime: aktualne Node.js LTS
- Health check: `/`

Ustaw wszystkie zmienne z `.env.example` w panelu Hostingera. `BETTER_AUTH_URL` musi wskazywać finalny adres HTTPS, np. `https://crevis.pl`. Przed migracją produkcyjną wykonaj kopię bazy. Dla Gmaila włącz weryfikację dwuetapową i użyj osobnego hasła aplikacji jako `SMTP_PASSWORD`; nie wpisuj zwykłego hasła do konta Google.

## Kontrole

```bash
npm run lint
npm test
npm run build
```

Panel zawiera wiadomości, statystyki, CMS tekstowy, projekty, etapy, Kanban i odwoływalne linki statusowe dla klientów.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
