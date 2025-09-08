import React, { useState, useEffect, useMemo, useCallback } from "react";
import { scorecardData } from "./scorecardData";
import { validateEmail, sanitizeString } from "./utils/validationUtils";
import { calculateAndSubmitScore } from "./utils/scoring/scoringHelpers";
import { getAllQuestions, getQuestionSubset } from "./utils/questionHelpers";
import { BACKGROUND_STYLE, DEMO_MODE, DEMO_EMAIL } from "./constants/assessmentConstants";
import ErrorBoundary from "./ErrorBoundary";

// Import components
import IntroStep from "./components/IntroStep";
import CategorySelection from "./components/CategorySelection";
import EmailStep from "./components/EmailStep";
import QuestionStep from "./components/QuestionStep";
import ProgressHeader from "./components/ProgressHeader";
import SummaryResults from "./components/SummaryResults";

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
  const [categoryResults, setCategoryResults] = useState({});
  const [startTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState(null);

  // Memoize questions based on selected subcategories
  const questions = useMemo(
    () => getAllQuestions(selectedSubCategories),
    [selectedSubCategories]
  );

  const totalQuestions = questions.length;
  const currentQuestion = currentStep >= 0 ? questions[currentStep] : null;
  const answeredCount = Object.keys(answers).filter(
    (qId) => answers[qId] && questions.some((q) => q.id === qId)
  ).length;
  const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (currentStep >= 0 && currentQuestion) {
        switch (event.key) {
          case "ArrowLeft":
            goBack();
            break;
          case "ArrowRight":
            goNext();
            break;
          case "1":
            handleAnswer(currentQuestion.id, "yes");
            break;
          case "2":
            handleAnswer(currentQuestion.id, "partial");
            break;
          case "3":
            handleAnswer(currentQuestion.id, "no");
            break;
          case "4":
            handleAnswer(currentQuestion.id, "na");
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentStep, currentQuestion]);

  const handleAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }, []);

  const goBack = () => {
    if (currentStep > -3) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goNext = () => {
    if (currentStep === totalQuestions - 1) {
      submitAssessment();
    } else if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleContinueFromIntro = () => {
    setCurrentStep(-2);
  };

  const handleCategoriesSubmit = () => {
    if (selectedSubCategories.length > 0) {
      setCurrentStep(-1);
    }
  };

  const handleEmailSubmit = () => {
    if (DEMO_MODE || validateEmail(email)) {
      setCurrentStep(0);
    } else {
      alert("Please enter a valid email address.");
    }
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
      const category = scorecardData.categories.find((cat) => cat.name === categoryName);
      if (!category || !category.subCategories) return;

      const categorySubCategoryKeys = category.subCategories
        .filter(sc => sc.questions && sc.questions.length > 0)
        .map((subCat) => `${categoryName}:${subCat.name}`);

      const allSelected = categorySubCategoryKeys.every((key) =>
        selectedSubCategories.includes(key)
      );

      if (allSelected) {
        setSelectedSubCategories((prev) =>
          prev.filter((key) => !categorySubCategoryKeys.includes(key))
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
    const category = scorecardData.categories.find((cat) => cat.name === categoryName);
    if (!category || !category.subCategories) return "none";

    const categorySubCategoryKeys = category.subCategories
      .filter(sc => sc.questions && sc.questions.length > 0)
      .map((subCat) => `${categoryName}:${subCat.name}`);

    if (categorySubCategoryKeys.length === 0) return "none";

    const selectedCount = categorySubCategoryKeys.filter((key) =>
      selectedSubCategories.includes(key)
    ).length;

    if (selectedCount === 0) return "none";
    if (selectedCount === categorySubCategoryKeys.length) return "all";
    return "partial";
  };

  const quickFillDemo = () => {
    const demoAnswers = getQuestionSubset(questions, 0.3);
    setAnswers(demoAnswers);
  };

  const submitAssessment = async () => {
    await calculateAndSubmitScore(
      email,
      selectedSubCategories,
      answers,
      startTime,
      setCompletionTime,
      setFinalScore,
      setCategoryResults,
      setShowResults,
      setIsSubmitting,
      setEmailSent,
      setEmailError
    );
  };

  // Show results page if assessment is complete
  if (showResults) {
    return (
      <SummaryResults
        finalScore={finalScore}
        categoryResults={categoryResults}
        email={email}
        isSubmitting={isSubmitting}
        emailSent={emailSent}
        emailError={emailError}
        setEmailError={setEmailError}
        setEmailSent={setEmailSent}
        calculateAndSubmitScore={() => submitAssessment()}
        completionTime={completionTime}
      />
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
        <ProgressHeader
          currentStep={currentStep}
          totalQuestions={totalQuestions}
          answeredCount={answeredCount}
          progressPercent={progressPercent}
        />

        {/* Main Content Area */}
        <div className="relative h-[600px]">
          {/* Intro Step */}
          {currentStep === -3 && (
            <IntroStep handleContinueFromIntro={handleContinueFromIntro} />
          )}

          {/* Category Selection Step */}
          {currentStep === -2 && (
            <CategorySelection
              selectedSubCategories={selectedSubCategories}
              expandedCategories={expandedCategories}
              toggleCategoryExpansion={toggleCategoryExpansion}
              handleSubCategorySelection={handleSubCategorySelection}
              handleSelectAllInCategory={handleSelectAllInCategory}
              getCategorySelectionStatus={getCategorySelectionStatus}
              handleCategoriesSubmit={handleCategoriesSubmit}
              goBack={goBack}
            />
          )}

          {/* Email Step */}
          {currentStep === -1 && (
            <EmailStep
              email={email}
              setEmail={setEmail}
              handleEmailSubmit={handleEmailSubmit}
              goBack={goBack}
            />
          )}

          {/* Questions */}
          {currentStep >= 0 && currentQuestion && (
            <QuestionStep
              currentQuestion={currentQuestion}
              currentStep={currentStep}
              answers={answers}
              handleAnswer={handleAnswer}
              goBack={goBack}
              goNext={goNext}
              totalQuestions={totalQuestions}
              quickFillDemo={quickFillDemo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const CyberResilienceScorecardWithErrorBoundary = () => (
  <ErrorBoundary>
    <CyberResilienceScorecard />
  </ErrorBoundary>
);

export default CyberResilienceScorecardWithErrorBoundary;