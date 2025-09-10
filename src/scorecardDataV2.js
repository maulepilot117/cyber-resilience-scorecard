/**
 * Scorecard Data V2 - More maintainable structure
 * 
 * Benefits:
 * - Descriptive IDs instead of numeric (no renumbering needed)
 * - Order field allows easy insertion (use gaps of 100 or 1000)
 * - Flat structure makes searching/filtering easier
 * - PDF responses can be customized per question
 * - Categories defined separately for cleaner organization
 */

// Category definitions
export const categories = {
  "Backup Architecture": {
    icon: "🏗️",
    alwaysInclude: true,
    description: "Core backup and recovery capabilities to ensure data resilience",
    pdfIntro: "This section evaluates your backup architecture's ability to withstand cyber attacks."
  },
  "Cloud": {
    icon: "☁️",
    hasSubcategories: true,
    description: "Cloud workload protection and recovery",
    pdfIntro: "Assessment of cloud-specific backup and recovery capabilities."
  },
  "Databases": {
    icon: "🗄️",
    hasSubcategories: true,
    description: "Database-specific protection strategies",
    pdfIntro: "Evaluation of database backup and recovery mechanisms."
  },
  "Cyber Tools": {
    icon: "🔒",
    alwaysInclude: true,
    description: "Security tools and threat detection capabilities",
    pdfIntro: "Analysis of cyber threat detection and response tools."
  },
  "Identity & Access Management": {
    icon: "🔐",
    hasSubcategories: true,
    description: "Identity protection and access control",
    pdfIntro: "Review of identity and access management protections."
  }
};

// Subcategory definitions
export const subcategories = {
  // Cloud subcategories
  "cloud-aws": { 
    parent: "Cloud", 
    name: "AWS",
    description: "Amazon Web Services workloads"
  },
  "cloud-azure": { 
    parent: "Cloud", 
    name: "Azure",
    description: "Microsoft Azure workloads"
  },
  "cloud-gcp": { 
    parent: "Cloud", 
    name: "GCP",
    description: "Google Cloud Platform workloads"
  },
  
  // Database subcategories
  "db-sql": {
    parent: "Databases",
    name: "SQL Databases",
    description: "Relational database systems"
  },
  "db-nosql": {
    parent: "Databases",
    name: "NoSQL",
    description: "Non-relational database systems"
  },
  
  // Identity subcategories
  "iam-active-directory": {
    parent: "Identity & Access Management",
    name: "Active Directory",
    description: "On-premises Active Directory"
  },
  "iam-entra": {
    parent: "Identity & Access Management",
    name: "Microsoft Entra ID",
    description: "Cloud identity services"
  }
};

/**
 * Questions array - flat structure for easier management
 * Order values use gaps of 100 to allow easy insertion
 * To add a question between order 1000 and 1100, use 1050
 */
