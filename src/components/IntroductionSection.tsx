
import React from 'react';
import { Target, Lightning, ArrowsClockwise } from 'phosphor-react';

const IntroductionSection = () => {
  const features = [
    {
      icon: Target,
      text: 'As precise as MyFitnessPal'
    },
    {
      icon: Lightning,
      text: 'As fast as AI'
    },
    {
      icon: ArrowsClockwise,
      text: 'As flexible as your client needs it to be'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-width section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-gray-900 mb-6 animate-fade-in">
              Introducing NutriSteward
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed animate-slide-up max-w-3xl mx-auto">
              The smarter way to deliver meal plans that combine precision, speed, and flexibility.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4">
                  <feature.icon size={28} weight="bold" className="text-white" />
                </div>
                <p className="text-lg font-medium text-gray-900 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
