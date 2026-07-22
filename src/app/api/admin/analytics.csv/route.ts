import { gte } from "drizzle-orm";
import { getAdminSession } from "@/lib/admin";
import { db } from "@/lib/db";
import { analyticsEvents } from "@/lib/db/schema";
const csv = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
export async function GET(request: Request) { if (!await getAdminSession()) return new Response("Unauthorized", { status: 401 }); const days = Math.min(365, Math.max(1, Number(new URL(request.url).searchParams.get("days") ?? 30))); const rows = await db.select().from(analyticsEvents).where(gte(analyticsEvents.createdAt, new Date(Date.now() - days * 86_400_000))); const body = [["Data", "Zdarzenie", "Sesja", "Ścieżka", "Etykieta", "Źródło", "Urządzenie"], ...rows.map((r) => [r.createdAt.toISOString(), r.event, r.sessionId, r.path, r.label, r.referrerHost, r.device])].map((row) => row.map(csv).join(",")).join("\r\n"); return new Response(`\uFEFF${body}`, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": "attachment; filename=crevis-analityka.csv" } }); }
