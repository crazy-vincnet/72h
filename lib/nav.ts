import type { Bi } from "@/lib/i18n";

export type NavItem = { href: string; label: Bi };

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: { en: "Prayer Project", ko: "기도 프로젝트" } },
  { href: "/schedule", label: { en: "Schedule", ko: "일정" } },
  { href: "/vision", label: { en: "Vision", ko: "비전" } },
  { href: "/prayer-guide", label: { en: "Prayer Guide", ko: "기도 가이드" } },
];
