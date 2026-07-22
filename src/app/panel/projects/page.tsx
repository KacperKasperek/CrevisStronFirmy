import Link from "next/link";
import { desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import PanelShell from "@/components/admin/PanelShell";
import { createProjectAction, deleteProjectAction } from "../actions";
export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  await requireAdmin();
  const rows = await db.select().from(projects).orderBy(desc(projects.updatedAt));

  return <PanelShell title="Projekty" eyebrow={`${rows.length} projektów`}>
    <div className="grid gap-7 xl:grid-cols-[1fr_380px]">
      <section className="grid content-start gap-4">
        {rows.map((project) => <article key={project.id} className="group bg-paper p-6 transition-shadow hover:shadow-lg">
          <Link href={`/panel/projects/${project.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-4">
            <div className="flex justify-between gap-4"><div><h2 className="text-xl font-bold group-hover:text-rust">{project.name}</h2><p className="text-sm text-ink/50">{project.clientName}</p></div><span className="font-mono text-xs uppercase">{project.status}</span></div>
            <div className="mt-6 h-3 bg-mist"><div className="h-full bg-rust" style={{ width: `${project.progress}%` }} /></div>
            <div className="mt-2 flex justify-between text-xs text-ink/50"><span>Postęp</span><strong>{project.progress}%</strong></div>
          </Link>
          <details className="mt-5 border-t border-ink/10 pt-4">
            <summary className="w-fit cursor-pointer text-sm font-bold text-rust marker:text-rust">Usuń projekt</summary>
            <div className="mt-3 flex flex-col items-start justify-between gap-3 bg-rust/10 p-4 sm:flex-row sm:items-center">
              <p className="max-w-xl text-sm text-ink/70">Projekt, etapy, zadania i link publiczny zostaną trwale usunięte.</p>
              <form action={deleteProjectAction}>
                <input type="hidden" name="id" value={project.id} />
                <button className="border border-rust bg-rust px-4 py-2 text-sm font-bold text-paper hover:bg-rust-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2">Potwierdź usunięcie</button>
              </form>
            </div>
          </details>
        </article>)}
        {!rows.length && <p className="bg-paper p-10 text-center text-ink/50">Utwórz pierwszy projekt.</p>}
      </section>
      <form action={createProjectAction} className="grid content-start gap-4 bg-paper p-6"><h2 className="text-xl font-bold">Nowy projekt</h2><input name="name" className="admin-field" placeholder="Nazwa projektu" required /><input name="clientName" className="admin-field" placeholder="Klient" required /><input name="clientEmail" type="email" className="admin-field" placeholder="E-mail klienta" /><select name="status" className="admin-field" defaultValue="planned"><option value="planned">Planowany</option><option value="active">Aktywny</option><option value="paused">Wstrzymany</option><option value="completed">Zakończony</option></select><label className="text-sm">Postęp: <input name="progress" className="admin-field mt-1" type="number" min="0" max="100" defaultValue="0" /></label><label className="text-sm">Start<input name="startsAt" className="admin-field mt-1" type="date" /></label><label className="text-sm">Termin<input name="dueAt" className="admin-field mt-1" type="date" /></label><textarea name="publicSummary" className="admin-field" placeholder="Publiczne podsumowanie" /><textarea name="internalNote" className="admin-field" placeholder="Notatka wewnętrzna" /><button className="bg-rust px-5 py-3 font-bold text-paper">Utwórz projekt</button></form>
    </div>
  </PanelShell>;
}
