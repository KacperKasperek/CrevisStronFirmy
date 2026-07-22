import type { SiteContent } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export default function SeoJsonLd({ content }: { content: SiteContent }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/img/logo-rust.png`,
        email: content.contact.email,
        telephone: content.contact.phone,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: content.contact.email,
          telephone: content.contact.phone,
          availableLanguage: "Polish",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Usługi Crevis",
          itemListElement: [
            "Projektowanie stron internetowych",
            "Wdrażanie stron internetowych",
            "Sklepy internetowe",
            "Identyfikacja wizualna",
            "Opieka i wsparcie techniczne",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "pl-PL",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        inLanguage: "pl-PL",
        mainEntity: content.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

