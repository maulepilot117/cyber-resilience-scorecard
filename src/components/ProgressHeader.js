import React from 'react';
import { Shield } from 'lucide-react';

const ProgressHeader = ({ currentStep, totalQuestions, answeredCount, progressPercent }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md text-white p-6 rounded-2xl shadow-xl mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Shield className="w-8 h-8" />
          Cyber Resilience Scorecard
        </h1>
        {currentStep >= 0 && (
          <div className="flex items-center gap-4">
            <div className="text-lg">
              Question {currentStep + 1} of {totalQuestions}
            </div>
            <div className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {answeredCount} answered
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="bg-white/20 h-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      
      {/* Keyboard hint */}
      {currentStep >= 0 && (
        <div className="mt-2 text-xs text-white/60 text-center">
          Use arrow keys to navigate • Press 1-4 to answer quickly
        </div>
      )}
    </div>
  );
};

export default ProgressHeader;