"use client";

import Hero from "@/components/Hero";
import { useLang, text } from "@/lib/i18n";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD9mP4HhqXSgB0zDGX6_ibk_51n_QWtTv0qcqYJoz2c9pAaOQJHptk2lO3_7y3lW74MvugL2fDUTJ-QcAwwFPOT7GPID3kGpyyHQDYzWkMGci5p_H-lPw4vVLofJv0ZI0CdpC7Tz2x0AhPMYMMXL44LW4VNAuqoq3qx0qbJmuw91iiGFe_MhGanVrOywlbHLCZFAV4Yp3Ykk7AsJI79EVjjtGLGQuTLPpQQ4FzWUy2lyOiedzrPtcqRguKbzYKsct6rO94CPrN2-opC";

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
      en: "Protection for the Underground Believers",
      ko: "지하 성도들을 위한 보호",
      desc: {
        en: "Pray for safety, courage, and perseverance for those practicing their faith in secret.",
        ko: "비밀리에 신앙을 지키는 이들의 안전과 용기, 인내를 위해 기도하세요.",
      },
    },
    {
      en: "Provision of Basic Needs",
      ko: "기본적인 필요의 공급",
      desc: {
        en: "Intercede for access to food, clean water, and medical care for vulnerable populations.",
        ko: "취약 계층의 식량, 깨끗한 물, 의료 접근을 위해 중보하세요.",
      },
    },
    {
      en: "Wisdom for Global Leaders",
      ko: "세계 지도자들을 위한 지혜",
      desc: {
        en: "Pray that international leaders act with justice, compassion, and divine wisdom regarding the peninsula.",
        ko: "국제 지도자들이 한반도에 대해 정의와 긍휼, 하나님의 지혜로 행동하도록 기도하세요.",
      },
    },
    {
      en: "Healing of Generational Trauma",
      ko: "세대를 잇는 상처의 치유",
      desc: {
        en: "Pray for the deep emotional and psychological wounds of divided families to find comfort and resolution.",
        ko: "이산가족의 깊은 정서적, 심리적 상처가 위로와 회복을 찾도록 기도하세요.",
      },
    },
  ];

  return (
    <>
      <Hero
        badge={text(
          { en: "Prayer Guide / 기도 가이드", ko: "기도 가이드 / Prayer Guide" },
          lang,
        )}
        image={HERO_IMG}
        alt="A serene, expansive landscape of Jeju Island at dawn with a calm ocean, soft rolling hills, and a bright clear sky."
        title={
          <>
            {text({ en: "Guidelines for the", ko: "북한의" }, lang)} <br />
            <span className="text-primary">
              {text({ en: "Restoration", ko: "회복" }, lang)}
            </span>{" "}
            {text({ en: "of North Korea", ko: "을 위한 지침" }, lang)}
          </>
        }
        subtitle={text(
          {
            en: "Intercessory prayer guidelines for the restoration of North Korea.",
            ko: "북한의 회복을 위한 중보기도 지침.",
          },
          lang,
        )}
      />

      {/* Daily themes */}
      <section className="py-stack-lg space-y-stack-md px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center md:text-left mb-8">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {text({ en: "Daily Themes / 일일 주제", ko: "일일 주제 / Daily Themes" }, lang)}
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
                <h3 className="font-headline-md text-on-surface text-lg">
                  {text({ en: t.en, ko: t.ko }, lang)}
                </h3>
                <h4 className="font-body-md text-body-md text-on-surface-variant mb-3">
                  {text({ en: t.ko, ko: t.en }, lang)}
                </h4>
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
            <button className="w-full flex items-center justify-center gap-2 bg-on-primary text-primary font-label-sm text-label-sm py-3 px-4 rounded-lg hover:bg-primary-fixed transition-colors">
              <span className="material-symbols-outlined">download</span>
              {text({ en: "Full Guide (PDF)", ko: "전체 가이드 (PDF)" }, lang)}
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-on-primary/30 text-on-primary font-label-sm text-label-sm py-3 px-4 rounded-lg hover:bg-on-primary/10 transition-colors">
              <span className="material-symbols-outlined">image</span>
              {text({ en: "Media Kit", ko: "미디어 키트" }, lang)}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
