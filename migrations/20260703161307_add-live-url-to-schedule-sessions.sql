-- Add live_url column to schedule_sessions
ALTER TABLE public.schedule_sessions
ADD COLUMN live_url TEXT;
