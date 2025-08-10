
import React from 'react';
import { User, Heart, FileText, Swap, ChartLine, ChatCircle } from 'phosphor-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: User,
      title: 'Set Up Client Profile',
      description: 'Enter weight, goals, and key info. TDEE is calculated instantly.'
    },
    {
      icon: Heart,
      title: 'Capture Food Preferences',
      description: 'Proteins, carbs, fats, fiber, treats matched to their tastes from the start.'
    },
    {
      icon: FileText,
      title: 'Generate the Plan',
      description: 'Portion-accurate meal plan in seconds. Adjust manually or send as-is.'
    },
    {
      icon: Swap,
      title: 'Clients Start and Swap',
      description: 'Follow the plan or swap foods. Portions auto-adjust automatically.'
    },
    {
      icon: ChartLine,
      title: 'Track Adherence',
      description: 'Compliance scores update automatically in your dashboard.'
    },
    {
      icon: ChatCircle,
      title: 'Coach with Precision',
      description: 'If scores drop, review swaps and give targeted feedback instantly.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container-width section-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 text-center mb-16 animate-fade-in">
            How It Works
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative glass-card p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <step.icon size={24} weight="bold" className="text-primary-600" />
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
