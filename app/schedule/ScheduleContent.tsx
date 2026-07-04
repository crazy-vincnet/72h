"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero";
import { useLang, text, type Bi, type Lang } from "@/lib/i18n";

type Track = "worship" | "special";

export type Session = {
  id: string;
  day: number;
  time: string;
  duration_en: string;
  duration_ko: string;
  tag_en: string;
  tag_ko: string;
  title_en: string;
  title_ko: string;
  speaker_en: string;
  speaker_ko: string;
  track: Track;
  live: boolean;
  sort_order: number;
  liveUrl?: string;
  live_url?: string | null;
};

type ScheduleContentProps = {
  initialSessions: Session[];
  liveStreamUrl: string;
};

const HERO_IMG = "/images/jeju-dawn.png";

const DAYS_METADATA = [
  {
    label: { en: "Day 1", ko: "1일차" },
    date: { en: "Aug 12", ko: "8월 12일" },
    rawDate: "2026-08-12",
  },
  {
    label: { en: "Day 2", ko: "2일차" },
    date: { en: "Aug 13", ko: "8월 13일" },
    rawDate: "2026-08-13",
  },
  {
    label: { en: "Day 3", ko: "3일차" },
    date: { en: "Aug 14", ko: "8월 14일" },
    rawDate: "2026-08-14",
  },
  {
    label: { en: "Day 4", ko: "4일차" },
    date: { en: "Aug 15", ko: "8월 15일" },
    rawDate: "2026-08-15",
  },
];

// --- time helpers ---
const HOUR_H = 120; // px per hour on the ruler

function startHour(time: string): number {
  const m = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let h = Number(m[1]) % 12;
  if (/pm/i.test(m[3])) h += 12;
  return h + Number(m[2]) / 60;
}

function durationHours(durationEn: string): number {
  const m = durationEn.match(/(\d+)\s*Hour/i);
  return m ? Number(m[1]) : 1;
}

