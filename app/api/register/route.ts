import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";
import { sendRegistrationEmails } from "@/lib/email";

/** Bot must spend at least this long on the form for a submit to be trusted. */
const MIN_FILL_MS = 1500;

/**
 * Registration endpoint — persists submissions to the InsForge
 * `registrations` table (insert-only for the public/anon role) and fires
 * best-effort confirmation/notification emails.
 */
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // --- Spam guards (fail silently so bots get no signal) ---
  // 1) Honeypot: a hidden field real users never see or fill.
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  // 2) Timing: forms submitted almost instantly are automated.
  const elapsed = Number(data.elapsedMs);
  if (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk) {
    return NextResponse.json(
      { ok: false, error: "Name and a valid email are required." },
      { status: 422 },
    );
  }

  // Normalize optional fields.
  const phone =
    typeof data.phone === "string" && data.phone.trim() ? data.phone.trim() : null;
  const message =
    typeof data.message === "string" && data.message.trim()
      ? data.message.trim()
      : null;
  const participantsNum = Number(data.participants);
  const participants =
    Number.isFinite(participantsNum) && participantsNum >= 1
      ? Math.min(Math.floor(participantsNum), 1000)
      : 1;
  const days = Array.isArray(data.days)
    ? data.days.filter((d): d is string => typeof d === "string").slice(0, 3)
    : [];

  const { error } = await insforge.database.from("registrations").insert([
    { name, email, phone, participants, days, message },
  ]);

  if (error) {
    console.error("[register] insert failed:", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your registration. Please try again." },
      { status: 502 },
    );
  }

  // Best-effort emails — never blocks or fails the registration.
  await sendRegistrationEmails({ name, email, phone, participants, days, message });

  return NextResponse.json({ ok: true });
}
