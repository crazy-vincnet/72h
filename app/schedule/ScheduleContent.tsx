"use client";

import Link from "next/link";
import { useState } from "react";
import Hero from "@/components/Hero";
import { useLang, text, type Bi, type Lang } from "@/lib/i18n";

type Track = "worship" | "special";

type Session = {
  time: string;
  duration: Bi;
  tag: Bi;
  title: Bi;
  speaker: Bi;
  chips: Bi[];
  track: Track;
  live?: boolean;
};

const HERO_IMG = "/images/jeju-dawn.png";

const DAYS: { label: Bi; date: Bi; sessions: Session[] }[] = [
  {
    label: { en: "Day 1", ko: "1일차" },
    date: { en: "Aug 12", ko: "8월 12일" },
    sessions: [
      {
        time: "10:00 AM",
        duration: { en: "2 Hours", ko: "2시간" },
        tag: { en: "Opening Worship", ko: "여는 예배" },
        title: { en: "Kindling the Flame", ko: "불꽃을 지피며" },
        speaker: { en: "Speaker: TBA", ko: "강사: 추후 공지" },
        chips: [
          { en: "Repentance", ko: "회개" },
          { en: "Renewal", ko: "갱신" },
        ],
        track: "worship",
      },
      {
        time: "02:00 PM",
        duration: { en: "3 Hours", ko: "3시간" },
        tag: { en: "Global Intercession", ko: "세계 중보기도" },
        title: { en: "Praying for the Nations", ko: "열방을 위한 기도" },
        speaker: { en: "Speaker: TBA", ko: "강사: 추후 공지" },
        chips: [{ en: "Global Church", ko: "세계 교회" }],
        track: "special",
        live: true,
      },
      {
        time: "07:00 PM",
        duration: { en: "3 Hours", ko: "3시간" },
        tag: { en: "Evening Worship", ko: "저녁 예배" },
        title: { en: "Fire Night", ko: "불의 밤" },
        speaker: { en: "Speaker: TBA", ko: "강사: 추후 공지" },
        chips: [{ en: "Worship", ko: "예배" }],
        track: "worship",
      },
    ],
  },
  {
    label: { en: "Day 2", ko: "2일차" },
    date: { en: "Aug 13", ko: "8월 13일" },
    sessions: [
      {
        time: "06:00 AM",
        duration: { en: "2 Hours", ko: "2시간" },
        tag: { en: "Morning Prayer", ko: "아침 기도" },
        title: { en: "Seeking His Face", ko: "그분의 얼굴을 구하며" },
        speaker: { en: "Speaker: TBA", ko: "강사: 추후 공지" },
        chips: [{ en: "Intercession", ko: "중보" }],
        track: "worship",
      },
      {
        time: "02:00 PM",
        duration: { en: "3 Hours", ko: "3시간" },
        tag: { en: "Prayer for the North", ko: "북한을 위한 기도" },
        title: { en: "Walls Will Fall", ko: "성벽은 무너지리라" },
        speaker: { en: "Speaker: TBA", ko: "강사: 추후 공지" },
        chips: [
          { en: "Reunification", ko: "통일" },
          { en: "Healing", ko: "치유" },
        ],
        track: "special",
      },
    ],
  },
  {
    label: { en: "Day 3", ko: "3일차" },
    date: { en: "Aug 14", ko: "8월 14일" },
    sessions: [
      {
        time: "06:00 AM",
        duration: { en: "2 Hours", ko: "2시간" },
        tag: { en: "Sunrise Worship", ko: "일출 예배" },
        title: { en: "New Beginnings", ko: "새로운 시작" },
        speaker: { en: "Speaker: TBA", ko: "강사: 추후 공지" },
        chips: [{ en: "Hope", ko: "소망" }],
        track: "worship",
      },
      {
        time: "08:00 PM",
        duration: { en: "4 Hours", ko: "4시간" },
        tag: { en: "Night Watch", ko: "밤샘 기도" },
        title: { en: "Through the Night", ko: "밤을 지새우며" },
        speaker: { en: "Speaker: TBA", ko: "강사: 추후 공지" },
        chips: [
          { en: "Perseverance", ko: "인내" },
          { en: "Watchfulness", ko: "깨어있음" },
        ],
        track: "special",
      },
    ],
  },
  {
    label: { en: "Day 4", ko: "4일차" },
    date: { en: "Aug 15", ko: "8월 15일" },
    sessions: [
      {
        time: "06:00 AM",
        duration: { en: "2 Hours", ko: "2시간" },
        tag: { en: "Final Dawn", ko: "마지막 새벽" },
        title: { en: "Sending Light", ko: "빛을 보내며" },
        speaker: { en: "Speaker: TBA", ko: "강사: 추후 공지" },
        chips: [{ en: "Revival", ko: "부흥" }],
        track: "worship",
      },
      {
        time: "08:00 AM",
        duration: { en: "2 Hours · ends 10 AM", ko: "2시간 · 오전 10시 종료" },
        tag: { en: "Closing Celebration", ko: "마무리 축제" },
        title: { en: "The Flame Endures", ko: "꺼지지 않는 불꽃" },
        speaker: { en: "Speaker: TBA", ko: "강사: 추후 공지" },
        chips: [
          { en: "Commissioning", ko: "파송" },
          { en: "Thanksgiving", ko: "감사" },
        ],
        track: "special",
      },
    ],
  },
];

