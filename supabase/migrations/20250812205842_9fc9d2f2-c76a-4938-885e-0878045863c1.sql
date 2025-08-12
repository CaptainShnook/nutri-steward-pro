
-- Make user_id nullable since we want to allow anonymous submissions
ALTER TABLE public.waitlist_submissions 
ALTER COLUMN user_id DROP NOT NULL;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can submit to waitlist" ON public.waitlist_submissions;
DROP POLICY IF EXISTS "Service role can read submissions" ON public.waitlist_submissions;
DROP POLICY IF EXISTS "Service role can update submissions" ON public.waitlist_submissions;

-- Create a simple policy that allows anyone to insert (for anonymous waitlist submissions)
CREATE POLICY "Allow anonymous waitlist submissions" ON public.waitlist_submissions
  FOR INSERT 
  WITH CHECK (true);

-- Allow service role to read all submissions
CREATE POLICY "Service role can read all submissions" ON public.waitlist_submissions
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Allow service role to update all submissions
CREATE POLICY "Service role can update all submissions" ON public.waitlist_submissions
  FOR UPDATE
  USING (auth.role() = 'service_role');
