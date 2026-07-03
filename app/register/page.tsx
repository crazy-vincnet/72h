"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang, text, type Bi } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wide">
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition";

export default function RegisterPage() {
  const { lang } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const t = (bi: Bi) => text(bi, lang);

  const days = [
    { en: "Day 1", ko: "1일차" },
    { en: "Day 2", ko: "2일차" },
    { en: "Day 3", ko: "3일차" },
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      participants: fd.get("participants"),
      days: fd.getAll("days"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Submission failed");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : t({ en: "Something went wrong.", ko: "문제가 발생했습니다." }),
      );
    }
  }

  return (
    <div className="pt-28 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-2xl mx-auto">
      <div className="text-center mb-stack-md">
        <div className="inline-flex items-center gap-2 bg-primary-fixed/30 px-4 py-1.5 rounded-full text-primary font-label-sm text-label-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {t({ en: "Registration", ko: "등록" })}
        </div>
        <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface mb-4">
          {t({ en: "Join the 72 Hours", ko: "72시간에 동참하기" })}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          {t({
            en: "Reserve your place in the continuous wall of prayer for North Korea.",
            ko: "북한을 위한 끊임없는 기도의 성벽에 당신의 자리를 예약하세요.",
          })}
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-surface-container-lowest rounded-2xl card-shadow border border-outline-variant/20 p-10 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined" style={{ fontSize: 36 }}>
              check
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {t({ en: "You're registered!", ko: "등록이 완료되었습니다!" })}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            {t({
              en: "Thank you for joining. We'll be in touch with details as the event date is confirmed.",
              ko: "함께해 주셔서 감사합니다. 행사 날짜가 확정되는 대로 자세한 안내를 드리겠습니다.",
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold hover:bg-primary/90 transition-colors"
            >
              {t({ en: "Back to Home", ko: "홈으로" })}
            </Link>
            <button
              onClick={() => setStatus("idle")}
              className="px-6 py-3 rounded-full border-2 border-secondary text-secondary font-label-sm text-label-sm font-bold hover:bg-secondary/5 transition-colors"
            >
              {t({ en: "Register Another", ko: "다른 사람 등록" })}
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="bg-surface-container-lowest rounded-2xl card-shadow border border-outline-variant/20 p-8 md:p-10 space-y-6"
        >
          <div>
            <Label>
              {t({ en: "Full Name", ko: "이름" })} <span className="text-error">*</span>
            </Label>
            <input
              name="name"
              required
              className={inputClass}
              placeholder={t({ en: "Your name", ko: "성함" })}
            />
          </div>

          <div>
            <Label>
              {t({ en: "Email", ko: "이메일" })} <span className="text-error">*</span>
            </Label>
            <input
              name="email"
              type="email"
              required
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label>{t({ en: "Phone (optional)", ko: "전화번호 (선택)" })}</Label>
              <input name="phone" className={inputClass} placeholder="+82 10 0000 0000" />
            </div>
            <div>
              <Label>{t({ en: "Participants", ko: "참여 인원" })}</Label>
              <input
                name="participants"
                type="number"
                min={1}
                defaultValue={1}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <Label>{t({ en: "Which days will you join?", ko: "어느 날에 참여하시나요?" })}</Label>
            <div className="flex flex-wrap gap-3">
              {days.map((d) => (
                <label
                  key={d.en}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/60 cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:bg-primary-fixed/30 has-[:checked]:border-primary"
                >
                  <input
                    type="checkbox"
                    name="days"
                    value={d.en}
                    className="rounded text-primary focus:ring-primary/30"
                  />
                  <span className="font-body-md text-body-md text-on-surface">
                    {t(d)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label>{t({ en: "Message (optional)", ko: "메시지 (선택)" })}</Label>
            <textarea
              name="message"
              rows={4}
              className={inputClass + " resize-y"}
              placeholder={t({
                en: "Any prayer requests or notes…",
                ko: "기도 제목이나 전하실 말씀…",
              })}
            />
          </div>

          {status === "error" && (
            <p className="text-error font-body-md text-body-md bg-error-container/50 rounded-lg px-4 py-3">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-primary text-on-primary px-8 py-4 rounded-full font-label-sm text-label-sm font-bold shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting"
              ? t({ en: "Submitting…", ko: "제출 중…" })
              : t({ en: "Complete Registration", ko: "등록 완료하기" })}
          </button>

          <p className="text-center font-label-sm text-label-sm text-on-surface-variant/70">
            {t({
              en: "Event dates and venue are still being confirmed (TBA).",
              ko: "행사 날짜와 장소는 아직 확정 중입니다 (추후 공지).",
            })}
          </p>
        </form>
      )}
    </div>
  );
}
