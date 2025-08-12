
import React from 'react';
import { CheckCircle, Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BetaSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass-card p-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-white" />
          </div>
          
          <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
            Welcome to the NutriSteward Beta!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your beta spot has been reserved successfully. You're now part of an exclusive group 
            of coaches who will shape the future of nutrition coaching.
          </p>
          
          <div className="bg-primary-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• Join our exclusive Discord community</li>
              <li>• Get early access notifications via email</li>
              <li>• Connect with other beta coaches</li>
              <li>• Provide feedback directly to our development team</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('https://discord.gg/nutristeward', '_blank')}
              className="flex items-center gap-2"
              size="lg"
            >
              <MessageCircle size={20} />
              Join Discord Community
            </Button>
            <Button 
              onClick={() => window.open('https://instagram.com/nutristeward', '_blank')}
              variant="outline"
              className="flex items-center gap-2"
              size="lg"
            >
              <Users size={20} />
              Follow on Instagram
            </Button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Questions? Email us at <a href="mailto:beta@nutristeward.com" className="text-primary-600 hover:underline">beta@nutristeward.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaSuccess;
