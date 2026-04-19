import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * StorySeeker API Proxy (Next.js v16+ "proxy" file convention)
 *
 * Protects all /api/* routes from being called by external services or scripts.
 * Uses three layered checks:
 *   1. Internal token header  — only our own app attaches this
 *   2. Origin / Referer check — blocks cross-origin curl/browser calls
 *   3. Same-host check        — allows direct browser navigation / SSR calls
 */

const INTERNAL_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN ?? "";

function getAllowedOrigins(): string[] {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const origins: string[] = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
  ];
  if (base && !origins.includes(base)) {
    origins.push(base.replace(/\/$/, ""));
  }
  return origins;
}

function deny(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function proxy(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }
  if (request.method === "OPTIONS") {
    return NextResponse.next();
  }

  const allowedOrigins = getAllowedOrigins();

  const tokenHeader = request.headers.get("x-storyseeker-token");
  if (INTERNAL_TOKEN && tokenHeader === INTERNAL_TOKEN) {
    return NextResponse.next();
  }

  const origin = request.headers.get("origin");
  if (origin) {
    const clean = origin.replace(/\/$/, "");
    if (!allowedOrigins.includes(clean)) {
      return deny("Access denied: external origin.");
    }
    return NextResponse.next();
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const refOrigin = new URL(referer).origin;
      if (!allowedOrigins.includes(refOrigin)) {
        return deny("Access denied: external referer.");
      }
      return NextResponse.next();
    } catch {
      return deny("Access denied: malformed referer.");
    }
  }

  const host = request.headers.get("host") ?? "";
  const allowedHosts = allowedOrigins.map((o) => o.replace(/^https?:\/\//, ""));
  if (allowedHosts.some((h) => host === h || host.startsWith(h))) {
    return NextResponse.next();
  }

  return deny("Access denied: requests must originate from StorySeeker.");
}

export const config = {
  matcher: ["/api/:path*"],
};