// --- time helpers ---
const HOUR_H = 56; // px per hour on the ruler

function startHour(time: string): number {
  const m = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let h = Number(m[1]) % 12;
  if (/pm/i.test(m[3])) h += 12;
  return h + Number(m[2]) / 60;
}

function durationHours(d: Bi): number {
  const m = d.en.match(/(\d+)\s*Hour/i);
  return m ? Number(m[1]) : 1;
}

export default function SchedulePage() {
  const { lang } = useLang();
  const [day, setDay] = useState(0);

  const sessions = DAYS[day].sessions;
  const worship = sessions.filter((s) => s.track === "worship");
  const special = sessions.filter((s) => s.track === "special");

  // The relay runs Aug 12 10:00 → Aug 15 10:00. So Day 1 starts at 10:00 and
  // the final day ends at 10:00; the days in between show the full 24 hours.
  const isFirst = day === 0;
  const isLast = day === DAYS.length - 1;
  const rangeStart = isFirst ? 10 : 0;
  const rangeEnd = isLast ? 10 : 24;
  const rulerH = (rangeEnd - rangeStart) * HOUR_H;

  return (
    <>
      <Hero
        badge={text({ en: "Schedule", ko: "일정" }, lang)}
        image={HERO_IMG}
        alt="An expansive, bright view of Jeju Island at dawn with calm ocean waters and open skies."
        title={text({ en: "72-Hour Prayer Relay", ko: "72시간 연속 기도 릴레이" }, lang)}
        subtitle={text(
          {
            en: "A continuous 24-hour stream each day — worship on one side, special gatherings on the other.",
            ko: "매일 24시간 이어지는 흐름 — 한쪽은 예배, 다른 한쪽은 특별 모임으로 진행됩니다.",
          },
          lang,
        )}
      />

      <section className="pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-20">
        {/* Day selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-stack-md py-12">
          {DAYS.map((d, i) => (
            <button
              key={i}
              onClick={() => setDay(i)}
              className={
                "px-6 py-3 rounded-full font-label-sm text-label-sm border transition-colors text-center " +
                (day === i
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container text-on-surface-variant border-transparent hover:bg-surface-variant")
              }
            >
              {text(d.label, lang)}
              <br />
              <span className="opacity-70 font-normal">{text(d.date, lang)}</span>
            </button>
          ))}
        </div>

        {/* Column headers */}
        <div className="hidden lg:grid grid-cols-[1fr_5.5rem_1fr] gap-4 mb-4">
          <h2 className="text-right font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            {text({ en: "Worship Schedule", ko: "전체 예배 스케줄" }, lang)}
          </h2>
          <div className="text-center font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            24h
          </div>
          <h2 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            {text({ en: "Special Schedule", ko: "특별 스케줄" }, lang)}
          </h2>
        </div>

        {/* Desktop: worship | 24h ruler | special */}
        <div
          className="hidden lg:grid grid-cols-[1fr_5.5rem_1fr] gap-4 relative"
          style={{ height: rulerH }}
        >
          {/* Left — worship */}
          <div className="relative">
            {worship.map((s, i) => (
              <SessionBlock key={i} s={s} side="left" lang={lang} rangeStart={rangeStart} />
            ))}
          </div>

          {/* Center — 24h ruler (clipped to the day's active window) */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/40 -translate-x-1/2" />
            {Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => {
              const hour = rangeStart + i;
              return (
                <div
                  key={hour}
                  className="absolute left-0 right-0 flex items-center justify-center"
                  style={{ top: i * HOUR_H }}
                >
                  <span className="absolute left-0 right-0 border-t border-outline-variant/20" />
                  {hour % 2 === 0 && (
                    <span className="relative bg-background px-1 font-label-sm text-[11px] text-on-surface-variant tabular-nums">
                      {String(hour % 24).padStart(2, "0")}:00
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right — special */}
          <div className="relative">
            {special.map((s, i) => (
              <SessionBlock key={i} s={s} side="right" lang={lang} rangeStart={rangeStart} />
            ))}
          </div>
        </div>

        {/* Mobile: stacked lists */}
        <div className="lg:hidden space-y-stack-md">
          <MobileTrack
            title={text({ en: "Worship Schedule", ko: "전체 예배 스케줄" }, lang)}
            items={worship}
            lang={lang}
          />
          <MobileTrack
            title={text({ en: "Special Schedule", ko: "특별 스케줄" }, lang)}
            items={special}
            lang={lang}
          />
        </div>
      </section>
    </>
  );
}

/** A time-positioned session card on the desktop 24h timeline. */
function SessionBlock({
  s,
  side,
  lang,
  rangeStart,
}: {
  s: Session;
  side: "left" | "right";
  lang: Lang;
  rangeStart: number;
}) {
  const top = (startHour(s.time) - rangeStart) * HOUR_H;
  const height = Math.max(durationHours(s.duration) * HOUR_H - 8, 96);
  return (
    <Link
      href="/register"
      style={{ top, height }}
      className={
        "absolute w-[94%] p-4 rounded-xl overflow-hidden transition-transform hover:-translate-y-0.5 " +
        (side === "left" ? "right-0" : "left-0") +
        " " +
        (s.live
          ? "bg-surface-container-lowest border-t-2 border-primary card-shadow"
          : "glass-panel")
      }
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className={
            "font-headline-md text-base " +
            (s.live ? "text-primary" : "text-on-surface")
          }
        >
          {s.time}
        </span>
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          {text(s.duration, lang)}
        </span>
        {s.live && (
          <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider">
            Live
          </span>
        )}
      </div>
      <span
        className={
          "inline-block px-2.5 py-0.5 rounded-full font-label-sm text-[11px] mb-1.5 " +
          (s.live
            ? "bg-primary-fixed/30 text-primary"
            : "bg-surface-container-highest text-on-surface-variant")
        }
      >
        {text(s.tag, lang)}
      </span>
      <h3 className="font-body-lg text-body-lg font-semibold text-on-surface leading-snug">
        {text(s.title, lang)}
      </h3>
    </Link>
  );
}

/** Simple stacked card list for small screens. */
function MobileTrack({
  title,
  items,
  lang,
}: {
  title: string;
  items: Session[];
  lang: Lang;
}) {
  return (
    <div>
      <h2 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-4">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((s, i) => (
          <Link
            key={i}
            href="/register"
            className={
              "block p-5 rounded-xl " +
              (s.live
                ? "bg-surface-container-lowest border-t-2 border-primary card-shadow"
                : "glass-panel")
            }
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className={
                  "font-headline-md text-lg " +
                  (s.live ? "text-primary" : "text-on-surface")
                }
              >
                {s.time}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {text(s.duration, lang)}
              </span>
              {s.live && (
                <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider">
                  Live
                </span>
              )}
            </div>
            <span
              className={
                "inline-block px-2.5 py-0.5 rounded-full font-label-sm text-[11px] mb-1.5 " +
                (s.live
                  ? "bg-primary-fixed/30 text-primary"
                  : "bg-surface-container-highest text-on-surface-variant")
              }
            >
              {text(s.tag, lang)}
            </span>
            <h3 className="font-body-lg text-body-lg font-semibold text-on-surface">
              {text(s.title, lang)}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
