"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import DonationSection from "@/components/DonationSection";
import { useLang, text } from "@/lib/i18n";

const HERO_IMG =
  "/images/jeju-dawn.png";
const VISION_IMG =
  "/images/sanctuary-light.png";

export default function Home() {
  const { lang } = useLang();

  const quickLinks = [
    {
      href: "/schedule",
      icon: "calendar_today",
      title: { en: "Schedule", ko: "일정" },
      desc: {
        en: "View the 72-hour breakdown of worship sessions and prayer blocks.",
        ko: "72시간 예배 세션과 기도 시간표를 확인하세요.",
      },
    },
    {
      href: "/vision",
      icon: "info",
      title: { en: "Vision", ko: "비전" },
      desc: {
        en: "Learn more about the Flame Worship mission and this project.",
        ko: "Flame Worship의 사명과 이 프로젝트에 대해 알아보세요.",
      },
    },
    {
      href: "/prayer-guide",
      icon: "menu_book",
      title: { en: "Prayer Guide", ko: "기도 가이드" },
      desc: {
        en: "Download resources and specific prayer topics for North Korea.",
        ko: "북한을 위한 기도 주제와 자료를 다운로드하세요.",
      },
    },
  ] as const;

  return (
    <>
      <Hero
        badge={text(
          { en: "Registration Open", ko: "등록 접수 중" },
          lang,
        )}
        image={HERO_IMG}
        alt="A breathtaking landscape of Jeju Island at dawn, bright and airy with soft natural light, calm ocean and rolling hills."
        title={
          <>
            {text({ en: "72 Hours of Prayer", ko: "72시간 기도" }, lang)} <br />
            <span className="text-primary">
              {text({ en: "in Jeju", ko: "제주에서" }, lang)}
            </span>
          </>
        }
        subtitle={
          lang === "ko" ? (
            <>
              한반도의 회복과 열방을 위해 중보하는 거룩한 모임.<br className="hidden sm:inline" />
              한반도의 끝에서 72시간 연속 예배와 기도에 함께하세요.
            </>
          ) : (
            "A sacred gathering to intercede for the restoration of the Korean Peninsula and the Nations. Join us for 72 hours of unceasing worship and prayer at the edge of the nation."
          )
        }
      >
        <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-2 text-on-surface-variant font-label-sm text-label-sm">
          <span className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
              calendar_month
            </span>
            {text(
              { en: "Aug 12–15, 2026", ko: "2026년 8월 12–15일" },
              lang,
            )}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
              location_on
            </span>
            {text(
              { en: "Lee Ki-poong Mission Memorial Hall, Jeju", ko: "제주 이기풍선교기념관" },
              lang,
            )}
          </span>
        </div>
        <div className="mt-2 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Link
            href="/register"
            className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-full font-label-sm text-label-sm font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300"
          >
            {text({ en: "Register Now", ko: "지금 등록하기" }, lang)}
          </Link>
          <Link
            href="/schedule"
            className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-secondary text-secondary font-label-sm text-label-sm font-bold hover:bg-secondary/5 transition-all duration-300"
          >
            {text({ en: "View Schedule", ko: "일정 보기" }, lang)}
          </Link>
        </div>
      </Hero>

      <Countdown />

      {/* Vision bento grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]">
          {/* Main vision card */}
          <div className="md:col-span-2 md:row-span-2 bg-surface-container-lowest rounded-2xl p-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow min-h-[360px]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-700"
              style={{ backgroundImage: `url("${VISION_IMG}")` }}
            />
            <div className="relative z-10 h-full flex flex-col justify-end">
              <span
                className="material-symbols-outlined filled text-primary mb-auto"
                style={{ fontSize: 32 }}
              >
                local_fire_department
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
                {text({ en: "One Flame, One Heart", ko: "하나의 불꽃, 하나의 마음" }, lang)}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
                {text(
                  {
                    en: "Our vision is to see a continuous wall of prayer ascending for the peace and healing of the Korean peninsula. For 72 hours, we will not stop seeking His face.",
                    ko: "우리의 비전은 한반도의 평화와 치유를 위해 끊임없이 올라가는 기도의 성벽을 보는 것입니다. 72시간 동안 우리는 그분의 얼굴을 구하기를 멈추지 않을 것입니다.",
                  },
                  lang,
                )}
              </p>
            </div>
          </div>

          {/* Map / location */}
          <div className="bg-surface-container-highest rounded-2xl relative overflow-hidden flex flex-col justify-end p-6 shadow-sm min-h-[300px]">
            <div className="absolute inset-0">
              <iframe
                title={text({ en: "Event location map", ko: "행사 장소 지도" }, lang)}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=%EC%A0%9C%EC%A3%BC%20%EC%9D%B4%EA%B8%B0%ED%92%8D%EC%84%A0%EA%B5%90%EA%B8%B0%EB%85%90%EA%B4%80&z=14&hl=ko&output=embed"
              />
            </div>
            <div className="relative z-10 bg-surface-container-lowest/90 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/20 pointer-events-none">
              <div className="font-label-sm text-label-sm text-primary mb-1 uppercase">
                {text({ en: "Location", ko: "장소" }, lang)}
              </div>
              <div className="font-body-md text-body-md font-semibold text-on-surface">
                {text(
                  { en: "Lee Ki-poong Mission Memorial Hall", ko: "이기풍선교기념관" },
                  lang,
                )}
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                {text(
                  {
                    en: "Waheul-ri, Jocheon-eup, Jeju",
                    ko: "제주시 조천읍 와흘리 산14-3",
                  },
                  lang,
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="relative overflow-hidden rounded-2xl p-8 flex flex-col justify-center items-center text-center min-h-[200px] border border-white/40 bg-gradient-to-br from-primary/25 to-primary/5 backdrop-blur-xl shadow-lg shadow-primary/10">
            {/* Decorative color blobs the frosted glass refracts */}
            <div className="pointer-events-none absolute -top-10 -right-8 w-32 h-32 rounded-full bg-primary/40 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-10 w-36 h-36 rounded-full bg-primary/25 blur-2xl" />
            <div className="relative z-10 font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-primary font-bold mb-2 drop-shadow-sm">
              72
            </div>
            <div className="relative z-10 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">
              {text({ en: "Continuous Hours", ko: "연속 시간" }, lang)}
            </div>
          </div>
        </div>
      </section>

      {/* Worshipper registration section */}
      <section className="bg-surface-container-low py-stack-lg px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto bg-surface-container-lowest rounded-3xl p-8 md:p-12 border border-outline-variant/30 shadow-lg shadow-primary/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex-1 space-y-4 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-[11px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
              {text({ en: "Registration", ko: "등록" }, lang)}
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight leading-tight">
              {text({ en: "Worshipper Registration", ko: "예배자 등록 안내" }, lang)}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              {text(
                {
                  en: "Register to join us in person as a worshipper. Click the button to submit your registration form.",
                  ko: "제주 집회에 현장 예배자로 참석하여 함께 기도의 불꽃을 피워내실 분들은 아래 신청 버튼을 통해 등록해주세요.",
                },
                lang,
              )}
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <a
              href="https://docs.google.com/spreadsheets/d/1lBCwFgo1jMAI_FsudcI_lMgxpZDrLJ2Xeg8FH2z6D10/edit?gid=659576954#gid=659576954"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-full font-label-sm text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[18px] leading-none" style={{ fontSize: 18 }}>
                how_to_reg
              </span>
              {text({ en: "Register Now", ko: "지금 신청하기" }, lang)}
            </a>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-8 text-center">
          {text({ en: "Prepare Your Heart", ko: "마음을 준비하세요" }, lang)}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group block bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">
                  {q.icon}
                </span>
              </div>
              <h4 className="font-body-lg text-body-lg text-on-surface font-semibold mb-2">
                {text(q.title, lang)}
              </h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
                {text(q.desc, lang)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Support / donation */}
      <DonationSection />
    </>
  );
}
