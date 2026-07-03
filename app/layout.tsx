import type { Metadata } from "next";
import { Be_Vietnam_Pro, Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "제주 72시간 기도 | Flame Worship",
  description:
    "북한을 위해 중보하는 거룩한 모임 — 제주에서 72시간 연속 예배와 기도. 72 Hours of Prayer in Jeju.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body
        className={`${beVietnam.variable} ${jakarta.variable} ${geist.variable} min-h-full flex flex-col bg-background text-on-background antialiased`}
      >
        <LanguageProvider>
          <TopNav />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
