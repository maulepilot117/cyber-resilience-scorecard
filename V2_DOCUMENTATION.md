# Scorecard Data V2 Documentation

## ✅ Migration Complete!

All 94 questions have been successfully migrated from the V1 numeric ID system to the V2 descriptive ID system with enhanced PDF configurations.

## 📁 Key Files

- **`src/scorecardDataV2.js`** - The new V2 data structure with all questions
- **`src/scorecardDataAdapter.js`** - Adapter that makes V2 work with existing app
- **`src/questionManagement.js`** - Helper functions for managing questions
- **`USAGE_EXAMPLES.md`** - Practical examples of working with V2

## 🎯 Benefits of V2

### 1. **No More Renumbering**
- Old: Adding question between 1.01 and 1.02 required renumbering all following questions
- New: Just add with order value 1015 (between 1010 and 1020)

### 2. **Simple Numeric IDs with Order Control**
- Old: `"1.01"`, `"2.15"` - required complex renumbering when inserting
- New: `"1"`, `"2"`, `"3"` - simple sequential numbers
- **Key Innovation**: The `order` field (not ID) controls sequence, allowing insertion without renumbering

### 3. **Custom PDF Responses Per Question**
```javascript
pdfConfig: {
  shortName: "Immutable Storage",
  responses: {
    yes: {
      summary: "✅ Critical requirement satisfied",
      detail: "Your backup data is protected...",
      score: 100
    },
    no: {
      summary: "🚨 Critical gap identified",
      detail: "Without immutable storage...",
      recommendation: "Implement an append-only filesystem...",
      priority: "Critical",
      remediationSteps: [...]  // Optional detailed steps
    }
  }
}
```

### 4. **Tags for Organization**
Each question has tags for easy searching and filtering:
```javascript
tags: ["backup", "immutability", "ransomware-protection", "critical"]
```

## 📝 How to Add a New Question

### Simple Example:
```javascript
// In src/scorecardDataV2.js, add to the questions array:
{
  id: "95",  // Next available number (current max: 94)
  category: "Backup Architecture", 
  subcategory: null,  // or subcategory ID if applicable
  order: 1055,  // Between existing questions (1050 and 1060) - THIS controls position!
  text: "Your question text here?",
  weight: 3,  // 1-5 scale
  tags: ["backup", "feature-specific-tags"],
  pdfConfig: {
    shortName: "Feature Name",
    responses: {
      yes: {
        summary: "✅ Feature enabled",
        detail: "Detailed positive explanation"
      },
      no: {
        summary: "⚠️ Feature missing", 
        detail: "Why this is a problem",
        recommendation: "How to fix it",
        priority: "High"
      },
      na: {
        summary: "⚪ Not applicable",
        detail: "When this doesn't apply"
      }
    }
  }
}
```

## 🔍 How to Find Questions

### Using the helper functions:
```javascript
import { findQuestions } from './src/questionManagement';

// Find all critical questions (weight 4+)
const critical = findQuestions({ weight: 4 });

// Find AWS questions
const aws = findQuestions({ subcategory: 'cloud-aws' });

// Search for ransomware-related
const ransomware = findQuestions({ tags: ['ransomware'] });

// Text search
const encrypted = findQuestions({ search: 'encryption' });
```

## 📊 Categories and Subcategories

### Categories (6 total):
1. **Backup Architecture** - Core backup security (always included)
2. **Datacenter** - On-prem virtualization, databases, files
3. **Cloud** - AWS, Azure cloud workloads
4. **SaaS** - Microsoft 365, Salesforce, Dynamics 365
5. **Identity** - Active Directory, Entra ID
6. **Cyber Tools** - Threat detection (always included)

### Subcategories (9 total):
- Datacenter: Virtualization, Database, Unstructured
- Cloud: AWS, Azure
- SaaS: Microsoft 365, Salesforce, Dynamics 365  
- Identity: Active Directory

## 🔄 How the Adapter Works

The app still uses the old V1 structure internally, but the adapter (`scorecardDataAdapter.js`) converts V2 to V1 format on the fly:

```javascript
// Instead of:
import { scorecardData } from './scorecardData';

// Use:
import { scorecardDataV2Compatible as scorecardData } from './scorecardDataAdapter';
```

This means:
- ✅ No breaking changes to the app
- ✅ Gradual migration possible
- ✅ V2 benefits immediately available

## 📈 PDF Report Enhancement

Each question now has customized PDF responses instead of generic ones:

### Example - Critical Question:
**Question:** "Is your backup data protected by an append-only file system?"

**If YES:**
- Summary: "✅ Critical requirement satisfied"
- Detail: "Your backup data is protected with immutable storage..."

**If NO:**
- Summary: "🚨 Critical gap identified"  
- Detail: "Without immutable storage, your backups remain vulnerable..."
- Recommendation: "Implement an append-only filesystem..."
- Priority: "Critical"
- Remediation Steps: [4 detailed steps provided]

## 🛠️ Maintenance Tips

1. **Use descriptive IDs** - Make them self-documenting
2. **Leave gaps in order values** - Use 100s or 1000s between questions
3. **Tag appropriately** - Makes finding questions easier later
4. **Customize PDF responses** - Provide actionable recommendations
5. **Test with the adapter** - Ensure V1 compatibility maintained

## 🚀 Next Steps

You can now:
1. ✅ Add new questions without renumbering
2. ✅ Customize PDF responses per question
3. ✅ Search and filter questions by tags
4. ✅ Maintain the scorecard more efficiently

The V2 structure is ready for production use!