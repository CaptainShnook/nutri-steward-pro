
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    // Create Supabase client with service role for admin access
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get all paid beta reservations with submission details
    const { data: payments, error } = await supabase
      .from('beta_payments')
      .select(`
        *,
        waitlist_submissions (
          first_name,
          last_name,
          email
        )
      `)
      .eq('status', 'paid')
      .order('paid_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch payments:', error);
      throw new Error('Failed to fetch payment data');
    }

    // Format the data for admin view
    const formattedPayments = payments.map(payment => ({
      id: payment.id,
      payment_email: payment.payment_email,
      amount: payment.amount,
      paid_at: payment.paid_at,
      stripe_session_id: payment.stripe_session_id,
      stripe_payment_intent_id: payment.stripe_payment_intent_id,
      submission: {
        first_name: payment.waitlist_submissions?.first_name || 'N/A',
        last_name: payment.waitlist_submissions?.last_name || 'N/A',
        email: payment.waitlist_submissions?.email || 'N/A'
      }
    }));

    return new Response(JSON.stringify({
      total_payments: formattedPayments.length,
      total_revenue: formattedPayments.reduce((sum, p) => sum + p.amount, 0),
      payments: formattedPayments
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('List payments error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
