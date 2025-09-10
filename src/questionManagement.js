/**
 * Question Management Utilities
 * 
 * This file provides easy-to-use functions for managing questions
 * without worrying about renumbering or complex data structures
 */

import { questions, categories, subcategories } from './scorecardDataV2';

/**
 * ============================================
 * ADDING QUESTIONS
 * ============================================
 */

/**
 * Add a new question to Cloud > AWS section
 * Example: Adding a question about S3 bucket protection
 */
export function exampleAddCloudQuestion() {
  const newQuestion = {
    id: "cloud-aws-s3-versioning",
    category: "Cloud",
    subcategory: "cloud-aws",
    order: 2005, // Between 2000 and 2010 (existing AWS questions)
    text: "Are S3 buckets protected with versioning and MFA delete enabled?",
    weight: 3,
    tags: ["aws", "s3", "versioning", "data-protection"],
    pdfConfig: {
      shortName: "S3 Versioning Protection",
      responses: {
        yes: {
          summary: "✅ S3 buckets protected",
          detail: "Versioning and MFA delete provide protection against accidental or malicious deletion."
        },
        no: {
          summary: "⚠️ S3 buckets vulnerable",
          detail: "Without versioning and MFA delete, S3 data can be permanently lost.",
          recommendation: "Enable versioning and MFA delete on all critical S3 buckets.",
          priority: "High"
        }
      }
    }
  };
  
  // Add the question to the array
  questions.push(newQuestion);
  
  // Re-sort to maintain order
  questions.sort((a, b) => a.order - b.order);
  
  console.log(`Added question: ${newQuestion.id}`);
  return newQuestion;
}

/**
 * Add multiple questions at once
 */
export function addMultipleQuestions(newQuestions) {
  // Validate all questions have required fields
  newQuestions.forEach(q => {
    if (!q.id || !q.category || !q.order || !q.text || !q.weight) {
      throw new Error(`Invalid question: ${JSON.stringify(q)}`);
    }
  });
  
  // Add all questions
  questions.push(...newQuestions);
  
  // Re-sort
  questions.sort((a, b) => a.order - b.order);
  
  console.log(`Added ${newQuestions.length} questions`);
  return newQuestions;
}

/**
 * ============================================
 * FINDING QUESTIONS
 * ============================================
 */

/**
 * Find questions by various criteria
 */
export function findQuestions(criteria) {
  return questions.filter(q => {
    if (criteria.category && q.category !== criteria.category) return false;
    if (criteria.subcategory && q.subcategory !== criteria.subcategory) return false;
    if (criteria.tags && !criteria.tags.some(tag => q.tags?.includes(tag))) return false;
    if (criteria.weight && q.weight !== criteria.weight) return false;
    if (criteria.search && !q.text.toLowerCase().includes(criteria.search.toLowerCase())) return false;
    return true;
  });
}

// Example: Find all critical AWS questions
export function findCriticalAWSQuestions() {
  return findQuestions({
    subcategory: 'cloud-aws',
    weight: 4
  });
}

// Example: Find all ransomware-related questions
export function findRansomwareQuestions() {
  return findQuestions({
    tags: ['ransomware']
  });
}

/**
 * ============================================
 * REORDERING QUESTIONS
 * ============================================
 */

/**
 * Move a question to a different position
 */
export function moveQuestion(questionId, newPosition) {
  const questionIndex = questions.findIndex(q => q.id === questionId);
  if (questionIndex === -1) {
    throw new Error(`Question ${questionId} not found`);
  }
  
  const question = questions[questionIndex];
  
  // Find questions before and after the target position
  const sortedQuestions = questions
    .filter(q => q.category === question.category)
    .sort((a, b) => a.order - b.order);
  
  if (newPosition === 'first') {
    question.order = sortedQuestions[0].order - 100;
  } else if (newPosition === 'last') {
    question.order = sortedQuestions[sortedQuestions.length - 1].order + 100;
  } else if (typeof newPosition === 'string') {
    // Position after another question ID
    const targetQuestion = questions.find(q => q.id === newPosition);
    if (!targetQuestion) {
      throw new Error(`Target question ${newPosition} not found`);
    }
    const targetIndex = sortedQuestions.findIndex(q => q.id === newPosition);
    const nextQuestion = sortedQuestions[targetIndex + 1];
    
    question.order = nextQuestion 
      ? (targetQuestion.order + nextQuestion.order) / 2
      : targetQuestion.order + 100;
  } else {
    // Direct order value
    question.order = newPosition;
  }
  
  // Re-sort
  questions.sort((a, b) => a.order - b.order);
  
  return question;
}

