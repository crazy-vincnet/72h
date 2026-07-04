# Admin Dashboard — Design

**Date:** 2026-07-03
**Project:** Flame 72h prayer relay site (Next.js + InsForge)
**Status:** Approved design — ready for implementation planning

## Overview

Add a password-protected admin dashboard at `/admin` for the event
organizers. It lets them view registrations, see summary stats, search /
filter / export the registration list as CSV, edit the schedule (full CRUD),
and update the YouTube live-stream link.

Delivered in **two phases** (Approach B):

- **Phase 1** — Auth + registrations view + stats + CSV export + live-URL editing.
  Quick, immediately useful; no data migration required beyond a `settings` table.
- **Phase 2** — Schedule CRUD. Requires moving the currently hardcoded schedule
  into the database and refactoring the public schedule page to read from it.

## Goals

- Organizers can log in with a single shared password.
- View, search, filter, and export registrations.
- See at-a-glance stats (total registrations, total participants, per-day counts).
- Edit the live-stream URL without touching code; the public "온라인 라이브 시청"
  button reflects it.
- Add / edit / delete schedule sessions per day without touching code; the public
  schedule page reflects changes.

## Non-Goals

- Multiple admin accounts, roles, or per-user permissions (single shared password).
- Editing registrations (read-only for now).
- Per-banner distinct live URLs (single global live URL).
- Public-facing accounts / attendee login.

## Architecture

### Routes

- `/admin/login` — password entry (public).
- `/admin` — overview / stats (protected).
- `/admin/registrations` — registration list, search, filter, CSV (protected).
- `/admin/schedule` — schedule CRUD (protected, Phase 2).
- `/admin/settings` — live-stream URL and other settings (protected).

### API routes (all under middleware protection except login)

- `POST /api/admin/login` — verify password, issue session cookie.
- `POST /api/admin/logout` — clear session cookie.
- `GET  /api/admin/registrations` — list + aggregate stats.
- `GET  /api/admin/registrations/export` — CSV download.
- `GET  /api/admin/settings` — read settings.
- `PUT  /api/admin/settings` — update settings (e.g. `live_stream_url`).
- `GET  /api/admin/schedule` — all sessions (Phase 2).
- `POST /api/admin/schedule` — create session (Phase 2).
- `PUT  /api/admin/schedule/[id]` — update session (Phase 2).
- `DELETE /api/admin/schedule/[id]` — delete session (Phase 2).

### Auth & route protection

- Login: `POST /api/admin/login` compares the submitted password to
  `ADMIN_PASSWORD` (server-only env) using a **timing-safe comparison**.
- On success, issue a **signed, httpOnly, Secure, SameSite=Lax** session cookie.
  The cookie payload is HMAC-signed with `ADMIN_SESSION_SECRET`; expiry ~7 days.
- On failure: generalized error message + small response delay to slow brute force;
  failures logged.
- `middleware.ts` guards `/admin/*` (except `/admin/login`) and `/api/admin/*`
  (except login): verifies the cookie signature and expiry.
  - Page routes → redirect to `/admin/login` on failure.
  - API routes → `401 { ok: false }` on failure.
- Logout clears the cookie.

### Data access

Because the public `anon` key is INSERT-only on `registrations` (RLS, least
privilege for the public form), the admin API cannot read data with it. Admin
API routes use a **separate server-only InsForge client** authenticated with a
privileged key, `INSFORGE_ADMIN_KEY`, that can read/write `registrations`,
`settings`, and `schedule_sessions`.

> **Infra prerequisite:** obtain the InsForge privileged/service key for project
> `72h` and add it to `.env.local` as `INSFORGE_ADMIN_KEY`. Never expose it to the
> client bundle. Configure via the `insforge-cli` skill.

### New environment variables (all server-only)

| Variable | Purpose |
|----------|---------|
| `ADMIN_PASSWORD` | Shared admin login password |
| `ADMIN_SESSION_SECRET` | HMAC key for signing the session cookie |
| `INSFORGE_ADMIN_KEY` | Privileged InsForge key for reading/writing admin data |

## Data Model (InsForge / Postgres)

### `registrations` (existing — unchanged)

Fields: `name, email, phone, participants, days[], message, created_at`.
Admin adds **read** access via the privileged key.

### `settings` (new — Phase 1)

Simple key-value store.

| Column | Type | Notes |
|--------|------|-------|
| `key` | text | PK, e.g. `live_stream_url` |
| `value` | text | |
| `updated_at` | timestamptz | |

### `schedule_sessions` (new — Phase 2)

