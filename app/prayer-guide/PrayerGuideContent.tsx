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
      en: "For His presence and pure hearts",
      ko: "순전한 마음과 하나님의 임재를 위해",
      desc: {
        en: "That His presence purifies our hearts, so that our worship and prayer are pure and acceptable and led by spirit and truth.",
        ko: "영과 진리로 드리는 순전한 예배를 통해 하나님의 임재가 충만히 임하도록.",
      },
    },
    {
      en: "For restoration",
      ko: "회복을 위해",
      desc: {
        en: "That the personal restoration of identity as a beloved child of God, leads to restoration in families, church communities, and the nations.",
        ko: "하나님의 사랑받는 자녀라는 정체성이 각 사람 안에 회복되고, 그 회복의 불길이 가정과 교회공동체를 넘어 세상 가운데 번져가도록.",
      },
    },
    {
      en: "For the Reunification",
      ko: "한반도의 통일을 위해",
      desc: {
        en: "That churches would unite and the way will be paved for a gospel-centered, peaceful reunification of the Korean Peninsula.",
        ko: "회복된 교회들이 연합되어 복음이 중심된 하나님의 방법으로 평화로운 한반도 통일의 길이 열리도록.",
      },
    },
    {
      en: "For the nations",
      ko: "열방을 위해",
      desc: {
        en: "That the flame of the gospel would arise beyond the Korean Peninsula and that people would rise to prepare the way for the return of Jesus Christ.",
        ko: "한반도를 넘어 열방 가운데 복음의 불길이 일어나고, 예수 그리스도의 다시 오실 길을 예비하는 자들이 일어나도록.",
      },
    },
    {
      en: "For the next generation",
      ko: "다음 세대를 위해",
      desc: {
        en: "That this will spark a flame in a new generation of worship and intercession.",
        ko: "믿음의 유업을 이어받을 다음 세대를 일으키시고, 그 가운데 거룩한 예배와 중보의 불이 타오르도록.",
      },
    },
    {
      en: "For God's provision",
      ko: "하나님의 공급을 위해",
      desc: {
        en: "A total of 16 million KRW (approximately $11,000 USD) is needed for the venue, sound, operations, media, and other needs for this worship gathering. Please pray with us, as we trust in Jehovah Jireh, the God who provides all we need, and ask that His abundant grace be poured out upon us.",
        ko: "이번 예배를 위해 장소, 음향, 운영, 미디어 등 총 1,600만원의 재정이 필요합니다. 예배를 위해 필요한 모든 것을 공급하시는 여호와 이레 하나님을 신뢰하며, 그 은혜를 풍성히 누릴 수 있도록.",
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

      {/* Specific points */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-surface-container-lowest p-8 md:p-12 rounded-xl card-shadow">
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
      </section>
    </>
  );
}
