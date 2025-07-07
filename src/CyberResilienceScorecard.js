import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mail, Shield, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { scorecardData } from './scorecardData';

// Flatten all questions into a single array with category and sub-category info
const getAllQuestions = (selectedSubCategories = null) => {
  const questions = [];
  const processedCategories = new Set(); // Track which category-level questions we've added
  
  // Ensure scorecardData exists and has categories
  if (!scorecardData || !scorecardData.categories || !Array.isArray(scorecardData.categories)) {
    return questions;
  }
  
  scorecardData.categories.forEach(category => {
    // Check if any sub-categories from this category are selected
    const categoryHasSelectedSubCategories = selectedSubCategories && 
      selectedSubCategories.some(key => key.startsWith(`${category.name}:`));
    
    // If no selection made yet, or if this category has selected sub-categories,
    // include the category-level questions
    if (!selectedSubCategories || categoryHasSelectedSubCategories) {
      if (!processedCategories.has(category.name) && category.questions && category.questions.length > 0) {
        category.questions.forEach(question => {
          questions.push({
            ...question,
            category: category.name,
            subCategory: null, // Category-level questions don't have a sub-category
            categoryIcon: category.icon
          });
        });
        processedCategories.add(category.name);
      }
    }
    
    // Process sub-categories if they exist
    if (category.subCategories && Array.isArray(category.subCategories)) {
      category.subCategories.forEach(subCategory => {
        const subCategoryKey = `${category.name}:${subCategory.name}`;
        if (!selectedSubCategories || selectedSubCategories.includes(subCategoryKey)) {
          if (subCategory.questions && Array.isArray(subCategory.questions)) {
            subCategory.questions.forEach(question => {
              questions.push({
                ...question,
                category: category.name,
                subCategory: subCategory.name,
                categoryIcon: category.icon
              });
            });
          }
        }
      });
    }
  });
  
  // Sort questions so category-level questions appear first
  return questions.sort((a, b) => {
    // First sort by category
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    // Within same category, category-level questions come first
    if (!a.subCategory && b.subCategory) return -1;
    if (a.subCategory && !b.subCategory) return 1;
    // Then sort by sub-category if both have one
    if (a.subCategory && b.subCategory && a.subCategory !== b.subCategory) {
      return a.subCategory.localeCompare(b.subCategory);
    }
    // Finally sort by question ID
    return a.id.localeCompare(b.id);
  });
};

