# Flame Worship — 72 Hours Jeju Prayer Project

북한의 회복을 위한 제주 72시간 연속 기도 행사 웹사이트.
A bilingual (Korean-first, English toggle) event site for the 72 Hours of Prayer
in Jeju, built with Next.js and an InsForge backend.

🔗 **Live:** https://7zh8h5k3.insforge.site

---

## Tech Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + TypeScript
- **Tailwind CSS v4** — design tokens in `app/globals.css` (`@theme`)
- **InsForge** — database, registration storage, email
- Fonts via `next/font`: Be Vietnam Pro, Plus Jakarta Sans, Geist

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

### Environment variables

Create `.env.local` (see `.env.example`):

```bash
INSFORGE_URL=https://<appkey>.<region>.insforge.app
INSFORGE_ANON_KEY=anon_xxx          # npx @insforge/cli secrets get ANON_KEY
ORGANIZER_EMAIL=you@example.com     # optional — new-registration notifications
```

These are **server-only** (used by `app/api/register`). Never commit `.env*`.

## Project Structure

```
app/
  layout.tsx            Root layout: fonts, metadata (OG/Twitter), nav, footer
  page.tsx              Server wrappers export per-page metadata; render *Content
  HomeContent.tsx       Home (hero, countdown, vision bento, quick links)
  schedule/             일정 — day selector + session timeline
  vision/               비전 — core values, mission
  prayer-guide/         기도 가이드 — daily themes, intercession points
  register/             등록 — form (client) + metadata wrapper
  api/register/route.ts POST → validates, persists to InsForge, sends emails
  icon.svg              Flame favicon
  robots.ts, sitemap.ts SEO
components/              TopNav, Footer, Hero, Countdown
lib/
  i18n.tsx              Language context (KO default) + text() helper
  event.ts              Event date/venue — PLACEHOLDERS, edit here
  insforge.ts           Server InsForge client (anon key)
  email.ts              Best-effort confirmation/notification emails
  nav.ts                Nav items
migrations/             InsForge SQL migrations
docs/ROADMAP.md         Analysis & prioritized next steps
```

## Editing Content

- **Event date / countdown** — `lib/event.ts`. Set `EVENT_START` and flip
  `EVENT_DATE_CONFIRMED` to `true` to turn the "dates TBA" panel into a live countdown.
- **Schedule / speakers** — `app/schedule/ScheduleContent.tsx` (`DAYS`).
- **Images** — `public/images/`. Swap in real photos (keep the same filenames or
  update the references at the top of each `*Content.tsx`).
- **Text** — bilingual strings live inline as `{ en, ko }`; the active language is
  chosen by `text(value, lang)`.

## Backend (InsForge)

The registration table and its access rules live in `migrations/`.

```bash
npx @insforge/cli db migrations up --all     # apply migrations
npx @insforge/cli db query "SELECT * FROM registrations ORDER BY created_at DESC"
```

Submissions are **insert-only** for the public: anyone can register, but no one can
read/edit them through the API — only an admin (dashboard/CLI) can view them.

## Build & Deploy

```bash
npm run build                                # verify locally first
npx @insforge/cli deployments deploy .       # deploy to InsForge hosting
```

## Next Steps

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for the prioritized backlog (remaining
content, admin view, custom domain, analytics, etc.).
