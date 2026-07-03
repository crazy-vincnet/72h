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
    date: { en: "TBA", ko: "추후 공지" },
    sessions: [
      {
        time: "06:00 AM",
        duration: { en: "2 Hours", ko: "2시간" },
        tag: { en: "Opening Worship", ko: "여는 예배" },
        title: { en: "Awakening the Dawn", ko: "새벽을 깨우며" },
        speaker: { en: "Speaker: TBA", ko: "강사: 추후 공지" },
        chips: [
          { en: "Repentance", ko: "회개" },
          { en: "Renewal", ko: "갱신" },
        ],
      },
      {
        time: "08:00 AM",
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
    date: { en: "TBA", ko: "추후 공지" },
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
    date: { en: "TBA", ko: "추후 공지" },
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
        time: "04:00 PM",
        duration: { en: "4 Hours", ko: "4시간" },
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

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter relative">
          <div className="hidden md:block absolute left-[8.33%] top-0 bottom-0 w-px bg-outline-variant/30" />

          {DAYS[day].sessions.map((s, i) => (
            <div
              key={i}
              className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-gutter relative z-10 group mt-8 first:mt-0"
            >
              <div className="md:col-span-1 flex md:justify-center pt-4">
                <div
                  className={
                    "w-3 h-3 rounded-full bg-primary mt-1.5 md:mx-auto " +
                    (s.live ? "animate-pulse ring-4 ring-primary/20" : "ring-4 ring-primary-fixed")
                  }
                />
              </div>
              <div className="md:col-span-2 pt-3">
                <div
                  className={
                    "font-headline-md text-lg flex items-center gap-2 " +
                    (s.live ? "text-primary" : "text-on-surface")
                  }
                >
                  {s.time}
                  {s.live && (
                    <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider">
                      Live
                    </span>
                  )}
                </div>
                <div className="font-label-sm text-on-surface-variant mt-1">
                  {text(s.duration, lang)}
                </div>
              </div>
              <div className="md:col-span-9">
                <div
                  className={
                    s.live
                      ? "bg-surface-container-lowest p-6 rounded-xl border-t-2 border-primary card-shadow transition-transform hover:-translate-y-1 relative overflow-hidden"
                      : "glass-panel p-6 rounded-xl transition-transform hover:-translate-y-1"
                  }
                >
                  {s.live && (
                    <div className="absolute right-0 top-0 opacity-5 w-32 h-32 transform translate-x-8 -translate-y-8">
                      <span className="material-symbols-outlined" style={{ fontSize: 128 }}>
                        local_fire_department
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                    <div>
                      <span
                        className={
                          "inline-block px-3 py-1 rounded-full font-label-sm text-xs mb-3 " +
                          (s.live
                            ? "bg-primary-fixed/30 text-primary"
                            : "bg-surface-container-highest text-on-surface-variant")
                        }
                      >
                        {text(s.tag, lang)}
                      </span>
                      <h3 className="font-headline-md text-on-surface mb-2">
                        {text(s.title, lang)}
                      </h3>
                      <p className="font-body-md text-on-surface-variant mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-sm">
                          person
                        </span>
                        {text(s.speaker, lang)}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {s.chips.map((c, ci) => (
                          <span
                            key={ci}
                            className="px-2 py-1 rounded bg-secondary-container/30 text-on-secondary-container text-xs font-label-sm"
                          >
                            {text(c, lang)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      href="/register"
                      className={
                        "w-full md:w-auto px-6 py-3 rounded-lg font-label-sm text-label-sm transition-colors text-center " +
                        (s.live
                          ? "bg-primary text-on-primary hover:bg-primary-container shadow-sm"
                          : "border-2 border-secondary text-secondary hover:bg-secondary hover:text-on-secondary")
                      }
                    >
                      {s.live
                        ? text({ en: "Join Live", ko: "실시간 참여" }, lang)
                        : text({ en: "Join Slot", ko: "참여하기" }, lang)}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
