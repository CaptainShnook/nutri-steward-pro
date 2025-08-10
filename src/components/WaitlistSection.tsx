
import React from 'react';
import { Fire, Shield, TrendUp } from 'phosphor-react';

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
    <section id="waitlist" className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="container-width section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-8 animate-fade-in">
            Why Join the Waitlist Now
          </h2>
          
          <p className="text-xl text-gray-700 mb-8 leading-relaxed animate-slide-up">
            We are opening NutriSteward to a limited first group of coaches who want to:
          </p>

          <div className="space-y-6 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center justify-center gap-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon size={18} weight="bold" className="text-white" />
                </div>
                <p className="text-lg text-gray-700">{benefit.text}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-8 animate-slide-up">
            <p className="text-lg text-gray-900 font-medium mb-2">
              Only a small number of early adopters will get priority access when we launch.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Once spots are gone, they are gone.
            </p>

            <button 
              onClick={scrollToWaitlistForm}
              className="neumorphic-btn inline-flex items-center gap-2 text-lg px-8 py-4 animate-glow"
            >
              <Fire size={20} weight="fill" />
              Join the Waitlist — Only 50 Spots Available
            </button>
            
            <p className="text-sm text-gray-500 opacity-80 mt-4">
              Just 5 quick questions to save your spot. Takes less than 60 seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
