
import React, { useState, useEffect } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';

const WorkflowCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/lovable-uploads/8a633f9a-984c-483c-ac5e-38e7acfd48ef.png',
      caption: 'Enter weight, goals, and key info. TDEE calculated instantly.',
      title: 'Client Profile Setup'
    },
    {
      image: '/lovable-uploads/952622be-193f-4792-9e02-84b4e0950e19.png',
      caption: 'Record favorite proteins, carbs, fats, fiber, and treats.',
      title: 'Food Preference Intake'
    },
    {
      image: '/lovable-uploads/4b91c6a2-7ff2-410a-af00-93921e1d05b3.png',
      caption: 'Portion-accurate plan built in seconds, ready to adjust or send.',
      title: 'Auto-Generated Meal Plan'
    },
    {
      image: '/lovable-uploads/952622be-193f-4792-9e02-84b4e0950e19.png',
      caption: 'Clients swap foods, and portions auto-adjust to stay on target.',
      title: 'Client Swaps View'
    },
    {
      image: '/lovable-uploads/57cf7ebe-6818-4703-be02-40cbd49db741.png',
      caption: 'See adherence scores and food swaps instantly.',
      title: 'Coach Dashboard Compliance View'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container-width section-padding">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 text-center mb-4 animate-fade-in">
            Your New Nutrition Coaching Workflow, Simplified
          </h2>
          
          <div className="relative mt-12">
            <div className="relative overflow-hidden rounded-2xl bg-gray-50">
              <div className="relative h-96 md:h-[500px]">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-lg"
              >
                <CaretLeft size={20} weight="bold" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-lg"
              >
                <CaretRight size={20} weight="bold" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-primary-500' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Caption */}
            <div className="mt-6 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {slides[currentSlide].title}
              </h3>
              <p className="text-gray-600">
                {slides[currentSlide].caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowCarousel;
