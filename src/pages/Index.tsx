
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

const Index = () => {
  return (
    <div className="min-h-screen bg-white scroll-smooth">
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
  );
};

export default Index;
