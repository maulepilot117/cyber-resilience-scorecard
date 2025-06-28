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
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [categoryResults, setCategoryResults] = useState({});

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
    let totalScore = 0;
    let totalMax = 0;
    const categoryResultsData = {};
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

      categoryResultsData[category.name] = {
        score: categoryScore,
        max: categoryMax,
        percentage: categoryMax > 0 ? (categoryScore / categoryMax) * 100 : 0
      };
      totalScore += categoryScore;
    });

    const normalizedScore = totalMax > 0 ? (totalScore / totalMax) * 100 : 0;
    const calculatedFinalScore = Math.round(normalizedScore);
    
    // Set the results data
    setFinalScore(calculatedFinalScore);
    setCategoryResults(categoryResultsData);
    
    // Show results immediately
    setShowResults(true);
    setIsSubmitting(true);

    const categoryScoresArray = Object.entries(categoryResultsData).map(([name, data]) => ({
      name,
      score: data.score,
      max: data.max,
      percentage: data.percentage
    }));

    const requestBody = {
      email,
      score: calculatedFinalScore,
      categoryScore: categoryScoresArray,
      recommendations: recommendationsList,
      htmlContent: "<h1>Your Report</h1><p>Details here...</p>"
    };

    // Send email in the background
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
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailError(true);
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
    const getScoreColor = (score) => {
      if (score >= 80) return 'text-green-600';
      if (score >= 60) return 'text-yellow-600';
      if (score >= 40) return 'text-orange-600';
      return 'text-red-600';
    };

    const getScoreGrade = (score) => {
      if (score >= 80) return 'Excellent';
      if (score >= 60) return 'Good';
      if (score >= 40) return 'Fair';
      return 'Needs Improvement';
    };

    return (
      <div className="min-h-screen p-6 relative" style={{
      background: 'radial-gradient(ellipse at top left, #0a0e27 0%, #1a2b4d 25%, #2d4a6b 50%, #3a5f85 75%, #4682a0 100%)',
      backgroundSize: '200% 200%',
      backgroundPosition: '0% 0%'
    }}>
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/background_image.png)',
          backgroundPosition: 'center 60%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '150%',
          opacity: 1,
          mixBlendMode: 'screen'
        }}
      />
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Score Display */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Assessment Complete!</h2>
              <div className="mb-6">
                <div className={`text-6xl font-bold ${getScoreColor(finalScore)} mb-2`}>
                  {finalScore}%
                </div>
                <div className="text-xl text-gray-600">
                  Overall Score: <span className="font-semibold">{getScoreGrade(finalScore)}</span>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Score by Category</h3>
              <div className="space-y-3">
                {Object.entries(categoryResults).map(([category, data]) => {
                  const percentage = Math.round(data.percentage);
                  return (
                    <div key={category} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{category}</span>
                        <span className="text-sm text-gray-600">
                          {data.score.toFixed(1)}/{data.max} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            percentage >= 80 ? 'bg-green-500' :
                            percentage >= 60 ? 'bg-yellow-500' :
                            percentage >= 40 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Email Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-blue-700">Sending your detailed report to {email}...</span>
                </div>
              ) : emailSent ? (
                <div>
                  <p className="text-green-700 font-semibold mb-2">✅ Report sent successfully!</p>
                  <p className="text-gray-600">
                    Your detailed PDF report has been sent to <span className="font-semibold">{email}</span>
                  </p>
                </div>
              ) : emailError ? (
                <div>
                  <p className="text-red-700 font-semibold mb-2">⚠️ Unable to send email</p>
                  <p className="text-gray-600">
                    We couldn't send your report to {email}. Please contact support or try again later.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    You can take a screenshot of this page for your records.
                  </p>
                </div>
              ) : (
                <p className="text-gray-600">Preparing your report...</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Start New Assessment
              </button>
              {emailError && (
                <button
                  onClick={() => {
                    setEmailError(false);
                    setEmailSent(false);
                    calculateAndSubmitScore();
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Retry Email
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
          <div className="min-h-screen p-6 relative" style={{
        background: 'radial-gradient(ellipse at top left, #0a0e27 0%, #1a2b4d 25%, #2d4a6b 50%, #3a5f85 75%, #4682a0 100%)',
        backgroundSize: '200% 200%',
        backgroundPosition: '0% 0%'
      }}>
        {/* Background image overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/background_image.png)',
            backgroundPosition: 'center 60%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '150%',
            opacity: 1,
            mixBlendMode: 'screen'
          }}
        />
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