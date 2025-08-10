
-- Create waitlist_submissions table to store form data
CREATE TABLE public.waitlist_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  problem TEXT,
  feature TEXT,
  goals TEXT,
  pricing TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  referral_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) - allow public inserts for waitlist
ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert waitlist submissions
CREATE POLICY "Anyone can submit to waitlist" 
  ON public.waitlist_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to prevent reading submissions (privacy)
CREATE POLICY "No public read access to submissions" 
  ON public.waitlist_submissions 
  FOR SELECT 
  USING (false);
