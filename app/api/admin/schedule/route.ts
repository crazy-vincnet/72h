import { NextResponse } from "next/server";
import { insforgeAdmin } from "@/lib/insforge-admin";

export async function GET() {
  try {
    const { data: sessions, error } = await insforgeAdmin.database
      .from("schedule_sessions")
      .select("*")
      .order("day", { ascending: true })
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Database error fetching schedule sessions:", error);
      return NextResponse.json(
        { ok: false, error: "Database error fetching schedule sessions" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, sessions });
  } catch (error) {
    console.error("Error in schedule GET:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Basic validation
    const {
      day,
      time,
      duration_en,
      duration_ko,
      title_en,
      title_ko,
      track,
    } = payload;

    if (
      day === undefined ||
      !time ||
      !duration_en ||
      !duration_ko ||
      !title_en ||
      !title_ko ||
      !track
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (day < 1 || day > 4) {
      return NextResponse.json(
        { ok: false, error: "Day must be between 1 and 4" },
        { status: 400 }
      );
    }

    if (track !== "worship" && track !== "special") {
      return NextResponse.json(
        { ok: false, error: "Track must be either worship or special" },
        { status: 400 }
      );
    }

    const { data: newSession, error } = await insforgeAdmin.database
      .from("schedule_sessions")
      .insert([
        {
          day: Number(day),
          time,
          duration_en,
          duration_ko,
          tag_en: payload.tag_en || "",
          tag_ko: payload.tag_ko || "",
          title_en,
          title_ko,
          speaker_en: payload.speaker_en || "",
          speaker_ko: payload.speaker_ko || "",
          track,
          live: !!payload.live,
          sort_order: Number(payload.sort_order) || 0,
          live_url: payload.live_url || null,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Database error creating schedule session:", error);
      return NextResponse.json(
        { ok: false, error: "Database error creating schedule session" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, session: newSession });
  } catch (error) {
    console.error("Error in schedule POST:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
