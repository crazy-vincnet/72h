"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [liveStreamUrl, setLiveStreamUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) throw new Error("설정 데이터를 가져오지 못했습니다.");
      const json = await res.json();
      if (json.ok) {
        setLiveStreamUrl(json.settings.live_stream_url || "");
      } else {
        throw new Error(json.error || "알 수 없는 에러");
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "서버 통신 실패" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ live_stream_url: liveStreamUrl }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setMessage({ type: "success", text: "설정이 성공적으로 저장되었습니다." });
      } else {
        throw new Error(json.error || "설정 저장 중 오류가 발생했습니다.");
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "저장 오류" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-on-surface-variant text-sm">설정을 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-[#1c1b1b] font-jakarta">
          설정 관리
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          연속 예배 실시간 스트리밍 유튜브 링크 등 글로벌 웹사이트 설정을 편집합니다.
        </p>
      </div>

      <div className="max-w-2xl bg-white border border-[#e7e0de] rounded-3xl p-8 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          {message && (
            <div
              className={`p-4 rounded-xl border text-sm flex items-center gap-2 ${
                message.type === "success"
                  ? "bg-success-container/10 border-success/30 text-success-container"
                  : "bg-error-container/10 border-error/30 text-error-container"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                {message.type === "success" ? "check_circle" : "error"}
              </span>
              <span>{message.text}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-[#1c1b1b] mb-2">
              유튜브 라이브 스트리밍 URL
            </label>
            <input
              type="text"
              value={liveStreamUrl}
              onChange={(e) => setLiveStreamUrl(e.target.value)}
              placeholder="예: https://www.youtube.com/watch?v=..."
              required
              className="w-full px-5 py-3.5 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-[#1c1b1b] placeholder-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            />
            <p className="text-xs text-on-surface-variant/70 mt-2 leading-relaxed">
              * 입력된 유튜브 라이브 링크는 사용자 화면 일정 페이지의 <strong>온라인 라이브 시청</strong> 버튼에 실시간 반영됩니다.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-on-primary font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-primary/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <span className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="material-symbols-outlined text-sm leading-none">save</span>
                <span>설정 저장</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
