
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 scroll-smooth relative overflow-hidden">
      {/* Radial gradient overlay */}
      <div className="fixed inset-0 bg-gradient-radial from-blue-100/30 via-transparent to-blue-200/20 pointer-events-none" />
      
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
