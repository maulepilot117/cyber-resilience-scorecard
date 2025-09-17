import { getAllQuestionsV2 } from '../scorecardDataAdapter';

// Use V2 adapter to get all questions with selected subcategories filter
export const getAllQuestions = (selectedSubCategories = null) => {
  return getAllQuestionsV2(selectedSubCategories);
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