import type { Bi } from "@/lib/i18n";

/**
 * Event details. These are PLACEHOLDERS (TBA) — update them once the
 * date, venue, and speakers are confirmed.
 *
 * `EVENT_START` drives the live countdown on the home page. It is set to a
 * placeholder date in the future; replace it with the real start time.
 */
export const EVENT_START = new Date("2026-10-12T06:00:00+09:00");

export const EVENT_INFO: {
  dates: Bi;
  location: Bi;
  status: Bi;
} = {
  dates: { en: "Dates: To be announced", ko: "날짜: 추후 공지" },
  location: { en: "Jeju Island — venue TBA", ko: "제주도 — 장소 추후 공지" },
  status: { en: "Registration Open", ko: "등록 접수 중" },
};
