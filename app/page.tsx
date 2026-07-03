"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import { useLang, text } from "@/lib/i18n";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuATG4m-0B1mMLEcqQz2-A7b2JzSshtto5YPnwcs6fptC9jcF-QFVwRlycqhO95_4f8ngbkpKzbrK4QiREYw5FQG_sT3hV7JGJh7y2ZHzt5P-ASOmO1rY7FH4oYrMYJBvqspUrRc7AQTh8WOIYfi6RsrqpeL5gdOgJIBRVl1UuY4gFBryeVsjf7vY4PiZOCSw4jhzEVU4dmE4Cqw8JwzncZQto-TMiZ5Cqvj4klNrUqHdx-daAuxA3xNASOHYrwXvdX2G439lHOzaVuT";
const VISION_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBeiZoC-7kU0ys2QnzJWGttagbQvMnddt86fI4h4t5SmcE45fzrZJbGe5qxqSEhAJWYI1HCnS0Xo2w8oskNBuhfOjAIJkCewawjv47uqifXzxvqD-vCsvxMiUT0OqXinsrNyNXyPG--BZd4DlYdZLgubeuIjBxNjg6kn6YjQCxK2KFx_tAQxHyCsqaKkoHHllniBgc-LadDhnYuZlRE53TyV87RB7f7Gh1yzKyFOW3jc1gXnx4uOB_Iifor2VzUAh47sF36VZynvJLJ";
const MAP_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAazV-0GVq9-L2gpDhhafzoLLIlNlETg41Ci7tzMaAEGQ2dXl-xK1OxXpX_dPIq_O0SOsgXea0Q7MqhGs5Bs3qQY8-7aRcuDUQgOp3q9D6z2Nt24nPyFI6hXXTK5g9g5ecCRv8fPbj9xi6ZBASPhvzq2m1bZEKR1lOb6tBu4hluYiRGtXu0UI6pna59Duj7HEcatnAvOAIxaxrhQZ8Tl_Jd0mWILoWLmCYpSjo-dx0GU5hq0D8-QIm42hUe18aL_NlkkeviU0wBsFsR";

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
          { en: "Registration Open / 등록 접수 중", ko: "등록 접수 중 / Registration Open" },
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
        subtitle={text(
          {
            en: "A sacred gathering to intercede for North Korea. Join us for 72 continuous hours of worship and prayer at the edge of the nation.",
            ko: "북한을 위해 중보하는 거룩한 모임. 한반도의 끝에서 72시간 연속 예배와 기도에 함께하세요.",
          },
          lang,
        )}
      >
        <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
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
                <br />
                <span className="text-on-surface-variant font-normal text-lg">
                  {text({ en: "하나의 불꽃, 하나의 마음", ko: "One Flame, One Heart" }, lang)}
                </span>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover opacity-80"
                alt="A clean 3D map of Jeju Island, South Korea with a location pin marker."
                src={MAP_IMG}
              />
            </div>
            <div className="relative z-10 bg-surface-container-lowest/90 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/20">
              <div className="font-label-sm text-label-sm text-primary mb-1 uppercase">
                {text({ en: "Location", ko: "장소" }, lang)}
              </div>
              <div className="font-body-md text-body-md font-semibold text-on-surface">
                {text({ en: "Jeju Island — TBA", ko: "제주도 — 추후 공지" }, lang)}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-primary-container rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-sm min-h-[200px]">
            <div className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-on-primary-container font-bold mb-2">
              72
            </div>
            <div className="font-label-sm text-label-sm text-on-primary-container/80 uppercase tracking-wide">
              {text({ en: "Continuous Hours", ko: "연속 시간" }, lang)}
            </div>
            <div className="font-label-sm text-label-sm text-on-primary-container/60 mt-1">
              {text({ en: "연속 시간", ko: "Continuous Hours" }, lang)}
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-8 text-center">
          {text({ en: "Prepare Your Heart", ko: "마음을 준비하세요" }, lang)}
          <br />
          <span className="text-sm font-normal text-on-surface-variant">
            {text({ en: "마음을 준비하세요", ko: "Prepare Your Heart" }, lang)}
          </span>
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
    </>
  );
}
