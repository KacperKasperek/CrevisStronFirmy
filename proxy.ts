import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hasSession = Boolean(getSessionCookie(request));
  if (!hasSession) return NextResponse.redirect(new URL("/panel/login", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/panel/((?!login|reset-password).*)"] };
