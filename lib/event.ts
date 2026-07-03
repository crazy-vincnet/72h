import type { Bi } from "@/lib/i18n";

/**
 * Event details. These are PLACEHOLDERS (TBA) — update them once the
 * date, venue, and speakers are confirmed.
 *
 * TO GO LIVE WITH THE COUNTDOWN:
 *   1. Set EVENT_START to the real start time.
 *   2. Flip EVENT_DATE_CONFIRMED to true.
 * While EVENT_DATE_CONFIRMED is false, the home page shows a "date to be
 * announced" panel instead of a countdown ticking toward a fake date.
 */
export const EVENT_DATE_CONFIRMED = false;

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
