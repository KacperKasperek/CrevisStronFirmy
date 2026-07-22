import { createHash, randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages, rateLimits } from "@/lib/db/schema";
import { sendContactEmails } from "@/lib/mail";
import { contactSchema } from "@/lib/validation";

async function limited(request: Request) {
  const raw = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const key = createHash("sha256").update(`${process.env.ANALYTICS_SALT ?? "crevis"}:${raw}:contact`).digest("hex");
  const now = new Date(); const existing = await db.query.rateLimits.findFirst({ where: eq(rateLimits.key, key) });
  if (!existing || now.getTime() - existing.windowStartedAt.getTime() > 15 * 60_000) {
    await db.insert(rateLimits).values({ key, count: 1, windowStartedAt: now }).onDuplicateKeyUpdate({ set: { count: 1, windowStartedAt: now } });
    return false;
  }
  if (existing.count >= 5) return true;
  await db.update(rateLimits).set({ count: existing.count + 1 }).where(eq(rateLimits.key, key)); return false;
}

export async function POST(request: Request) {
  try {
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ ok: false, message: parsed.error.issues[0]?.message ?? "Niepoprawne dane." }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true });
    if (await limited(request)) return NextResponse.json({ ok: false, message: "Zbyt wiele prób. Spróbuj ponownie za kilka minut." }, { status: 429 });
    const id = randomUUID(); const now = new Date(); const data = parsed.data;
    await db.insert(contactMessages).values({ id, name: data.name, email: data.email, message: data.message, consentAt: now, createdAt: now, updatedAt: now });
    try {
      await sendContactEmails(data);
      await db.update(contactMessages).set({ deliveryStatus: "sent", deliveryError: null, updatedAt: new Date() }).where(eq(contactMessages.id, id));
    } catch (error) {
      await db.update(contactMessages).set({ deliveryStatus: "failed", deliveryError: error instanceof Error ? error.message.slice(0, 1000) : "Błąd SMTP", updatedAt: new Date() }).where(eq(contactMessages.id, id));
    }
    return NextResponse.json({ ok: true, message: "Dziękujemy. Wiadomość została przyjęta." });
  } catch (error) {
    console.error(error); return NextResponse.json({ ok: false, message: "Nie udało się wysłać wiadomości." }, { status: 500 });
  }
}
