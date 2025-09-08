import React from 'react';
import { Shield, Zap } from 'lucide-react';
import { DEMO_MODE } from '../constants/assessmentConstants';

const IntroStep = ({ handleContinueFromIntro }) => {
  return (
    <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-opacity duration-300">
      <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto">
        <Shield className="w-20 h-20 text-indigo-600 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to the Cyber Resilience Assessment
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8 leading-relaxed">
          This assessment will help you evaluate your organization's
          cyber resilience posture across multiple critical domains.
        </p>
        {DEMO_MODE && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg mb-6">
            <Zap className="w-5 h-5" />
            Demo Mode Active - Quick fill available
          </div>
        )}
        <button
          onClick={handleContinueFromIntro}
          className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default IntroStep;