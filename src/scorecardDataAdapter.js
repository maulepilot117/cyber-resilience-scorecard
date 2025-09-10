/**
 * Adapter to make V2 structure work with existing app
 * 
 * This converts the new flat structure back to the nested format
 * expected by the current app, allowing gradual migration
 */

import { questions, categories, subcategories } from './scorecardDataV2';

/**
 * Convert V2 structure to V1 format for compatibility
 */
export function convertToV1Format() {
  const v1Categories = [];
  
  // Group questions by category
  const questionsByCategory = {};
  questions.forEach(q => {
    if (!questionsByCategory[q.category]) {
      questionsByCategory[q.category] = {
        main: [],
        subcategories: {}
      };
    }
    
    if (q.subcategory) {
      const subcat = subcategories[q.subcategory];
      if (!questionsByCategory[q.category].subcategories[subcat.name]) {
        questionsByCategory[q.category].subcategories[subcat.name] = [];
      }
      questionsByCategory[q.category].subcategories[subcat.name].push(q);
    } else {
      questionsByCategory[q.category].main.push(q);
    }
  });
  
  // Build V1 structure
  Object.entries(categories).forEach(([catName, catConfig]) => {
    const categoryQuestions = questionsByCategory[catName] || { main: [], subcategories: {} };
    
    const v1Category = {
      name: catName,
      icon: catConfig.icon,
      questions: categoryQuestions.main.map(q => ({
        id: q.id,  // Keep new ID but app will work with it
        text: q.text,
        weight: q.weight
      }))
    };
    
    // Add subcategories if they exist
    if (Object.keys(categoryQuestions.subcategories).length > 0) {
      v1Category.subCategories = Object.entries(categoryQuestions.subcategories).map(([subName, subQuestions]) => ({
        name: subName,
        questions: subQuestions.map(q => ({
          id: q.id,
          text: q.text,
          weight: q.weight
        }))
      }));
    }
    
    v1Categories.push(v1Category);
  });
  
  return {
    categories: v1Categories
  };
}

/**
 * Updated questionHelpers functions that work with V2 structure
 */
export const getAllQuestionsV2 = (selectedSubCategories = null) => {
  const filteredQuestions = [];
  
  questions.forEach(question => {
    const category = categories[question.category];
    
    // Check if should include based on selection
    let shouldInclude = false;
    
    // Always include if category is marked as alwaysInclude
    if (category?.alwaysInclude) {
      shouldInclude = true;
    }
    // Include if no selection (show all)
    else if (!selectedSubCategories) {
      shouldInclude = true;
    }
    // Include if subcategory is selected
    else if (question.subcategory) {
      const subcat = subcategories[question.subcategory];
      const selectionKey = `${question.category}:${subcat.name}`;
      if (selectedSubCategories.includes(selectionKey)) {
        shouldInclude = true;
      }
    }
    // Include category-level questions if any subcategory from that category is selected
    else {
      const categoryHasSelection = selectedSubCategories.some(key => 
        key.startsWith(`${question.category}:`)
      );
      if (categoryHasSelection) {
        shouldInclude = true;
      }
    }
    
    if (shouldInclude) {
      // Format for existing app
      filteredQuestions.push({
        id: question.id,
        text: question.text,
        weight: question.weight,
        category: question.category,
        subCategory: question.subcategory ? subcategories[question.subcategory].name : null,
        categoryIcon: category?.icon || '❓',
        // Include PDF config for enhanced reporting
        pdfConfig: question.pdfConfig
      });
    }
  });
  
  // Sort by order (maintained from V2 structure)
  return filteredQuestions.sort((a, b) => {
    const aOrder = questions.find(q => q.id === a.id)?.order || 0;
    const bOrder = questions.find(q => q.id === b.id)?.order || 0;
    return aOrder - bOrder;
  });
};

/**
 * Drop-in replacement for existing scorecardData export
 * Use this in place of the old scorecardData import
 */
export const scorecardDataV2Compatible = convertToV1Format();

/**
 * Enhanced PDF report generation using V2 PDF configs
 */
export function generateEnhancedPDFContent(questionId, answer) {
  const question = questions.find(q => q.id === questionId);
  if (!question?.pdfConfig) {
    // Fallback to generic response
    return {
      summary: answer === 'yes' ? '✅ Requirement met' : 
               answer === 'no' ? '⚠️ Gap identified' : 
               '⚪ Not applicable',
      detail: ''
    };
  }
  
  const response = question.pdfConfig.responses[answer];
  if (!response) {
    return {
      summary: '⚪ No response configured',
      detail: ''
    };
  }
  
  // Build rich PDF content
  let content = {
    questionText: question.text,
    category: question.category,
    subcategory: question.subcategory ? subcategories[question.subcategory].name : null,
    weight: question.weight,
    answer: answer,
    summary: response.summary,
    detail: response.detail || ''
  };
  
  // Add recommendations for 'no' answers
  if (answer === 'no' && response.recommendation) {
    content.recommendation = response.recommendation;
    content.priority = response.priority || 'Medium';
  }
  
  // Add remediation steps if available
  if (response.remediationSteps) {
    content.remediationSteps = response.remediationSteps;
  }
  
  return content;
}

/**
 * Get category statistics for reporting
 */
export function getCategoryStats(answeredQuestions) {
  const stats = {};
  
  Object.entries(categories).forEach(([catName, catConfig]) => {
    const categoryQuestions = questions.filter(q => q.category === catName);
    const answered = categoryQuestions.filter(q => answeredQuestions[q.id]);
    
    stats[catName] = {
      total: categoryQuestions.length,
      answered: answered.length,
      yesCount: answered.filter(q => answeredQuestions[q.id] === 'yes').length,
      noCount: answered.filter(q => answeredQuestions[q.id] === 'no').length,
      naCount: answered.filter(q => answeredQuestions[q.id] === 'na').length,
      maxPossibleScore: categoryQuestions.reduce((sum, q) => sum + q.weight, 0),
      actualScore: answered.reduce((sum, q) => 
        answeredQuestions[q.id] === 'yes' ? sum + q.weight : sum, 0
      ),
      criticalGaps: answered.filter(q => 
        answeredQuestions[q.id] === 'no' && q.weight >= 4
      ).map(q => ({
        id: q.id,
        text: q.text,
        recommendation: q.pdfConfig?.responses?.no?.recommendation
      }))
    };
  });
  
  return stats;
}

/**
 * Example: How to use in existing app
 * 
 * In your existing files, replace:
 *   import { scorecardData } from './scorecardData';
 * 
 * With:
 *   import { scorecardDataV2Compatible as scorecardData } from './scorecardDataAdapter';
 * 
 * Or for the question helpers:
 *   import { getAllQuestionsV2 as getAllQuestions } from './scorecardDataAdapter';
 */

// Export both old-style and new functions
export default {
  scorecardData: scorecardDataV2Compatible,
  getAllQuestions: getAllQuestionsV2,
  generateEnhancedPDFContent,
  getCategoryStats
};