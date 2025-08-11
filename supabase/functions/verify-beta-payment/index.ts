
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      throw new Error("Missing session ID");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create Supabase client with service role
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Get current payment record
    const { data: payment, error: fetchError } = await supabase
      .from('beta_payments')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single();

    if (fetchError) {
      console.error('Failed to fetch payment:', fetchError);
      throw new Error('Payment record not found');
    }

    // Update payment status based on Stripe session
    let newStatus = payment.status;
    let paidAt = payment.paid_at;

    if (session.payment_status === 'paid' && payment.status !== 'paid') {
      newStatus = 'paid';
      paidAt = new Date().toISOString();

      // Update payment record
      const { error: updateError } = await supabase
        .from('beta_payments')
        .update({
          status: 'paid',
          paid_at: paidAt,
          stripe_payment_intent_id: session.payment_intent,
          updated_at: new Date().toISOString()
        })
        .eq('stripe_session_id', sessionId);

      if (updateError) {
        console.error('Failed to update payment:', updateError);
      }

      // Update waitlist submission
      if (payment.waitlist_submission_id) {
        const { error: submissionError } = await supabase
          .from('waitlist_submissions')
          .update({
            has_paid: true,
            paid_at: paidAt
          })
          .eq('id', payment.waitlist_submission_id);

        if (submissionError) {
          console.error('Failed to update submission:', submissionError);
        }
      }
    } else if (session.payment_status === 'unpaid' || session.payment_status === 'canceled') {
      newStatus = 'failed';
    }

    return new Response(JSON.stringify({
      status: newStatus,
      paid_at: paidAt,
      amount: payment.amount,
      payment_email: payment.payment_email
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
