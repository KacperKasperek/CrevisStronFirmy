import { desc } from "drizzle-orm";
import { getAdminSession } from "@/lib/admin";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
const csv = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
export async function GET() { if (!await getAdminSession()) return new Response("Unauthorized", { status: 401 }); const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)); const body = [["Data", "Imię", "E-mail", "Wiadomość", "Status", "Dostarczenie", "Notatka"], ...rows.map((r) => [r.createdAt.toISOString(), r.name, r.email, r.message, r.status, r.deliveryStatus, r.internalNote])].map((row) => row.map(csv).join(",")).join("\r\n"); return new Response(`\uFEFF${body}`, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": "attachment; filename=crevis-wiadomosci.csv" } }); }
