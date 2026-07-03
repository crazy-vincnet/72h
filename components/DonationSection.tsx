"use client";

import { useState } from "react";
import { useLang, text } from "@/lib/i18n";
import { DONATION, DONATION_CONFIRMED } from "@/lib/event";

export default function DonationSection() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(DONATION.account);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-container text-on-primary p-8 md:p-14">
        {/* decorative glow */}
        <div className="pointer-events-none absolute -right-16 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <span
          className="material-symbols-outlined filled pointer-events-none absolute right-6 bottom-4 text-white/10 select-none"
          style={{ fontSize: 190 }}
        >
          volunteer_activism
        </span>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left — message */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-on-primary px-3 py-1 rounded-full font-label-sm text-label-sm mb-5">
              <span className="material-symbols-outlined filled" style={{ fontSize: 16 }}>
                favorite
              </span>
              {text({ en: "Support", ko: "후원하기" }, lang)}
            </div>
            <h2 className="font-headline-xl-mobile text-headline-xl-mobile text-on-primary mb-4 leading-tight">
              {text(
                { en: "Support this Mission", ko: "이 사역을 후원해 주세요" },
                lang,
              )}
            </h2>
            <p className="font-body-lg text-body-lg text-on-primary/85 max-w-md">
              {text(
                {
                  en: "Your giving sustains 72 hours of continuous prayer for the restoration of North Korea — venue, worship, and hospitality for all who gather.",
                  ko: "여러분의 후원은 북한의 회복을 위한 72시간 연속 기도 — 장소, 예배, 그리고 함께 모이는 모든 이들을 위한 섬김을 가능하게 합니다.",
                },
                lang,
              )}
            </p>
          </div>

          {/* Right — glass account card */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 shadow-2xl shadow-black/10">
            <div className="font-label-sm text-label-sm text-on-primary/70 uppercase tracking-widest mb-4">
              {text({ en: "Donation Account", ko: "후원 계좌" }, lang)}
            </div>

            {DONATION_CONFIRMED ? (
              <>
                <div className="mb-5">
                  <div className="font-label-sm text-label-sm text-on-primary/70 mb-1">
                    {text({ en: "Account Number", ko: "계좌번호" }, lang)}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-headline-md text-2xl md:text-3xl font-bold text-on-primary tabular-nums tracking-wide">
                      {DONATION.account}
                    </span>
                    <button
                      onClick={copyAccount}
                      className="inline-flex items-center gap-1.5 shrink-0 bg-white text-primary px-3.5 py-2 rounded-full font-label-sm text-label-sm font-bold shadow-sm hover:bg-white/90 transition-colors"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                        {copied ? "check" : "content_copy"}
                      </span>
                      {copied
                        ? text({ en: "Copied", ko: "복사됨" }, lang)
                        : text({ en: "Copy", ko: "복사" }, lang)}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-white/15 my-4" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-label-sm text-label-sm text-on-primary/70 mb-1">
                      {text({ en: "Bank", ko: "은행" }, lang)}
                    </div>
                    <div className="font-body-md text-body-md font-semibold text-on-primary">
                      {text(DONATION.bank, lang)}
                    </div>
                  </div>
                  <div>
                    <div className="font-label-sm text-label-sm text-on-primary/70 mb-1">
                      {text({ en: "Holder", ko: "예금주" }, lang)}
                    </div>
                    <div className="font-body-md text-body-md font-semibold text-on-primary">
                      {text(DONATION.holder, lang)}
                    </div>
                  </div>
                  {DONATION.inquiry && (
                    <div className="col-span-2">
                      <div className="font-label-sm text-label-sm text-on-primary/70 mb-1">
                        {text({ en: "Inquiries", ko: "후원 문의" }, lang)}
                      </div>
                      <div className="font-body-md text-body-md font-semibold text-on-primary">
                        {DONATION.inquiry}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="font-body-md text-body-md text-on-primary/85">
                {text(
                  {
                    en: "Donation details are being finalized and will be posted here soon.",
                    ko: "후원 계좌 정보를 준비 중이며, 곧 이곳에 안내해 드리겠습니다.",
                  },
                  lang,
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