export default function ScheduleContent({
  initialSessions,
  liveStreamUrl,
}: ScheduleContentProps) {
  const { lang } = useLang();
  const [day, setDay] = useState(0);
  const [now, setNow] = useState<Date | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const hasInitializedDay = useRef(false);
  const hasAutoScrolled = useRef(false);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Initialize day based on current date once now is loaded
  useEffect(() => {
    if (now && !hasInitializedDay.current) {
      const currentDayIndex = getEventDayIndex(now);
      setDay(currentDayIndex);
      hasInitializedDay.current = true;
    }
  }, [now]);

  // Filter and map sessions for the selected day (day is 0-3 on client, 1-4 in DB)
  const daySessions = initialSessions
    .filter((s) => s.day === day + 1)
    .map((s) => {
      if (s.live) {
        return { ...s, liveUrl: s.live_url || liveStreamUrl };
      }
      return s;
    });

  const worship = daySessions.filter((s) => s.track === "worship");
  const special = daySessions.filter((s) => s.track === "special");

  // The relay runs Aug 12 10:00 → Aug 15 10:00. So Day 1 starts at 10:00 and
  // the final day ends at 10:00; the days in between show the full 24 hours.
  const isFirst = day === 0;
  const isLast = day === 3;
  const rangeStart = isFirst ? 10 : 0;
  const rangeEnd = isLast ? 10 : 24;
  const rulerH = (rangeEnd - rangeStart) * HOUR_H;

  // Auto scroll to current session or time slot
  useEffect(() => {
    if (!now || hasAutoScrolled.current) return;

    const timer = setTimeout(() => {
      const currentDayIndex = getEventDayIndex(now);
      if (day !== currentDayIndex) return;

      const activeCard = document.querySelector(".border-primary");
      if (activeCard) {
        activeCard.scrollIntoView({ behavior: "smooth", block: "center" });
        hasAutoScrolled.current = true;
        return;
      }

      if (timelineRef.current) {
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentTimeDecimal = currentHour + currentMinutes / 60;

        if (currentTimeDecimal >= rangeStart && currentTimeDecimal <= rangeEnd) {
          const timelineY = (currentTimeDecimal - rangeStart) * HOUR_H;
          const elementRect = timelineRef.current.getBoundingClientRect();
          const absoluteTimelineTop = elementRect.top + window.scrollY;
          const scrollPosition = absoluteTimelineTop + timelineY - window.innerHeight / 2;

          window.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: "smooth",
          });
          hasAutoScrolled.current = true;
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [day, now]);

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
          {DAYS_METADATA.map((d, i) => (
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
          ref={timelineRef}
          className="hidden lg:grid grid-cols-[1fr_5.5rem_1fr] gap-4 relative"
          style={{ height: rulerH }}
        >
          {/* Left — worship */}
          <div className="relative">
            {worship.length === 0 ? (
              <EmptyColumn lang={lang} />
            ) : (
              worship.map((s, i) => (
                <SessionBlock key={i} s={s} side="left" lang={lang} rangeStart={rangeStart} now={now} />
              ))
            )}
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
                  <span className="relative bg-background px-1 font-label-sm text-[11px] text-on-surface-variant tabular-nums">
                    {String(hour % 24).padStart(2, "0")}:00
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right — special */}
          <div className="relative">
            {special.length === 0 ? (
              <EmptyColumn lang={lang} />
            ) : (
              special.map((s, i) => (
                <SessionBlock key={i} s={s} side="right" lang={lang} rangeStart={rangeStart} now={now} />
              ))
            )}
          </div>
        </div>

        {/* Mobile: stacked lists */}
        <div className="lg:hidden space-y-stack-md">
          <MobileTrack
            title={text({ en: "Worship Schedule", ko: "전체 예배 스케줄" }, lang)}
            items={worship}
            lang={lang}
            now={now}
          />
          <MobileTrack
            title={text({ en: "Special Schedule", ko: "특별 스케줄" }, lang)}
            items={special}
            lang={lang}
            now={now}
          />
        </div>
      </section>
    </>
  );
}

/** Empty-state shown in a track column when a day has no sessions yet. */
function EmptyColumn({ lang }: { lang: Lang }) {
  return (
    <div className="absolute inset-0 flex items-start justify-center pt-16">
      <span className="font-label-sm text-label-sm text-on-surface-variant/60">
        {text({ en: "Sessions coming soon", ko: "세션 준비 중" }, lang)}
      </span>
    </div>
  );
}

function SessionBlock({
  s,
  side,
  lang,
  rangeStart,
  now,
}: {
  s: Session;
  side: "left" | "right";
  lang: Lang;
  rangeStart: number;
  now: Date | null;
}) {
  const top = (startHour(s.time) - rangeStart) * HOUR_H;
  const minHeight = Math.max(durationHours(s.duration_en) * HOUR_H - 8, 96);
  const isCurrentlyLive = isSessionLive(s, now);
  const isWorship = s.track === "worship";

  const className =
    "group/card absolute w-[94%] flex flex-col justify-start overflow-hidden transition-all duration-300 p-5 rounded-2xl border border-outline-variant/20 " +
    (side === "left" ? "right-0" : "left-0") +
    " " +
    (isCurrentlyLive
      ? isWorship
        ? "bg-white border-l-4 border-l-primary shadow-lg shadow-primary/5 ring-1 ring-primary/10"
        : "bg-white border-l-4 border-l-secondary shadow-lg shadow-secondary/5 ring-1 ring-secondary/10"
      : isWorship
        ? "bg-white/80 hover:bg-white/95 backdrop-blur-md border-l-4 border-l-primary/30 shadow-sm hover:shadow-md"
        : "bg-white/80 hover:bg-white/95 backdrop-blur-md border-l-4 border-l-secondary/30 shadow-sm hover:shadow-md");

  const titleText = lang === "en" ? s.title_en : s.title_ko;
  const speakerText = lang === "en" ? s.speaker_en : s.speaker_ko;
  const durationText = lang === "en" ? s.duration_en : s.duration_ko;
  const tagText = lang === "en" ? s.tag_en : s.tag_ko;

  const inner = (
    <>
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className={
            "font-headline-md text-base font-bold " +
            (isCurrentlyLive
              ? isWorship
                ? "text-primary text-glow"
                : "text-secondary"
              : isWorship
                ? "text-primary/80"
                : "text-secondary/80")
          }
        >
          {s.time}
        </span>
        <span className="font-label-sm text-[11px] text-on-surface-variant/80 font-medium bg-surface-container/50 px-2 py-0.5 rounded-md">
          {durationText}
        </span>
        {isCurrentlyLive && (
          <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-wider animate-pulse flex items-center gap-1 shadow-sm shadow-primary/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            Live
          </span>
        )}
      </div>
      {tagText && (
        <span
          className={
            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-[10px] font-bold mb-2.5 w-max uppercase tracking-wider border " +
            (isWorship
              ? "bg-primary/5 text-primary border-primary-container/10"
              : "bg-secondary/5 text-secondary border-secondary-container/10")
          }
        >
          {s.track === "special" && (
            <span className="material-symbols-outlined filled text-[11px] leading-none">
              auto_awesome
            </span>
          )}
          {tagText}
        </span>
      )}
      <h3 className="font-body-lg text-body-lg font-bold text-on-surface leading-snug tracking-tight">
        {titleText}
      </h3>
      {speakerText && (
        <div className="flex items-center gap-1.5 text-on-surface-variant/80 mt-2">
          <span className="material-symbols-outlined text-[14px] leading-none" style={{ fontSize: 14 }}>
            person
          </span>
          <span className="font-label-sm text-xs font-semibold">
            {speakerText}
          </span>
        </div>
      )}
      {isCurrentlyLive && s.liveUrl && <WatchLiveButton href={s.liveUrl} lang={lang} track={s.track} />}
    </>
  );

  if (isCurrentlyLive && s.liveUrl) {
    return (
      <div style={{ top, minHeight }} className={className}>
        {inner}
      </div>
    );
  }
  return (
    <Link href="/register" style={{ top, minHeight }} className={className + " hover:-translate-y-0.5"}>
      {inner}
    </Link>
  );
}

/** Online live-stream call-to-action shown on continuous worship banners. */
function WatchLiveButton({
  href,
  lang,
  track,
}: {
  href: string;
  lang: Lang;
  track: Track;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-4 self-start inline-flex items-center gap-1.5 rounded-full pl-3.5 pr-4 py-2 font-label-sm text-xs font-bold shadow-lg transition-all duration-300 ${
        track === "worship"
          ? "bg-primary text-on-primary shadow-primary/25 hover:shadow-primary/35 hover:-translate-y-0.5"
          : "bg-secondary text-on-secondary shadow-secondary/25 hover:shadow-secondary/35 hover:-translate-y-0.5"
      }`}
    >
      <span className="material-symbols-outlined filled leading-none" style={{ fontSize: 16 }}>
        live_tv
      </span>
      {text({ en: "Watch Live Online", ko: "온라인 라이브 시청" }, lang)}
    </a>
  );
}

function MobileTrack({
  title,
  items,
  lang,
  now,
}: {
  title: string;
  items: Session[];
  lang: Lang;
  now: Date | null;
}) {
  return (
    <div>
      <h2 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-4">
        {title}
      </h2>
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="glass-panel rounded-xl p-5 font-label-sm text-label-sm text-on-surface-variant/70">
            {text({ en: "Sessions coming soon", ko: "세션 준비 중" }, lang)}
          </p>
        )}
        {items.map((s, i) => {
          const isCurrentlyLive = isSessionLive(s, now);
          const isWorship = s.track === "worship";
          
          const cardClass =
            "relative block overflow-hidden transition-all duration-300 p-5 rounded-2xl border border-outline-variant/20 " +
            (isCurrentlyLive
              ? isWorship
                ? "bg-white border-l-4 border-l-primary shadow-lg shadow-primary/5 ring-1 ring-primary/10"
                : "bg-white border-l-4 border-l-secondary shadow-lg shadow-secondary/5 ring-1 ring-secondary/10"
              : isWorship
                ? "bg-white/80 border-l-4 border-l-primary/30 shadow-sm hover:shadow-md"
                : "bg-white/80 border-l-4 border-l-secondary/30 shadow-sm hover:shadow-md");

          const titleText = lang === "en" ? s.title_en : s.title_ko;
          const speakerText = lang === "en" ? s.speaker_en : s.speaker_ko;
          const durationText = lang === "en" ? s.duration_en : s.duration_ko;
          const tagText = lang === "en" ? s.tag_en : s.tag_ko;

          const cardBody = (
            <>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={
                    "font-headline-md text-lg font-bold " +
                    (isCurrentlyLive
                      ? isWorship
                        ? "text-primary text-glow"
                        : "text-secondary"
                      : isWorship
                        ? "text-primary/80"
                        : "text-secondary/80")
                  }
                >
                  {s.time}
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant/80 font-medium bg-surface-container/50 px-2 py-0.5 rounded-md">
                  {durationText}
                </span>
                {isCurrentlyLive && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-wider animate-pulse flex items-center gap-1 shadow-sm shadow-primary/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                    </span>
                    Live
                  </span>
                )}
              </div>
              {tagText && (
                <span
                  className={
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-[10px] font-bold mb-2.5 w-max uppercase tracking-wider border " +
                    (isWorship
                      ? "bg-primary/5 text-primary border-primary-container/10"
                      : "bg-secondary/5 text-secondary border-secondary-container/10")
                  }
                >
                  {s.track === "special" && (
                    <span className="material-symbols-outlined filled text-[11px] leading-none">
                      auto_awesome
                    </span>
                  )}
                  {tagText}
                </span>
              )}
              <h3 className="font-body-lg text-body-lg font-bold text-on-surface leading-snug tracking-tight">
                {titleText}
              </h3>
              {speakerText && (
                <div className="flex items-center gap-1.5 text-on-surface-variant/80 mt-2">
                  <span className="material-symbols-outlined text-[14px] leading-none" style={{ fontSize: 14 }}>
                    person
                  </span>
                  <span className="font-label-sm text-xs font-semibold">
                    {speakerText}
                  </span>
                </div>
              )}
              {isCurrentlyLive && s.liveUrl && <WatchLiveButton href={s.liveUrl} lang={lang} track={s.track} />}
            </>
          );

          return isCurrentlyLive && s.liveUrl ? (
            <div key={i} className={cardClass}>
              {cardBody}
            </div>
          ) : (
            <Link key={i} href="/register" className={cardClass}>
              {cardBody}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function getEventDayIndex(now: Date): number {
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  if (year === 2026 && month === 8) {
    if (date === 12) return 0;
    if (date === 13) return 1;
    if (date === 14) return 2;
    if (date === 15) return 3;
  }
  return 0;
}

function parseDurationMinutes(durationEn: string): number {
  const hourMatch = durationEn.match(/(\d+(?:\.\d+)?)\s*Hour/i);
  if (hourMatch) {
    return Math.round(parseFloat(hourMatch[1]) * 60);
  }
  const minMatch = durationEn.match(/(\d+)\s*Min/i);
  if (minMatch) {
    return parseInt(minMatch[1], 10);
  }
  return 60;
}

function isSessionLive(s: Session, now: Date | null): boolean {
  if (!s.live || !now) return false;

  const dateStr = DAYS_METADATA[s.day - 1]?.rawDate;
  if (!dateStr) return false;

  const timeParts = s.time.split(":");
  if (timeParts.length !== 2) return false;

  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  // Jeju, Korea uses KST (UTC+9)
  const start = new Date(`${dateStr}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00+09:00`);
  const durationMin = parseDurationMinutes(s.duration_en);
  const end = new Date(start.getTime() + durationMin * 60 * 1000);

  return now >= start && now <= end;
}
