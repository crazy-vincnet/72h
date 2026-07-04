import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./lib/admin-session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude login routes
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // Retrieve the session cookie
  const sessionCookie = request.cookies.get("admin_session")?.value;
  const isAuthenticated = sessionCookie ? verifySession(sessionCookie) : false;

  if (!isAuthenticated) {
    if (pathname.startsWith("/api/")) {
      return new NextResponse(
        JSON.stringify({ ok: false, error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    } else {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
