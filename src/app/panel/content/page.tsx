import { requireAdmin } from "@/lib/admin";
import { getSiteContent } from "@/lib/content-server";
import PanelShell from "@/components/admin/PanelShell";
import ContentEditor from "@/components/admin/ContentEditor";
export const dynamic = "force-dynamic";
export default async function ContentPage() { await requireAdmin(); const content = await getSiteContent(); return <PanelShell title="Treści strony" eyebrow="CMS / publikacja"><ContentEditor initial={content} /></PanelShell>; }
