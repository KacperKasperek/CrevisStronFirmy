import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { analyticsEvents } from "@/lib/db/schema";
import PanelShell from "@/components/admin/PanelShell";
import TwoFactorSetup from "@/components/admin/TwoFactorSetup";
import { resetAnalyticsAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const current = await requireAdmin({ allowTwoFactorSetup: true });
  const enabled = Boolean((current.user as typeof current.user & { twoFactorEnabled?: boolean }).twoFactorEnabled);
  const total = await db.$count(analyticsEvents);

  return <PanelShell title="Ustawienia">
    <div className="grid max-w-3xl gap-6">
      <section className="bg-paper p-6 sm:p-8"><h2 className="text-xl font-bold">Uwierzytelnianie dwuskładnikowe</h2><p className="mb-6 mt-2 text-ink/60">Konto: {current.user.email}</p><TwoFactorSetup enabled={enabled} /></section>
      <section className="border-t-4 border-rust bg-paper p-6 sm:p-8" aria-labelledby="analytics-reset-title">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-rust">Strefa nieodwracalna</p>
        <h2 id="analytics-reset-title" className="mt-2 text-xl font-bold">Reset statystyk</h2>
        <p className="mt-2 text-ink/60">Obecnie zapisanych zdarzeń: <strong className="text-ink">{total}</strong>. Reset usuwa wszystkie odsłony, sesje, kliknięcia CTA i konwersje.</p>
        <details className="mt-6">
          <summary className="w-fit cursor-pointer font-bold text-rust marker:text-rust">Chcę usunąć wszystkie statystyki</summary>
          <form action={resetAnalyticsAction} className="mt-4 grid gap-3 bg-rust/10 p-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <label className="text-sm font-bold">Wpisz RESET, aby potwierdzić
              <input name="confirmation" className="admin-field mt-2" pattern="RESET" autoComplete="off" required placeholder="RESET" />
            </label>
            <button className="border border-rust bg-rust px-5 py-3 font-bold text-paper hover:bg-rust-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2">Usuń statystyki</button>
          </form>
        </details>
      </section>
    </div>
  </PanelShell>;
}
