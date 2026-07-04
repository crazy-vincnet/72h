import { NextResponse } from "next/server";
import { insforgeAdmin } from "@/lib/insforge-admin";

export async function GET() {
  try {
    const { data: settingsList, error } = await insforgeAdmin.database
      .from("settings")
      .select("*");

    if (error) {
      console.error("Database error fetching settings:", error);
      return NextResponse.json(
        { ok: false, error: "Database error fetching settings" },
        { status: 502 }
      );
    }

    const settingsObj: Record<string, string> = {};
    if (settingsList) {
      for (const item of settingsList) {
        settingsObj[item.key] = item.value;
      }
    }

    return NextResponse.json({ ok: true, settings: settingsObj });
  } catch (error) {
    console.error("Error in settings GET:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const settingsToUpdate = body.settings || body;

    if (!settingsToUpdate || typeof settingsToUpdate !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid settings payload" },
        { status: 400 }
      );
    }

    const upserts = Object.entries(settingsToUpdate).map(([key, value]) => ({
      key,
      value: String(value),
      updated_at: new Date().toISOString(),
    }));

    if (upserts.length === 0) {
      return NextResponse.json({ ok: true, message: "No settings to update" });
    }

    const { error } = await insforgeAdmin.database
      .from("settings")
      .upsert(upserts);

    if (error) {
      console.error("Database error updating settings:", error);
      return NextResponse.json(
        { ok: false, error: "Database error updating settings" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in settings PUT:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
