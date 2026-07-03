"use client";

import Link from "next/link";
import { useState } from "react";
import Hero from "@/components/Hero";
import { useLang, text, type Bi } from "@/lib/i18n";

const HERO_IMG =
  "/images/jeju-dawn.png";

type Session = {
  time: string;
  duration: Bi;
  tag: Bi;
  title: Bi;
  speaker: Bi;
  chips: Bi[];
  live?: boolean;
};

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
      },
      {
        time: "02:00 PM",
        duration: { en: "3 Hours", ko: "3시간" },
        tag: { en: "Global Intercession", ko: "세계 중보기도" },
        title: { en: "Praying for the Nations", ko: "열방을 위한 기도" },
        speaker: { en: "Speaker: TBA", ko: "강사: 추후 공지" },
        chips: [{ en: "Global Church", ko: "세계 교회" }],
        live: true,
      },
      {
        time: "07:00 PM",
        duration: { en: "3 Hours", ko: "3시간" },
        tag: { en: "Evening Worship", ko: "저녁 예배" },
        title: { en: "Fire Night", ko: "불의 밤" },
        speaker: { en: "Speaker: TBA", ko: "강사: 추후 공지" },
        chips: [{ en: "Worship", ko: "예배" }],
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
      },
    ],
  },
];

export default function SchedulePage() {
  const { lang } = useLang();
  const [day, setDay] = useState(0);
  const [selected, setSelected] = useState(0);

  const selectDay = (i: number) => {
    setDay(i);
    setSelected(0);
  };

  const sessions = DAYS[day].sessions;
  const active = sessions[selected];

  return (
    <>
      <Hero
        badge={text({ en: "Schedule", ko: "일정" }, lang)}
        image={HERO_IMG}
        alt="An expansive, bright view of Jeju Island at dawn with calm ocean waters and open skies."
        title={text({ en: "72-Hour Prayer Relay", ko: "72시간 연속 기도 릴레이" }, lang)}
        subtitle={text(
          {
            en: "Join us in a continuous stream of worship and intercession. Select a session below to participate in this sacred journey.",
            ko: "끊임없는 예배와 중보기도에 동참하세요. 아래에서 세션을 선택하여 이 거룩한 여정에 참여하세요.",
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
              onClick={() => selectDay(i)}
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

        {/* Two-pane: left = full schedule list, right = selected session detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* LEFT — full schedule */}
          <div className="lg:col-span-5">
            <h2 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-4">
              {text({ en: "Full Schedule", ko: "전체 스케줄" }, lang)}
            </h2>
            <ul className="relative space-y-2 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-outline-variant/30">
              {sessions.map((s, i) => {
                const isActive = i === selected;
                return (
                  <li key={i} className="relative">
                    <button
                      onClick={() => setSelected(i)}
                      aria-pressed={isActive}
                      className={
                        "w-full text-left flex items-start gap-3 rounded-xl pl-5 pr-4 py-3 transition-colors " +
                        (isActive
                          ? "bg-primary-fixed/40"
                          : "hover:bg-surface-variant/40")
                      }
                    >
                      <span
                        className={
                          "mt-1.5 w-3 h-3 rounded-full shrink-0 -ml-[26px] bg-primary " +
                          (s.live
                            ? "animate-pulse ring-4 ring-primary/20"
                            : isActive
                              ? "ring-4 ring-primary-fixed"
                              : "ring-4 ring-surface")
                        }
                      />
                      <span className="flex-1">
                        <span className="flex items-center gap-2">
                          <span
                            className={
                              "font-headline-md text-base " +
                              (isActive || s.live ? "text-primary" : "text-on-surface")
                            }
                          >
                            {s.time}
                          </span>
                          {s.live && (
                            <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider">
                              Live
                            </span>
                          )}
                          <span className="font-label-sm text-label-sm text-on-surface-variant ml-auto">
                            {text(s.duration, lang)}
                          </span>
                        </span>
                        <span className="block font-body-md text-body-md text-on-surface mt-0.5">
                          {text(s.title, lang)}
                        </span>
                        <span className="block font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                          {text(s.tag, lang)}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT — selected session detail */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div
              className={
                active.live
                  ? "bg-surface-container-lowest p-8 rounded-2xl border-t-2 border-primary card-shadow relative overflow-hidden"
                  : "glass-panel p-8 rounded-2xl relative overflow-hidden"
              }
            >
              <div className="absolute right-0 top-0 opacity-5 w-40 h-40 transform translate-x-10 -translate-y-10 pointer-events-none">
                <span className="material-symbols-outlined" style={{ fontSize: 160 }}>
                  local_fire_department
                </span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={
                      "font-headline-md text-2xl " +
                      (active.live ? "text-primary" : "text-on-surface")
                    }
                  >
                    {active.time}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {text(active.duration, lang)}
                  </span>
                  {active.live && (
                    <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider">
                      Live
                    </span>
                  )}
                </div>
                <span
                  className={
                    "inline-block px-3 py-1 rounded-full font-label-sm text-xs mb-3 " +
                    (active.live
                      ? "bg-primary-fixed/30 text-primary"
                      : "bg-surface-container-highest text-on-surface-variant")
                  }
                >
                  {text(active.tag, lang)}
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                  {text(active.title, lang)}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    person
                  </span>
                  {text(active.speaker, lang)}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {active.chips.map((c, ci) => (
                    <span
                      key={ci}
                      className="px-2 py-1 rounded bg-secondary-container/30 text-on-secondary-container text-xs font-label-sm"
                    >
                      {text(c, lang)}
                    </span>
                  ))}
                </div>
                <Link
                  href="/register"
                  className={
                    "inline-flex w-full sm:w-auto justify-center px-8 py-3 rounded-lg font-label-sm text-label-sm font-bold transition-colors text-center " +
                    (active.live
                      ? "bg-primary text-on-primary hover:bg-primary-container shadow-sm"
                      : "border-2 border-secondary text-secondary hover:bg-secondary hover:text-on-secondary")
                  }
                >
                  {active.live
                    ? text({ en: "Join Live", ko: "실시간 참여" }, lang)
                    : text({ en: "Join Slot", ko: "참여하기" }, lang)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
