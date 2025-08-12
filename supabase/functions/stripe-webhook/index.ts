
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
    );

    console.log('Received webhook event:', event.type);

    // Initialize Supabase
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Processing completed session:', session.id);
      
      if (session.metadata?.type === "beta_reservation") {
        const waitlistSubmissionId = session.metadata.waitlist_submission_id;
        
        console.log('Updating waitlist submission:', waitlistSubmissionId);
        
        // Update waitlist submission
        const { error: updateError } = await supabase
          .from('waitlist_submissions')
          .update({ has_paid: true })
          .eq('id', waitlistSubmissionId);

        if (updateError) {
          console.error('Error updating waitlist submission:', updateError);
        } else {
          console.log('Successfully updated waitlist submission');
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
