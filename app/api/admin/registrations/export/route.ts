import { NextResponse } from "next/server";
import { insforgeAdmin } from "@/lib/insforge-admin";

function csvEscape(val: string | number | null | undefined): string {
  if (val === null || val === undefined) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET() {
  try {
    const { data: registrations, error } = await insforgeAdmin.database
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error exporting registrations:", error);
      return new Response("Database error", { status: 502 });
    }

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Participants",
      "Days",
      "Message",
      "Attached File URL",
      "Registration Date",
    ];

    const rows = [headers.map(csvEscape).join(",")];

    if (registrations && registrations.length > 0) {
      for (const reg of registrations) {
        const daysStr = Array.isArray(reg.days) ? reg.days.join(" | ") : "";
        const row = [
          reg.name,
          reg.email,
          reg.phone,
          reg.participants,
          daysStr,
          reg.message,
          reg.file_url || "",
          reg.created_at ? new Date(reg.created_at).toISOString() : "",
        ];
        rows.push(row.map(csvEscape).join(","));
      }
    }

    // Prepend UTF-8 BOM (\uFEFF) so Excel opens Korean text correctly.
    const csvContent = "\uFEFF" + rows.join("\r\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="registrations_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting registrations:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
