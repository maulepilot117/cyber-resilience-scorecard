import { scorecardData } from '../scorecardData';

// Flatten all questions into a single array with category and sub-category info
export const getAllQuestions = (selectedSubCategories = null) => {
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

    // Always include Backup Architecture and Cyber Tools questions, or include if category has selected subcategories
    const alwaysIncludedCategories = ["Backup Architecture", "Cyber Tools"];
    if (alwaysIncludedCategories.includes(category.name) || !selectedSubCategories || categoryHasSelectedSubCategories) {
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

  // Sort questions by their ID to maintain consistent ordering
  return questions.sort((a, b) => {
    // Extract numeric parts from IDs for proper numerical sorting
    const getNumericId = (id) => {
      const parts = id.split('.');
      return parts.map(part => parseInt(part, 10));
    };
    
    const aIdParts = getNumericId(a.id);
    const bIdParts = getNumericId(b.id);
    
    // Compare each part of the ID
    for (let i = 0; i < Math.max(aIdParts.length, bIdParts.length); i++) {
      const aPart = aIdParts[i] || 0;
      const bPart = bIdParts[i] || 0;
      
      if (aPart !== bPart) {
        return aPart - bPart;
      }
    }
    
    return 0;
  });
};

// Get a subset of questions for quick demo fill
export const getQuestionSubset = (questions, percentage = 0.3) => {
  const totalQuestions = questions.length;
  const questionsToAnswer = Math.max(1, Math.floor(totalQuestions * percentage));
  
  const answeredQuestions = {};
  const selectedIndices = new Set();
  
  while (selectedIndices.size < questionsToAnswer) {
    const randomIndex = Math.floor(Math.random() * totalQuestions);
    selectedIndices.add(randomIndex);
  }
  
  selectedIndices.forEach(index => {
    const question = questions[index];
    if (question && question.id) {
      const answers = ["yes", "no", "na"];
      answeredQuestions[question.id] = answers[Math.floor(Math.random() * answers.length)];
    }
  });
  
  return answeredQuestions;
};