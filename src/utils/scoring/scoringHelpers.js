import { scorecardData } from '../../scorecardData';
import { postData, ApiError } from '../apiUtils';

export const calculateAndSubmitScore = async (
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
) => {
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
      (key) => key.startsWith(`${category.name}:`)
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
    })
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
        "An unexpected error occurred while sending your email. Please try again."
      );
    }
    setEmailSent(false);
  } finally {
    setIsSubmitting(false);
  }
};

export const getScoreColor = (score) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  if (score >= 40) return "text-orange-600";
  return "text-red-600";
};

export const getScoreMessage = (score) => {
  if (score >= 80)
    return "Excellent! Your organization demonstrates strong cyber resilience.";
  if (score >= 60)
    return "Good progress, but there are areas for improvement.";
  if (score >= 40)
    return "Significant gaps identified. Immediate action recommended.";
  return "Critical vulnerabilities detected. Urgent improvements needed.";
};