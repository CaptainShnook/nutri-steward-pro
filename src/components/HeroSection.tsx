
import React from 'react';
import { ArrowRight, Star, Users, CheckCircle } from 'phosphor-react';

const HeroSection = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-form');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-gradient pt-32 pb-20 relative overflow-hidden">
      <div className="container-width section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-primary-100">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 bg-primary-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-secondary-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-accent-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-sm text-gray-700 font-medium">Trusted by 500+ nutrition coaches</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-gray-900 mb-6 leading-tight">
            Eliminate the most time-consuming part of nutrition coaching
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            NutriSteward creates personalized meal plans in seconds, handles client food swaps automatically, 
            and tracks compliance in real-time—so you can focus on what matters: coaching.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle size={20} weight="fill" className="text-primary-500" />
              <span>Instant meal plan generation</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle size={20} weight="fill" className="text-primary-500" />
              <span>Automatic food swaps</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle size={20} weight="fill" className="text-primary-500" />
              <span>Real-time compliance tracking</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToWaitlist}
              className="neumorphic-btn-primary px-8 py-4 text-lg font-medium flex items-center gap-2"
            >
              Join the Waitlist
              <ArrowRight size={20} />
            </button>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={16} />
              <span className="text-sm">Join 1,200+ coaches already on the list</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">Active Coaches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">10k+</div>
              <div className="text-sm text-gray-600">Meal Plans Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">94%</div>
              <div className="text-sm text-gray-600">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">4.9★</div>
              <div className="text-sm text-gray-600">Coach Rating</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-accent-400 rounded-full opacity-40"></div>
    </section>
  );
};

export default HeroSection;
