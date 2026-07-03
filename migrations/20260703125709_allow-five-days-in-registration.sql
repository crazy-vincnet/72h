-- The registration form now offers "All Days" plus Day 1–4 (5 options), so the
-- insert policy's days-array cap of 3 is too tight. Raise it to 5.

DROP POLICY IF EXISTS "public can submit registrations" ON public.registrations;

CREATE POLICY "public can submit registrations" ON public.registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(btrim(name)) BETWEEN 1 AND 200
    AND email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    AND participants BETWEEN 1 AND 1000
    AND (array_length(days, 1) IS NULL OR array_length(days, 1) <= 5)
    AND (message IS NULL OR char_length(message) <= 2000)
  );
