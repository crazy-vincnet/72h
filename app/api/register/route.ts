import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";
import { sendRegistrationEmails } from "@/lib/email";

/** Bot must spend at least this long on the form for a submit to be trusted. */
const MIN_FILL_MS = 1500;

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (err) {
    console.error("Failed to parse FormData:", err);
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  // --- Spam guards ---
  const company = formData.get("company") as string;
  if (company && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const elapsed = Number(formData.get("elapsedMs"));
  if (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const name = (formData.get("name") as string || "").trim();
  const email = (formData.get("email") as string || "").trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk) {
    return NextResponse.json(
      { ok: false, error: "Name and a valid email are required." },
      { status: 422 },
    );
  }

  // Normalize optional fields
  const phone = (formData.get("phone") as string || "").trim() || null;
  const message = (formData.get("message") as string || "").trim() || null;
  const participantsNum = Number(formData.get("participants"));
  const participants =
    Number.isFinite(participantsNum) && participantsNum >= 1
      ? Math.min(Math.floor(participantsNum), 1000)
      : 1;
  const days = formData.getAll("days").filter((d): d is string => typeof d === "string").slice(0, 5);

  const { error } = await insforge.database.from("registrations").insert([
    {
      name,
      email,
      phone,
      participants,
      days,
      message,
    },
  ]);

  if (error) {
    console.error("[register] insert failed:", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your registration. Please try again." },
      { status: 502 },
    );
  }

  // Best-effort emails
  await sendRegistrationEmails({
    name,
    email,
    phone,
    participants,
    days,
    message,
  });

  return NextResponse.json({ ok: true });
}
