"use client";

import { useLang, text, type Bi } from "@/lib/i18n";

// href null = destination not ready yet (rendered as a muted "coming soon"
// label instead of a broken link). Fill in real pages / a mailto later.
const LINKS: { label: Bi; href: string | null }[] = [
  { label: { en: "Privacy Policy", ko: "개인정보 처리방침" }, href: null },
  { label: { en: "Contact Us", ko: "문의하기" }, href: null },
  { label: { en: "Terms of Service", ko: "이용약관" }, href: null },
  { label: { en: "FAQ", ko: "자주 묻는 질문" }, href: null },
];

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-surface-container-lowest w-full py-stack-lg border-t border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="font-headline-md text-headline-md text-primary opacity-80 hover:opacity-100 transition-opacity">
            Flame Worship
          </div>
          <div className="flex flex-wrap justify-center gap-6 font-label-sm text-label-sm">
            {LINKS.map((l) =>
              l.href ? (
                <a
                  key={l.label.en}
                  href={l.href}
                  className="text-on-surface-variant hover:text-primary transition-colors underline opacity-80 hover:opacity-100"
                >
                  {text(l.label, lang)}
                </a>
              ) : (
                <span
                  key={l.label.en}
                  title={text({ en: "Coming soon", ko: "준비 중" }, lang)}
                  className="text-on-surface-variant/50 cursor-default"
                >
                  {text(l.label, lang)}
                </span>
              ),
            )}
          </div>
        </div>
        <div className="font-label-sm text-label-sm text-on-surface opacity-80 text-center">
          © 2026 Flame Worship Jeju.{" "}
          {text(
            { en: "All rights reserved.", ko: "모든 권리 보유." },
            lang,
          )}
        </div>
      </div>
    </footer>
  );
}
