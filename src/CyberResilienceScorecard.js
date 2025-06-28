import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mail, Shield } from 'lucide-react';
import { scorecardData } from './scorecardData';

// Flatten all questions into a single array with category info
const getAllQuestions = () => {
  const questions = [];
  scorecardData.categories.forEach(category => {
    category.questions.forEach(question => {
      questions.push({
        ...question,
        category: category.name,
        categoryIcon: category.icon
      });
    });
  });
  return questions;
};

const CyberResilienceScorecard = () => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 for email, 0+ for questions
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allQuestions = getAllQuestions();
  const totalQuestions = allQuestions.length;
  const currentQuestion = currentStep >= 0 ? allQuestions[currentStep] : null;
  const progressPercent = ((currentStep + 1) / (totalQuestions + 1)) * 100;

  const handleEmailSubmit = () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    navigateToStep(0);
  };

  const handleAnswer = (answer) => {
    if (currentQuestion) {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
      
      // Auto-advance to next question after a short delay
      setTimeout(() => {
        if (currentStep < totalQuestions - 1) {
          navigateToStep(currentStep + 1);
        } else {
          // All questions answered, calculate results
          calculateAndSubmitScore();
        }
      }, 300);
    }
  };

  const navigateToStep = (newStep) => {
    if (newStep === currentStep) return;
    
    setAnimationDirection(newStep > currentStep ? 'right' : 'left');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentStep(newStep);
      setIsAnimating(false);
    }, 300);
  };

  const calculateAndSubmitScore = async () => {
    setIsSubmitting(true);
    
    let totalScore = 0;
    let totalMax = 0;
    const categoryResults = {};
    const recommendationsList = [];

    scorecardData.categories.forEach(category => {
      let categoryScore = 0;
      const categoryMax = category.questions.reduce((sum, q) => sum + q.weight, 0);
      totalMax += categoryMax;

      category.questions.forEach(question => {
        const answer = answers[question.id];
        const weight = question.weight;
        switch (answer) {
          case 'yes':
            categoryScore += weight;
            break;
          case 'partial':
            categoryScore += weight * 0.5;
            recommendationsList.push({ 
              category: category.name, 
              question: question.id, 
              text: question.text, 
              status: 'partial' 
            });
            break;
          case 'no':
            recommendationsList.push({ 
              category: category.name, 
              question: question.id, 
              text: question.text, 
              status: 'missing' 
            });
            break;
          case 'na':
            // Exclude N/A from calculations
            totalMax -= weight;
            break;
          default:
            break;
        }
      });

      categoryResults[category.name] = {
        score: categoryScore,
        max: categoryMax,
        percentage: categoryMax > 0 ? (categoryScore / categoryMax) * 100 : 0
      };
      totalScore += categoryScore;
    });

    const normalizedScore = totalMax > 0 ? (totalScore / totalMax) * 100 : 0;
    const finalScore = Math.round(normalizedScore);

    const categoryScoresArray = Object.entries(categoryResults).map(([name, data]) => ({
      name,
      score: data.score,
      max: data.max,
      percentage: data.percentage
    }));

    const requestBody = {
      email,
      score: finalScore,
      categoryScore: categoryScoresArray,
      recommendations: recommendationsList,
      htmlContent: "<h1>Your Report</h1><p>Details here...</p>"
    };

    try {
      const response = await fetch('http://localhost:3000/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      console.log(data.message);
      setShowResults(true);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (currentStep > -1) {
      navigateToStep(currentStep - 1);
    }
  };

  const answerOptions = [
    { value: 'yes', label: 'Yes', className: 'bg-green-500 hover:bg-green-600 text-white', icon: '✓' },
    { value: 'partial', label: 'Partial', className: 'bg-orange-500 hover:bg-orange-600 text-white', icon: '~' },
    { value: 'no', label: 'No', className: 'bg-red-500 hover:bg-red-600 text-white', icon: '✗' },
    { value: 'na', label: 'N/A', className: 'bg-gray-500 hover:bg-gray-600 text-white', icon: '—' }
  ];

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Assessment Complete!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your Cyber Resilience Scorecard results have been generated and sent to:
          </p>
          <p className="text-xl font-semibold text-indigo-600 mb-8">{email}</p>
          <p className="text-gray-500">
            Please check your email for the detailed PDF report including your score, 
            category breakdowns, and personalized recommendations.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md text-white p-6 rounded-2xl shadow-xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Shield className="w-8 h-8" />
              Cyber Resilience Scorecard
            </h1>
            {currentStep >= 0 && (
              <div className="text-lg">
                Question {currentStep + 1} of {totalQuestions}
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
        </div>

        {/* Main Content Area */}
        <div className="relative h-[500px] overflow-hidden">
          {/* Email Step */}
          {currentStep === -1 && (
            <div 
              className={`absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ${
                isAnimating 
                  ? animationDirection === 'right' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
                  : 'translate-x-0 opacity-100'
              }`}
            >
              <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto">
                <Mail className="w-16 h-16 text-indigo-600 mb-6" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Assessment</h2>
                <p className="text-gray-600 text-center mb-8">
                  Please enter your email address to receive your personalized Cyber Resilience report.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-6"
                  placeholder="your@email.com"
                  autoFocus
                />
                <button
                  onClick={handleEmailSubmit}
                  className="w-full py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Assessment
                </button>
              </div>
            </div>
          )}

          {/* Question Steps */}
          {currentStep >= 0 && currentQuestion && (
            <div 
              key={currentStep}
              className={`absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ${
                isAnimating 
                  ? animationDirection === 'right' ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0'
                  : 'translate-x-0 opacity-100'
              }`}
            >
              <div className="h-full flex flex-col">
                {/* Category Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-indigo-600 mb-2">
                    <span className="text-2xl">{currentQuestion.categoryIcon}</span>
                    <span className="font-semibold">{currentQuestion.category}</span>
                  </div>
                  <div className="text-sm text-gray-500">Question {currentQuestion.id}</div>
                </div>

                {/* Question Text */}
                <div className="flex-1 flex items-center justify-center">
                  <h3 className="text-2xl text-gray-800 text-center leading-relaxed max-w-3xl">
                    {currentQuestion.text}
                  </h3>
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {answerOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`${option.className} py-6 px-8 rounded-xl text-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-3`}
                    >
                      <span className="text-2xl">{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="mt-8 flex justify-between items-center">
                  <button
                    onClick={goBack}
                    disabled={currentStep <= -1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentStep > -1 
                        ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100' 
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                  
                  <div className="text-gray-500">
                    {Object.keys(answers).filter(id => allQuestions.find(q => q.id === id)).length} answers completed
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">Generating your report...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CyberResilienceScorecard;