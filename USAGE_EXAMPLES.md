# Question Management Usage Examples

## Overview

The new V2 structure makes managing questions much easier. Here's how to perform common tasks:

## Quick Start

```javascript
import { questions, categories, subcategories } from './src/scorecardDataV2';
import { 
  addMultipleQuestions, 
  findQuestions, 
  updateQuestion,
  exportToCSV 
} from './src/questionManagement';
```

## Common Tasks

### 1. Adding a New Question to Cloud > AWS

**Old Way (V1):**
- Find all AWS questions
- Renumber everything (2.01 → 2.02, 2.02 → 2.03, etc.)
- Insert your new question
- Hope you didn't break the numbering

**New Way (V2):**
```javascript
// Just add it with an order value between existing questions
const newAWSQuestion = {
  id: "cloud-aws-lambda-security",  // Descriptive ID
  category: "Cloud",
  subcategory: "cloud-aws",
  order: 2025,  // Between 2020 and 2030 (existing questions)
  text: "Are Lambda functions configured with least-privilege IAM roles?",
  weight: 3,
  tags: ["aws", "lambda", "security", "iam"],
  pdfConfig: {
    shortName: "Lambda Security",
    responses: {
      yes: {
        summary: "✅ Lambda functions secured",
        detail: "Functions follow least-privilege principle."
      },
      no: {
        summary: "⚠️ Lambda security risk",
        detail: "Over-privileged Lambda functions increase attack surface.",
        recommendation: "Review and restrict Lambda IAM roles.",
        priority: "High"
      }
    }
  }
};

questions.push(newAWSQuestion);
questions.sort((a, b) => a.order - b.order);
```

### 2. Adding Multiple Questions at Once

```javascript
const newCyberQuestions = [
  {
    id: "cyber-supply-chain-scanning",
    category: "Cyber Tools",
    subcategory: null,
    order: 6100,  // After existing cyber questions
    text: "Do you scan for supply chain vulnerabilities in your dependencies?",
    weight: 4,
    tags: ["supply-chain", "vulnerability-scanning"]
  },
  {
    id: "cyber-zero-day-protection",
    category: "Cyber Tools",
    subcategory: null,
    order: 6110,
    text: "Are systems protected against zero-day exploits?",
    weight: 4,
    tags: ["zero-day", "advanced-threats"]
  }
];

addMultipleQuestions(newCyberQuestions);
```

### 3. Finding Questions

```javascript
// Find all critical (weight 4+) questions
const criticalQuestions = findQuestions({ weight: 4 });

// Find all AWS-related questions
const awsQuestions = findQuestions({ subcategory: 'cloud-aws' });

// Find all ransomware-related questions
const ransomwareQuestions = findQuestions({ tags: ['ransomware'] });

// Search for questions mentioning "encryption"
const encryptionQuestions = findQuestions({ search: 'encryption' });

// Combine criteria
const criticalAWSQuestions = findQuestions({
  subcategory: 'cloud-aws',
  weight: 4
});
```

### 4. Updating Questions

```javascript
// Change a question's weight and update PDF response
updateQuestion('backup-immutable-filesystem', {
  weight: 5,  // Increase importance
  pdfConfig: {
    responses: {
      no: {
        summary: "🚨 CRITICAL: No immutable storage",
        detail: "This is now a critical requirement.",
        priority: "Critical"
      }
    }
  }
});

// Update multiple properties
updateQuestion('cloud-aws-ec2-backup', {
  text: "Are EC2 instances protected with automated, tested backup policies?",
  tags: ['aws', 'ec2', 'automation', 'testing']  // Add testing tag
});
```

### 5. Reordering Questions

```javascript
// Move a question to first in its category
moveQuestion('cyber-threat-hunting', 'first');

// Move after another question
moveQuestion('cyber-zero-day-protection', 'cyber-ransomware-detection');

// Set specific order value
moveQuestion('backup-airgap', 1150);  // Between 1100 and 1200
```

### 6. Working with CSV

```javascript
// Export to CSV for editing in Excel
const csv = exportToCSV();
fs.writeFileSync('questions.csv', csv);

// Edit in Excel, then import back
const updatedCSV = fs.readFileSync('questions-edited.csv', 'utf-8');
importFromCSV(updatedCSV);
```

### 7. Adding a New Subcategory

```javascript
// Add Oracle Cloud as a new cloud provider
addNewSubcategory('Cloud', 'Oracle Cloud', [
  {
    id: 'cloud-oci-compute',
    text: 'Are OCI Compute instances protected?',
    weight: 3,
    tags: ['oracle', 'oci', 'compute']
  },
  {
    id: 'cloud-oci-database',
    text: 'Are Oracle Autonomous Databases backed up?',
    weight: 3,
    tags: ['oracle', 'database']
  }
]);
```

## PDF Customization

### Customizing PDF Responses Per Question

```javascript
const question = {
  id: "backup-testing-frequency",
  // ... other properties ...
  pdfConfig: {
    shortName: "Backup Testing",
    responses: {
      yes: {
        summary: "✅ Regular testing performed",
        detail: "Your backup testing schedule ensures recoverability.",
        additionalInfo: "Consider documenting test results for compliance."
      },
      no: {
        summary: "🚨 No regular testing",
        detail: "Untested backups may fail when needed most.",
        recommendation: "Implement monthly backup recovery tests.",
        priority: "Critical",
        remediationSteps: [
          "1. Create testing schedule",
          "2. Define test scenarios",
          "3. Document results",
          "4. Address any failures"
        ]
      },
      na: {
        summary: "⚪ Alternative testing approach",
        detail: "Testing may be handled through other means."
      }
    }
  }
};
```

## Migration from V1

```javascript
// Run the migration script
import { exportMigratedData } from './src/migrateToV2';

// This will:
// 1. Convert numeric IDs (1.01) to descriptive IDs (backup-immutable-filesystem)
// 2. Convert to order-based sorting (1010, 1020, etc.)
// 3. Generate PDF configurations
// 4. Create CSV for review
exportMigratedData();
```

## Validation

```javascript
// Check for issues in your question data
const validation = validateQuestions();

if (!validation.valid) {
  console.log('Issues found:');
  validation.issues.forEach(issue => console.log(`  - ${issue}`));
} else {
  console.log('All questions valid!');
  console.log(`Total: ${validation.stats.totalQuestions} questions`);
  console.log(`Categories: ${validation.stats.categories}`);
  console.log(`Subcategories: ${validation.stats.subcategories}`);
}
```

## Benefits Summary

### Old Structure (V1)
- ❌ Numeric IDs require renumbering (1.01, 1.02, 1.03...)
- ❌ Adding a question means updating all subsequent IDs
- ❌ Nested structure makes searching difficult
- ❌ PDF responses hardcoded elsewhere
- ❌ Category inclusion hardcoded in logic

### New Structure (V2)
- ✅ Descriptive IDs never need changing
- ✅ Order field with gaps (1000, 1100, 1200) allows easy insertion
- ✅ Flat structure for easy searching/filtering
- ✅ PDF responses configured per question
- ✅ Tags for better organization
- ✅ Import/export to CSV for bulk editing
- ✅ Validation tools to catch issues

## Next Steps

1. **Run the migration** to convert your existing data
2. **Review the generated CSV** to verify questions migrated correctly
3. **Customize PDF responses** for better reporting
4. **Add new questions** without worrying about renumbering
5. **Export to CSV** when you need to make bulk changes

The new structure maintains 100% compatibility with your existing app while making management much easier!