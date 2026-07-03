"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/nav";
import { useLang, text, type Lang } from "@/lib/i18n";

export default function TopNav() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Solidify the bar once the page scrolls past the hero's top edge.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const registerLabel = text({ en: "Register Now", ko: "지금 등록하기" }, lang);

  return (
    <nav
      className={
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out backdrop-blur-xl " +
        (scrolled
          ? "bg-surface/90 border-b border-outline-variant/40 shadow-[0_4px_24px_rgba(59,9,0,0.06)]"
          : "bg-surface/60 border-b border-transparent")
      }
    >
      <div
        className={
          "flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto transition-all duration-300 " +
          (scrolled ? "py-2.5" : "py-4")
        }
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-md shadow-primary/30 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
            <span
              className="material-symbols-outlined filled"
              style={{ fontSize: 20 }}
            >
              local_fire_department
            </span>
          </span>
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
            Flame Worship
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-1 items-center font-body-md text-body-md">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 " +
                (isActive(item.href)
                  ? "text-primary bg-primary-fixed/50 font-semibold"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-variant/40")
              }
            >
              {text(item.label, lang)}
            </Link>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <LangToggle lang={lang} setLang={setLang} />

          <Link
            href="/register"
            className="hidden md:inline-flex items-center gap-1.5 bg-primary text-on-primary pl-4 pr-5 py-2.5 rounded-full font-label-sm text-label-sm font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            <span className="material-symbols-outlined filled" style={{ fontSize: 18 }}>
              local_fire_department
            </span>
            {registerLabel}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden grid place-items-center w-10 h-10 rounded-full text-primary hover:bg-surface-variant/40 transition-colors"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              {open ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out border-t border-outline-variant/30 bg-surface/95 backdrop-blur-xl " +
          (open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-transparent")
        }
      >
        <div className="px-margin-mobile py-4 flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={
                "rounded-xl px-4 py-3 font-body-md text-body-md transition-colors " +
                (isActive(item.href)
                  ? "text-primary font-semibold bg-primary-fixed/40"
                  : "text-on-surface-variant hover:bg-surface-variant/40")
              }
            >
              {text(item.label, lang)}
            </Link>
          ))}
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-1.5 bg-primary text-on-primary px-4 py-3 rounded-full font-label-sm text-label-sm font-bold shadow-md shadow-primary/25"
          >
            <span className="material-symbols-outlined filled" style={{ fontSize: 18 }}>
              local_fire_department
            </span>
            {registerLabel}
          </Link>
        </div>
      </div>
    </nav>
  );
}

/** Segmented EN / KR switch — the active language reads as a raised pill. */
function LangToggle({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const options: { value: Lang; label: string }[] = [
    { value: "ko", label: "KR" },
    { value: "en", label: "EN" },
  ];
  return (
    <div className="flex items-center rounded-full bg-surface-container-high/80 p-0.5 border border-outline-variant/30">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => setLang(o.value)}
          aria-pressed={lang === o.value}
          className={
            "px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-all duration-200 " +
            (lang === o.value
              ? "bg-surface-container-lowest text-primary font-bold shadow-sm"
              : "text-on-surface-variant/70 hover:text-primary")
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
