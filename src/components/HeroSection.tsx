
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 pt-20">
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="w-full px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
              Cut Nutrition Coaching Workload
              <span className="block font-medium mt-2">by 90%</span>
            </h1>
            
            <div className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 space-y-3 max-w-4xl mx-auto">
              <p>Want to build plans in seconds, keep clients consistent with flexible meals,</p>
              <p>know exactly what they eat each day, and scale your business faster?</p>
            </div>

            <div className="space-y-4 mt-8">
              <button 
                onClick={scrollToWaitlist}
                className="bg-white text-primary-600 font-medium rounded-lg px-8 py-4 text-lg transition-all duration-300 ease-out hover:transform hover:scale-105 hover:shadow-xl inline-flex items-center gap-2"
              >
                <Fire size={20} weight="fill" />
                Join the Waitlist — Only 50 Spots Available
              </button>
              
              <p className="text-sm text-white/80">
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