/**
 * ============================================
 * UPDATING QUESTIONS
 * ============================================
 */

/**
 * Update a question's properties
 */
export function updateQuestion(questionId, updates) {
  const question = questions.find(q => q.id === questionId);
  if (!question) {
    throw new Error(`Question ${questionId} not found`);
  }
  
  // Apply updates
  Object.assign(question, updates);
  
  // Re-sort if order was changed
  if ('order' in updates) {
    questions.sort((a, b) => a.order - b.order);
  }
  
  return question;
}

// Example: Update a question's weight and PDF response
export function exampleUpdateQuestion() {
  return updateQuestion('backup-immutable-filesystem', {
    weight: 5, // Increase importance
    pdfConfig: {
      ...questions.find(q => q.id === 'backup-immutable-filesystem').pdfConfig,
      responses: {
        ...questions.find(q => q.id === 'backup-immutable-filesystem').pdfConfig.responses,
        no: {
          summary: "🚨 CRITICAL: No immutable storage",
          detail: "This is now considered a critical gap that must be addressed immediately.",
          recommendation: "Immediately implement append-only filesystem protection.",
          priority: "Critical"
        }
      }
    }
  });
}

/**
 * ============================================
 * BULK OPERATIONS
 * ============================================
 */

/**
 * Rebalance order values when they get too close
 * This prevents decimal order values from getting too precise
 */
export function rebalanceCategory(categoryName) {
  const categoryQuestions = questions
    .filter(q => q.category === categoryName)
    .sort((a, b) => a.order - b.order);
  
  // Determine base order based on category
  const categoryBases = {
    'Backup Architecture': 1000,
    'Cloud': 2000,
    'Databases': 3000,
    'Identity & Access Management': 5000,
    'Cyber Tools': 6000
  };
  
  const baseOrder = categoryBases[categoryName] || 9000;
  
  // Reassign orders with consistent gaps
  categoryQuestions.forEach((q, index) => {
    q.order = baseOrder + (index * 100);
  });
  
  console.log(`Rebalanced ${categoryQuestions.length} questions in ${categoryName}`);
  return categoryQuestions;
}

/**
 * Add a new subcategory with questions
 */
export function addNewSubcategory(parentCategory, subcategoryName, subcategoryQuestions) {
  // Create subcategory ID
  const subcatId = `${parentCategory.toLowerCase().replace(/\s+/g, '-')}-${subcategoryName.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Add to subcategories
  subcategories[subcatId] = {
    parent: parentCategory,
    name: subcategoryName,
    description: `${subcategoryName} assessment questions`
  };
  
  // Determine order range for new questions
  const existingCategoryQuestions = questions.filter(q => q.category === parentCategory);
  const maxOrder = Math.max(...existingCategoryQuestions.map(q => q.order));
  let nextOrder = Math.ceil(maxOrder / 100) * 100 + 100;
  
  // Add questions
  subcategoryQuestions.forEach((q, index) => {
    questions.push({
      ...q,
      category: parentCategory,
      subcategory: subcatId,
      order: nextOrder + (index * 10)
    });
  });
  
  // Re-sort
  questions.sort((a, b) => a.order - b.order);
  
  console.log(`Added subcategory ${subcategoryName} with ${subcategoryQuestions.length} questions`);
  return subcatId;
}

/**
 * ============================================
 * IMPORT/EXPORT
 * ============================================
 */

/**
 * Export questions to JSON for backup or sharing
 */
export function exportToJSON(pretty = true) {
  const data = {
    version: "2.0",
    exportDate: new Date().toISOString(),
    categories,
    subcategories,
    questions: questions.sort((a, b) => a.order - b.order)
  };
  
  return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
}

/**
 * Export to CSV for editing in Excel/Google Sheets
 */
export function exportToCSV() {
  const headers = [
    'ID',
    'Category', 
    'Subcategory',
    'Order',
    'Text',
    'Weight',
    'Tags',
    'PDF_Yes_Summary',
    'PDF_No_Summary',
    'PDF_Recommendation',
    'PDF_Priority'
  ];
  
  const rows = questions.map(q => [
    q.id,
    q.category,
    q.subcategory || '',
    q.order,
    `"${q.text.replace(/"/g, '""')}"`,
    q.weight,
    (q.tags || []).join(';'),
    q.pdfConfig?.responses?.yes?.summary || '',
    q.pdfConfig?.responses?.no?.summary || '',
    q.pdfConfig?.responses?.no?.recommendation || '',
    q.pdfConfig?.responses?.no?.priority || ''
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

