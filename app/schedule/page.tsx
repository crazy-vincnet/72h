import type { Metadata } from "next";
import ScheduleContent from "./ScheduleContent";

export const metadata: Metadata = {
  title: "일정",
  description:
    "72시간 연속 기도 릴레이 일정 — 예배 세션과 기도 시간표를 확인하세요.",
};

export default function Page() {
  return <ScheduleContent />;
}
