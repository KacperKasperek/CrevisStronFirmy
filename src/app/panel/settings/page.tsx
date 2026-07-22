import { requireAdmin } from "@/lib/admin";
import PanelShell from "@/components/admin/PanelShell";
import TwoFactorSetup from "@/components/admin/TwoFactorSetup";
export default async function SettingsPage() { const current = await requireAdmin({ allowTwoFactorSetup: true }); const enabled = Boolean((current.user as typeof current.user & { twoFactorEnabled?: boolean }).twoFactorEnabled); return <PanelShell title="Ustawienia bezpieczeństwa"><section className="max-w-3xl bg-paper p-6 sm:p-8"><h2 className="text-xl font-bold">Uwierzytelnianie dwuskładnikowe</h2><p className="mb-6 mt-2 text-ink/60">Konto: {current.user.email}</p><TwoFactorSetup enabled={enabled} /></section></PanelShell>; }
