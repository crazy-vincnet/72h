import type { Metadata } from "next";
import { insforge } from "@/lib/insforge";
import ScheduleContent from "./ScheduleContent";

export const metadata: Metadata = {
  title: "일정",
  description:
    "72시간 연속 기도 릴레이 일정 — 예배 세션과 기도 시간표를 확인하세요.",
};

// Force dynamic so that the schedule page always reads the latest database values on load
export const dynamic = "force-dynamic";

export default async function Page() {
  let sessions: any[] = [];
  let liveStreamUrl = "#";

  try {
    const [sessionsResult, settingsResult] = await Promise.all([
      insforge.database
        .from("schedule_sessions")
        .select("*")
        .order("day", { ascending: true })
        .order("sort_order", { ascending: true }),
      insforge.database.from("settings").select("*"),
    ]);

    if (sessionsResult.data) {
      sessions = sessionsResult.data;
    }
    if (settingsResult.data) {
      const settingsObj = settingsResult.data.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {});
      liveStreamUrl = settingsObj.live_stream_url || "#";
    }
  } catch (error) {
    console.error("Failed to fetch schedule data from InsForge:", error);
  }

  return (
    <ScheduleContent
      initialSessions={sessions}
      liveStreamUrl={liveStreamUrl}
    />
  );
}
