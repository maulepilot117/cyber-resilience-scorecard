export const scoreRangeDescriptions = {
  excellent: {
    range: "80-100%",
    title: "Excellent Cyber Resilience",
    summary: "Your organization demonstrates exceptional cyber resilience capabilities.",
    details: [
      "Your backup architecture incorporates industry-leading immutable storage and air-gapped solutions, providing robust protection against ransomware and sophisticated cyber threats.",
      "Data protection policies are comprehensive and automated, with strong encryption for data at rest and in transit.",
      "Recovery capabilities are well-tested with instant recovery options and point-in-time restoration available across all critical systems.",
      "Your organization maintains a proactive security posture with continuous monitoring, threat hunting capabilities, and automated anomaly detection.",
      "Regular testing and validation of backup integrity ensures rapid recovery in the event of an incident."
    ],
    recommendations: "Continue to maintain your strong security posture through regular testing, stay current with emerging threats, and consider sharing your best practices with industry peers."
  },
  good: {
    range: "60-79%",
    title: "Good Cyber Resilience",
    summary: "Your organization shows solid cyber resilience with opportunities for enhancement.",
    details: [
      "Core backup and recovery capabilities are in place with good coverage across most critical systems.",
      "Data protection measures are generally effective, though some areas require implementation.",
      "Recovery time objectives are mostly achievable, but certain scenarios may require optimization.",
      "Security monitoring is present but could be enhanced with more advanced threat detection capabilities.",
      "Some capabilities are missing that would strengthen your overall security posture."
    ],
    recommendations: "Focus on implementing missing capabilities, add additional air-gapping measures, and enhance threat detection capabilities to achieve excellence in cyber resilience."
  },
  moderate: {
    range: "40-59%",
    title: "Moderate Cyber Resilience",
    summary: "Significant improvements needed to achieve adequate cyber resilience.",
    details: [
      "Basic backup capabilities exist but critical advanced features are not implemented.",
      "Recovery processes are largely manual and may not meet critical recovery time objectives.",
      "Key encryption and data protection measures are not in place.",
      "Threat detection and response capabilities are reactive rather than proactive.",
      "Important security controls and validation processes are missing."
    ],
    recommendations: "Prioritize implementation of missing critical capabilities, establish automated recovery procedures, and develop a comprehensive testing schedule for all backup systems."
  },
  critical: {
    range: "0-39%",
    title: "Critical Vulnerabilities",
    summary: "Immediate action required to establish basic cyber resilience.",
    details: [
      "Backup systems are vulnerable to compromise with limited or no protection against ransomware.",
      "Recovery capabilities are untested or non-existent for critical systems.",
      "Lack of encryption and secure data handling creates significant exposure.",
      "No proactive threat detection or incident response capabilities.",
      "Organization is at high risk of prolonged outage or data loss in the event of a cyber incident."
    ],
    recommendations: "Immediately implement basic backup protection with offline copies, establish recovery procedures for critical systems, and engage cybersecurity experts to develop a comprehensive resilience strategy."
  }
};

