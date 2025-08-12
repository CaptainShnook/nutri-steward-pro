
import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Users, Clock, Star, Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BetaReservationOffer = () => {
  const [isReserved, setIsReserved] = useState(false);

  const spotsRemaining = 46;
  const totalSpots = 100;

  const handleReserveSpot = () => {
    // Redirect to the Stripe checkout link
    window.open('https://buy.stripe.com/fZu3cu9md5pi8xz1nYfAc00', '_blank');
    // Set reserved state to show success message
    setIsReserved(true);
  };

  const handleNotInterested = () => {
    // Redirect back to homepage
    window.location.href = '/';
  };

  if (isReserved) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-white" />
          </div>
          
          <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">
            Your Beta Spot is Being Reserved
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Complete your $1 payment in the new tab to secure your spot. Once confirmed, 
            you'll get access to our exclusive beta community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('https://discord.gg/nutristeward', '_blank')}
              className="flex items-center gap-2"
              variant="outline"
            >
              Join Discord Community
            </Button>
            <Button 
              onClick={() => window.open('https://instagram.com/nutristeward', '_blank')}
              className="flex items-center gap-2"
              variant="outline"
            >
              Follow on Instagram
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">
            Reserve Your NutriSteward Beta Spot For Just $1
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-orange-600">
              <Users size={20} />
              <span className="font-medium">{totalSpots} beta spots available</span>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <Clock size={20} />
              <span className="font-medium">{spotsRemaining} remain</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div 
              className="bg-gradient-to-r from-primary-500 to-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((totalSpots - spotsRemaining) / totalSpots) * 100}%` }}
            />
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-6 text-center">
            Lock in your place in the first wave of coaches shaping NutriSteward and get over 
            <span className="font-semibold text-primary-600"> $300 in value</span>:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap size={14} className="text-primary-600" />
              </div>
              <span className="text-gray-700">Early beta access before public release</span>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Star size={14} className="text-primary-600" />
              </div>
              <span className="text-gray-700">3 months free after launch <span className="font-semibold">(worth $300)</span></span>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users size={14} className="text-primary-600" />
              </div>
              <span className="text-gray-700">Direct access to our developers to request features</span>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle size={14} className="text-primary-600" />
              </div>
              <span className="text-gray-700">Priority onboarding and support at launch</span>
            </div>
          </div>
        </div>

        {/* Why $1 Section */}
        <div className="bg-primary-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">Why $1?</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            It confirms you are serious and helps us plan for beta. Your $1 goes toward your first month after your free period.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button 
            onClick={handleReserveSpot}
            size="lg"
            className="px-8 py-4 text-lg font-medium"
          >
            Reserve My Spot For $1
            <ArrowRight size={20} className="ml-2" />
          </Button>
          
          <Button 
            onClick={handleNotInterested}
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-medium flex items-center gap-2"
          >
            <X size={20} />
            Not Interested
          </Button>
        </div>

        {/* Urgency Message */}
        <p className="text-center text-sm text-gray-600">
          Once the {totalSpots} spots are gone, this page closes and the $300+ bonus disappears forever.
        </p>
      </div>
    </div>
  );
};

export default BetaReservationOffer;
