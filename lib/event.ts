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
export const EVENT_DATE_CONFIRMED = true;

// 72 hours: Aug 12, 2026 10:00 KST → Aug 15, 2026 10:00 KST.
export const EVENT_START = new Date("2026-08-12T10:00:00+09:00");
export const EVENT_END = new Date("2026-08-15T10:00:00+09:00");

export const EVENT_INFO: {
  dates: Bi;
  location: Bi;
  status: Bi;
} = {
  dates: { en: "Aug 12–15, 2026", ko: "2026년 8월 12–15일" },
  location: {
    en: "Lee Ki-poong Mission Memorial Hall · Waheul-ri, Jocheon-eup, Jeju",
    ko: "이기풍선교기념관 · 제주시 조천읍 와흘리 산14-3",
  },
  status: { en: "Registration Open", ko: "등록 접수 중" },
};

/** Full postal address for maps / directions. */
export const EVENT_ADDRESS: Bi = {
  en: "San 14-3, Waheul-ri, Jocheon-eup, Jeju-si, Jeju-do, South Korea",
  ko: "제주특별자치도 제주시 조천읍 와흘리 산14-3",
};
