import { NextResponse } from "next/server";
import { insforgeAdmin } from "@/lib/insforge-admin";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await insforgeAdmin.database
      .from("registrations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Database error deleting registration:", error);
      return NextResponse.json(
        { ok: false, error: "Database error deleting registration" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in registration DELETE:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
