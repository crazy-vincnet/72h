# Flame Worship — 프로젝트 분석 & 로드맵

> 72 Hours Jeju Prayer Project 웹사이트 현황 분석과 다음 단계 제안.
> 최종 업데이트: 2026-07-03

---

## 1. 현재 아키텍처 스냅샷

| 항목 | 내용 |
|------|------|
| 프레임워크 | Next.js 16 (App Router, Turbopack) + React 19 |
| 스타일 | Tailwind CSS v4 (`@theme` 디자인 토큰, `app/globals.css`) |
| 폰트 | next/font — Be Vietnam Pro / Plus Jakarta Sans / Geist + Material Symbols |
| 백엔드 | InsForge (프로젝트 `72h`, `us-east`) |
| 배포 | InsForge Deployments (내부 Vercel) → https://7zh8h5k3.insforge.site |
| 언어 | 한국어 기본 + 영어 토글 (`lib/i18n.tsx`, localStorage 저장) |

### 페이지 구조
```
/                → 홈 (히어로, 카운트다운, 비전 벤토, 빠른 링크)
/schedule        → 일정 (Day 1/2/3 탭 + 타임라인)
/vision          → 비전 (핵심 가치, 사명 선언문)
/prayer-guide    → 기도 가이드 (일일 주제, 중보 제목, 자료 다운로드)
/register        → 등록 폼
/api/register    → 등록 처리(서버 라우트) → InsForge 저장
```

### 데이터 계층
- 테이블 `public.registrations` (insert-only)
- RLS: 익명 INSERT 허용(내용 검증 포함), SELECT/UPDATE/DELETE 전면 차단 → 관리자만 대시보드/CLI로 열람
- 마이그레이션 2건: `create-registrations`, `harden-registrations-insert-policy`

### 잘 되어 있는 점 (유지)
- 디자인 토큰 기반 일관된 테마, 컴포넌트 재사용(Hero/Countdown/TopNav/Footer)
- 서버 사이드 검증 + DB CHECK 제약 + RLS의 3중 방어
- 반응형 nav, 모바일 메뉴, 스크롤 반응형
- 빌드 클린 통과, 콘솔 에러 없음, 라이브 검증 완료

---

## 2. 우선순위별 다음 단계

### 🔴 P0 — 지금 처리 (위험/데이터 손실 방지)

1. **Git 커밋**
   - 현재 초기 커밋(create-next-app) 하나뿐이고, **모든 실제 작업이 커밋되지 않음**.
   - 실수 한 번(`rm`, 되돌리기)에 전부 날아갈 수 있음. 브랜치 만들고 커밋 필요.

2. **히어로/이미지 교체 (가장 큰 잠재 버그)**
   - 6개 이미지가 목업의 임시 Google CDN(`lh3.googleusercontent.com/aida-public/...`) 링크.
   - 이 주소는 **언젠가 만료 → 사이트 이미지 깨짐**. 정식 이미지를 `public/`(또는 InsForge Storage)에 넣고 `next/image`로 최적화.

3. **행사 날짜 확정 / 카운트다운 정합성**
   - `lib/event.ts`의 `EVENT_START`가 임시값(2026-10-12). 카운트다운이 이 값 기준으로 도는 중.
   - 날짜 미정이면 카운트다운을 "추후 공지"로 숨기거나, 확정 즉시 반영.

### 🟠 P1 — 홍보/오픈 전 필요

4. **등록 데이터 활용 흐름**
   - 지금은 관리자가 CLI/대시보드로만 명단 확인. 실무상 부족.
   - 옵션: (a) InsForge Auth로 보호되는 **관리자 명단 페이지**, (b) **제출자 확인 이메일** + **주최자 알림 이메일**(InsForge Email), (c) CSV 내보내기.

5. **스팸/어뷰즈 방지**
   - 공개 폼이라 정책 검증만으로 대량 자동 제출을 못 막음.
   - 캡차(예: Cloudflare Turnstile) 또는 InsForge 엣지 함수 기반 rate-limit 추가.

6. **SEO & 공유 최적화**
   - Open Graph / Twitter 카드 메타태그(카톡·SNS 공유 미리보기), 정식 favicon/로고, `sitemap.xml`, `robots.txt`.
   - 페이지별 title/description(현재 전 페이지 공통).

7. **콘텐츠 플레이스홀더 채우기**
   - 장소, 강사, 세션 상세(`app/schedule/page.tsx`의 "Speaker: TBA").

8. **비작동 요소 정리**
   - 기도 가이드의 "전체 가이드(PDF)" / "미디어 키트" 버튼 → 실제 파일 연결 또는 숨김.
   - 푸터 링크(개인정보/이용약관/문의/FAQ)가 전부 `#` → 페이지 추가 또는 제거.

### 🟡 P2 — 폴리시 / 확장

9. **i18n 문자열 중앙화**
   - 현재 번역 문자열이 컴포넌트마다 인라인. 딕셔너리(`lib/content.ts` 등)로 모으면 유지보수·검수 쉬움.
   - 병기(한글+영어 동시 노출) 방식을 유지할지, 토글 시 완전 전환만 할지 결정.

10. **렌더링 전략 재검토**
    - i18n 때문에 모든 페이지가 `"use client"`. RSC/SEO 이점 일부 상실.
    - 쿠키 기반 언어 감지로 서버 렌더링 전환 검토(선택). 지금도 동작엔 문제 없음.

11. **접근성(a11y) 점검**
    - 색 대비, `focus-visible` 스타일, `prefers-reduced-motion`(pulse/애니메이션), 이미지 alt 품질, 폼 라벨 연결.

12. **분석(Analytics)**
    - InsForge PostHog 연동으로 방문·등록 전환 추적.

13. **테스트 / 자동 QA**
    - 등록 폼 e2e(Playwright), 빌드 CI. 현재 테스트 없음.

14. **커스텀 도메인**
    - 현재 `insforge.site` 서브도메인. InsForge `domains`로 브랜드 도메인 연결.

15. **문서 정리**
    - `README.md`가 create-next-app 기본값 → 프로젝트 설명/실행/배포 절차로 교체.
    - 이 로드맵을 지속 업데이트.

---

## 3. 추천 실행 순서 (제안)

1. Git 커밋 (P0-1) — 안전 확보
2. 이미지 교체 + 행사 날짜 (P0-2, P0-3) — 사이트 신뢰성
3. 등록 확인 이메일 + 스팸 방지 (P1-4, P1-5) — 오픈 준비 핵심
4. SEO/공유 + 콘텐츠 채우기 (P1-6~8) — 홍보 준비
5. 나머지 폴리시 (P2) — 여유 있을 때

---

## 4. 알려진 이슈 / 메모

- **보안 어드바이저 `system.on_schema_ddl()`**: InsForge 플랫폼 관리 함수(`system` 스키마). 우리가 만든 것이 아니며 수정 금지 대상. 필요 시 InsForge에 문의.
- **환경변수**: `INSFORGE_URL`, `INSFORGE_ANON_KEY`는 서버 전용(`.env.local`, 배포 env). anon 키는 insert 전용 권한이라 노출돼도 데이터 유출 위험 낮음.
- **재배포**: `npm run build` 후 `npx @insforge/cli deployments deploy .`