const CyberResilienceScorecard = () => {
  const [currentStep, setCurrentStep] = useState(-3); // -3 intro, -2 categories, -1 email, 0+ questions
  const [previousStep, setPreviousStep] = useState(null);
  const [email, setEmail] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('forward');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [categoryResults, setCategoryResults] = useState({});

  // Ensure scorecardData is properly loaded
  if (!scorecardData || !scorecardData.categories || !Array.isArray(scorecardData.categories)) {
    console.error('scorecardData is not properly loaded:', scorecardData);
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Error loading assessment data. Please check the console.</div>
    </div>;
  }

  // Validate data structure
  const hasInvalidCategories = scorecardData.categories.some(cat => {
    if (!cat || typeof cat !== 'object') {
      console.error('Invalid category:', cat);
      return true;
    }
    if (!cat.name || !cat.icon) {
      console.error('Category missing name or icon:', cat);
      return true;
    }
    return false;
  });

  if (hasInvalidCategories) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Error: Invalid category data structure. Please check the console.</div>
    </div>;
  }

  // Normalize the data structure to ensure all categories have subCategories
  React.useEffect(() => {
    if (scorecardData && scorecardData.categories) {
      scorecardData.categories.forEach(category => {
        if (!category.subCategories) {
          category.subCategories = [];
        }
        if (!category.questions) {
          category.questions = [];
        }
      });
    }
  }, []);

  const allQuestions = getAllQuestions(selectedSubCategories.length > 0 ? selectedSubCategories : null);
  const totalQuestions = allQuestions.length;
  const currentQuestion = currentStep >= 0 ? allQuestions[currentStep] : null;
  
  // Calculate progress including intro steps
  const totalSteps = totalQuestions + 3; // intro + categories + email + questions
  const currentStepForProgress = currentStep + 3;
  const progressPercent = (currentStepForProgress / totalSteps) * 100;

  const handleContinueFromIntro = () => {
    navigateToStep(-2);
  };

  const toggleCategoryExpansion = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleSubCategorySelection = (categoryName, subCategoryName) => {
    const subCategoryKey = `${categoryName}:${subCategoryName}`;
    setSelectedSubCategories(prev => {
      if (prev.includes(subCategoryKey)) {
        return prev.filter(key => key !== subCategoryKey);
      } else {
        return [...prev, subCategoryKey];
      }
    });
  };

  const handleSelectAllInCategory = (categoryName) => {
    try {
      const category = scorecardData.categories.find(cat => cat.name === categoryName);
      if (!category || !category.subCategories || !Array.isArray(category.subCategories)) return;
      
      const categorySubCategoryKeys = category.subCategories.map(
        subCat => `${categoryName}:${subCat.name}`
      );
      
      const allSelected = categorySubCategoryKeys.every(key => 
        selectedSubCategories.includes(key)
      );

      if (allSelected) {
        // Deselect all
        setSelectedSubCategories(prev => 
          prev.filter(key => !categorySubCategoryKeys.includes(key))
        );
      } else {
        // Select all
        setSelectedSubCategories(prev => [
          ...prev.filter(key => !categorySubCategoryKeys.includes(key)),
          ...categorySubCategoryKeys
        ]);
      }
    } catch (error) {
      console.error('Error in handleSelectAllInCategory:', error);
    }
  };

  const getCategorySelectionStatus = (categoryName) => {
    const category = scorecardData.categories.find(cat => cat.name === categoryName);
    if (!category || !category.subCategories) return 'none';
    
    const categorySubCategoryKeys = category.subCategories.map(
      subCat => `${categoryName}:${subCat.name}`
    );
    
    const selectedCount = categorySubCategoryKeys.filter(key => 
      selectedSubCategories.includes(key)
    ).length;

    if (selectedCount === 0) return 'none';
    if (selectedCount === categorySubCategoryKeys.length) return 'all';
    return 'partial';
  };

  const handleCategoriesSubmit = () => {
    if (selectedSubCategories.length === 0) {
      alert('Please select at least one sub-category to assess');
      return;
    }
    navigateToStep(-1);
  };

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
    
    setPreviousStep(currentStep);
    setAnimationDirection(newStep > currentStep ? 'forward' : 'backward');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentStep(newStep);
      setTimeout(() => {
        setIsAnimating(false);
        setPreviousStep(null);
      }, 50);
    }, 300);
  };

  const calculateAndSubmitScore = async () => {
    let totalScore = 0;
    let totalMax = 0;
    const categoryResultsData = {};
    const recommendationsList = [];

    // Process only selected sub-categories and their parent category questions
    scorecardData.categories.forEach(category => {
      let categoryScore = 0;
      let categoryMax = 0;

      // Check if any sub-categories from this category are selected
      const categoryHasSelectedSubCategories = selectedSubCategories.some(
        key => key.startsWith(`${category.name}:`)
      );

      // Process category-level questions if any sub-category is selected
      if (categoryHasSelectedSubCategories && category.questions) {
        category.questions.forEach(question => {
          const answer = answers[question.id];
          const weight = question.weight;
          categoryMax += weight;
          
          switch (answer) {
            case 'yes':
              categoryScore += weight;
              break;
            case 'partial':
              categoryScore += weight * 0.5;
              recommendationsList.push({ 
                category: category.name,
                subCategory: null,
                question: question.id, 
                text: question.text, 
                status: 'partial' 
              });
              break;
            case 'no':
              recommendationsList.push({ 
                category: category.name,
                subCategory: null,
                question: question.id, 
                text: question.text, 
                status: 'missing' 
              });
              break;
            case 'na':
              // Exclude N/A from calculations
              categoryMax -= weight;
              break;
            default:
              break;
          }
        });
      }

      // Process sub-category questions
      if (category.subCategories && Array.isArray(category.subCategories)) {
        category.subCategories.forEach(subCategory => {
          const subCategoryKey = `${category.name}:${subCategory.name}`;
          if (selectedSubCategories.includes(subCategoryKey)) {
            if (subCategory.questions && Array.isArray(subCategory.questions)) {
              subCategory.questions.forEach(question => {
                const answer = answers[question.id];
                const weight = question.weight;
                categoryMax += weight;
                
                switch (answer) {
                  case 'yes':
                    categoryScore += weight;
                    break;
                  case 'partial':
                    categoryScore += weight * 0.5;
                    recommendationsList.push({ 
                      category: category.name,
                      subCategory: subCategory.name,
                      question: question.id, 
                      text: question.text, 
                      status: 'partial' 
                    });
                    break;
                  case 'no':
                    recommendationsList.push({ 
                      category: category.name,
                      subCategory: subCategory.name,
                      question: question.id, 
                      text: question.text, 
                      status: 'missing' 
                    });
                    break;
                  case 'na':
                    // Exclude N/A from calculations
                    categoryMax -= weight;
                    break;
                  default:
                    break;
                }
              });
            }
          }
        });
      }

      if (categoryMax > 0) {
        categoryResultsData[category.name] = {
          score: categoryScore,
          max: categoryMax,
          percentage: (categoryScore / categoryMax) * 100
        };
        totalScore += categoryScore;
        totalMax += categoryMax;
      }
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
    if (currentStep > -3) {
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
        <div className="relative h-[600px] overflow-hidden">
          {/* Intro Step */}
          {currentStep === -3 && (
            <div 
              className={`absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ${
                isAnimating 
                  ? animationDirection === 'forward' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
                  : 'translate-x-0 opacity-100'
              }`}
            >
              <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto">
                <Shield className="w-20 h-20 text-indigo-600 mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome to the Cyber Resilience Assessment</h2>
                <p className="text-lg text-gray-600 text-center mb-8 leading-relaxed">
                  This assessment will help you evaluate your organization's cyber resilience posture across multiple critical domains. 
                  By answering a series of targeted questions, you'll receive a comprehensive score and actionable recommendations 
                  to strengthen your defenses against modern cyber threats including ransomware, data breaches, and operational disruptions.
                </p>
                <button
                  onClick={handleContinueFromIntro}
                  className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}

          {/* Category Selection Step */}
          {currentStep === -2 && (
            <div 
              className={`absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ${
                isAnimating 
                  ? animationDirection === 'forward' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
                  : 'translate-x-0 opacity-100'
              }`}
            >
              <div className="h-full flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Assessment Categories</h2>
                  <p className="text-gray-600">Choose which areas you'd like to assess (select at least one)</p>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-4">
                    {scorecardData.categories && scorecardData.categories.length > 0 ? (
                      scorecardData.categories.map((category) => {
                        if (!category) return null;
                        
                        const isExpanded = expandedCategories[category.name];
                        const selectionStatus = getCategorySelectionStatus(category.name);
                        const categoryQuestions = category.questions ? category.questions.length : 0;
                        const subCategoryQuestions = category.subCategories ? 
                          category.subCategories.reduce((sum, subCat) => sum + (subCat.questions ? subCat.questions.length : 0), 0) : 0;
                        const totalQuestions = categoryQuestions + subCategoryQuestions;
                        const subCategoryCount = category.subCategories ? category.subCategories.length : 0;
                        
                        return (
                        <div
                          key={category.name}
                          className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white"
                        >
                          {/* Category Header */}
                          <div
                            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleCategoryExpansion(category.name)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{category.icon}</span>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                                  <p className="text-sm text-gray-500">
                                    {categoryQuestions > 0 && `${categoryQuestions} general questions, `}
                                    {subCategoryCount > 0 && `${subCategoryCount} sub-categories, `}
                                    {totalQuestions} total questions
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {subCategoryCount > 0 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelectAllInCategory(category.name);
                                    }}
                                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                      selectionStatus === 'all'
                                        ? 'bg-indigo-600 text-white'
                                        : selectionStatus === 'partial'
                                        ? 'bg-indigo-200 text-indigo-800'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                  >
                                    {selectionStatus === 'all' ? 'Deselect All' : 'Select All'}
                                  </button>
                                )}
                                {isExpanded ? <ChevronUp /> : <ChevronDown />}
                              </div>
                            </div>
                          </div>
                          
                          {/* Sub-categories */}
                          {isExpanded && (
                            <div className="border-t border-gray-200 bg-gray-50">
                              {/* Show category-level info if there are category questions */}
                              {category.questions && category.questions.length > 0 && (
                                <div className="p-4 bg-blue-50 border-b border-gray-200">
                                  <p className="text-sm text-blue-700 ml-8">
                                    <span className="font-medium">Note:</span> Selecting any sub-category will also include {category.questions.length} general {category.name} questions
                                  </p>
                                </div>
                              )}
                              {category.subCategories.map((subCategory) => {
                                const subCategoryKey = `${category.name}:${subCategory.name}`;
                                const isSelected = selectedSubCategories.includes(subCategoryKey);
                                
                                return (
                                  <div
                                    key={subCategory.name}
                                    onClick={() => handleSubCategorySelection(category.name, subCategory.name)}
                                    className={`cursor-pointer p-4 border-b border-gray-200 last:border-b-0 transition-colors ${
                                      isSelected 
                                        ? 'bg-indigo-50' 
                                        : 'hover:bg-white'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between ml-8">
                                      <div>
                                        <h4 className="font-medium text-gray-800">{subCategory.name}</h4>
                                        <p className="text-sm text-gray-500">{subCategory.questions.length} questions</p>
                                      </div>
                                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                        isSelected 
                                          ? 'bg-indigo-600 border-indigo-600' 
                                          : 'border-gray-300'
                                      }`}>
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                                          })
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No categories available
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                  
                  <button
                    onClick={handleCategoriesSubmit}
                    className={`px-6 py-3 font-semibold rounded-lg transition-colors ${
                      selectedSubCategories.length > 0
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={selectedSubCategories.length === 0}
                  >
                    Continue ({selectedSubCategories.length} sub-categories selected)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Email Step */}
          {currentStep === -1 && (
            <div 
              className={`absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ${
                isAnimating 
                  ? animationDirection === 'forward' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
                  : 'translate-x-0 opacity-100'
              }`}
            >
              <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto">
                <Mail className="w-16 h-16 text-indigo-600 mb-6" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Enter Your Email</h2>
                <p className="text-gray-600 text-center mb-8">
                  We'll send your personalized Cyber Resilience report with detailed recommendations to this email address.
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
                
                <button
                  onClick={goBack}
                  className="mt-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
              </div>
            </div>
          )}

          {/* Question Steps */}
          {currentStep >= 0 && allQuestions.map((question, index) => {
            const isCurrentQuestion = index === currentStep;
            const isPreviousQuestion = index === previousStep;
            
            // Only render current and previous questions during animation
            if (!isCurrentQuestion && !isPreviousQuestion && isAnimating) return null;
            if (!isCurrentQuestion && !isAnimating) return null;
            
            return (
              <div 
                key={`question-${index}`}
                className={`absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ease-in-out ${
                  isAnimating
                    ? isPreviousQuestion
                      ? animationDirection === 'forward' 
                        ? '-translate-x-full opacity-0' 
                        : 'translate-x-full opacity-0'
                      : isCurrentQuestion
                        ? animationDirection === 'forward'
                          ? 'translate-x-0 opacity-100'
                          : 'translate-x-0 opacity-100'
                        : ''
                    : isCurrentQuestion
                      ? 'translate-x-0 opacity-100'
                      : animationDirection === 'forward'
                        ? 'translate-x-full opacity-0'
                        : '-translate-x-full opacity-0'
                }`}
                style={{
                  transform: isAnimating && !isPreviousQuestion && !isCurrentQuestion ? 
                    (animationDirection === 'forward' ? 'translateX(100%)' : 'translateX(-100%)') : undefined
                }}
              >
                <div className="h-full flex flex-col">
                  {/* Category Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <span className="text-2xl">{question.categoryIcon}</span>
                      <span className="font-semibold">{question.category}</span>
                    </div>
                    {question.subCategory ? (
                      <div className="text-sm text-gray-600 ml-10">{question.subCategory}</div>
                    ) : (
                      <div className="text-sm text-gray-600 ml-10 font-medium">General {question.category} Question</div>
                    )}
                    <div className="text-sm text-gray-500 ml-10">Question {question.id}</div>
                  </div>

                  {/* Question Text */}
                  <div className="flex-1 flex items-center justify-center">
                    <h3 className="text-2xl text-gray-800 text-center leading-relaxed max-w-3xl">
                      {question.text}
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
                      disabled={currentStep <= -3}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        currentStep > -3 
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
            );
          })}

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