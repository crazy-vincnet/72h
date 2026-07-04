import type { Metadata } from "next";
import VisionContent from "./VisionContent";

export const metadata: Metadata = {
  title: "비전",
  description:
    "한반도와 열방의 회복을 위한 하나의 불꽃, 하나의 마음 — Flame Worship의 핵심 가치와 사명.",
};

export default function Page() {
  return <VisionContent />;
}
