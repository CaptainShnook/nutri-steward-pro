
import React from 'react';
import { CheckCircle, XCircle } from 'phosphor-react';

const ProblemSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-width section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
              Why Most Coaches Avoid Meal Plans
            </h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed animate-slide-up">
            <p className="text-lg mb-4">You know they work.</p>
            <p className="text-lg mb-4">You know clients get better results when they follow one.</p>
            <p className="text-lg mb-6 text-gray-900 font-medium">So why do so many coaches skip them?</p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <XCircle size={20} weight="fill" className="text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Clients need flexibility to stick with a plan.</h3>
                  <p className="text-sm text-gray-600">Rigid plans cause friction. Too much freedom, and consistency slips.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <XCircle size={20} weight="fill" className="text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Building a plan is manual, tedious, and trust-driven.</h3>
                  <p className="text-sm text-gray-600">
                    Personalizing around food preferences, macros, and schedules takes hours. 
                    Once it is sent, you are relying on clients to follow it exactly, which means every meal, 
                    every portion, every choice is a potential derailment.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-base text-center text-gray-900 font-medium">
              It is the hardest part of nutrition coaching because a lot can go wrong, 
              and fixing it usually means starting all over again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
