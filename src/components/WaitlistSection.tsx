
import React from 'react';
import { Fire, Shield, TrendUp, CaretDown } from 'phosphor-react';

const WaitlistSection = () => {
  const benefits = [
    {
      icon: Shield,
      text: 'Give clients freedom without losing control of results'
    },
    {
      icon: Fire,
      text: 'Remove the most fragile, time-heavy part of nutrition coaching'
    },
    {
      icon: TrendUp,
      text: 'Scale their business without burning out'
    }
  ];

  const scrollToWaitlistForm = () => {
    const element = document.getElementById('waitlist-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="waitlist" className="py-16 bg-gradient-to-br from-primary-50 to-white">
      <div className="container-width section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-light tracking-tight text-gray-900 mb-6 animate-fade-in">
            Why Join the Waitlist Now
          </h2>
          
          <p className="text-base text-gray-700 mb-8 leading-relaxed animate-slide-up">
            We are opening NutriSteward to a limited first group of coaches who want to:
          </p>

          <div className="space-y-4 mb-10 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 text-left animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <benefit.icon size={20} weight="bold" className="text-white" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{benefit.text}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-6 animate-slide-up">
            <p className="text-sm text-gray-900 font-medium mb-1">
              Only a small number of early adopters will get priority access when we launch.
            </p>
            <p className="text-sm text-gray-700 mb-6">
              Once spots are gone, they are gone.
            </p>

            <button 
              onClick={scrollToWaitlistForm}
              className="neumorphic-btn inline-flex items-center gap-2 text-sm px-6 py-3 animate-glow"
            >
              <Fire size={18} weight="fill" />
              Join the Waitlist — Only 50 Spots Available
            </button>
            
            <p className="text-xs text-gray-500 opacity-80 mt-3">
              Just 5 quick questions to save your spot. Takes less than 60 seconds.
            </p>
          </div>

          {/* Scroll encouragement */}
          <div className="mt-8 animate-bounce">
            <CaretDown size={24} className="text-gray-400 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
