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
      <div className="bg-surface-container-lowest rounded-2xl card-shadow border border-outline-variant/20 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
          {/* Left — message */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-fixed/40 text-primary px-3 py-1 rounded-full font-label-sm text-label-sm mb-4">
              <span className="material-symbols-outlined filled" style={{ fontSize: 16 }}>
                volunteer_activism
              </span>
              {text({ en: "Support", ko: "후원하기" }, lang)}
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-3">
              {text(
                { en: "Support this Mission", ko: "이 사역을 후원해 주세요" },
                lang,
              )}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {text(
                {
                  en: "Your giving sustains the 72 hours of continuous prayer for the restoration of North Korea — venue, worship, and hospitality for those who gather.",
                  ko: "여러분의 후원은 북한의 회복을 위한 72시간 연속 기도 — 장소, 예배, 그리고 함께 모이는 이들을 위한 섬김을 가능하게 합니다.",
                },
                lang,
              )}
            </p>
          </div>

          {/* Right — account / details */}
          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/30">
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide mb-4">
              {text({ en: "Donation Account", ko: "후원 계좌" }, lang)}
            </div>

            {DONATION_CONFIRMED ? (
              <div className="space-y-3">
                <Row
                  label={text({ en: "Bank", ko: "은행" }, lang)}
                  value={text(DONATION.bank, lang)}
                />
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">
                      {text({ en: "Account", ko: "계좌번호" }, lang)}
                    </div>
                    <div className="font-body-lg text-body-lg font-semibold text-on-surface tabular-nums">
                      {DONATION.account}
                    </div>
                  </div>
                  <button
                    onClick={copyAccount}
                    className="inline-flex items-center gap-1.5 shrink-0 bg-primary text-on-primary px-3 py-2 rounded-lg font-label-sm text-label-sm hover:bg-primary/90 transition-colors"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                      {copied ? "check" : "content_copy"}
                    </span>
                    {copied
                      ? text({ en: "Copied", ko: "복사됨" }, lang)
                      : text({ en: "Copy", ko: "복사" }, lang)}
                  </button>
                </div>
                <Row
                  label={text({ en: "Holder", ko: "예금주" }, lang)}
                  value={text(DONATION.holder, lang)}
                />
                {DONATION.inquiry && (
                  <Row
                    label={text({ en: "Inquiries", ko: "후원 문의" }, lang)}
                    value={DONATION.inquiry}
                  />
                )}
              </div>
            ) : (
              <p className="font-body-md text-body-md text-on-surface-variant">
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="font-label-sm text-label-sm text-on-surface-variant">
        {label}
      </span>
      <span className="font-body-md text-body-md font-medium text-on-surface text-right">
        {value}
      </span>
    </div>
  );
}
