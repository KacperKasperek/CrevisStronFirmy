import { randomUUID } from "crypto";
import { lt } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { analyticsEvents } from "@/lib/db/schema";
import { analyticsSchema } from "@/lib/validation";

function getSafeErrorCode(error: unknown): string {
  let current: unknown = error;

  for (let depth = 0; depth < 5 && current && typeof current === "object"; depth += 1) {
    const candidate = current as { code?: unknown; cause?: unknown };
    if (typeof candidate.code === "string" && /^[A-Z0-9_]+$/.test(candidate.code)) {
      return candidate.code;
    }
    current = candidate.cause;
  }

  return "UNKNOWN";
}

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
    return NextResponse.json({ ok: false, code: getSafeErrorCode(error) }, { status: 500 });
  }
}
