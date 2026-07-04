"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  participants: number;
  days: string[];
  message: string;
  created_at: string;
};

type Stats = {
  totalRegistrations: number;
  totalParticipants: number;
  perDayParticipants: Record<number, number>;
};

export default function AdminOverviewPage() {
  const [data, setData] = useState<{ registrations: Registration[]; stats: Stats } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchStats() {
    try {
      const res = await fetch("/api/admin/registrations");
      if (!res.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
      const json = await res.json();
      if (json.ok) {
        setData({
          registrations: json.registrations,
          stats: json.stats,
        });
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
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-on-surface-variant text-sm">데이터를 분석하는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-3xl bg-error-container/10 border border-error/20 text-center max-w-lg mx-auto mt-10">
        <span className="material-symbols-outlined text-error text-4xl mb-2">error</span>
        <h2 className="text-lg font-bold text-error">에러가 발생했습니다</h2>
        <p className="text-on-surface-variant text-sm mt-1">{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            setError("");
            fetchStats();
          }}
          className="mt-4 px-6 py-2 bg-primary text-on-primary rounded-full text-sm font-semibold cursor-pointer"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const { stats, registrations } = data!;
  const recentRegistrations = registrations.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-[#1c1b1b] font-jakarta">
          대시보드 개요
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          72시간 기도 릴레이 신청 현황을 한눈에 확인합니다.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Registrations */}
        <div className="bg-white border border-[#e7e0de] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                총 신청 수
              </p>
              <h3 className="text-3xl font-extrabold text-[#1c1b1b] mt-2 tabular-nums">
                {stats.totalRegistrations} 건
              </h3>
            </div>
            <span className="p-3 rounded-2xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined">assignment</span>
            </span>
          </div>
        </div>

        {/* Total Participants */}
        <div className="bg-white border border-[#e7e0de] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                총 참석 인원
              </p>
              <h3 className="text-3xl font-extrabold text-[#1c1b1b] mt-2 tabular-nums">
                {stats.totalParticipants} 명
              </h3>
            </div>
            <span className="p-3 rounded-2xl bg-secondary-fixed-dim/20 text-primary">
              <span className="material-symbols-outlined">people</span>
            </span>
          </div>
        </div>

        {/* Daily Breakdown Header */}
        <div className="bg-white border border-[#e7e0de] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-3">
              날짜별 참석 비율
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((d) => (
                <div key={d} className="text-center">
                  <div className="text-[10px] font-bold text-on-surface-variant">{d}일차</div>
                  <div className="text-lg font-bold text-primary mt-1 tabular-nums">
                    {stats.perDayParticipants[d] || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="bg-white border border-[#e7e0de] rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-[#1c1b1b]">최근 등록자 (최근 5건)</h2>
          <Link
            href="/admin/registrations"
            className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>전체 보기</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {recentRegistrations.length === 0 ? (
          <div className="py-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl opacity-40">inbox</span>
            <p className="text-sm mt-2">최근 등록된 참가자가 없습니다.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#e7e0de] text-xs font-bold text-on-surface-variant uppercase">
                  <th className="pb-3 font-semibold">이름</th>
                  <th className="pb-3 font-semibold">이메일</th>
                  <th className="pb-3 font-semibold">연락처</th>
                  <th className="pb-3 font-semibold text-center">인원</th>
                  <th className="pb-3 font-semibold">참가일</th>
                  <th className="pb-3 font-semibold">등록 시간</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7e0de]/60 text-sm">
                {recentRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-[#faf8f7]/50 transition-colors">
                    <td className="py-4 font-semibold text-[#1c1b1b]">{reg.name}</td>
                    <td className="py-4 text-[#534341]">{reg.email}</td>
                    <td className="py-4 text-[#534341]">{reg.phone || "-"}</td>
                    <td className="py-4 text-center font-bold text-[#1c1b1b]">{reg.participants}명</td>
                    <td className="py-4">
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
                    <td className="py-4 text-xs text-on-surface-variant">
                      {new Date(reg.created_at).toLocaleString("ko-KR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