Normalized form of the current `Session` type, bilingual columns.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `day` | int | 1–4 |
| `time` | text | e.g. `"10:00 AM"` |
| `duration_en` / `duration_ko` | text | |
| `tag_en` / `tag_ko` | text | |
| `title_en` / `title_ko` | text | |
| `speaker_en` / `speaker_ko` | text | |
| `track` | text | `worship` \| `special` |
| `live` | bool | default false |
| `sort_order` | int | tie-break for same start time |
| `created_at` / `updated_at` | timestamptz | |

### Live URL handling

The current code's per-banner `liveUrl` is always the same value, so it is stored
once as `settings.live_stream_url` (global) and injected into `live` sessions at
render time. Add a per-session column later only if distinct URLs are needed.

### RLS policies

- `registrations`: public read **blocked**; `anon` INSERT only (existing). Admin
  reads via privileged key.
- `settings`, `schedule_sessions`: **public read allowed** (the public schedule
  page must read them); writes restricted to the admin key.

## Phase 1 — Features

### Admin layout

Entry at `/admin` after login. Top/side nav: **Overview · Registrations ·
Schedule · Settings**, logout top-right. Reuses existing design tokens (flame
color, card styles) for a consistent tone.

### Overview / stats — `/admin`

Cards: total registrations · total participants (sum of `participants`) ·
per-day participant counts (Day 1–4) · 5 most recent registrations. Data
aggregated from the registrations endpoint.

### Registrations — `/admin/registrations`

- Table: name · email · phone · participants · days (chips) · message · created.
- Search: name/email substring.
- Filter: by day.
- Row click expands detail (full message, etc.).
- CSV export: `GET /api/admin/registrations/export` → CSV with a UTF-8 BOM so
  Korean opens correctly in Excel. Empty list returns a valid header-only file.

### Settings — `/admin/settings`

- YouTube live link input + save → `PUT /api/admin/settings` (`live_stream_url`).
- Public schedule's "온라인 라이브 시청" button uses this value: remove the
  hardcoded `LIVE_STREAM_URL` in `app/schedule/ScheduleContent.tsx` and inject the
  DB value from the server.

## Phase 2 — Features

### Schedule management — `/admin/schedule`

- Day tabs (Day 1–4) → sessions for that day, grouped by track.
- Add: "Add session" → form (time, duration, tag, title, speaker — each ko/en;
  track; live toggle).
- Edit: click a session card → same form prefilled.
- Delete: confirm dialog, then delete.
- Optimistic update + server reconcile.

### Public schedule page refactor (`app/schedule/`)

- Remove hardcoded `DAYS` / `SPECIAL_SESSIONS` / `worshipBanner`.
- Fetch sessions + live URL in a **server component**, pass to the client
  `ScheduleContent` as props.
- Keep all rendering logic (SessionBlock, hour ruler, glass cards, live button)
  unchanged — only the data source changes from hardcoded to DB.
- Migration: seed the current Day 1–4 sessions into `schedule_sessions` so the
  existing schedule is preserved.

### Time / sorting

Reuse existing `startHour` / `durationHours` helpers, parsing DB `time` /
`duration_en` strings. The add/edit form validates time format for consistency.

## Error Handling & Validation

- Auth middleware failure → page redirect to `/admin/login`; API `401`.
- Expired/tampered cookie → same handling, silent re-login prompt.
- Login failure → generalized message + response delay.
- InsForge errors → logged server-side, client gets `502` / friendly message; no
  keys or raw errors leaked.
- Form validation → re-validated server-side (required fields, time format, track
  enum, day 1–4); client validation not trusted alone.
- CSV → empty list still returns a valid header-only file.
- UX states: loading / empty / error per view (e.g. "등록자가 아직 없습니다");
  success/failure toasts; delete confirmation dialogs.

## Security Notes

- `INSFORGE_ADMIN_KEY` never included in the client bundle (server routes only).
- All admin APIs sit behind middleware; session cookie is httpOnly.

## Verification

- Unit tests for pure functions: cookie sign/verify, CSV serialization, time
  parsing.
- Manual checklist: login/logout, unauthenticated access blocked, registration
  list, CSV download (Korean), live-URL save → public button reflects it,
  schedule CRUD → public page reflects it.
- Post-deploy canary: confirm unauthenticated `/admin` access is blocked.

## Open Prerequisites

1. Obtain and configure `INSFORGE_ADMIN_KEY` (privileged InsForge key).
2. Create `settings` and `schedule_sessions` tables + RLS policies (via
   `insforge-cli`).
3. Choose values for `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`.
