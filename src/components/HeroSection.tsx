
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container-width section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6 leading-tight">
              Cut Your Nutrition Coaching 
              <span className="block text-gradient font-medium">Workload by 90%</span>
            </h1>
            
            <div className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 space-y-2">
              <p className="opacity-90">Imagine building client plans in seconds…</p>
              <p className="opacity-90">Knowing exactly what they eat every single day…</p>
              <p className="opacity-90">Keeping them on track without endless check-ins…</p>
              <p className="opacity-90">And scaling your business without burning out.</p>
              <p className="text-gray-900 font-medium mt-4">That is what NutriSteward was built for.</p>
            </div>

            <div className="space-y-4">
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

          <div className="relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="glass-card p-6 lg:p-8 shadow-2xl">
              <img 
                src="/lovable-uploads/4b91c6a2-7ff2-410a-af00-93921e1d05b3.png" 
                alt="NutriSteward Dashboard"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 glass-card p-4 shadow-xl animate-float">
              <img 
                src="/lovable-uploads/57cf7ebe-6818-4703-be02-40cbd49db741.png" 
                alt="Client Management"
                className="w-48 h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
