export type PortfolioProject = {
  id: string;
  title: string;
  industry: string;
  summary: string;
  previewImage: string;
  previewAlt: string;
  demoHref: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "demo1",
    title: "Rura i Spółka",
    industry: "Usługi lokalne · Hydraulika",
    summary:
      "Kompletna strona dla fikcyjnego serwisu hydraulicznego: wyrazisty wizerunek, czytelna oferta, lokalny zasięg i demonstracyjny formularz zgłoszenia.",
    previewImage: "/img/portfolio/demo1-hydraulika.webp",
    previewAlt: "Podgląd strony internetowej Rura i Spółka przygotowanej przez Crevis",
    demoHref: "/demo1",
  },
];
