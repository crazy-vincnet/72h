"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "대시보드", icon: "dashboard" },
  { href: "/admin/registrations", label: "참가자 등록 정보", icon: "people" },
  { href: "/admin/schedule", label: "일정 관리", icon: "calendar_month" },
  { href: "/admin/settings", label: "설정", icon: "settings" },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#faf8f7] text-[#1c1b1b] flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#e7e0de] h-screen sticky top-0">
        {/* Brand */}
        <div className="p-6 border-b border-[#e7e0de]">
          <Link href="/admin" className="flex items-center gap-2 group">
            <span className="grid place-items-center w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-md shadow-primary/30">
              <span className="material-symbols-outlined filled" style={{ fontSize: 18 }}>
                local_fire_department
              </span>
            </span>
            <span className="font-bold text-lg text-primary tracking-tight">
              Flame Admin
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                  : "text-[#534341] hover:bg-[#f6efed] hover:text-primary"
              }`}
            >
              <span className={`material-symbols-outlined ${isActive(item.href) ? "filled" : ""}`} style={{ fontSize: 20 }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer info / Logout */}
        <div className="p-4 border-t border-[#e7e0de]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium text-error hover:bg-error-container/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              logout
            </span>
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden bg-white border-b border-[#e7e0de] px-4 py-3 sticky top-0 z-40 flex justify-between items-center">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="grid place-items-center w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary">
            <span className="material-symbols-outlined filled" style={{ fontSize: 18 }}>
              local_fire_department
            </span>
          </span>
          <span className="font-bold text-primary">Flame Admin</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="p-2 text-error hover:bg-error-container/10 rounded-full"
            title="로그아웃"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              logout
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-[#f6efed] rounded-full text-[#1c1b1b]"
            aria-label="메뉴 열기"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[57px] bg-white border-b border-[#e7e0de] shadow-lg z-30 p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "bg-primary text-on-primary"
                  : "text-[#534341] hover:bg-[#f6efed]"
              }`}
            >
              <span className={`material-symbols-outlined ${isActive(item.href) ? "filled" : ""}`} style={{ fontSize: 20 }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
