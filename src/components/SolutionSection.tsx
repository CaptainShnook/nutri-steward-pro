
import React from 'react';
import { Lightning, Swap, Eye, Clock } from 'phosphor-react';

const SolutionSection = () => {
  const benefits = [
    {
      icon: Lightning,
      title: 'Personalized instantly',
      description: 'enter preferences once, and every plan matches your client\'s taste'
    },
    {
      icon: Swap,
      title: 'Effortless flexibility',
      description: 'clients swap foods, and portions auto-adjust to keep targets locked in'
    },
    {
      icon: Eye,
      title: 'Daily visibility',
      description: 'know exactly what is on their plate without chasing food logs'
    },
    {
      icon: Clock,
      title: '90% less admin',
      description: 'more time to coach, more room to grow'
    }
  ];

  return (
    <section id="features" className="py-16 bg-gradient-to-br from-primary-50 to-white">
      <div className="container-width section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-gray-900 mb-6 animate-fade-in">
              Imagine a Better Way
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed animate-slide-up max-w-4xl mx-auto">
              What if you could deliver personalized, flexible plans in seconds without the fragile, 
              time-heavy process that makes meal planning such a grind?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="glass-card p-6 text-left animate-fade-in hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon size={24} weight="bold" className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{benefit.title}:</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
