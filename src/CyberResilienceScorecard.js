import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Shield,
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Download,
  Zap,
} from "lucide-react";
import { scorecardData } from "./scorecardData";
import {
  validateEmail,
  validateAnswer,
  validateScorecardData,
  sanitizeString,
} from "./utils/validationUtils";
import { postData, ApiError } from "./utils/apiUtils";
import ErrorBoundary from "./ErrorBoundary";

// Extracted styles to constants for better performance
const BACKGROUND_STYLE = {
  background:
    "radial-gradient(ellipse at top left, #0a0e27 0%, #1a2b4d 25%, #2d4a6b 50%, #3a5f85 75%, #4682a0 100%)",
  backgroundSize: "200% 200%",
  backgroundPosition: "0% 0%",
};

// Demo mode for hackathon presentations
const DEMO_MODE = window.location.search.includes('demo=true');
const DEMO_EMAIL = 'demo@cyberresilience.com';

// Flatten all questions into a single array with category and sub-category info
const getAllQuestions = (selectedSubCategories = null) => {
  const questions = [];
  const processedCategories = new Set();

  if (
    !scorecardData ||
    !scorecardData.categories ||
    !Array.isArray(scorecardData.categories)
  ) {
    return questions;
  }

  scorecardData.categories.forEach((category) => {
    const categoryHasSelectedSubCategories =
      selectedSubCategories &&
      selectedSubCategories.some((key) => key.startsWith(`${category.name}:`));

    // Always include Backup Architecture questions, or include if category has selected subcategories
    if (category.name === "Backup Architecture" || !selectedSubCategories || categoryHasSelectedSubCategories) {
      if (
        !processedCategories.has(category.name) &&
        category.questions &&
        category.questions.length > 0
      ) {
        category.questions.forEach((question) => {
          if (
            question &&
            typeof question === "object" &&
            question.id &&
            question.text
          ) {
            questions.push({
              ...question,
              category: category.name,
              subCategory: null,
              categoryIcon: category.icon || "❓",
            });
          }
        });
        processedCategories.add(category.name);
      }
    }

    if (category.subCategories && Array.isArray(category.subCategories)) {
      category.subCategories.forEach((subCategory) => {
        const subCategoryKey = `${category.name}:${subCategory.name}`;
        if (
          !selectedSubCategories ||
          selectedSubCategories.includes(subCategoryKey)
        ) {
          if (subCategory.questions && Array.isArray(subCategory.questions)) {
            subCategory.questions.forEach((question) => {
              if (
                question &&
                typeof question === "object" &&
                question.id &&
                question.text
              ) {
                questions.push({
                  ...question,
                  category: category.name,
                  subCategory: subCategory.name,
                  categoryIcon: category.icon || "❓",
                });
              }
            });
          }
        }
      });
    }
  });

  return questions.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    if (!a.subCategory && b.subCategory) return -1;
    if (a.subCategory && !b.subCategory) return 1;
    if (a.subCategory && b.subCategory && a.subCategory !== b.subCategory) {
      return a.subCategory.localeCompare(b.subCategory);
    }
    return a.id.localeCompare(b.id);
  });
};

