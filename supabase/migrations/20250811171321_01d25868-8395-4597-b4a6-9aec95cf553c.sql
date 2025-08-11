
-- Create a table to track beta payments
CREATE TABLE public.beta_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  payment_email TEXT NOT NULL,
  amount INTEGER NOT NULL DEFAULT 100, -- $1.00 in cents
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, failed
  waitlist_submission_id UUID REFERENCES public.waitlist_submissions(id),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.beta_payments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to check payment status (needed for thank you page)
CREATE POLICY "Public can read payment status" ON public.beta_payments
  FOR SELECT
  USING (true);

-- Allow inserts for payment creation
CREATE POLICY "Allow payment creation" ON public.beta_payments
  FOR INSERT
  WITH CHECK (true);

-- Allow updates for payment status changes
CREATE POLICY "Allow payment updates" ON public.beta_payments
  FOR UPDATE
  USING (true);

-- Add a payment tracking field to waitlist submissions
ALTER TABLE public.waitlist_submissions 
ADD COLUMN payment_session_id TEXT,
ADD COLUMN has_paid BOOLEAN DEFAULT false,
ADD COLUMN paid_at TIMESTAMPTZ;

-- Create an index for faster lookups
CREATE INDEX idx_beta_payments_session_id ON public.beta_payments(stripe_session_id);
CREATE INDEX idx_beta_payments_email ON public.beta_payments(payment_email);
CREATE INDEX idx_waitlist_payment_session ON public.waitlist_submissions(payment_session_id);