export const questions = [
  // ========== BACKUP ARCHITECTURE (1000-1999) ==========
  {
    id: "backup-immutable-filesystem",
    category: "Backup Architecture",
    subcategory: null,
    order: 1000,
    text: "Is your backup data protected by an append-only file system that makes it architecturally impossible to modify, encrypt, or delete, even by an administrator with root-level credentials?",
    weight: 4,
    tags: ["immutability", "ransomware-protection", "critical"],
    pdfConfig: {
      shortName: "Immutable Filesystem",
      responses: {
        yes: {
          summary: "✅ Protected with immutable storage",
          detail: "Your append-only file system provides architectural protection against ransomware and malicious insiders.",
          score: 100
        },
        no: {
          summary: "⚠️ Lacks immutable storage protection",
          detail: "Without an append-only file system, your backups remain vulnerable to encryption or deletion by ransomware.",
          recommendation: "Implement an append-only filesystem solution to ensure backup immutability.",
          priority: "High"
        },
        na: {
          summary: "⚪ Not applicable",
          detail: "Alternative backup protection methods may be in use."
        }
      }
    }
  },
  {
    id: "backup-inherent-immutability",
    category: "Backup Architecture",
    subcategory: null,
    order: 1100,
    text: "Is the data protection system's immutability achieved through an inherent, append-only file system, rather than relying on configurable retention lock policies on a separate storage system?",
    weight: 3,
    tags: ["immutability", "architecture"],
    pdfConfig: {
      shortName: "Inherent Immutability",
      responses: {
        yes: {
          summary: "✅ Inherent immutability implemented",
          detail: "Your system uses built-in append-only architecture rather than policy-based protection."
        },
        no: {
          summary: "⚠️ Relies on configurable policies",
          detail: "Policy-based retention locks can be circumvented by privileged users or misconfiguration.",
          recommendation: "Consider solutions with inherent immutability rather than policy-based protection."
        }
      }
    }
  },
  {
    id: "backup-continuous-verification",
    category: "Backup Architecture",
    subcategory: null,
    order: 1200,
    text: "Does the data protection platform continuously verify data integrity via checksums throughout the entire data lifecycle to protect against unauthorized modification?",
    weight: 2,
    tags: ["integrity", "verification"],
    pdfConfig: {
      shortName: "Continuous Integrity Verification",
      responses: {
        yes: {
          summary: "✅ Continuous integrity checking active",
          detail: "Regular checksum verification ensures early detection of data corruption or tampering."
        },
        no: {
          summary: "⚠️ No continuous integrity verification",
          detail: "Without continuous verification, silent data corruption may go undetected.",
          recommendation: "Enable continuous checksum verification across all backup data."
        }
      }
    }
  },
  {
    id: "backup-separate-security-domain",
    category: "Backup Architecture",
    subcategory: null,
    order: 1300,
    text: "Does the data protection system operate in a separate security domain with an independent authentication mechanism, ensuring that a compromise of your primary production directory (e.g., Active Directory) does not grant an attacker access to the backup data?",
    weight: 2,
    tags: ["security-domain", "authentication", "isolation"],
    pdfConfig: {
      shortName: "Separate Security Domain",
      responses: {
        yes: {
          summary: "✅ Isolated security domain",
          detail: "Independent authentication prevents lateral movement from compromised production systems."
        },
        no: {
          summary: "⚠️ Shared security domain risk",
          detail: "Using production Active Directory for backup authentication creates a single point of failure.",
          recommendation: "Implement separate authentication for backup systems independent of production AD.",
          priority: "High"
        }
      }
    }
  },
  
  // ========== CLOUD - AWS (2000-2099) ==========
  {
    id: "cloud-aws-ec2-backup",
    category: "Cloud",
    subcategory: "cloud-aws",
    order: 2000,
    text: "Protecting Amazon EC2 instances and their associated EBS volumes with automated backup policies?",
    weight: 3,
    tags: ["aws", "ec2", "automation"],
    pdfConfig: {
      shortName: "EC2 Backup Coverage",
      responses: {
        yes: {
          summary: "✅ EC2 instances protected",
          detail: "Automated backup policies ensure consistent protection of EC2 instances and EBS volumes."
        },
        no: {
          summary: "⚠️ EC2 instances unprotected",
          detail: "Manual or missing EC2 backups increase risk of data loss.",
          recommendation: "Implement AWS Backup or third-party automated EC2 protection."
        }
      }
    }
  },
  {
    id: "cloud-aws-rds-backup",
    category: "Cloud",
    subcategory: "cloud-aws",
    order: 2010,
    text: "Backing up Amazon RDS databases with point-in-time recovery capabilities?",
    weight: 3,
    tags: ["aws", "rds", "database"],
    pdfConfig: {
      shortName: "RDS Backup",
      responses: {
        yes: {
          summary: "✅ RDS databases protected",
          detail: "Point-in-time recovery enables granular database restoration."
        },
        no: {
          summary: "⚠️ RDS backup gaps",
          detail: "Limited RDS protection increases database recovery risks.",
          recommendation: "Enable automated RDS backups with appropriate retention periods."
        }
      }
    }
  },
  
  // ========== CLOUD - AZURE (2100-2199) ==========
  {
    id: "cloud-azure-vm-backup",
    category: "Cloud",
    subcategory: "cloud-azure",
    order: 2100,
    text: "Protecting Azure Virtual Machines with Azure Backup or third-party solutions?",
    weight: 3,
    tags: ["azure", "vm", "backup"],
    pdfConfig: {
      shortName: "Azure VM Protection",
      responses: {
        yes: {
          summary: "✅ Azure VMs protected",
          detail: "Virtual machines are backed up with appropriate recovery capabilities."
        },
        no: {
          summary: "⚠️ Azure VM protection gaps",
          detail: "Unprotected Azure VMs risk data loss and extended downtime.",
          recommendation: "Implement Azure Backup or validated third-party VM protection."
        }
      }
    }
  },
  
  // ========== CYBER TOOLS (6000-6999) ==========
  {
    id: "cyber-ransomware-detection",
    category: "Cyber Tools",
    subcategory: null,
    order: 6000,
    text: "Ability to detect and alert on active encryption events across all data sources?",
    weight: 4,
    tags: ["ransomware", "detection", "critical"],
    pdfConfig: {
      shortName: "Ransomware Detection",
      responses: {
        yes: {
          summary: "✅ Active ransomware detection",
          detail: "Real-time encryption detection enables rapid response to ransomware attacks."
        },
        no: {
          summary: "🚨 No ransomware detection",
          detail: "Without encryption detection, ransomware attacks may go unnoticed until significant damage occurs.",
          recommendation: "Deploy ransomware detection tools with real-time alerting.",
          priority: "Critical"
        }
      }
    }
  },
  {
    id: "cyber-vm-encryption-detection",
    category: "Cyber Tools",
    subcategory: null,
    order: 6010,
    text: "Detect and alert on encryption events in VM environment?",
    weight: 4,
    tags: ["ransomware", "vm", "detection"],
    pdfConfig: {
      shortName: "VM Encryption Detection",
      responses: {
        yes: {
          summary: "✅ VM-level detection active",
          detail: "Virtual machine encryption events are monitored and alerted."
        },
        no: {
          summary: "⚠️ No VM encryption monitoring",
          detail: "VM-based ransomware attacks may spread undetected.",
          recommendation: "Implement VM-specific ransomware detection capabilities."
        }
      }
    }
  },
  {
    id: "cyber-threat-hunting",
    category: "Cyber Tools",
    subcategory: null,
    order: 6020,
    text: "Rapidly hunt for indicators of compromise via YARA rules and file hashes in 60 seconds to identify the clean point of recovery?",
    weight: 4,
    tags: ["threat-hunting", "yara", "ioc"],
    pdfConfig: {
      shortName: "Rapid Threat Hunting",
      responses: {
        yes: {
          summary: "✅ Fast threat hunting capability",
          detail: "Quick IOC scanning enables rapid identification of clean recovery points."
        },
        no: {
          summary: "⚠️ Limited threat hunting",
          detail: "Slow or manual threat hunting delays incident response and recovery.",
          recommendation: "Deploy automated threat hunting tools with YARA rule support."
        }
      }
    }
  }
];

