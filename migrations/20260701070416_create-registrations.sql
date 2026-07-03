-- Event registrations for the 72 Hours Jeju Prayer Project.
-- Public form: anyone may submit (INSERT) without an account.
-- Nobody may read/update/delete through the API — only project_admin
-- (dashboard / CLI) can view submissions.

CREATE TABLE public.registrations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  email        TEXT NOT NULL CHECK (email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  phone        TEXT CHECK (phone IS NULL OR char_length(phone) <= 50),
  participants INTEGER NOT NULL DEFAULT 1 CHECK (participants BETWEEN 1 AND 1000),
  days         TEXT[] NOT NULL DEFAULT '{}',
  message      TEXT CHECK (message IS NULL OR char_length(message) <= 2000),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_registrations_created_at ON public.registrations (created_at DESC);
CREATE INDEX idx_registrations_email ON public.registrations (email);

-- Enable RLS and lock the table down.
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Remove the broad default DML privileges; this table only accepts inserts.
REVOKE SELECT, UPDATE, DELETE ON public.registrations FROM anon, authenticated;

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.registrations TO anon, authenticated;

-- Anyone may submit a registration. No SELECT/UPDATE/DELETE policy exists,
-- so submissions are never readable or mutable through the public API.
CREATE POLICY "public can submit registrations" ON public.registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
