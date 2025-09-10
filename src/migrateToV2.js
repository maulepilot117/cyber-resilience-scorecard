/**
 * Migration script to convert existing scorecard data to V2 structure
 * Run this to automatically convert your existing questions to the new format
 */

import { scorecardData } from './scorecardData';
import fs from 'fs';

// Helper to generate descriptive IDs from text
function generateDescriptiveId(category, text, index) {
  // Take first few significant words from the question
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .split(' ')
    .filter(word => word.length > 3 && !['your', 'does', 'data', 'with', 'that', 'from', 'have'].includes(word))
    .slice(0, 3);
  
  const categorySlug = category
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  if (words.length > 0) {
    return `${categorySlug}-${words.join('-')}`;
  }
  return `${categorySlug}-q${index}`;
}

// Parse numeric ID to get order value
function parseIdToOrder(id) {
  // Convert "1.01" to 1010, "2.15" to 2150, etc.
  const parts = id.split('.');
  const major = parseInt(parts[0]) || 1;
  const minor = parseInt(parts[1]) || 0;
  return (major * 1000) + (minor * 10);
}

// Main migration function
function migrateData() {
  const newCategories = {};
  const newSubcategories = {};
  const newQuestions = [];
  const idMapping = {}; // Track old ID to new ID mapping
  
  // Process each category
  scorecardData.categories.forEach((category) => {
    // Create category entry
    const categoryName = category.name;
    newCategories[categoryName] = {
      icon: category.icon || '📋',
      alwaysInclude: categoryName === 'Backup Architecture' || categoryName === 'Cyber Tools',
      description: `${categoryName} assessment questions`, // You can customize these
      pdfIntro: `This section evaluates your ${categoryName.toLowerCase()} capabilities.`
    };
    
    // Process category-level questions
    if (category.questions && category.questions.length > 0) {
      category.questions.forEach((question, qIndex) => {
        const oldId = question.id;
        const newId = generateDescriptiveId(categoryName, question.text, qIndex);
        
        idMapping[oldId] = newId;
        
        newQuestions.push({
          id: newId,
          category: categoryName,
          subcategory: null,
          order: parseIdToOrder(oldId),
          text: question.text,
          weight: question.weight,
          tags: generateTags(question.text),
          pdfConfig: generatePdfConfig(question.text, question.weight)
        });
      });
    }
    
    // Process subcategories
    if (category.subCategories && category.subCategories.length > 0) {
      category.subCategories.forEach((subCategory) => {
        const subCatId = `${categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${subCategory.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        
        newSubcategories[subCatId] = {
          parent: categoryName,
          name: subCategory.name,
          description: `${subCategory.name} specific questions`
        };
        
        // Process subcategory questions
        if (subCategory.questions && subCategory.questions.length > 0) {
          subCategory.questions.forEach((question, qIndex) => {
            const oldId = question.id;
            const newId = generateDescriptiveId(`${categoryName}-${subCategory.name}`, question.text, qIndex);
            
            idMapping[oldId] = newId;
            
            newQuestions.push({
              id: newId,
              category: categoryName,
              subcategory: subCatId,
              order: parseIdToOrder(oldId),
              text: question.text,
              weight: question.weight,
              tags: generateTags(question.text),
              pdfConfig: generatePdfConfig(question.text, question.weight)
            });
          });
        }
      });
    }
  });
  
  // Sort questions by order
  newQuestions.sort((a, b) => a.order - b.order);
  
  return {
    categories: newCategories,
    subcategories: newSubcategories,
    questions: newQuestions,
    idMapping: idMapping
  };
}

// Generate tags based on question content
function generateTags(text) {
  const tags = [];
  const lowerText = text.toLowerCase();
  
  // Security-related tags
  if (lowerText.includes('encrypt')) tags.push('encryption');
  if (lowerText.includes('ransomware')) tags.push('ransomware');
  if (lowerText.includes('immutable') || lowerText.includes('immutability')) tags.push('immutability');
  if (lowerText.includes('air gap') || lowerText.includes('airgap')) tags.push('airgap');
  if (lowerText.includes('mfa') || lowerText.includes('multi-factor')) tags.push('mfa');
  if (lowerText.includes('backup')) tags.push('backup');
  if (lowerText.includes('recover')) tags.push('recovery');
  if (lowerText.includes('authentic')) tags.push('authentication');
  if (lowerText.includes('cyber')) tags.push('cyber-security');
  
  // Platform tags
  if (lowerText.includes('aws') || lowerText.includes('amazon')) tags.push('aws');
  if (lowerText.includes('azure')) tags.push('azure');
  if (lowerText.includes('gcp') || lowerText.includes('google cloud')) tags.push('gcp');
  if (lowerText.includes('vmware')) tags.push('vmware');
  if (lowerText.includes('kubernetes') || lowerText.includes('k8s')) tags.push('kubernetes');
  
  // Priority tags based on weight
  if (text.includes('critical') || text.includes('essential')) tags.push('critical');
  
  return tags;
}

// Generate PDF configuration based on question
function generatePdfConfig(text, weight) {
  const shortName = text.split(' ').slice(0, 5).join(' ') + '...';
  
  // Generate contextual responses based on question content
  const isSecurityQuestion = text.toLowerCase().includes('protect') || 
                            text.toLowerCase().includes('secure') ||
                            text.toLowerCase().includes('encrypt');
  
  const isCritical = weight >= 4;
  
  return {
    shortName: shortName,
    responses: {
      yes: {
        summary: isCritical ? "✅ Critical requirement met" : "✅ Requirement satisfied",
        detail: `This capability is in place, providing ${isCritical ? 'essential' : 'important'} protection.`,
        score: 100
      },
      no: {
        summary: isCritical ? "🚨 Critical gap identified" : "⚠️ Improvement needed",
        detail: `This capability is not currently implemented, ${isCritical ? 'creating significant risk' : 'leaving room for improvement'}.`,
        recommendation: `Implement this capability to enhance your ${isSecurityQuestion ? 'security posture' : 'operational resilience'}.`,
        priority: isCritical ? "Critical" : weight >= 3 ? "High" : "Medium"
      },
      na: {
        summary: "⚪ Not applicable",
        detail: "This requirement does not apply to your current environment or use case."
      }
    }
  };
}

// Export the migrated data
function exportMigratedData() {
  const migrated = migrateData();
  
  // Create the new file content
  const fileContent = `/**
 * Scorecard Data V2 - Migrated from original structure
 * Generated on: ${new Date().toISOString()}
 */

// Category definitions
export const categories = ${JSON.stringify(migrated.categories, null, 2)};

// Subcategory definitions  
export const subcategories = ${JSON.stringify(migrated.subcategories, null, 2)};

// Questions array
export const questions = ${JSON.stringify(migrated.questions, null, 2)};

// ID Mapping from old to new
export const idMapping = ${JSON.stringify(migrated.idMapping, null, 2)};
`;
  
  // Write to file
  fs.writeFileSync('./scorecardDataV2-migrated.js', fileContent);
  
  // Also create a CSV for easy review/editing
  const csv = createCSV(migrated.questions);
  fs.writeFileSync('./questions-migrated.csv', csv);
  
  console.log('Migration complete!');
  console.log(`- Migrated ${migrated.questions.length} questions`);
  console.log(`- Created ${Object.keys(migrated.categories).length} categories`);
  console.log(`- Created ${Object.keys(migrated.subcategories).length} subcategories`);
  console.log('- Files created: scorecardDataV2-migrated.js and questions-migrated.csv');
  console.log('\nID Mapping (first 10):');
  Object.entries(migrated.idMapping).slice(0, 10).forEach(([oldId, newId]) => {
    console.log(`  ${oldId} → ${newId}`);
  });
}

// Create CSV for easy editing
function createCSV(questions) {
  const headers = ['ID', 'Category', 'Subcategory', 'Order', 'Weight', 'Text', 'Tags', 'PDF_Yes', 'PDF_No', 'PDF_Priority'];
  
  const rows = questions.map(q => [
    q.id,
    q.category,
    q.subcategory || '',
    q.order,
    q.weight,
    `"${q.text.replace(/"/g, '""')}"`,
    (q.tags || []).join(';'),
    q.pdfConfig.responses.yes.summary,
    q.pdfConfig.responses.no.summary,
    q.pdfConfig.responses.no.priority || ''
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

// Run migration if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  exportMigratedData();
}

export { migrateData, exportMigratedData };