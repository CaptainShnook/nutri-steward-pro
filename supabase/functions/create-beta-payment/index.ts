
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
    const { submissionId, paymentEmail } = await req.json();

    if (!submissionId || !paymentEmail) {
      throw new Error("Missing required fields: submissionId and paymentEmail");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create Supabase client with service role for database operations
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Create a one-time payment session for beta reservation
    const session = await stripe.checkout.sessions.create({
      customer_email: paymentEmail,
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
      metadata: {
        type: "beta_reservation",
        submission_id: submissionId
      }
    });

    // Record the payment attempt in our database
    const { error: paymentError } = await supabase
      .from('beta_payments')
      .insert({
        stripe_session_id: session.id,
        payment_email: paymentEmail,
        amount: 100,
        currency: 'usd',
        status: 'pending',
        waitlist_submission_id: submissionId
      });

    if (paymentError) {
      console.error('Failed to record payment:', paymentError);
      throw new Error('Failed to record payment attempt');
    }

    // Update the waitlist submission with the payment session ID
    const { error: updateError } = await supabase
      .from('waitlist_submissions')
      .update({ payment_session_id: session.id })
      .eq('id', submissionId);

    if (updateError) {
      console.error('Failed to update submission:', updateError);
      // Don't throw here as the payment session is already created
    }

    console.log('Payment session created:', session.id);

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
