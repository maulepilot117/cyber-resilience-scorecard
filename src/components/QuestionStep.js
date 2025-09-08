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
    <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-opacity duration-300">
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{currentQuestion.categoryIcon}</span>
            <span className="text-sm text-gray-500">
              Question ID: {currentQuestion.id}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-indigo-600">
            {currentQuestion.category}
            {currentQuestion.subCategory && ` - ${currentQuestion.subCategory}`}
          </h3>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
              {currentQuestion.text}
            </h2>
            
            {currentQuestion.weight && currentQuestion.weight > 3 && (
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  High Impact Question
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-8">
              {answerOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    answers[currentQuestion.id] === option.value
                      ? `${option.className} transform scale-105 shadow-xl ring-4 ring-opacity-50 ${
                          option.value === 'yes' ? 'ring-green-400 border-green-600' : 
                          option.value === 'no' ? 'ring-red-400 border-red-600' : 
                          'ring-gray-400 border-gray-600'
                        }`
                      : "bg-white border-gray-300 hover:border-gray-400 hover:shadow-md hover:scale-[1.02]"
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-semibold text-lg">{option.label}</span>
                  </div>
                  <div className="text-xs mt-2 opacity-60">
                    Press {option.key}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          {DEMO_MODE && currentStep === 0 && (
            <button
              onClick={quickFillDemo}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-lg transition-colors"
            >
              <Zap className="w-5 h-5" />
              Quick Fill (Demo)
            </button>
          )}

          <button
            onClick={goNext}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentStep === totalQuestions - 1
                ? "bg-green-600 text-white hover:bg-green-700 font-semibold px-6"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            {currentStep === totalQuestions - 1 ? "Complete Assessment" : "Next"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionStep;