"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ko";

/** A bilingual string: pick the active language with `text(value, lang)`. */
export type Bi = { en: string; ko: string };

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "flame72-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Korean is the primary language; users can switch to English via the toggle.
  const [lang, setLangState] = useState<Lang>("ko");

  // Restore the user's choice on mount (client-only).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "ko") {
      setLangState(saved);
      document.documentElement.lang = saved === "ko" ? "ko" : "en";
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l === "ko" ? "ko" : "en";
  };

  const toggle = () => setLang(lang === "en" ? "ko" : "en");

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}

/** Resolve a bilingual value (or plain string) for the active language. */
export function text(value: Bi | string, lang: Lang): string {
  if (typeof value === "string") return value;
  return value[lang];
}
