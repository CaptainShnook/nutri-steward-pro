
import React, { useState, useEffect } from 'react';
import { X, List } from 'phosphor-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm' : 'bg-transparent'
      }`}>
        <div className="container-width section-padding">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-2xl font-semibold tracking-tight text-gray-900">NutriSteward</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('waitlist')}
                className="neumorphic-btn text-sm px-6 py-2"
              >
                Join Waitlist
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl border-l border-gray-200/50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-semibold">Menu</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-6">
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-lg font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left text-lg font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('waitlist')}
                className="neumorphic-btn w-full text-center"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
