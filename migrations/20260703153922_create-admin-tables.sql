-- Create settings and schedule_sessions tables.
-- Public read access is allowed via RLS policies; writes are restricted to admin.

CREATE TABLE public.settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for settings.
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Grant SELECT to anon and authenticated users.
REVOKE ALL ON public.settings FROM anon, authenticated;
GRANT SELECT ON public.settings TO anon, authenticated;

-- Allow public read.
CREATE POLICY "public can read settings" ON public.settings
  FOR SELECT TO anon, authenticated
  USING (true);


CREATE TABLE public.schedule_sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day         INTEGER NOT NULL CHECK (day BETWEEN 1 AND 4),
  time        TEXT NOT NULL,
  duration_en TEXT NOT NULL,
  duration_ko TEXT NOT NULL,
  tag_en      TEXT,
  tag_ko      TEXT,
  title_en    TEXT NOT NULL,
  title_ko    TEXT NOT NULL,
  speaker_en  TEXT,
  speaker_ko  TEXT,
  track       TEXT NOT NULL CHECK (track IN ('worship', 'special')),
  live        BOOLEAN NOT NULL DEFAULT false,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_schedule_sessions_day ON public.schedule_sessions (day);
CREATE INDEX idx_schedule_sessions_sort ON public.schedule_sessions (day, track, sort_order);

-- Enable RLS for schedule_sessions.
ALTER TABLE public.schedule_sessions ENABLE ROW LEVEL SECURITY;

-- Grant SELECT to anon and authenticated users.
REVOKE ALL ON public.schedule_sessions FROM anon, authenticated;
GRANT SELECT ON public.schedule_sessions TO anon, authenticated;

-- Allow public read.
CREATE POLICY "public can read schedule_sessions" ON public.schedule_sessions
  FOR SELECT TO anon, authenticated
  USING (true);

-- Seed initial settings
INSERT INTO public.settings (key, value)
VALUES ('live_stream_url', '#')
ON CONFLICT (key) DO NOTHING;

-- Seed initial schedule_sessions
-- Day 1
INSERT INTO public.schedule_sessions (day, time, duration_en, duration_ko, tag_en, tag_ko, title_en, title_ko, speaker_en, speaker_ko, track, live, sort_order)
VALUES
  (1, '10:00 AM', '14 Hours', '온종일', 'Continuous Worship', '연속 예배', 'Flame 72-Hour Worship — Day 1', 'Flame 72시간 예배 1일차', 'Everyone together', '모두 함께', 'worship', true, 0),
  (1, '10:00 AM', '3 Hours', '3시간', 'Opening Worship', '오프닝 예배', 'Ignite', 'Ignite', 'Led by Vincent', '인도: Vincent', 'special', false, 1),
  (1, '1:00 PM', '1 Hour', '1시간', 'Meal', '식사', 'Lunch', '점심', 'Flame Worship', 'Flame Worship', 'special', false, 2),
  (1, '4:00 PM', '1 Hour', '1시간', 'Sharing', '나눔', '1st Sharing', '1차 나눔', 'Flame Worship', 'Flame Worship', 'special', false, 3),
  (1, '6:00 PM', '1 Hour', '1시간', 'Meal', '식사', 'Dinner', '저녁', 'Flame Worship', 'Flame Worship', 'special', false, 4),
  (1, '8:00 PM', '1 Hour', '1시간', 'Sharing', '나눔', '2nd Sharing', '2차 나눔', 'Flame Worship', 'Flame Worship', 'special', false, 5),
  (1, '11:00 PM', '1 Hour', '1시간', 'Prayer', '기도', 'Corporate Prayer', '통성기도', 'Flame Worship', 'Flame Worship', 'special', false, 6);

