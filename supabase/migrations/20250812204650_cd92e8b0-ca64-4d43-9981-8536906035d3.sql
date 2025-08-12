
-- Create table to track beta payments
CREATE TABLE public.beta_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  waitlist_submission_id UUID REFERENCES public.waitlist_submissions(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  amount INTEGER NOT NULL DEFAULT 100, -- $1.00 in cents
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, failed
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.beta_payments ENABLE ROW LEVEL SECURITY;

-- Allow reading payment status
CREATE POLICY "Allow reading beta payments" ON public.beta_payments
  FOR SELECT USING (true);

-- Allow inserting payment records (for edge functions)
CREATE POLICY "Allow inserting beta payments" ON public.beta_payments
  FOR INSERT WITH CHECK (true);

-- Allow updating payment status (for edge functions)
CREATE POLICY "Allow updating beta payments" ON public.beta_payments
  FOR UPDATE USING (true);

-- Add payment tracking to waitlist submissions
ALTER TABLE public.waitlist_submissions 
ADD COLUMN has_paid BOOLEAN DEFAULT false,
ADD COLUMN payment_session_id TEXT;
