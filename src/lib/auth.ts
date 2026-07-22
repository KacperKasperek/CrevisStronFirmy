import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { twoFactor } from "better-auth/plugins";
import { db } from "@/lib/db";
import * as authSchema from "@/lib/db/schema";
import { sendResetEmail } from "@/lib/mail";

export const auth = betterAuth({
  appName: "Crevis",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  disableSignUp: process.env.ALLOW_ADMIN_BOOTSTRAP !== "true",
  database: drizzleAdapter(db, { provider: "mysql", schema: authSchema }),
  emailAndPassword: { enabled: true, autoSignIn: false, sendResetPassword: async ({ user, url }) => sendResetEmail(user.email, url) },
  rateLimit: { enabled: true, window: 60, max: 10 },
  session: { expiresIn: 60 * 60 * 8, updateAge: 60 * 30 },
  advanced: { useSecureCookies: process.env.NODE_ENV === "production" },
  plugins: [twoFactor({ issuer: "Crevis" }), nextCookies()],
});
