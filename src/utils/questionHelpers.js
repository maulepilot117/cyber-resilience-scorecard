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
      const answers = ["yes", "partial", "no", "na"];
      answeredQuestions[question.id] = answers[Math.floor(Math.random() * answers.length)];
    }
  });
  
  return answeredQuestions;
};