
-- Drop the existing restrictive policy that blocks public submissions
DROP POLICY IF EXISTS "No public read access to submissions" ON public.waitlist_submissions;

-- Update the insert policy to allow anonymous submissions
DROP POLICY IF EXISTS "Anyone can submit to waitlist" ON public.waitlist_submissions;

-- Create a new policy that allows anyone to insert waitlist submissions
CREATE POLICY "Anyone can submit to waitlist" ON public.waitlist_submissions
  FOR INSERT 
  WITH CHECK (true);

-- Keep read access restricted (only allow service role access for backend operations)
CREATE POLICY "Service role can read submissions" ON public.waitlist_submissions
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Allow service role to update submissions (for payment status updates)
CREATE POLICY "Service role can update submissions" ON public.waitlist_submissions
  FOR UPDATE
  USING (auth.role() = 'service_role');