/**
 * Import questions from CSV
 * CSV should have headers: ID, Category, Subcategory, Order, Text, Weight, Tags
 */
export function importFromCSV(csvContent) {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const newQuestions = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    // Parse CSV line (handle quoted fields)
    const values = lines[i].match(/(".*?"|[^,]+)/g).map(v => v.replace(/^"|"$/g, ''));
    
    const question = {
      id: values[headers.indexOf('ID')],
      category: values[headers.indexOf('Category')],
      subcategory: values[headers.indexOf('Subcategory')] || null,
      order: parseInt(values[headers.indexOf('Order')]),
      text: values[headers.indexOf('Text')],
      weight: parseInt(values[headers.indexOf('Weight')]),
      tags: values[headers.indexOf('Tags')]?.split(';').filter(t => t) || []
    };
    
    // Add PDF config if provided
    if (headers.includes('PDF_Yes_Summary')) {
      question.pdfConfig = {
        shortName: question.text.substring(0, 50) + '...',
        responses: {
          yes: {
            summary: values[headers.indexOf('PDF_Yes_Summary')] || '✅ Requirement met'
          },
          no: {
            summary: values[headers.indexOf('PDF_No_Summary')] || '⚠️ Gap identified',
            recommendation: values[headers.indexOf('PDF_Recommendation')] || '',
            priority: values[headers.indexOf('PDF_Priority')] || 'Medium'
          },
          na: {
            summary: '⚪ Not applicable'
          }
        }
      };
    }
    
    newQuestions.push(question);
  }
  
  // Replace existing questions
  questions.length = 0;
  questions.push(...newQuestions);
  questions.sort((a, b) => a.order - b.order);
  
  console.log(`Imported ${newQuestions.length} questions from CSV`);
  return newQuestions;
}

/**
 * ============================================
 * VALIDATION & TESTING
 * ============================================
 */

/**
 * Validate all questions have required fields and no duplicates
 */
export function validateQuestions() {
  const issues = [];
  const seenIds = new Set();
  const seenOrders = new Map();
  
  questions.forEach((q, index) => {
    // Check for duplicate IDs
    if (seenIds.has(q.id)) {
      issues.push(`Duplicate ID: ${q.id} at index ${index}`);
    }
    seenIds.add(q.id);
    
    // Check for required fields
    if (!q.id) issues.push(`Missing ID at index ${index}`);
    if (!q.category) issues.push(`Missing category for ${q.id}`);
    if (!q.text) issues.push(`Missing text for ${q.id}`);
    if (!q.weight) issues.push(`Missing weight for ${q.id}`);
    if (q.order === undefined) issues.push(`Missing order for ${q.id}`);
    
    // Check for very close order values (might need rebalancing)
    const categoryKey = `${q.category}:${q.subcategory || 'none'}`;
    if (!seenOrders.has(categoryKey)) {
      seenOrders.set(categoryKey, []);
    }
    seenOrders.get(categoryKey).push({ id: q.id, order: q.order });
  });
  
  // Check for order values that are too close
  seenOrders.forEach((questions, category) => {
    const sorted = questions.sort((a, b) => a.order - b.order);
    for (let i = 1; i < sorted.length; i++) {
      const gap = sorted[i].order - sorted[i-1].order;
      if (gap < 1) {
        issues.push(`Orders too close in ${category}: ${sorted[i-1].id} (${sorted[i-1].order}) and ${sorted[i].id} (${sorted[i].order})`);
      }
    }
  });
  
  return {
    valid: issues.length === 0,
    issues,
    stats: {
      totalQuestions: questions.length,
      categories: new Set(questions.map(q => q.category)).size,
      subcategories: new Set(questions.filter(q => q.subcategory).map(q => q.subcategory)).size
    }
  };
}

// Example usage
if (typeof window === 'undefined') {
  console.log('Question Management Utilities Loaded');
  console.log('Available functions:');
  console.log('  - addMultipleQuestions(questions)');
  console.log('  - findQuestions(criteria)');
  console.log('  - moveQuestion(id, newPosition)');
  console.log('  - updateQuestion(id, updates)');
  console.log('  - rebalanceCategory(categoryName)');
  console.log('  - exportToCSV()');
  console.log('  - importFromCSV(content)');
  console.log('  - validateQuestions()');
}