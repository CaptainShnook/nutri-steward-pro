
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const BetaSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [paymentStatus, setPaymentStatus] = useState<'checking' | 'paid' | 'processing' | 'failed'>('checking');
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No payment session found');
      setPaymentStatus('failed');
      return;
    }

    // Initial check
    verifyPayment();

    // Set up polling for payment confirmation
    const pollInterval = setInterval(() => {
      if (paymentStatus === 'processing') {
        verifyPayment();
      }
    }, 2000); // Check every 2 seconds

    // Stop polling after 5 minutes
    const timeout = setTimeout(() => {
      clearInterval(pollInterval);
      if (paymentStatus === 'processing') {
        setPaymentStatus('failed');
        setError('Payment verification timeout');
      }
    }, 300000); // 5 minutes

    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeout);
    };
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-beta-payment', {
        body: { sessionId }
      });

      if (error) {
        console.error('Payment verification error:', error);
        setError('Failed to verify payment');
        setPaymentStatus('failed');
        return;
      }

      setPaymentData(data);

      if (data.status === 'paid') {
        setPaymentStatus('paid');
      } else if (data.status === 'pending') {
        setPaymentStatus('processing');
      } else {
        setPaymentStatus('failed');
        setError('Payment was not successful');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to verify payment');
      setPaymentStatus('failed');
    }
  };

  const renderContent = () => {
    switch (paymentStatus) {
      case 'checking':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 size={32} className="text-white animate-spin" />
            </div>
            <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">
              Checking Payment Status...
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your payment.
            </p>
          </div>
        );

      case 'processing':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 size={32} className="text-white animate-spin" />
            </div>
            <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">
              Processing Payment...
            </h2>
            <p className="text-gray-600 mb-4">
              Your payment is being processed. This page will automatically update once confirmed.
            </p>
            <p className="text-sm text-gray-500">
              This usually takes just a few seconds.
            </p>
          </div>
        );

      case 'paid':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-white" />
            </div>
            
            <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">
              Thank You! Your Beta Spot is Reserved
            </h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your $1 payment has been confirmed and your spot in the NutriSteward beta program is secured. 
              You'll receive an email with next steps and be among the first to access NutriSteward when it launches.
            </p>

            {paymentData && (
              <div className="bg-green-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Payment Confirmed</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Email:</strong> {paymentData.payment_email}</p>
                  <p><strong>Amount:</strong> ${(paymentData.amount / 100).toFixed(2)}</p>
                  <p><strong>Paid at:</strong> {new Date(paymentData.paid_at).toLocaleString()}</p>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('https://discord.gg/nutristeward', '_blank')}
                variant="outline"
              >
                Join Discord Community
              </Button>
              <Button 
                onClick={() => window.open('https://instagram.com/nutristeward', '_blank')}
                variant="outline"
              >
                Follow on Instagram
              </Button>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} className="text-white" />
            </div>
            
            <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">
              Payment Issue
            </h2>
            
            <p className="text-gray-600 mb-8">
              {error || 'There was an issue with your payment. Please try again or contact support.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = '/'}
              >
                Try Again
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('mailto:support@nutristeward.com', '_blank')}
              >
                Contact Support
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-20">
      <div className="container-width section-padding">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaSuccess;
