import React from 'react';
import { ChevronLeft, ChevronRight, Zap, AlertTriangle } from 'lucide-react';
import { answerOptions, DEMO_MODE } from '../constants/assessmentConstants';

const QuestionStep = ({
  currentQuestion,
  currentStep,
  answers,
  handleAnswer,
  goBack,
  goNext,
  totalQuestions,
  quickFillDemo
}) => {
  if (!currentQuestion) return null;

  return (
    <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-6 transition-opacity duration-300 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header section - compact */}
        <div className="mb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xl">{currentQuestion.categoryIcon}</span>
            <span className="text-xs text-gray-500">
              Question {currentStep + 1} of {totalQuestions} (ID: {currentQuestion.id})
            </span>
          </div>
          <h3 className="text-sm font-semibold text-indigo-600">
            {currentQuestion.category}
            {currentQuestion.subCategory && ` - ${currentQuestion.subCategory}`}
          </h3>
        </div>

        {/* Main content area - scrollable if needed */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto mb-4">
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-2xl">
              {/* Question text - adjusted sizing */}
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center leading-relaxed">
                {currentQuestion.text}
              </h2>
              
              {/* High impact indicator */}
              {currentQuestion.weight && currentQuestion.weight > 3 && (
                <div className="mb-4 flex justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                    <AlertTriangle className="w-3 h-3" />
                    High Impact Question
                  </div>
                </div>
              )}

              {/* Answer buttons - 3 columns on one line, smaller */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto">
                {answerOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    className={`py-3 sm:py-4 px-2 sm:px-3 rounded-lg border-2 transition-all duration-200 ${
                      answers[currentQuestion.id] === option.value
                        ? `${option.className} transform scale-105 shadow-lg ring-2 ring-opacity-50 ${
                            option.value === 'yes' ? 'ring-green-400 border-green-600' : 
                            option.value === 'no' ? 'ring-red-400 border-red-600' : 
                            'ring-gray-400 border-gray-600'
                          }`
                        : "bg-white border-gray-300 hover:border-gray-400 hover:shadow-md hover:scale-[1.02]"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-xl">{option.icon}</span>
                      <span className="font-semibold text-base">{option.label}</span>
                      <div className="text-xs opacity-60 mt-1">
                        Press {option.key}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons - fixed at bottom */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {DEMO_MODE && currentStep === 0 && (
            <button
              onClick={quickFillDemo}
              className="flex items-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-lg transition-colors text-sm"
            >
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Fill</span>
            </button>
          )}

          <button
            onClick={goNext}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentStep === totalQuestions - 1
                ? "bg-green-600 text-white hover:bg-green-700 font-semibold"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            <span className="hidden sm:inline">
              {currentStep === totalQuestions - 1 ? "Complete" : "Next"}
            </span>
            <span className="sm:hidden">
              {currentStep === totalQuestions - 1 ? "Done" : "Next"}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionStep;