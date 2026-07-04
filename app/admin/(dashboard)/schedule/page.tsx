"use client";

import { useEffect, useState } from "react";

type Session = {
  id: string;
  day: number;
  time: string;
  duration_en: string;
  duration_ko: string;
  tag_en: string;
  tag_ko: string;
  title_en: string;
  title_ko: string;
  speaker_en: string;
  speaker_ko: string;
  track: "worship" | "special";
  live: boolean;
  sort_order: number;
  live_url?: string | null;
};

const INITIAL_FORM: Omit<Session, "id"> = {
  day: 1,
  time: "",
  duration_en: "",
  duration_ko: "",
  tag_en: "",
  tag_ko: "",
  title_en: "",
  title_ko: "",
  speaker_en: "",
  speaker_ko: "",
  track: "special",
  live: false,
  sort_order: 0,
  live_url: "",
};

export default function AdminSchedulePage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [form, setForm] = useState<Omit<Session, "id">>(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchSessions() {
    try {
      const res = await fetch("/api/admin/schedule");
      if (!res.ok) throw new Error("일정 데이터를 가져오지 못했습니다.");
      const json = await res.json();
      if (json.ok) {
        setSessions(json.sessions);
      } else {
        throw new Error(json.error || "알 수 없는 에러");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "서버 통신 실패");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSessions();
  }, []);

  function handleOpenAdd() {
    setEditingSession(null);
    setForm({ ...INITIAL_FORM, day: activeDay });
    setErrorMsg("");
    setModalOpen(true);
  }

  function handleOpenEdit(session: Session) {
    setEditingSession(session);
    setForm({
      day: session.day,
      time: session.time,
      duration_en: session.duration_en,
      duration_ko: session.duration_ko,
      tag_en: session.tag_en || "",
      tag_ko: session.tag_ko || "",
      title_en: session.title_en,
      title_ko: session.title_ko,
      speaker_en: session.speaker_en || "",
      speaker_ko: session.speaker_ko || "",
      track: session.track,
      live: session.live,
      sort_order: session.sort_order,
      live_url: session.live_url || "",
    });
    setErrorMsg("");
    setModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("정말로 이 세션을 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/admin/schedule/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setSessions((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert(json.error || "삭제에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("삭제 중 에러가 발생했습니다.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      const url = editingSession
        ? `/api/admin/schedule/${editingSession.id}`
        : "/api/admin/schedule";
      const method = editingSession ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (res.ok && json.ok) {
        await fetchSessions();
        setModalOpen(false);
      } else {
        setErrorMsg(json.error || "일정 저장에 실패했습니다.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "서ver 통신 중 에러가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-on-surface-variant text-sm">일정 목록을 불러오는 중입니다...</p>
      </div>
    );
  }

  const daySessions = sessions.filter((s) => s.day === activeDay);
  const worshipSessions = daySessions.filter((s) => s.track === "worship");
  const specialSessions = daySessions.filter((s) => s.track === "special");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1c1b1b] font-jakarta">
            일정 관리
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            일차별 예배 및 특별 프로그램 일정을 실시간으로 추가, 수정, 삭제합니다.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="self-start inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-on-primary px-5 py-3 rounded-2xl text-sm font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm leading-none">add</span>
          <span>세션 추가</span>
        </button>
      </div>

      {/* Day Tabs */}
      <div className="flex border-b border-[#e7e0de] gap-4">
        {[1, 2, 3, 4].map((d) => (
          <button
            key={d}
            onClick={() => setActiveDay(d)}
            className={`pb-4 px-2 font-bold text-sm border-b-2 transition-all cursor-pointer ${
              activeDay === d
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant/70 hover:text-primary"
            }`}
          >
            Day {d} 일정
          </button>
        ))}
      </div>

      {/* Grid of tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Worship Track */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#1c1b1b] flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full" />
            전체 예배 스케줄 (Worship)
          </h2>
          <div className="space-y-3">
            {worshipSessions.length === 0 ? (
              <div className="bg-white border border-[#e7e0de]/80 rounded-2xl p-6 text-center text-on-surface-variant/60 text-sm">
                예배 세션이 없습니다.
              </div>
            ) : (
              worshipSessions.map((s) => (
                <SessionCard key={s.id} session={s} onEdit={handleOpenEdit} onDelete={handleDelete} />
              ))
            )}
          </div>
        </div>

        {/* Special Track */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#1c1b1b] flex items-center gap-2">
            <span className="w-1.5 h-6 bg-secondary-fixed-dim rounded-full" />
            특별 스케줄 (Special)
          </h2>
          <div className="space-y-3">
            {specialSessions.length === 0 ? (
              <div className="bg-white border border-[#e7e0de]/80 rounded-2xl p-6 text-center text-on-surface-variant/60 text-sm">
                특별 세션이 없습니다.
              </div>
            ) : (
              specialSessions.map((s) => (
                <SessionCard key={s.id} session={s} onEdit={handleOpenEdit} onDelete={handleDelete} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Drawer */}
      {modalOpen && (
        <div className="fixed inset-0 bg-[#0d0402]/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-slide-in">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-[#e7e0de]">
              <h2 className="text-xl font-bold text-[#1c1b1b]">
                {editingSession ? "세션 편집" : "새 세션 추가"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 hover:bg-[#faf8f7] rounded-full text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="flex-1 py-6 space-y-6">
              {errorMsg && (
                <div className="p-4 bg-error-container/10 border border-error/20 rounded-xl text-error text-sm">
                  {errorMsg}
                </div>
              )}

              {/* Day / Time / Track / Live */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    일차 (Day)
                  </label>
                  <select
                    value={form.day}
                    onChange={(e) => setForm({ ...form, day: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {[1, 2, 3, 4].map((d) => (
                      <option key={d} value={d}>
                        Day {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    시작 시간 (e.g. 10:00 AM)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    placeholder="예: 10:00 AM"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    트랙 (Track)
                  </label>
                  <select
                    value={form.track}
                    onChange={(e) =>
                      setForm({ ...form, track: e.target.value as "worship" | "special" })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="worship">Worship</option>
                    <option value="special">Special</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    우선순위 정렬 (sort_order)
                  </label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 p-4 rounded-2xl bg-[#faf8f7] border border-[#e7e0de]">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.live}
                    onChange={(e) => setForm({ ...form, live: e.target.checked })}
                    className="rounded text-primary focus:ring-primary/30"
                  />
                  <span className="text-sm font-semibold text-[#1c1b1b]">Live 배지 표시</span>
                </label>

                {form.live && (
                  <div className="pt-2 border-t border-[#e7e0de]">
                    <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                      개별 라이브 스트리밍 URL (선택)
                    </label>
                    <input
                      type="url"
                      value={form.live_url || ""}
                      onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <p className="text-[10px] text-on-surface-variant/70 mt-1">
                      미지정 시 기본 설정에 등록된 글로벌 유튜브 생중계 링크를 사용합니다.
                    </p>
                  </div>
                )}
              </div>

              {/* Title KO/EN */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    제목 (KO)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title_ko}
                    onChange={(e) => setForm({ ...form, title_ko: e.target.value })}
                    placeholder="세션 제목"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    제목 (EN)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title_en}
                    onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                    placeholder="Session Title"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Tag KO/EN */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    태그 (KO)
                  </label>
                  <input
                    type="text"
                    value={form.tag_ko}
                    onChange={(e) => setForm({ ...form, tag_ko: e.target.value })}
                    placeholder="예: 여는 예배, 나눔"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    태그 (EN)
                  </label>
                  <input
                    type="text"
                    value={form.tag_en}
                    onChange={(e) => setForm({ ...form, tag_en: e.target.value })}
                    placeholder="e.g. Meal, Sharing"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Duration KO/EN */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    진행 시간 (KO)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.duration_ko}
                    onChange={(e) => setForm({ ...form, duration_ko: e.target.value })}
                    placeholder="예: 2시간, 온종일"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    진행 시간 (EN)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.duration_en}
                    onChange={(e) => setForm({ ...form, duration_en: e.target.value })}
                    placeholder="e.g. 2 Hours, 24 Hours"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Speaker KO/EN */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    인도자/강사 (KO)
                  </label>
                  <input
                    type="text"
                    value={form.speaker_ko}
                    onChange={(e) => setForm({ ...form, speaker_ko: e.target.value })}
                    placeholder="예: 인도: Vincent"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    인도자/강사 (EN)
                  </label>
                  <input
                    type="text"
                    value={form.speaker_en}
                    onChange={(e) => setForm({ ...form, speaker_en: e.target.value })}
                    placeholder="e.g. Led by Vincent"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-[#e7e0de]">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary hover:bg-primary/90 text-on-primary font-bold py-3.5 rounded-2xl shadow-lg shadow-primary/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  {saving ? "저장 중..." : "저장"}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-[#f6efed] hover:bg-[#e7e0de] text-[#1c1b1b] font-bold py-3.5 rounded-2xl transition-all cursor-pointer text-center"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SessionCard({
  session,
  onEdit,
  onDelete,
}: {
  session: Session;
  onEdit: (s: Session) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white border border-[#e7e0de] rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
      <div>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-primary">{session.time}</span>
            <span className="text-xs text-on-surface-variant/80">({session.duration_ko})</span>
            {session.live && (
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                Live
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-on-surface-variant bg-[#faf8f7] px-2 py-1 rounded-lg">
            순서: {session.sort_order}
          </span>
        </div>

        <div className="mt-3">
          {session.tag_ko && (
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#faf8f7] border border-[#e7e0de] text-[10px] font-bold text-on-surface-variant mb-2">
              {session.tag_ko}
            </span>
          )}
          <h3 className="font-bold text-base text-[#1c1b1b]">{session.title_ko}</h3>
          <p className="text-xs text-on-surface-variant mt-1">{session.speaker_ko || "강사 정보 없음"}</p>
          {session.live_url && (
            <div className="mt-2 flex items-center gap-1 text-[11px] text-primary truncate max-w-full">
              <span className="material-symbols-outlined text-xs">link</span>
              <a href={session.live_url} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                {session.live_url}
              </a>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-[#e7e0de]/40 grid grid-cols-2 gap-2 text-xs text-on-surface-variant/80">
          <div>
            <span className="font-bold block text-[10px] uppercase text-on-surface-variant/60">English Title</span>
            <span className="mt-0.5 block">{session.title_en}</span>
          </div>
          <div>
            <span className="font-bold block text-[10px] uppercase text-on-surface-variant/60">English Speaker</span>
            <span className="mt-0.5 block">{session.speaker_en || "-"}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t border-[#e7e0de]/60">
        <button
          onClick={() => onEdit(session)}
          className="flex-1 inline-flex items-center justify-center gap-1 bg-[#faf8f7] hover:bg-[#f6efed] text-[#534341] border border-[#e7e0de] py-2 rounded-xl text-xs font-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">edit</span>
          <span>수정</span>
        </button>
        <button
          onClick={() => onDelete(session.id)}
          className="flex-1 inline-flex items-center justify-center gap-1 bg-error-container/10 hover:bg-error-container/20 text-error py-2 rounded-xl text-xs font-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
          <span>삭제</span>
        </button>
      </div>
    </div>
  );
}