const CyberResilienceScorecard = () => {
  const [currentStep, setCurrentStep] = useState(-3);
  const [email, setEmail] = useState(DEMO_MODE ? DEMO_EMAIL : "");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [finalScore, setFinalScore] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [categoryResults, setCategoryResults] = useState({});
  const [startTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState(null);

  // Memoize expensive calculations
  const allQuestions = useMemo(
    () => getAllQuestions(selectedSubCategories.length > 0 ? selectedSubCategories : null),
    [selectedSubCategories]
  );

  const totalQuestions = allQuestions.length;
  const currentQuestion = currentStep >= 0 ? allQuestions[currentStep] : null;
  const answeredCount = Object.keys(answers).filter((id) =>
    allQuestions.find((q) => q.id === id)
  ).length;

  // Calculate progress
  const totalSteps = totalQuestions + 3;
  const currentStepForProgress = currentStep + 3;
  const progressPercent = (currentStepForProgress / totalSteps) * 100;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showResults) return;
      
      if (e.key === 'ArrowLeft' && currentStep > -3) {
        goBack();
      } else if (e.key === 'ArrowRight') {
        if (currentStep === -3) {
          handleContinueFromIntro();
        } else if (currentStep === -2 && selectedSubCategories.length > 0) {
          handleCategoriesSubmit();
        } else if (currentStep === -1 && email) {
          handleEmailSubmit();
        }
      }
      
      // Quick answer with number keys (1-4)
      if (currentStep >= 0 && ['1', '2', '3', '4'].includes(e.key)) {
        const answerMap = { '1': 'yes', '2': 'partial', '3': 'no', '4': 'na' };
        handleAnswer(answerMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, selectedSubCategories, email, showResults]);

  // Animate score on results
  useEffect(() => {
    if (showResults && finalScore > 0) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = finalScore / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= finalScore) {
          setAnimatedScore(finalScore);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [showResults, finalScore]);

  // Demo mode: Auto-fill random answers
  const fillDemoAnswers = useCallback(() => {
    if (!DEMO_MODE) return;
    
    const demoAnswers = {};
    const answerOptions = ['yes', 'partial', 'no', 'na'];
    const weights = [0.6, 0.25, 0.1, 0.05]; // Weighted towards positive answers for demo
    
    allQuestions.forEach(question => {
      const random = Math.random();
      let cumulative = 0;
      for (let i = 0; i < weights.length; i++) {
        cumulative += weights[i];
        if (random < cumulative) {
          demoAnswers[question.id] = answerOptions[i];
          break;
        }
      }
    });
    
    setAnswers(demoAnswers);
    calculateAndSubmitScore();
  }, [allQuestions]);

  const handleContinueFromIntro = () => {
    setCurrentStep(-2);
  };

  const toggleCategoryExpansion = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const handleSubCategorySelection = (categoryName, subCategoryName) => {
    const subCategoryKey = `${categoryName}:${subCategoryName}`;
    setSelectedSubCategories((prev) => {
      if (prev.includes(subCategoryKey)) {
        return prev.filter((key) => key !== subCategoryKey);
      } else {
        return [...prev, subCategoryKey];
      }
    });
  };

  const handleSelectAllInCategory = (categoryName) => {
    try {
      const category = scorecardData.categories.find(
        (cat) => cat.name === categoryName,
      );
      if (!category || !category.subCategories) return;

      const categorySubCategoryKeys = category.subCategories
        .filter(sc => sc.questions && sc.questions.length > 0) // Only include non-empty subcategories
        .map((subCat) => `${categoryName}:${subCat.name}`);

      const allSelected = categorySubCategoryKeys.every((key) =>
        selectedSubCategories.includes(key),
      );

      if (allSelected) {
        setSelectedSubCategories((prev) =>
          prev.filter((key) => !categorySubCategoryKeys.includes(key)),
        );
      } else {
        setSelectedSubCategories((prev) => [
          ...prev.filter((key) => !categorySubCategoryKeys.includes(key)),
          ...categorySubCategoryKeys,
        ]);
      }
    } catch (error) {
      console.error("Error in handleSelectAllInCategory:", error);
    }
  };

  const getCategorySelectionStatus = (categoryName) => {
    const category = scorecardData.categories.find(
      (cat) => cat.name === categoryName,
    );
    if (!category || !category.subCategories) return "none";

    const categorySubCategoryKeys = category.subCategories
      .filter(sc => sc.questions && sc.questions.length > 0)
      .map((subCat) => `${categoryName}:${subCat.name}`);

    const selectedCount = categorySubCategoryKeys.filter((key) =>
      selectedSubCategories.includes(key),
    ).length;

    if (selectedCount === 0) return "none";
    if (selectedCount === categorySubCategoryKeys.length) return "all";
    return "partial";
  };

  const handleCategoriesSubmit = () => {
    if (selectedSubCategories.length === 0) {
      alert("Please select at least one sub-category to assess");
      return;
    }
    setCurrentStep(-1);
  };

  const handleEmailSubmit = () => {
    const emailValidation = validateEmail(email);

    if (!emailValidation.isValid) {
      alert(`Invalid email: ${emailValidation.errors.join(", ")}`);
      return;
    }

    setEmail(emailValidation.sanitized);
    
    if (DEMO_MODE) {
      // In demo mode, show a quick fill option
      if (confirm("Demo Mode: Would you like to auto-fill sample answers for a quick demo?")) {
        fillDemoAnswers();
        return;
      }
    }
    
    setCurrentStep(0);
  };

  const handleAnswer = (answer) => {
    if (currentQuestion) {
      const answerValidation = validateAnswer(answer);
      if (!answerValidation.isValid) {
        console.error("Invalid answer:", answerValidation.errors);
        return;
      }

      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answerValidation.sanitized,
      }));

      setTimeout(() => {
        if (currentStep < totalQuestions - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          calculateAndSubmitScore();
        }
      }, 200); // Reduced delay for snappier feel
    }
  };

  const goBack = () => {
    if (currentStep > -3) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateAndSubmitScore = async () => {
    // Calculate completion time
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000); // in seconds
    setCompletionTime(timeTaken);

    let totalScore = 0;
    let totalMax = 0;
    const categoryResultsData = {};
    const recommendationsList = [];

    scorecardData.categories.forEach((category) => {
      let categoryScore = 0;
      let categoryMax = 0;

      if (!category || typeof category !== "object" || !category.name) {
        return;
      }

      const categoryHasSelectedSubCategories = selectedSubCategories.some(
        (key) => key.startsWith(`${category.name}:`),
      );

      // Always include Backup Architecture in scoring, or include if category has selected subcategories
      if ((category.name === "Backup Architecture" || categoryHasSelectedSubCategories) && category.questions) {
        if (Array.isArray(category.questions)) {
          category.questions.forEach((question) => {
            if (!question || !question.id || !question.text) return;
            
            const answer = answers[question.id];
            const weight = typeof question.weight === "number" ? question.weight : 1;
            categoryMax += weight;

            switch (answer) {
              case "yes":
                categoryScore += weight;
                break;
              case "partial":
                categoryScore += weight * 0.5;
                recommendationsList.push({
                  category: category.name,
                  subCategory: null,
                  question: question.id,
                  text: question.text,
                  status: "partial",
                  potentialPoints: weight * 0.5,
                });
                break;
              case "no":
                recommendationsList.push({
                  category: category.name,
                  subCategory: null,
                  question: question.id,
                  text: question.text,
                  status: "missing",
                  potentialPoints: weight,
                });
                break;
              case "na":
                categoryMax -= weight;
                break;
            }
          });
        }
      }

      if (category.subCategories && Array.isArray(category.subCategories)) {
        category.subCategories.forEach((subCategory) => {
          const subCategoryKey = `${category.name}:${subCategory.name}`;
          if (selectedSubCategories.includes(subCategoryKey)) {
            if (subCategory.questions && Array.isArray(subCategory.questions)) {
              subCategory.questions.forEach((question) => {
                if (!question || !question.id || !question.text) return;
                
                const answer = answers[question.id];
                const weight = typeof question.weight === "number" ? question.weight : 1;
                categoryMax += weight;

                switch (answer) {
                  case "yes":
                    categoryScore += weight;
                    break;
                  case "partial":
                    categoryScore += weight * 0.5;
                    recommendationsList.push({
                      category: category.name,
                      subCategory: subCategory.name,
                      question: question.id,
                      text: question.text,
                      status: "partial",
                      potentialPoints: weight * 0.5,
                    });
                    break;
                  case "no":
                    recommendationsList.push({
                      category: category.name,
                      subCategory: subCategory.name,
                      question: question.id,
                      text: question.text,
                      status: "missing",
                      potentialPoints: weight,
                    });
                    break;
                  case "na":
                    categoryMax -= weight;
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
          percentage: (categoryScore / categoryMax) * 100,
        };
        totalScore += categoryScore;
        totalMax += categoryMax;
      }
    });

    const normalizedScore = totalMax > 0 ? (totalScore / totalMax) * 100 : 0;
    const calculatedFinalScore = Math.round(normalizedScore);

    setFinalScore(calculatedFinalScore);
    setCategoryResults(categoryResultsData);
    setShowResults(true);
    setIsSubmitting(true);

    const categoryScoresArray = Object.entries(categoryResultsData).map(
      ([name, data]) => ({
        name,
        score: data.score,
        max: data.max,
        percentage: data.percentage,
      }),
    );

    const requestBody = {
      email,
      score: calculatedFinalScore,
      categoryScore: categoryScoresArray,
      recommendations: recommendationsList,
      htmlContent: "<h1>Your Report</h1><p>Details here...</p>",
    };

    try {
      const response = await postData("generate-pdf", requestBody);
      console.log("Email sent successfully:", response);
      setEmailSent(true);
    } catch (error) {
      console.error("Error sending email:", error);
      if (error instanceof ApiError) {
        setEmailError(`Failed to send email: ${error.message}`);
      } else {
        setEmailError(
          "An unexpected error occurred while sending your email. Please try again.",
        );
      }
      setEmailSent(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const answerOptions = [
    {
      value: "yes",
      label: "Yes",
      className: "bg-green-500 hover:bg-green-600 text-white",
      icon: "✓",
      key: "1",
    },
    {
      value: "partial",
      label: "Partial",
      className: "bg-orange-500 hover:bg-orange-600 text-white",
      icon: "~",
      key: "2",
    },
    {
      value: "no",
      label: "No",
      className: "bg-red-500 hover:bg-red-600 text-white",
      icon: "✗",
      key: "3",
    },
    {
      value: "na",
      label: "N/A",
      className: "bg-gray-500 hover:bg-gray-600 text-white",
      icon: "—",
      key: "4",
    },
  ];

  // Results screen
  if (showResults) {
    const getScoreColor = (score) => {
      if (score >= 80) return "text-green-600";
      if (score >= 60) return "text-yellow-600";
      if (score >= 40) return "text-orange-600";
      return "text-red-600";
    };

    const getScoreGrade = (score) => {
      if (score >= 80) return "Excellent";
      if (score >= 60) return "Good";
      if (score >= 40) return "Fair";
      return "Needs Improvement";
    };

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div className="min-h-screen p-6 relative" style={BACKGROUND_STYLE}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Score Display with Animation */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Assessment Complete!
              </h2>
              {completionTime && (
                <p className="text-sm text-gray-500 mb-4">
                  Completed in {formatTime(completionTime)}
                </p>
              )}
              <div className="mb-6">
                <div
                  className={`text-6xl font-bold ${getScoreColor(animatedScore)} mb-2 transition-all duration-100`}
                >
                  {animatedScore}%
                </div>
                <div className="text-xl text-gray-600">
                  Overall Score:{" "}
                  <span className="font-semibold">
                    {getScoreGrade(finalScore)}
                  </span>
                </div>
              </div>
              
              {DEMO_MODE && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm mb-4">
                  <Zap className="w-4 h-4" />
                  Demo Mode
                </div>
              )}
            </div>

            {/* Category Breakdown */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Score by Category
              </h3>
              <div className="space-y-3">
                {Object.entries(categoryResults).map(([category, data]) => {
                  const percentage = Math.round(data.percentage);
                  return (
                    <div key={category} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">
                          {category}
                        </span>
                        <span className="text-sm text-gray-600">
                          {data.score.toFixed(1)}/{data.max} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            percentage >= 80
                              ? "bg-green-500"
                              : percentage >= 60
                                ? "bg-yellow-500"
                                : percentage >= 40
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                          }`}
                          style={{ 
                            width: `${percentage}%`,
                            animation: 'slideIn 1s ease-out'
                          }}
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
                  <span className="text-blue-700">
                    Sending your detailed report to {email}...
                  </span>
                </div>
              ) : emailSent ? (
                <div>
                  <p className="text-green-700 font-semibold mb-2">
                    ✅ Report sent successfully!
                  </p>
                  <p className="text-gray-600">
                    Your detailed PDF report has been sent to{" "}
                    <span className="font-semibold">{email}</span>
                  </p>
                </div>
              ) : emailError ? (
                <div>
                  <p className="text-red-700 font-semibold mb-2">
                    ⚠️ Unable to send email
                  </p>
                  <p className="text-gray-600">{emailError}</p>
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
                    setEmailError(null);
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

  // Main assessment flow
  return (
    <div className="min-h-screen p-6 relative" style={BACKGROUND_STYLE}>
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

        {/* Main Content Area with simplified animations */}
        <div className="relative h-[600px]">
          {/* Intro Step */}
          {currentStep === -3 && (
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
          )}

          {/* Category Selection Step */}
          {currentStep === -2 && (
            <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-opacity duration-300">
              <div className="h-full flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Select Assessment Categories
                  </h2>
                  <p className="text-gray-600">
                    Choose which areas you'd like to assess
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-4">
                    {scorecardData.categories.map((category) => {
                      if (!category) return null;

                      const isExpanded = expandedCategories[category.name];
                      const selectionStatus = getCategorySelectionStatus(category.name);
                      const hasNonEmptySubcategories = category.subCategories?.some(
                        sc => sc.questions && sc.questions.length > 0
                      );

                      // Skip categories with no questions at all
                      if (!category.questions?.length && !hasNonEmptySubcategories) {
                        return null;
                      }

                      const categoryQuestions = category.questions?.length || 0;
                      const subCategoryQuestions = category.subCategories?.reduce(
                        (sum, subCat) => sum + (subCat.questions?.length || 0),
                        0
                      ) || 0;
                      const totalQuestions = categoryQuestions + subCategoryQuestions;
                      const nonEmptySubcategoryCount = category.subCategories?.filter(
                        sc => sc.questions && sc.questions.length > 0
                      ).length || 0;

                      return (
                        <div
                          key={category.name}
                          className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white"
                        >
                          <div
                            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleCategoryExpansion(category.name)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{category.icon}</span>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800">
                                    {category.name}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {categoryQuestions > 0 && `${categoryQuestions} general, `}
                                    {nonEmptySubcategoryCount > 0 && `${nonEmptySubcategoryCount} areas, `}
                                    {totalQuestions} total questions
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {nonEmptySubcategoryCount > 0 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelectAllInCategory(category.name);
                                    }}
                                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                      selectionStatus === "all"
                                        ? "bg-indigo-600 text-white"
                                        : selectionStatus === "partial"
                                          ? "bg-indigo-200 text-indigo-800"
                                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                  >
                                    {selectionStatus === "all" ? "Deselect All" : "Select All"}
                                  </button>
                                )}
                                {isExpanded ? <ChevronUp /> : <ChevronDown />}
                              </div>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="border-t border-gray-200 bg-gray-50">
                              {categoryQuestions > 0 && nonEmptySubcategoryCount > 0 && (
                                <div className="p-4 bg-blue-50 border-b border-gray-200">
                                  <p className="text-sm text-blue-700 ml-8">
                                    <span className="font-medium">Note:</span> Selecting any area includes {categoryQuestions} general questions
                                  </p>
                                </div>
                              )}
                              {category.subCategories?.map((subCategory) => {
                                // Skip empty subcategories
                                if (!subCategory.questions || subCategory.questions.length === 0) {
                                  return null;
                                }

                                const subCategoryKey = `${category.name}:${subCategory.name}`;
                                const isSelected = selectedSubCategories.includes(subCategoryKey);

                                return (
                                  <div
                                    key={subCategory.name}
                                    onClick={() => handleSubCategorySelection(category.name, subCategory.name)}
                                    className={`cursor-pointer p-4 border-b border-gray-200 last:border-b-0 transition-colors ${
                                      isSelected ? "bg-indigo-50" : "hover:bg-white"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between ml-8">
                                      <div>
                                        <h4 className="font-medium text-gray-800">
                                          {subCategory.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                          {subCategory.questions.length} questions
                                        </p>
                                      </div>
                                      <div
                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                          isSelected
                                            ? "bg-indigo-600 border-indigo-600"
                                            : "border-gray-300"
                                        }`}
                                      >
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
                    })}
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
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={selectedSubCategories.length === 0}
                  >
                    Continue ({selectedSubCategories.length} selected)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Email Step */}
          {currentStep === -1 && (
            <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-opacity duration-300">
              <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto">
                <Mail className="w-16 h-16 text-indigo-600 mb-6" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Enter Your Email
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  We'll send your personalized report to this email address.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
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
          {currentStep >= 0 && currentQuestion && (
            <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-opacity duration-300">
              <div className="h-full flex flex-col">
                {/* Category Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-indigo-600 mb-1">
                    <span className="text-2xl">{currentQuestion.categoryIcon}</span>
                    <span className="font-semibold">{currentQuestion.category}</span>
                  </div>
                  {currentQuestion.subCategory && (
                    <div className="text-sm text-gray-600 ml-10">
                      {currentQuestion.subCategory}
                    </div>
                  )}
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
                      className={`${option.className} py-6 px-8 rounded-xl text-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-3 relative`}
                    >
                      <span className="text-2xl">{option.icon}</span>
                      {option.label}
                      <span className="absolute top-2 right-2 text-xs opacity-60">
                        {option.key}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="mt-8 flex justify-between items-center">
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>

                  <div className="text-gray-500">
                    {answeredCount} / {totalQuestions} completed
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
      
      <style jsx>{`
        @keyframes slideIn {
          from { width: 0; }
          to { width: var(--final-width); }
        }
      `}</style>
    </div>
  );
};

export default CyberResilienceScorecard;