-- Day 2
INSERT INTO public.schedule_sessions (day, time, duration_en, duration_ko, tag_en, tag_ko, title_en, title_ko, speaker_en, speaker_ko, track, live, sort_order)
VALUES
  (2, '12:00 AM', '24 Hours', '온종일', 'Continuous Worship', '연속 예배', 'Flame 72-Hour Worship — Day 2', 'Flame 72시간 예배 2일차', 'Everyone together', '모두 함께', 'worship', true, 0),
  (2, '5:00 AM', '1 Hour', '1시간', 'Meditation', '묵상', 'Corporate Word Meditation', '공동말씀묵상', 'Flame Worship', 'Flame Worship', 'special', false, 1),
  (2, '7:00 AM', '1 Hour', '1시간', 'Meal', '식사', 'Breakfast', '아침', 'Flame Worship', 'Flame Worship', 'special', false, 2),
  (2, '1:00 PM', '1 Hour', '1시간', 'Meal', '식사', 'Lunch', '점심', 'Flame Worship', 'Flame Worship', 'special', false, 3),
  (2, '4:00 PM', '1 Hour', '1시간', 'Sharing', '나눔', '1st Sharing', '1차 나눔', 'Flame Worship', 'Flame Worship', 'special', false, 4),
  (2, '6:00 PM', '1 Hour', '1시간', 'Meal', '식사', 'Dinner', '저녁', 'Flame Worship', 'Flame Worship', 'special', false, 5),
  (2, '8:00 PM', '1 Hour', '1시간', 'Sharing', '나눔', '2nd Sharing', '2차 나눔', 'Flame Worship', 'Flame Worship', 'special', false, 6),
  (2, '11:00 PM', '1 Hour', '1시간', 'Prayer', '기도', 'Corporate Prayer', '통성기도', 'Flame Worship', 'Flame Worship', 'special', false, 7);

-- Day 3
INSERT INTO public.schedule_sessions (day, time, duration_en, duration_ko, tag_en, tag_ko, title_en, title_ko, speaker_en, speaker_ko, track, live, sort_order)
VALUES
  (3, '12:00 AM', '24 Hours', '온종일', 'Continuous Worship', '연속 예배', 'Flame 72-Hour Worship — Day 3', 'Flame 72시간 예배 3일차', 'Everyone together', '모두 함께', 'worship', true, 0),
  (3, '5:00 AM', '1 Hour', '1시간', 'Meditation', '묵상', 'Corporate Word Meditation', '공동말씀묵상', 'Flame Worship', 'Flame Worship', 'special', false, 1),
  (3, '7:00 AM', '1 Hour', '1시간', 'Meal', '식사', 'Breakfast', '아침', 'Flame Worship', 'Flame Worship', 'special', false, 2),
  (3, '1:00 PM', '1 Hour', '1시간', 'Meal', '식사', 'Lunch', '점심', 'Flame Worship', 'Flame Worship', 'special', false, 3),
  (3, '4:00 PM', '1 Hour', '1시간', 'Sharing', '나눔', '1st Sharing', '1차 나눔', 'Flame Worship', 'Flame Worship', 'special', false, 4),
  (3, '6:00 PM', '1 Hour', '1시간', 'Meal', '식사', 'Dinner', '저녁', 'Flame Worship', 'Flame Worship', 'special', false, 5),
  (3, '8:00 PM', '1 Hour', '1시간', 'Sharing', '나눔', '2nd Sharing', '2차 나눔', 'Flame Worship', 'Flame Worship', 'special', false, 6),
  (3, '11:00 PM', '1 Hour', '1시간', 'Prayer', '기도', 'Corporate Prayer', '통성기도', 'Flame Worship', 'Flame Worship', 'special', false, 7);

-- Day 4
INSERT INTO public.schedule_sessions (day, time, duration_en, duration_ko, tag_en, tag_ko, title_en, title_ko, speaker_en, speaker_ko, track, live, sort_order)
VALUES
  (4, '12:00 AM', '10 Hours', '온종일', 'Continuous Worship', '연속 예배', 'Flame 72-Hour Worship — Day 4', 'Flame 72시간 예배 4일차', 'Everyone together', '모두 함께', 'worship', true, 0),
  (4, '5:00 AM', '1 Hour', '1시간', 'Meditation', '묵상', 'Corporate Word Meditation', '공동말씀묵상', 'Flame Worship', 'Flame Worship', 'special', false, 1),
  (4, '7:00 AM', '1 Hour', '1시간', 'Meal', '식사', 'Breakfast', '아침', 'Flame Worship', 'Flame Worship', 'special', false, 2),
  (4, '8:00 AM', '2 Hours', '2시간', 'Closing Worship', '마무리 예배', 'Sending Worship', '파송 예배', 'Led by Janet', '인도: Janet', 'special', false, 3);
