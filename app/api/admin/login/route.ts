import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { comparePasswords, signSession } from "@/lib/admin-session";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const actualPassword = process.env.ADMIN_PASSWORD;
    if (!actualPassword) {
      console.error("ADMIN_PASSWORD is not set in environment variables");
      return NextResponse.json(
        { ok: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const matches = comparePasswords(password || "", actualPassword);

    if (!matches) {
      // Small delay to deter brute-forcing
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.warn(`Failed login attempt from IP/client at ${new Date().toISOString()}`);
      return NextResponse.json(
        { ok: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    const maxAge = 7 * 24 * 60 * 60; // 7 days
    const expires = Date.now() + maxAge * 1000;
    const sessionToken = signSession(expires);

    const cookieStore = await cookies();
    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
