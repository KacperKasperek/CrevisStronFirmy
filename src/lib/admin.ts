import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getAdminSession() {
  const current = await auth.api.getSession({ headers: await headers() });
  const adminEmail = (process.env.ADMIN_EMAIL ?? "kontakt@crevis.pl").toLowerCase();
  if (!current || current.user.email.toLowerCase() !== adminEmail) return null;
  return current;
}

export async function requireAdmin(options?: { allowTwoFactorSetup?: boolean }) {
  const current = await getAdminSession();
  if (!current) redirect("/panel/login");
  const enabled = Boolean((current.user as typeof current.user & { twoFactorEnabled?: boolean }).twoFactorEnabled);
  if (!enabled && !options?.allowTwoFactorSetup) redirect("/panel/settings?setup=2fa");
  return current;
}
