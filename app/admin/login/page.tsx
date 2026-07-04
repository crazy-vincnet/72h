"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (response.ok && data.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMsg(data.error || "올바르지 않은 비밀번호입니다.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("로그인 처리 중 에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background radial glow matching the warm primary color */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <span className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/30 mb-4 animate-pulse">
            <span className="material-symbols-outlined filled" style={{ fontSize: 32 }}>
              local_fire_department
            </span>
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-background font-jakarta">
            Flame Worship Admin
          </h1>
          <p className="text-on-surface-variant text-sm mt-2">
            관리자용 비밀번호를 입력해주세요
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white/80 backdrop-blur-xl border border-outline-variant/40 rounded-3xl p-8 shadow-xl shadow-primary/5 space-y-6"
        >
          {errorMsg && (
            <div className="p-4 rounded-xl bg-error-container/20 border border-error/30 text-error-container text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-error" style={{ fontSize: 18 }}>
                error
              </span>
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
              비밀번호 (Password)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-5 py-4 rounded-2xl bg-[#faf8f7] border border-outline-variant/40 text-on-background placeholder-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-4 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="material-symbols-outlined text-sm leading-none">lock_open</span>
                <span>로그인</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