/**
 * Helper function to get questions for assessment
 * @param {Array} selectedSubcategories - Array of selected subcategory IDs
 * @returns {Array} Filtered and sorted questions
 */
export function getAssessmentQuestions(selectedSubcategories = []) {
  return questions
    .filter(q => {
      // Always include if category is marked as alwaysInclude
      if (categories[q.category]?.alwaysInclude) {
        return true;
      }
      
      // Include if no subcategory (category-level question) and category is selected
      if (!q.subcategory && selectedSubcategories.some(sc => 
        subcategories[sc]?.parent === q.category
      )) {
        return true;
      }
      
      // Include if specific subcategory is selected
      if (q.subcategory && selectedSubcategories.includes(q.subcategory)) {
        return true;
      }
      
      return false;
    })
    .sort((a, b) => a.order - b.order);
}

/**
 * Helper to add a new question after a specific question ID
 * @param {string} afterId - ID of question to insert after
 * @param {Object} newQuestion - New question object
 */
export function insertQuestionAfter(afterId, newQuestion) {
  const index = questions.findIndex(q => q.id === afterId);
  if (index === -1) {
    throw new Error(`Question with ID ${afterId} not found`);
  }
  
  const currentOrder = questions[index].order;
  const nextOrder = questions[index + 1]?.order || currentOrder + 100;
  
  // Calculate middle point for new order
  newQuestion.order = Math.floor((currentOrder + nextOrder) / 2);
  
  // If orders are too close, rebalance
  if (nextOrder - currentOrder < 2) {
    rebalanceOrders(questions[index].category);
  }
  
  questions.splice(index + 1, 0, newQuestion);
  return newQuestion;
}

/**
 * Rebalance order values when they get too close
 * @param {string} category - Category to rebalance
 */
export function rebalanceOrders(category) {
  const categoryQuestions = questions
    .filter(q => q.category === category)
    .sort((a, b) => a.order - b.order);
  
  let baseOrder = Math.floor(categoryQuestions[0].order / 1000) * 1000;
  categoryQuestions.forEach((q, index) => {
    q.order = baseOrder + (index * 100);
  });
}

/**
 * Export questions to CSV for easy editing in Excel
 */
export function exportToCSV() {
  const csv = [
    ['ID', 'Category', 'Subcategory', 'Order', 'Text', 'Weight', 'Tags'].join(','),
    ...questions.map(q => [
      q.id,
      q.category,
      q.subcategory || '',
      q.order,
      `"${q.text.replace(/"/g, '""')}"`,
      q.weight,
      (q.tags || []).join(';')
    ].join(','))
  ].join('\n');
  
  return csv;
}

/**
 * Import questions from CSV
 */
export function importFromCSV(csvText) {
  // Implementation for CSV import
  // This would parse CSV and update the questions array
}