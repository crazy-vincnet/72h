-- Add file columns to registrations table
ALTER TABLE public.registrations
ADD COLUMN file_url TEXT,
ADD COLUMN file_key TEXT;
