import { z } from "zod";

const featureSchema = z.object({ title: z.string().min(2).max(120), text: z.string().min(10).max(500) });
const planSchema = z.object({ name: z.string().min(2).max(60), price: z.string().min(1).max(30), featured: z.boolean(), features: z.array(z.string().min(2).max(180)).min(1).max(15), cta: z.string().min(2).max(60) });
const faqSchema = z.object({ q: z.string().min(3).max(180), a: z.string().min(10).max(1000) });

export const siteContentSchema = z.object({
  hero: z.object({ title: z.string().min(5).max(120), description: z.string().min(10).max(400) }),
  why: z.object({ title: z.string().min(3).max(100), description: z.string().min(10).max(700), features: z.array(featureSchema).min(1).max(8) }),
  offer: z.object({ title: z.string().min(3).max(100), plans: z.array(planSchema).min(1).max(8), included: z.array(z.string().min(2).max(160)).min(1).max(15) }),
  faq: z.object({ title: z.string().min(3).max(120), items: z.array(faqSchema).min(1).max(20) }),
  contact: z.object({ title: z.string().min(3).max(120), description: z.string().min(10).max(500), email: z.email(), phone: z.string().min(5).max(40) }),
});
export type SiteContent = z.infer<typeof siteContentSchema>;

export const defaultSiteContent: SiteContent = {
  hero: { title: "Twój sukces\nzaczyna się tutaj", description: "Tworzymy strony, które przyciągają klientów i budują zaufanie do Twojej marki." },
  why: {
    title: "Dlaczego my?",
    description: "Każdy projekt to okazja, by dostarczyć naszym klientom najwyższej jakości rozwiązania, które spełniają ich oczekiwania i przyczyniają się do sukcesu w Internecie.",
    features: [
      { title: "Responsywność na pierwszym miejscu", text: "Zapewniamy perfekcyjne działanie na każdym urządzeniu, od komputera po smartfon." },
      { title: "Szybkość i wydajność", text: "Tworzymy strony, które ładują się w mgnieniu oka i zapewniają lepsze doświadczenia użytkownikom." },
      { title: "Indywidualne podejście", text: "Każda strona to unikalny projekt dopasowany do Twoich potrzeb i celów." },
      { title: "Wsparcie techniczne", text: "Nie zostawiamy Cię samego. Oferujemy pełne wsparcie także po zakończeniu projektu." },
    ],
  },
  offer: {
    title: "Nasza oferta",
    plans: [
      { name: "Start", price: "249", featured: false, cta: "Rozpocznij", features: ["Strona One Page", "Hosting i SSL", "Podłączenie domeny", "Formularz kontaktowy", "Podstawowe SEO", "Kopie zapasowe", "Zmiany do 30 minut miesięcznie"] },
      { name: "Biznes", price: "349", featured: true, cta: "Rozpocznij", features: ["Do 5 podstron", "Wszystko z pakietu Start", "Integracja z Google Analytics", "Optymalizacja wydajności", "Priorytetowe wsparcie", "Zmiany do 1 godziny miesięcznie"] },
      { name: "Premium", price: "499", featured: false, cta: "Skontaktuj się", features: ["Nielimitowana liczba podstron", "Blog", "Zaawansowane SEO", "Landing Page", "Miesięczny raport", "Zmiany do 2 godzin miesięcznie"] },
    ],
    included: ["Brak opłaty na start", "Hosting w cenie", "Certyfikat SSL", "Kopie zapasowe", "Aktualizacje i utrzymanie", "Wsparcie techniczne"],
  },
  faq: {
    title: "Najczęściej\nzadawane pytania",
    items: [
      { q: "Jakie usługi oferujecie?", a: "Projektujemy i wdrażamy strony internetowe, sklepy oraz identyfikację graficzną, od pomysłu po gotowe wdrożenie." },
      { q: "Jak długo trwa projekt?", a: "Prosta strona to zwykle 1–2 tygodnie, a bardziej rozbudowane projekty 4–6 tygodni. Termin ustalamy po poznaniu potrzeb." },
      { q: "Czy oferujecie wsparcie?", a: "Tak. Po wdrożeniu zapewniamy wsparcie techniczne, aktualizacje i pomoc w rozwoju strony." },
      { q: "Jakie są koszty?", a: "Wycena zależy od zakresu projektu. Skontaktuj się z nami, a przygotujemy bezpłatną wycenę." },
      { q: "Jak mogę się skontaktować?", a: "Napisz na office.crevis@gmail.com lub skorzystaj z formularza. Odpowiadamy w ciągu jednego dnia roboczego." },
    ],
  },
  contact: { title: "Gotowy,\nby zacząć?", description: "Nie czekaj, Twój projekt może zacząć się już dziś. Napisz do nas, a odezwiemy się w ciągu jednego dnia roboczego.", email: "office.crevis@gmail.com", phone: "+48 519 523 768" },
};
