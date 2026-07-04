"use client";

import Hero from "@/components/Hero";
import { useLang, text } from "@/lib/i18n";

const HERO_IMG =
  "/images/jeju-dawn-ocean.png";

export default function PrayerGuidePage() {
  const { lang } = useLang();

  const themes = [
    {
      icon: "diversity_1",
      border: "border-tertiary-fixed-dim",
      en: "Peace & Reconciliation",
      ko: "평화와 화해",
      desc: {
        en: "Praying for the healing of past wounds and the opening of dialogue across borders. Establishing a foundation of peace.",
        ko: "과거의 상처가 치유되고 국경을 넘어 대화의 문이 열리도록 기도합니다. 평화의 기초를 세웁니다.",
      },
    },
    {
      icon: "groups",
      border: "border-primary",
      en: "The People",
      ko: "사람들",
      desc: {
        en: "Interceding for the physical and spiritual nourishment of the North Korean people. Praying for their safety and hope.",
        ko: "북한 주민들의 육적, 영적 양식을 위해 중보합니다. 그들의 안전과 소망을 위해 기도합니다.",
      },
    },
    {
      icon: "flare",
      border: "border-secondary-fixed-dim",
      en: "Spiritual Restoration",
      ko: "영적 회복",
      desc: {
        en: "Asking for a revival of faith and the light of truth to permeate the land. Praying for the underground church.",
        ko: "믿음의 부흥과 진리의 빛이 그 땅에 스며들기를 구합니다. 지하 교회를 위해 기도합니다.",
      },
    },
  ];

  const points = [
    {
      en: "Pure Hearts & Presence",
      ko: "순전한 마음과 하나님의 임재",
      desc: {
        en: "Pray that God's presence will overflow through pure worship offered in spirit and truth.",
        ko: "영과 진리로 주님께 드리는 순전한 예배를 통해 하나님의 임재가 충만하도록.",
      },
    },
    {
      en: "Restoration",
      ko: "회복",
      desc: {
        en: "Pray that individuals recover their identity as God's beloved, spreading that fire to the church community.",
        ko: "하나님의 사랑받는 자 정체성의 회복이 개인에게 임하여 그 불길이 교회공동체까지 흘러가도록.",
      },
    },
    {
      en: "Reunification",
      ko: "한반도의 통일",
      desc: {
        en: "Pray that the path to peaceful reunification of the Korean Peninsula opens up centered on the Gospel.",
        ko: "복음을 중심으로 평화로운 한반도 통일의 길이 열리도록.",
      },
    },
    {
      en: "The Nations",
      ko: "열방",
      desc: {
        en: "Pray that the fire of the Gospel spreads beyond the Korean Peninsula and into the nations.",
        ko: "한반도를 넘어 열방 가운데 복음의 불길이 일어나도록.",
      },
    },
    {
      en: "The Next Generation",
      ko: "다음 세대",
      desc: {
        en: "Pray that a holy fire rises among the next generation of worshippers and intercessors raised by God.",
        ko: "하나님이 일으키시는 다음 세대 예배자들과 중보자들 가운데 거룩한 불길이 일어나도록.",
      },
    },
    {
      en: "Provision",
      ko: "재정의 공급",
      desc: {
        en: "Pray that all financial resources needed for this assembly are fully and abundantly provided.",
        ko: "이번 집회에 필요한 모든 재정이 온전히 채워지도록",
      },
    },
  ];

  return (
    <>
      <Hero
        badge={text(
          { en: "Prayer Guide", ko: "기도 가이드" },
          lang,
        )}
        image={HERO_IMG}
        alt="A serene, expansive landscape of Jeju Island at dawn with a calm ocean, soft rolling hills, and a bright clear sky."
        title={
          <>
            {text({ en: "Guidelines for the", ko: "한반도와 열방의" }, lang)} <br />
            <span className="text-primary">
              {text({ en: "Restoration", ko: "회복" }, lang)}
            </span>{" "}
            {text({ en: "of the Korean Peninsula & Nations", ko: "을 위한 지침" }, lang)}
          </>
        }
        subtitle={text(
          {
            en: "Intercessory prayer guidelines for the restoration of the Korean Peninsula and the Nations.",
            ko: "한반도와 열방의 회복을 위한 중보기도 지침.",
          },
          lang,
        )}
      />

      {/* Daily themes */}
      <section className="py-stack-lg space-y-stack-md px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center md:text-left mb-8">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {text({ en: "Daily Themes", ko: "일일 주제" }, lang)}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {themes.map((t) => (
            <div
              key={t.en}
              className={`bg-surface-container-lowest p-8 rounded-xl card-shadow border-t-2 ${t.border} hover:shadow-lg transition-shadow duration-300 flex flex-col items-start gap-4`}
            >
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined filled">{t.icon}</span>
              </div>
              <div>
                <h3 className="font-headline-md text-on-surface text-lg mb-3">
                  {text({ en: t.en, ko: t.ko }, lang)}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant opacity-80 text-sm">
                  {text(t.desc, lang)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specific points + downloads */}
      <section className="py-stack-lg grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="lg:col-span-8 bg-surface-container-lowest p-8 md:p-12 rounded-xl card-shadow">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
            {text(
              { en: "Specific Intercession Points", ko: "구체적인 중보 제목" },
              lang,
            )}
          </h2>
          <div className="space-y-4">
            {points.map((p) => (
              <div key={p.en} className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-semibold">
                    {text({ en: p.en, ko: p.ko }, lang)}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">
                    {text(p.desc, lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads */}
        <div className="lg:col-span-4 bg-primary text-on-primary p-8 rounded-xl card-shadow flex flex-col items-center text-center justify-center h-full min-h-[300px]">
          <span className="material-symbols-outlined mb-4" style={{ fontSize: 36 }}>
            description
          </span>
          <h2 className="font-headline-md text-headline-md text-on-primary mb-2">
            {text({ en: "Resource Center", ko: "자료 센터" }, lang)}
          </h2>
          <p className="font-body-md text-body-md text-on-primary/80 mb-8 text-sm">
            {text(
              {
                en: "Download comprehensive guides and media assets for your prayer groups.",
                ko: "기도 모임을 위한 종합 가이드와 미디어 자료를 다운로드하세요.",
              },
              lang,
            )}
          </p>
          <div className="w-full space-y-3">
            <button
              disabled
              title={text({ en: "Coming soon", ko: "준비 중" }, lang)}
              className="w-full flex items-center justify-center gap-2 bg-on-primary/60 text-primary/70 font-label-sm text-label-sm py-3 px-4 rounded-lg cursor-not-allowed"
            >
              <span className="material-symbols-outlined">download</span>
              {text({ en: "Full Guide (PDF)", ko: "전체 가이드 (PDF)" }, lang)}
              <span className="text-[10px] uppercase tracking-wide opacity-80">
                {text({ en: "Soon", ko: "준비 중" }, lang)}
              </span>
            </button>
            <button
              disabled
              title={text({ en: "Coming soon", ko: "준비 중" }, lang)}
              className="w-full flex items-center justify-center gap-2 border border-on-primary/20 text-on-primary/60 font-label-sm text-label-sm py-3 px-4 rounded-lg cursor-not-allowed"
            >
              <span className="material-symbols-outlined">image</span>
              {text({ en: "Media Kit", ko: "미디어 키트" }, lang)}
              <span className="text-[10px] uppercase tracking-wide opacity-80">
                {text({ en: "Soon", ko: "준비 중" }, lang)}
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
