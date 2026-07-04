import { NextResponse } from "next/server";
import { insforgeAdmin } from "@/lib/insforge-admin";

export async function GET() {
  try {
    const { data: registrations, error } = await insforgeAdmin.database
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error fetching registrations:", error);
      return NextResponse.json(
        { ok: false, error: "Database error fetching registrations" },
        { status: 502 }
      );
    }

    // Compute stats
    const totalRegistrations = registrations.length;
    let totalParticipants = 0;
    let day1Participants = 0;
    let day2Participants = 0;
    let day3Participants = 0;
    let day4Participants = 0;

    for (const reg of registrations) {
      const p = Number(reg.participants) || 0;
      totalParticipants += p;

      const hasAllDays = reg.days?.includes("All Days");
      if (hasAllDays || reg.days?.includes("Day 1")) {
        day1Participants += p;
      }
      if (hasAllDays || reg.days?.includes("Day 2")) {
        day2Participants += p;
      }
      if (hasAllDays || reg.days?.includes("Day 3")) {
        day3Participants += p;
      }
      if (hasAllDays || reg.days?.includes("Day 4")) {
        day4Participants += p;
      }
    }

    return NextResponse.json({
      ok: true,
      registrations,
      stats: {
        totalRegistrations,
        totalParticipants,
        perDayParticipants: {
          1: day1Participants,
          2: day2Participants,
          3: day3Participants,
          4: day4Participants,
        },
      },
    });
  } catch (error) {
    console.error("Error in registrations GET API:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
