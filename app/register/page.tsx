import type { Metadata } from "next";
import RegisterContent from "./RegisterContent";

export const metadata: Metadata = {
  title: "등록",
  description: "북한을 위한 72시간 연속 기도에 참여를 등록하세요.",
};

export default function Page() {
  return <RegisterContent />;
}
