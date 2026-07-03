-- Harden the public registration insert policy.
--
-- Anonymous submission is intentional (public event form, no login), so anon
-- INSERT stays allowed. But `WITH CHECK (true)` accepts any shape of row, so we
-- replace it with a policy that validates the payload — defense-in-depth on top
-- of the column CHECK constraints. Reads/updates/deletes remain fully blocked
-- (no SELECT/UPDATE/DELETE policy or grant exists), so no data is ever exposed.

DROP POLICY IF EXISTS "public can submit registrations" ON public.registrations;

CREATE POLICY "public can submit registrations" ON public.registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(btrim(name)) BETWEEN 1 AND 200
    AND email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    AND participants BETWEEN 1 AND 1000
    AND (array_length(days, 1) IS NULL OR array_length(days, 1) <= 3)
    AND (message IS NULL OR char_length(message) <= 2000)
  );