export const categoryDescriptions = {
  "Backup Architecture": {
    title: "Backup Architecture Assessment",
    description: "Evaluates the fundamental design and security of your backup infrastructure.",
    highScore: {
      summary: "Your backup architecture demonstrates robust security and resilience features.",
      strengths: [
        "Immutable storage prevents tampering with backup data",
        "Air-gapped architecture provides isolation from production networks",
        "End-to-end encryption protects data in transit and at rest",
        "Automated discovery and protection of new workloads",
        "Policy-based management reduces administrative overhead"
      ]
    },
    lowScore: {
      summary: "Critical gaps in backup architecture expose your organization to significant risk.",
      weaknesses: [
        "Lack of immutable storage leaves backups vulnerable to encryption",
        "Open protocols (NFS/SMB) create attack vectors",
        "Missing encryption exposes sensitive data",
        "Manual backup processes increase risk of human error",
        "No air-gapping allows lateral movement from compromised systems"
      ],
      criticalActions: [
        "Implement immutable storage immediately",
        "Establish air-gapped backup copies",
        "Enable encryption for all backup data",
        "Automate backup processes through policy-based management"
      ]
    }
  },
  "Datacenter": {
    title: "Datacenter Protection Assessment",
    description: "Assesses protection capabilities for on-premises virtualization, databases, and unstructured data.",
    highScore: {
      summary: "Comprehensive protection across all datacenter workloads with advanced recovery options.",
      strengths: [
        "Agentless protection reduces attack surface and management overhead",
        "Instant recovery capabilities minimize downtime",
        "Native API integration ensures application-consistent backups",
        "Automated discovery protects new workloads automatically",
        "Granular recovery options provide flexibility"
      ]
    },
    lowScore: {
      summary: "Datacenter protection gaps create vulnerabilities and extended recovery times.",
      weaknesses: [
        "Agent-based backups increase complexity and attack surface",
        "Manual discovery misses new workloads",
        "Lack of instant recovery extends downtime",
        "Script-based database backups are error-prone",
        "No granular recovery requires full system restores"
      ],
      criticalActions: [
        "Transition to agentless backup methods",
        "Implement automated workload discovery",
        "Enable instant recovery for critical systems",
        "Use native database APIs for consistent backups"
      ]
    }
  },
  "Cloud": {
    title: "Cloud Protection Assessment",
    description: "Evaluates protection strategies for cloud-native workloads and multi-cloud environments.",
    highScore: {
      summary: "Cloud workloads are well-protected with native integration and secure authentication.",
      strengths: [
        "Native API integration ensures efficient backups",
        "Cross-region and cross-account recovery options",
        "Least-privilege authentication model",
        "No infrastructure required in cloud accounts",
        "Flexible storage tier selection optimizes costs"
      ]
    },
    lowScore: {
      summary: "Cloud protection strategies need significant improvement to ensure data resilience.",
      weaknesses: [
        "Reliance on cloud-native tools alone is insufficient",
        "Stored credentials create security risks",
        "Limited recovery options restrict flexibility",
        "Infrastructure requirements increase costs and complexity",
        "No cross-region capabilities create single points of failure"
      ],
      criticalActions: [
        "Implement third-party backup solutions for true data isolation",
        "Establish cross-region and cross-account recovery",
        "Remove stored credentials and use secure authentication",
        "Enable automated protection for all cloud workloads"
      ]
    }
  },
  "SaaS": {
    title: "SaaS Data Protection Assessment",
    description: "Reviews backup and recovery capabilities for Software-as-a-Service applications.",
    highScore: {
      summary: "SaaS data is properly protected with air-gapped backups and granular recovery.",
      strengths: [
        "Data is air-gapped from SaaS provider",
        "Customer-managed encryption keys",
        "Granular item-level recovery",
        "No infrastructure requirements",
        "Automated backup scheduling"
      ]
    },
    lowScore: {
      summary: "SaaS data lacks proper protection, relying solely on provider capabilities.",
      weaknesses: [
        "No backup beyond provider's recycle bin",
        "Data remains within provider's control",
        "No protection against account compromise",
        "Limited or no recovery options",
        "No encryption key management"
      ],
      criticalActions: [
        "Implement third-party SaaS backup immediately",
        "Establish air-gapped copies outside provider environment",
        "Enable customer-managed encryption",
        "Test recovery procedures regularly"
      ]
    }
  },
  "Identity": {
    title: "Identity Infrastructure Protection",
    description: "Assesses protection of critical identity and access management systems.",
    highScore: {
      summary: "Identity infrastructure is comprehensively protected with orchestrated recovery.",
      strengths: [
        "Complete Active Directory forest protection",
        "EntraID backup beyond recycle bin",
        "Orchestrated forest recovery capabilities",
        "Protection of conditional access policies",
        "Granular attribute-level recovery"
      ]
    },
    lowScore: {
      summary: "Identity infrastructure protection is inadequate, creating severe security risks.",
      weaknesses: [
        "Incomplete Active Directory protection",
        "Reliance on EntraID recycle bin alone",
        "No orchestrated recovery capabilities",
        "Missing protection for security policies",
        "Cannot perform granular recovery"
      ],
      criticalActions: [
        "Protect entire Active Directory forest",
        "Implement comprehensive EntraID backup",
        "Develop orchestrated recovery procedures",
        "Include all identity-related configurations in backups"
      ]
    }
  },
  "Cyber Tools": {
    title: "Cyber Defense Tools Assessment",
    description: "Evaluates advanced threat detection and response capabilities within backup systems.",
    highScore: {
      summary: "Advanced cyber defense tools provide proactive threat detection and rapid response.",
      strengths: [
        "Real-time encryption detection and alerting",
        "Rapid threat hunting with YARA rules",
        "Proactive IOC scanning on all backups",
        "Sensitive data discovery and classification",
        "Automated recovery plan execution"
      ]
    },
    lowScore: {
      summary: "Limited cyber defense capabilities leave organization reactive to threats.",
      weaknesses: [
        "No encryption event detection",
        "Unable to hunt for threats in backups",
        "No proactive threat scanning",
        "Unaware of sensitive data locations",
        "Manual recovery processes slow response"
      ],
      criticalActions: [
        "Deploy encryption detection capabilities",
        "Implement threat hunting tools",
        "Enable continuous IOC scanning",
        "Automate recovery procedures"
      ]
    }
  }
};

