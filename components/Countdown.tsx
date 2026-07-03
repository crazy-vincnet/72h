"use client";

import { useEffect, useState } from "react";
import { EVENT_START } from "@/lib/event";
import { useLang, text } from "@/lib/i18n";

type Parts = { days: number; hours: number; mins: number; secs: number };

function diff(target: number): Parts {
  const total = Math.max(0, target - Date.now());
  const secs = Math.floor(total / 1000) % 60;
  const mins = Math.floor(total / (1000 * 60)) % 60;
  const hours = Math.floor(total / (1000 * 60 * 60)) % 24;
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, mins, secs };
}

export default function Countdown() {
  const { lang } = useLang();
  const target = EVENT_START.getTime();
  // Start null to avoid a server/client hydration mismatch on the ticking value.
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff(target));
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const labels = {
    days: { en: "Days", ko: "일" },
    hours: { en: "Hours", ko: "시간" },
    mins: { en: "Mins", ko: "분" },
    secs: { en: "Secs", ko: "초" },
  } as const;

  const cells: { key: keyof Parts; label: (typeof labels)[keyof typeof labels]; accent?: boolean }[] = [
    { key: "days", label: labels.days },
    { key: "hours", label: labels.hours },
    { key: "mins", label: labels.mins },
    { key: "secs", label: labels.secs, accent: true },
  ];

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg relative z-20">
      <div className="bg-surface-container-lowest rounded-2xl card-shadow border-t-2 border-primary p-8 md:p-12 text-center backdrop-blur-xl">
        <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-8 uppercase tracking-widest">
          {text(
            {
              en: "Time Until the Flame Ignites",
              ko: "불꽃이 타오르기까지",
            },
            lang,
          )}
        </h3>
        <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
          {cells.map((cell) => (
            <div key={cell.key} className="flex flex-col items-center">
              <div
                className={
                  "font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl tabular-nums " +
                  (cell.accent
                    ? "text-primary font-bold"
                    : "text-on-surface font-light")
                }
              >
                {parts ? pad(parts[cell.key]) : "--"}
              </div>
              <div
                className={
                  "font-label-sm text-label-sm mt-2 " +
                  (cell.accent ? "text-primary" : "text-on-surface-variant")
                }
              >
                {text(cell.label, lang)}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full bg-surface-variant/30 h-1 mt-12 rounded-full overflow-hidden max-w-3xl mx-auto">
          <div className="bg-secondary h-full rounded-full w-[65%]" />
        </div>
      </div>
    </section>
  );
}
