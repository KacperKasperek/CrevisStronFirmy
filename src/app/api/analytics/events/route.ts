import { randomUUID } from "crypto";
import { lt } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { analyticsEvents } from "@/lib/db/schema";
import { analyticsSchema } from "@/lib/validation";

function deviceFrom(request: Request): "mobile" | "tablet" | "desktop" {
  const ua = request.headers.get("user-agent") ?? "";
  if (/ipad|tablet/i.test(ua)) return "tablet";
  return /mobile|android|iphone/i.test(ua) ? "mobile" : "desktop";
}
export async function POST(request: Request) {
  try {
    const parsed = analyticsSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
    const now = new Date();
    await db.insert(analyticsEvents).values({ id: randomUUID(), ...parsed.data, device: deviceFrom(request), createdAt: now });
    if (Math.random() < 0.01) await db.delete(analyticsEvents).where(lt(analyticsEvents.createdAt, new Date(now.getTime() - 395 * 86_400_000)));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Analytics event failed", error);
    const rawCode = (error as { code?: unknown }).code;
    const code = typeof rawCode === "string" && /^[A-Z0-9_]+$/.test(rawCode) ? rawCode : "UNKNOWN";
    return NextResponse.json({ ok: false, code }, { status: 500 });
  }
}
