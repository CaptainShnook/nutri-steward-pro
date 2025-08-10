
import React from 'react';
import { Fire } from 'phosphor-react';

const HeroSection = () => {
  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white pt-20">
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container-width section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6 leading-tight">
              Cut Your Nutrition Coaching 
              <span className="block text-gradient font-medium mt-2">Workload by 90%</span>
            </h1>
            
            <div className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 space-y-3 max-w-3xl mx-auto">
              <p className="opacity-90">Imagine building client plans in seconds…</p>
              <p className="opacity-90">Knowing exactly what they eat every single day…</p>
              <p className="opacity-90">Keeping them on track without endless check-ins…</p>
              <p className="opacity-90">And scaling your business without burning out.</p>
              <p className="text-gray-900 font-medium mt-6">That is what NutriSteward was built for.</p>
            </div>

            <div className="space-y-4 mt-8">
              <button 
                onClick={scrollToWaitlist}
                className="neumorphic-btn inline-flex items-center gap-2 text-lg px-8 py-4 animate-glow"
              >
                <Fire size={20} weight="fill" />
                Join the Waitlist — Only 50 Spots Available
              </button>
              
              <p className="text-sm text-gray-500 opacity-80">
                Just 5 quick questions to save your spot. Takes less than 60 seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
