-- Run this once in the Supabase SQL Editor
-- Creates the user_progress table with Row Level Security

CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  practice_sessions INT DEFAULT 0,
  mock_exams_taken INT DEFAULT 0,
  reading_scores INT[] DEFAULT '{}',
  listening_scores INT[] DEFAULT '{}',
  writing_submissions INT DEFAULT 0,
  speaking_attempts INT DEFAULT 0,
  last_reading_attempt JSONB,
  last_listening_attempt JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Users can only read and write their own row
CREATE POLICY "own_row" ON public.user_progress
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Auto-update updated_at on upsert
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
