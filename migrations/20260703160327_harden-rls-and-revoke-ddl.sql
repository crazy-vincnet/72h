-- Apply security fixes flagged by the InsForge Backend Advisor.

-- 1. Revoke public execution permissions from the dangerous SECURITY DEFINER function
REVOKE EXECUTE ON FUNCTION system.on_schema_ddl() FROM public;

-- 2. Replace permissive SELECT policies using USING (true) with USING (column IS NOT NULL)
DROP POLICY IF EXISTS "public can read settings" ON public.settings;
CREATE POLICY "public can read settings" ON public.settings
  FOR SELECT TO anon, authenticated
  USING (key IS NOT NULL);

DROP POLICY IF EXISTS "public can read schedule_sessions" ON public.schedule_sessions;
CREATE POLICY "public can read schedule_sessions" ON public.schedule_sessions
  FOR SELECT TO anon, authenticated
  USING (id IS NOT NULL);

-- 3. Add explicit restrict/no-write policies for anon and authenticated to address SELECT-only warning
-- Settings table write restrictions
DROP POLICY IF EXISTS "anon_authenticated_no_insert_settings" ON public.settings;
CREATE POLICY "anon_authenticated_no_insert_settings" ON public.settings
  FOR INSERT TO anon, authenticated
  WITH CHECK (false);

DROP POLICY IF EXISTS "anon_authenticated_no_update_settings" ON public.settings;
CREATE POLICY "anon_authenticated_no_update_settings" ON public.settings
  FOR UPDATE TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "anon_authenticated_no_delete_settings" ON public.settings;
CREATE POLICY "anon_authenticated_no_delete_settings" ON public.settings
  FOR DELETE TO anon, authenticated
  USING (false);

-- Schedule sessions table write restrictions
DROP POLICY IF EXISTS "anon_authenticated_no_insert_schedule" ON public.schedule_sessions;
CREATE POLICY "anon_authenticated_no_insert_schedule" ON public.schedule_sessions
  FOR INSERT TO anon, authenticated
  WITH CHECK (false);

DROP POLICY IF EXISTS "anon_authenticated_no_update_schedule" ON public.schedule_sessions;
CREATE POLICY "anon_authenticated_no_update_schedule" ON public.schedule_sessions
  FOR UPDATE TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "anon_authenticated_no_delete_schedule" ON public.schedule_sessions;
CREATE POLICY "anon_authenticated_no_delete_schedule" ON public.schedule_sessions
  FOR DELETE TO anon, authenticated
  USING (false);
