
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

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
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Initialize Supabase
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const { waitlistSubmissionId } = await req.json();

    if (!waitlistSubmissionId) {
      return new Response(
        JSON.stringify({ error: "waitlistSubmissionId is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Get the waitlist submission to include user details
    const { data: submission, error: submissionError } = await supabase
      .from('waitlist_submissions')
      .select('first_name, last_name, email')
      .eq('id', waitlistSubmissionId)
      .single();

    if (submissionError || !submission) {
      return new Response(
        JSON.stringify({ error: "Waitlist submission not found" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    // Create a one-time payment session for beta reservation
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: "NutriSteward Beta Spot Reservation",
              description: "Reserve your spot in the NutriSteward beta program"
            },
            unit_amount: 100, // $1.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/beta-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/`,
      customer_email: submission.email,
      metadata: {
        type: "beta_reservation",
        waitlist_submission_id: waitlistSubmissionId
      }
    });

    // Store the beta payment record
    const { error: paymentError } = await supabase
      .from('beta_payments')
      .insert({
        waitlist_submission_id: waitlistSubmissionId,
        stripe_session_id: session.id,
        amount: 100,
        currency: 'usd',
        status: 'pending'
      });

    if (paymentError) {
      console.error('Error storing payment record:', paymentError);
    }

    // Update waitlist submission with session ID
    await supabase
      .from('waitlist_submissions')
      .update({ payment_session_id: session.id })
      .eq('id', waitlistSubmissionId);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Beta payment error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
