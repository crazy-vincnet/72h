import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "제주 72시간 기도",
  description:
    "한반도의 회복과 열방을 위해 중보하는 거룩한 모임 — 제주에서 72시간 연속 예배와 기도에 함께하세요.",
};

export default function Page() {
  return <HomeContent />;
}
