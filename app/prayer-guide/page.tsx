import type { Metadata } from "next";
import PrayerGuideContent from "./PrayerGuideContent";

export const metadata: Metadata = {
  title: "기도 가이드",
  description:
    "한반도와 열방의 회복을 위한 중보기도 지침 — 일일 주제와 구체적인 기도 제목.",
};

export default function Page() {
  return <PrayerGuideContent />;
}
