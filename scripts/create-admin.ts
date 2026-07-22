import { loadEnvConfig } from "@next/env";
import { eq } from "drizzle-orm";

loadEnvConfig(process.cwd());
process.env.ALLOW_ADMIN_BOOTSTRAP = "true";
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
if (!email) throw new Error("Ustaw ADMIN_EMAIL.");

const [{ db }, { user }] = await Promise.all([import("../src/lib/db"), import("../src/lib/db/schema")]);
const existing = await db.select({ id: user.id }).from(user).where(eq(user.email, email)).limit(1);
if (existing[0]) {
  console.log(`Administrator ${email} już istnieje — pomijam tworzenie konta.`);
  process.exit(0);
}

if (!password || password.length < 12) throw new Error("Ustaw ADMIN_PASSWORD (minimum 12 znaków) dla pierwszego wdrożenia.");
const { auth } = await import("../src/lib/auth");
const result = await auth.api.signUpEmail({ body: { name: "Administrator Crevis", email, password } });
console.log(`Utworzono administratora: ${result.user.email}. Zaloguj się i skonfiguruj 2FA.`);
process.exit(0);
