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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-width section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-8 animate-fade-in">
            Introducing NutriSteward
          </h2>
          
          <p className="text-xl text-gray-700 mb-12 leading-relaxed animate-slide-up">
            The smarter way to deliver meal plans that combine precision, speed, and flexibility.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon size={32} weight="bold" className="text-white" />
                </div>
                <p className="text-lg font-medium text-gray-900">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