export const getDetailedReportContent = (finalScore, categoryResults, recommendations) => {
  // Determine overall score range
  let scoreRange;
  if (finalScore >= 80) scoreRange = 'excellent';
  else if (finalScore >= 60) scoreRange = 'good';
  else if (finalScore >= 40) scoreRange = 'moderate';
  else scoreRange = 'critical';

  const overallAssessment = scoreRangeDescriptions[scoreRange];

  // Generate category-specific insights
  const categoryInsights = Object.entries(categoryResults).map(([category, result]) => {
    const categoryDesc = categoryDescriptions[category];
    if (!categoryDesc) return null;

    const isHighScore = result.percentage >= 70;
    const assessment = isHighScore ? categoryDesc.highScore : categoryDesc.lowScore;

    return {
      category,
      title: categoryDesc.title,
      description: categoryDesc.description,
      score: result.percentage,
      assessment,
      isHighScore
    };
  }).filter(Boolean);

  // Group recommendations by priority
  const criticalRecommendations = recommendations.filter(r => r.status === 'missing' && r.potentialPoints >= 4);
  const highPriorityRecommendations = recommendations.filter(r => r.status === 'missing' && r.potentialPoints >= 3 && r.potentialPoints < 4);
  const mediumPriorityRecommendations = recommendations.filter(r => r.status === 'missing' && r.potentialPoints < 3);

  return {
    overallAssessment,
    categoryInsights,
    prioritizedRecommendations: {
      critical: criticalRecommendations,
      high: highPriorityRecommendations,
      medium: mediumPriorityRecommendations
    },
    executiveSummary: generateExecutiveSummary(finalScore, categoryResults, recommendations),
    technicalSummary: generateTechnicalSummary(categoryInsights, recommendations)
  };
};

const generateExecutiveSummary = (finalScore, categoryResults, recommendations) => {
  const criticalGaps = recommendations.filter(r => r.status === 'missing' && r.potentialPoints >= 4).length;
  const totalGaps = recommendations.length;
  
  let riskLevel = 'Low';
  if (finalScore < 40) riskLevel = 'Critical';
  else if (finalScore < 60) riskLevel = 'High';
  else if (finalScore < 80) riskLevel = 'Medium';

  const topCategories = Object.entries(categoryResults)
    .sort((a, b) => b[1].percentage - a[1].percentage)
    .slice(0, 2)
    .map(([name]) => name);

  const bottomCategories = Object.entries(categoryResults)
    .sort((a, b) => a[1].percentage - b[1].percentage)
    .slice(0, 2)
    .map(([name]) => name);

  return {
    riskLevel,
    overallScore: finalScore,
    criticalGaps,
    totalGaps,
    strengths: topCategories,
    weaknesses: bottomCategories,
    estimatedRemediationTime: calculateRemediationTime(recommendations),
    businessImpact: assessBusinessImpact(finalScore, criticalGaps)
  };
};

const generateTechnicalSummary = (categoryInsights, recommendations) => {
  const technicalPriorities = [];
  
  // Add critical technical actions based on low-scoring categories
  categoryInsights.forEach(insight => {
    if (!insight.isHighScore && insight.assessment.criticalActions) {
      technicalPriorities.push({
        category: insight.category,
        actions: insight.assessment.criticalActions,
        urgency: insight.score < 40 ? 'Immediate' : insight.score < 60 ? 'High' : 'Medium'
      });
    }
  });

  return {
    priorities: technicalPriorities,
    quickWins: identifyQuickWins(recommendations),
    longTermProjects: identifyLongTermProjects(recommendations),
    estimatedBudgetRange: estimateBudgetRange(recommendations)
  };
};

const calculateRemediationTime = (recommendations) => {
  const weeks = Math.ceil(recommendations.length / 5) * 2; // Rough estimate
  if (weeks <= 4) return `${weeks} weeks`;
  if (weeks <= 12) return `${Math.ceil(weeks / 4)} months`;
  return `${Math.ceil(weeks / 52)} year`;
};

const assessBusinessImpact = (score, criticalGaps) => {
  if (score < 40 || criticalGaps > 5) {
    return "Severe risk of prolonged business disruption in case of cyber incident. Immediate executive attention required.";
  } else if (score < 60 || criticalGaps > 2) {
    return "Significant risk of business disruption. Recovery capabilities may not meet business requirements.";
  } else if (score < 80) {
    return "Moderate risk with generally adequate recovery capabilities. Some optimization opportunities exist.";
  }
  return "Low risk with robust recovery capabilities. Organization is well-prepared for cyber incidents.";
};

const identifyQuickWins = (recommendations) => {
  return recommendations
    .filter(r => r.potentialPoints <= 2)
    .slice(0, 5)
    .map(r => ({
      action: r.text,
      category: r.category,
      impact: `+${r.potentialPoints} points`
    }));
};

const identifyLongTermProjects = (recommendations) => {
  return recommendations
    .filter(r => r.potentialPoints >= 3)
    .slice(0, 5)
    .map(r => ({
      project: r.text,
      category: r.category,
      expectedImprovement: `+${r.potentialPoints} points`
    }));
};

const estimateBudgetRange = (recommendations) => {
  const totalPoints = recommendations.reduce((sum, r) => sum + r.potentialPoints, 0);
  if (totalPoints < 20) return "$50K - $150K";
  if (totalPoints < 50) return "$150K - $500K";
  if (totalPoints < 100) return "$500K - $1.5M";
  return "$1.5M+";
};