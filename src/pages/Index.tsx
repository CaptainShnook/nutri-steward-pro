
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import WorkflowCarousel from '../components/WorkflowCarousel';
import IntroductionSection from '../components/IntroductionSection';
import HowItWorksSection from '../components/HowItWorksSection';
import WaitlistSection from '../components/WaitlistSection';
import WaitlistForm from '../components/WaitlistForm';
import BrainMesh from '../components/BrainMesh';

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="fixed inset-0 bg-gradient-radial from-blue-100/50 via-white/90 to-blue-200/40 pointer-events-none" />
      
      {/* 3D Brain Mesh Background */}
      <BrainMesh />
      
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <WorkflowCarousel />
        <IntroductionSection />
        <HowItWorksSection />
        <WaitlistSection />
        <WaitlistForm />
      </div>
    </div>
  );
};

export default Index;
