import Image from "next/image";
import Link from "next/link";
import { portfolioProjects } from "@/lib/portfolio";

export default function PortfolioSection() {
  const project = portfolioProjects[0];

  return (
    <section id="portfolio" className="overflow-hidden bg-ink px-6 py-20 text-paper sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 border-b border-paper/15 pb-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.22em] text-rust">Wybrane realizacje</p>
            <h2 className="display mt-4 max-w-4xl text-4xl sm:text-6xl lg:text-7xl">Projektujemy, żeby działało.</h2>
          </div>
          <Link href="/portfolio" className="group inline-flex min-h-12 items-center gap-3 font-bold text-paper underline decoration-rust decoration-2 underline-offset-8 hover:text-rust focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust">
            Pełne portfolio <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <article className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,.65fr)] lg:items-center">
          <a
            href={project.demoHref}
            target="_blank"
            rel="noopener noreferrer"
            data-track={`portfolio-${project.id}`}
            aria-label={`Otwórz demo projektu ${project.title} w nowej karcie`}
            className="group relative block overflow-hidden border border-paper/20 bg-paper shadow-[14px_14px_0_#bd4a2b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
          >
            <div className="flex h-10 items-center gap-2 border-b border-ink/15 bg-mist px-4" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-rust" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
              <span className="ml-3 text-[10px] font-bold uppercase tracking-[.18em] text-ink/45">crevis.pl/{project.id}</span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={project.previewImage}
                alt={project.previewAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.015]"
              />
              <span className="absolute bottom-4 right-4 grid h-14 w-14 place-items-center rounded-full bg-rust text-2xl text-paper transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">↗</span>
            </div>
          </a>

          <div className="lg:pl-5">
            <p className="font-mono text-xs uppercase tracking-[.18em] text-paper/55">01 / {project.industry}</p>
            <h3 className="mt-5 text-3xl font-bold sm:text-4xl">{project.title}</h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-paper/70">{project.summary}</p>
            <a
              href={project.demoHref}
              target="_blank"
              rel="noopener noreferrer"
              data-track={`portfolio-${project.id}`}
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-rust px-6 py-3 font-bold text-paper transition-colors hover:bg-rust-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
            >
              Zobacz demo <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-3 text-xs text-paper/45">Otworzy się w nowej karcie</p>
          </div>
        </article>
      </div>
    </section>
  );
}
