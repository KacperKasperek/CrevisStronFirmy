import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { getSiteContent } from "@/lib/content-server";
import { portfolioProjects } from "@/lib/portfolio";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Portfolio — strony internetowe dla firm",
  description: "Zobacz wybrane realizacje Crevis i sprawdź działające wersje demonstracyjne projektowanych przez nas stron internetowych.",
  alternates: { canonical: `${SITE_URL}/portfolio` },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: SITE_NAME,
    url: `${SITE_URL}/portfolio`,
    title: "Portfolio Crevis",
    description: "Wybrane strony internetowe zaprojektowane i wdrożone przez Crevis.",
  },
};

export default async function PortfolioPage() {
  const content = await getSiteContent();

  return (
    <>
      <Nav />
      <main className="flex-1 bg-paper">
        <section className="border-b border-ink/15 bg-ink px-6 py-20 text-paper sm:px-10 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-rust">Portfolio / Crevis</p>
            <h1 className="display mt-5 max-w-5xl text-5xl sm:text-7xl lg:text-8xl">Strony, które pracują na markę.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-paper/70">Projektujemy doświadczenia dopasowane do branży, celu biznesowego i ludzi, którzy mają z nich korzystać. Każde demo możesz otworzyć i przetestować.</p>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10 sm:py-28" aria-labelledby="projects-heading">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-8 border-b border-ink/15 pb-6">
              <h2 id="projects-heading" className="display text-3xl text-rust sm:text-5xl">Wybrane projekty</h2>
              <p className="hidden font-mono text-xs uppercase tracking-[.18em] text-ink/45 sm:block">
                {portfolioProjects.length.toString().padStart(2, "0")} {portfolioProjects.length === 1 ? "realizacja" : "realizacje"}
              </p>
            </div>

            <div className="mt-12 grid gap-16">
              {portfolioProjects.map((project, index) => (
                <article key={project.id} className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,.55fr)] lg:items-center">
                  <a
                    href={project.demoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track={`portfolio-${project.id}`}
                    aria-label={`Otwórz demo projektu ${project.title} w nowej karcie`}
                    className="group relative block overflow-hidden border border-ink/20 bg-paper shadow-[14px_14px_0_#0d0d0d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
                  >
                    <div className="flex h-10 items-center gap-2 border-b border-ink/15 bg-mist px-4" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-rust" />
                      <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
                      <span className="ml-3 text-[10px] font-bold uppercase tracking-[.18em] text-ink/45">crevis.pl/{project.id}</span>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={project.previewImage} alt={project.previewAlt} fill priority={index === 0} sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.015]" />
                    </div>
                  </a>

                  <div className="lg:pl-6">
                    <p className="font-mono text-xs uppercase tracking-[.18em] text-ink/45">{(index + 1).toString().padStart(2, "0")} / {project.industry}</p>
                    <h3 className="mt-5 text-4xl font-bold sm:text-5xl">{project.title}</h3>
                    <p className="mt-5 text-base leading-7 text-ink/65">{project.summary}</p>
                    <a href={project.demoHref} target="_blank" rel="noopener noreferrer" data-track={`portfolio-${project.id}`} className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-rust px-6 py-3 font-bold text-paper transition-colors hover:bg-rust-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                      Zobacz demo <span aria-hidden="true">↗</span>
                    </a>
                    <p className="mt-3 text-xs text-ink/45">Otworzy się w nowej karcie</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer contact={content.contact} />
    </>
  );
}
