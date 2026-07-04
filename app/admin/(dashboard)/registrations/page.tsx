"use client";

import { useEffect, useState } from "react";

type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  participants: number;
  days: string[];
  message: string;
  created_at: string;
  file_url?: string | null;
  file_key?: string | null;
};

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [dayFilter, setDayFilter] = useState("ALL");
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  async function fetchRegistrations() {
    try {
      const res = await fetch("/api/admin/registrations");
      if (!res.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
      const json = await res.json();
      if (json.ok) {
        setRegistrations(json.registrations);
      } else {
        throw new Error(json.error || "알 수 없는 에러가 발생했습니다.");
      }
    } catch (err: any) {
      setError(err.message || "서버 통신 오류");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleExportCSV = () => {
    window.location.href = "/api/admin/registrations/export";
  };

  async function handleDelete(id: string) {
    if (!confirm("정말로 이 참가자 등록 정보를 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
        setSelectedReg(null);
      } else {
        alert(json.error || "삭제에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("삭제 중 에러가 발생했습니다.");
    }
  }

  // Filter logic
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reg.phone && reg.phone.includes(searchTerm));

    const matchesDay =
      dayFilter === "ALL" ||
      reg.days?.includes(dayFilter) ||
      (dayFilter !== "All Days" && reg.days?.includes("All Days"));

    return matchesSearch && matchesDay;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-on-surface-variant text-sm">참가자 목록을 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1c1b1b] font-jakarta">
            참가자 등록 정보
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            등록한 모든 신청자 목록을 보고, 검색, 필터링 및 엑셀 내보내기를 할 수 있습니다.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="self-start inline-flex items-center gap-2 bg-[#1b5e20] hover:bg-[#1b5e20]/90 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-md transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            download
          </span>
          <span>CSV 내보내기</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-[#e7e0de] rounded-3xl p-5 shadow-sm flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70">
            search
          </span>
          <input
            type="text"
            placeholder="이름, 이메일, 전화번호 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-sm transition-all"
          />
        </div>

        {/* Filter by Day */}
        <div className="w-full md:w-48">
          <select
            value={dayFilter}
            onChange={(e) => setDayFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-[#faf8f7] border border-[#e7e0de] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-sm cursor-pointer transition-all"
          >
            <option value="ALL">모든 날짜</option>
            <option value="All Days">전체 참석</option>
            <option value="Day 1">1일차</option>
            <option value="Day 2">2일차</option>
            <option value="Day 3">3일차</option>
            <option value="Day 4">4일차</option>
          </select>
        </div>
      </div>

      {/* Registrations List */}
      <div className="bg-white border border-[#e7e0de] rounded-3xl shadow-sm overflow-hidden">
        {error && (
          <div className="p-4 bg-error-container/20 border-b border-error/20 text-error text-sm">
            {error}
          </div>
        )}

        {filteredRegistrations.length === 0 ? (
          <div className="py-20 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl opacity-40">search_off</span>
            <p className="text-base font-bold mt-3">일치하는 결과가 없습니다.</p>
            <p className="text-xs text-on-surface-variant/70 mt-1">검색어나 필터를 변경해 보세요.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#faf8f7] border-b border-[#e7e0de] text-xs font-bold text-on-surface-variant uppercase">
                  <th className="px-6 py-4 font-semibold">이름</th>
                  <th className="px-6 py-4 font-semibold">이메일</th>
                  <th className="px-6 py-4 font-semibold">연락처</th>
                  <th className="px-6 py-4 font-semibold text-center">인원</th>
                  <th className="px-6 py-4 font-semibold">참가 일정</th>
                  <th className="px-6 py-4 font-semibold">등록 날짜</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7e0de]/60 text-sm">
                {filteredRegistrations.map((reg) => (
                  <tr
                    key={reg.id}
                    onClick={() => setSelectedReg(reg)}
                    className="hover:bg-[#faf8f7]/70 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 font-semibold text-[#1c1b1b]">{reg.name}</td>
                    <td className="px-6 py-4 text-[#534341]">{reg.email}</td>
                    <td className="px-6 py-4 text-[#534341]">{reg.phone || "-"}</td>
                    <td className="px-6 py-4 text-center font-bold text-[#1c1b1b]">
                      {reg.participants}명
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {reg.days?.map((day) => (
                          <span
                            key={day}
                            className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold"
                          >
                            {day === "All Days" ? "전체" : day}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">
                      {new Date(reg.created_at).toLocaleString("ko-KR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Drawer (Modal) */}
      {selectedReg && (
        <div className="fixed inset-0 bg-[#0d0402]/60 backdrop-blur-sm z-50 flex justify-end transition-opacity">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-slide-in">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-[#e7e0de]">
              <h2 className="text-xl font-bold text-[#1c1b1b]">참가 신청 상세</h2>
              <button
                onClick={() => setSelectedReg(null)}
                className="p-2 hover:bg-[#faf8f7] rounded-full text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 py-6 space-y-6">
              {/* Name & Date */}
              <div>
                <h3 className="text-2xl font-bold text-[#1c1b1b]">{selectedReg.name}</h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  신청일: {new Date(selectedReg.created_at).toLocaleString("ko-KR")}
                </p>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4 bg-[#faf8f7] p-5 rounded-2xl border border-[#e7e0de]/60">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                    이메일
                  </span>
                  <span className="text-sm font-semibold text-[#1c1b1b] mt-1 break-all select-all">
                    {selectedReg.email}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                    연락처
                  </span>
                  <span className="text-sm font-semibold text-[#1c1b1b] mt-1 select-all">
                    {selectedReg.phone || "-"}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                    참석 인원
                  </span>
                  <span className="text-sm font-bold text-primary mt-1">
                    {selectedReg.participants}명
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                    참가 일정
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedReg.days?.map((day) => (
                      <span
                        key={day}
                        className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold"
                      >
                        {day === "All Days" ? "전체" : day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                  메시지 / 기도제목
                </span>
                <div className="p-5 rounded-2xl border border-[#e7e0de] text-sm text-[#534341] bg-white whitespace-pre-wrap leading-relaxed min-h-[120px]">
                  {selectedReg.message || (
                    <span className="text-on-surface-variant/50 italic">
                      작성된 메시지 또는 기도제목이 없습니다.
                    </span>
                  )}
                </div>
              </div>

              {/* Attachment */}
              {selectedReg.file_url && (
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                    첨부파일
                  </span>
                  <div className="p-4 rounded-2xl border border-[#e7e0de] bg-[#faf8f7] flex flex-col gap-3">
                    {isImage(selectedReg.file_url) ? (
                      <div className="bg-white border border-[#e7e0de] rounded-xl p-2 flex justify-center max-w-full overflow-hidden">
                        <img
                          src={selectedReg.file_url}
                          alt="첨부 이미지"
                          className="max-h-48 rounded-lg object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined">description</span>
                        <span className="text-xs truncate">{getFileName(selectedReg.file_url)}</span>
                      </div>
                    )}
                    <a
                      href={selectedReg.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-primary text-on-primary pl-3.5 pr-4 py-2 rounded-xl font-label-sm text-xs font-bold shadow-sm hover:bg-primary/90 transition-colors cursor-pointer self-start"
                    >
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                      <span>파일 열기 / 다운로드</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Action area */}
              <div className="pt-6 border-t border-[#e7e0de] flex gap-4">
                <button
                  onClick={() => handleDelete(selectedReg.id)}
                  className="w-full bg-error-container/10 hover:bg-error-container/20 text-error font-bold py-3.5 rounded-2xl transition-all cursor-pointer text-center flex justify-center items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  <span>참가자 등록 삭제</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function isImage(url: string | null | undefined): boolean {
  if (!url) return false;
  const cleanUrl = url.split("?")[0].toLowerCase();
  return (
    cleanUrl.endsWith(".jpg") ||
    cleanUrl.endsWith(".jpeg") ||
    cleanUrl.endsWith(".png") ||
    cleanUrl.endsWith(".gif") ||
    cleanUrl.endsWith(".webp")
  );
}

function getFileName(url: string | null | undefined): string {
  if (!url) return "";
  const parts = url.split("/");
  return parts[parts.length - 1].split("?")[0] || "file";
}
