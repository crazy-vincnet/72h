"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import { useLang, text } from "@/lib/i18n";

const HERO_IMG =
  "/images/jeju-sunrise-hills.png";

export default function VisionPage() {
  const { lang } = useLang();

  const values = [
    {
      icon: "front_hand",
      en: "Intercession",
      ko: "중보",
      desc: {
        en: "Standing in the gap for the nation. We dedicate these hours to intercede passionately for healing and divine intervention.",
        ko: "민족을 위해 중보의 자리에 섭니다. 치유와 하나님의 개입을 위해 이 시간을 뜨겁게 중보합니다.",
      },
    },
    {
      icon: "diversity_3",
      en: "Unity",
      ko: "연합",
      desc: {
        en: "Gathering hearts across borders. Bringing together believers from diverse backgrounds into one unified voice of prayer.",
        ko: "국경을 넘어 마음을 모읍니다. 다양한 배경의 성도들을 하나의 기도의 목소리로 연합시킵니다.",
      },
    },
    {
      icon: "auto_awesome",
      en: "Transformation",
      ko: "변화",
      desc: {
        en: "Believing for healing and restoration. We pray with the conviction that sustained prayer brings tangible spiritual shifts.",
        ko: "치유와 회복을 믿습니다. 지속적인 기도가 실제적인 영적 변화를 가져온다는 확신으로 기도합니다.",
      },
    },
  ];

  return (
    <>
      <Hero
        badge={text({ en: "Vision", ko: "비전" }, lang)}
        image={HERO_IMG}
        alt="A peaceful landscape of Jeju Island at sunrise, gentle mists over volcanic hills lit by a warm golden sunrise."
        title={text({ en: "Vision", ko: "비전" }, lang)}
        subtitle={text(
          {
            en: "One Flame, One Heart for the Restoration of the North.",
            ko: "북한의 회복을 위한 하나의 불꽃, 하나의 마음.",
          },
          lang,
        )}
      />

      {/* Core values */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-stack-lg">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">
            {text({ en: "Core Values", ko: "핵심 가치" }, lang)}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
            {text(
              {
                en: "The foundational pillars guiding our 72-hour prayer movement.",
                ko: "72시간 기도 운동을 이끄는 기초가 되는 기둥들.",
              },
              lang,
            )}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {values.map((v) => (
            <div
              key={v.en}
              className="bg-surface-container-lowest rounded-xl p-8 card-shadow border-t-2 border-primary/20 hover:border-primary transition-colors flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-primary-fixed/30 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">{v.icon}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
                {text({ en: v.en, ko: v.ko }, lang)}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {text(v.desc, lang)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-stack-lg bg-surface-container-low px-margin-mobile md:px-margin-desktop">
        <div className="max-w-4xl mx-auto text-center relative py-12">
          <span
            className="material-symbols-outlined filled text-primary/10 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ fontSize: 140 }}
          >
            format_quote
          </span>
          <div className="relative z-10">
            <p className="font-headline-md md:font-headline-xl-mobile text-headline-md md:text-headline-xl-mobile text-on-surface italic leading-relaxed mb-8">
              {text(
                {
                  en: "“To build a continuous 72-hour wall of prayer, a sanctuary in time where the flame of intercession for the North never goes out.”",
                  ko: "“북한을 위한 중보의 불꽃이 꺼지지 않는 시간의 성소, 72시간 연속 기도의 성벽을 세우기 위하여.”",
                },
                lang,
              )}
            </p>
            <div className="inline-flex items-center justify-center gap-3 bg-surface-container-lowest px-6 py-3 rounded-full shadow-sm border border-outline-variant/30 mt-8">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                {text({ en: "The 72-Hour Mandate", ko: "72시간의 사명" }, lang)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <div className="bg-surface-container-lowest rounded-2xl p-12 md:p-16 card-shadow border border-outline-variant/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-stack-md">
            <span
              className="material-symbols-outlined text-primary mb-4"
              style={{ fontSize: 48 }}
            >
              local_fire_department
            </span>
            <h2 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface">
              {text({ en: "Join the Movement", ko: "운동에 동참하세요" }, lang)}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">
              {text(
                {
                  en: "Add your voice to the 72 hours of continuous prayer. Every hour matters in building this spiritual wall.",
                  ko: "72시간 연속 기도에 당신의 목소리를 더하세요. 이 영적 성벽을 세우는 데 모든 시간이 소중합니다.",
                },
                lang,
              )}
            </p>
            <Link
              href="/register"
              className="bg-primary-container text-on-primary hover:bg-primary transition-all duration-300 font-label-sm text-label-sm px-8 py-4 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              {text({ en: "Register Now", ko: "등록하기" }, lang)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
