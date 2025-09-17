/**
 * Scorecard Data V2 - With Numeric IDs
 * Last updated: 2025-09-17T12:14:52.559Z
 * 
 * Features:
 * - Simple numeric IDs (1, 2, 3, etc.)
 * - Order field with gaps for easy insertion (no renumbering needed!)
 * - Enhanced PDF configurations per question
 * - Tags for search and filtering
 * - Original descriptive IDs preserved in 'originalId' field
 * 
 * To add a new question:
 * 1. Find where you want to insert it based on 'order' values
 * 2. Add with an order value between existing questions
 * 3. Assign the next available ID number (current max: 94)
 * 
 * Example: To add between questions with order 1040 and 1050, use order 1045
 */

// Category definitions
export const categories = {
  "Backup Architecture": {
    "icon": "🏗️",
    "alwaysInclude": true,
    "hasSubcategories": false,
    "description": "Core backup infrastructure security and immutability capabilities",
    "pdfIntro": "This section evaluates your organization's backup architecture security and recovery capabilities."
  },
  "Datacenter": {
    "icon": "🏬",
    "alwaysInclude": false,
    "hasSubcategories": true,
    "description": "On-premises virtualization, database, and file storage protection",
    "pdfIntro": "This section evaluates your organization's datacenter security and recovery capabilities."
  },
  "Cloud": {
    "icon": "☁️",
    "alwaysInclude": false,
    "hasSubcategories": true,
    "description": "Public cloud workload backup and disaster recovery capabilities",
    "pdfIntro": "This section evaluates your organization's cloud security and recovery capabilities."
  },
  "SaaS": {
    "icon": "📧",
    "alwaysInclude": false,
    "hasSubcategories": true,
    "description": "Software-as-a-Service application data protection and recovery",
    "pdfIntro": "This section evaluates your organization's saas security and recovery capabilities."
  },
  "Identity": {
    "icon": "👤",
    "alwaysInclude": false,
    "hasSubcategories": true,
    "description": "Identity infrastructure protection including Active Directory and cloud identity",
    "pdfIntro": "This section evaluates your organization's identity security and recovery capabilities."
  },
  "Cyber Tools": {
    "icon": "🔒",
    "alwaysInclude": true,
    "hasSubcategories": false,
    "description": "Threat detection, anomaly identification, and cyber resilience tools",
    "pdfIntro": "This section evaluates your organization's cyber tools security and recovery capabilities."
  }
};

// Subcategory definitions  
export const subcategories = {
  "datacenter-virtualization": {
    "parent": "Datacenter",
    "name": "Virtualization",
    "description": "Virtualization specific protection and recovery capabilities"
  },
  "datacenter-database": {
    "parent": "Datacenter",
    "name": "Database",
    "description": "Database specific protection and recovery capabilities"
  },
  "datacenter-unstructured": {
    "parent": "Datacenter",
    "name": "Unstructured",
    "description": "Unstructured specific protection and recovery capabilities"
  },
  "cloud-aws": {
    "parent": "Cloud",
    "name": "AWS",
    "description": "Amazon Web Services EC2, RDS, and S3 protection"
  },
  "cloud-azure": {
    "parent": "Cloud",
    "name": "Azure",
    "description": "Microsoft Azure VMs, databases, and storage protection"
  },
  "saas-microsoft-365": {
    "parent": "SaaS",
    "name": "Microsoft 365",
    "description": "Exchange, SharePoint, OneDrive, and Teams backup"
  },
  "saas-salesforce": {
    "parent": "SaaS",
    "name": "Salesforce",
    "description": "Salesforce specific protection and recovery capabilities"
  },
  "saas-dynamics-365": {
    "parent": "SaaS",
    "name": "Dynamics 365",
    "description": "Dynamics 365 specific protection and recovery capabilities"
  },
  "identity-active-directory": {
    "parent": "Identity",
    "name": "Active Directory",
    "description": "On-premises AD forest and domain controller protection"
  }
};

// Questions array - 94 total questions
// IDs are simple numbers: "1", "2", "3", etc.
// Use the 'order' field for positioning (with gaps for easy insertion)
export const questions = [
  {
    "id": "1",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1010,
    "text": "Is your backup data protected by an append-only file system that makes it architecturally impossible to modify, encrypt, or delete, even by an administrator with root-level credentials?",
    "weight": 4,
    "tags": [
      "backup-architecture",
      "encryption",
      "backup",
      "high-security"
    ],
    "pdfConfig": {
      "shortName": "Immutable Storage",
      "responses": {
        "yes": {
          "summary": "✅ Critical requirement satisfied",
          "detail": "Your backup data is protected with immutable storage, providing strong defense against ransomware and unauthorized modifications.",
          "score": 100
        },
        "no": {
          "summary": "🚨 Critical gap identified",
          "detail": "Without immutable storage, your backups remain vulnerable to encryption or deletion by ransomware and malicious actors.",
          "recommendation": "Implement an append-only filesystem or immutable storage solution to protect against ransomware.",
          "priority": "Critical"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "backup-architecture-append-only"
  },
  {
    "id": "2",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1020,
    "text": "Is the data protection system's immutability achieved through an inherent, append-only file system, rather than relying on configurable retention lock policies on a separate storage system?",
    "weight": 3,
    "tags": [
      "backup-architecture",
      "immutability"
    ],
    "pdfConfig": {
      "shortName": "Immutable Storage",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "Your backup data is protected with immutable storage, providing strong defense against ransomware and unauthorized modifications.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "Without immutable storage, your backups remain vulnerable to encryption or deletion by ransomware and malicious actors.",
          "recommendation": "Implement an append-only filesystem or immutable storage solution to protect against ransomware.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "backup-architecture-immutable"
  },
  {
    "id": "3",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1030,
    "text": "Does the data protection system operate in a separate security domain with an independent authentication mechanism, ensuring that a compromise of your primary production directory (e.g., Active Directory) does not grant an attacker access to the backup data?",
    "weight": 2,
    "tags": [
      "backup-architecture",
      "backup",
      "authentication",
      "isolation",
      "active-directory"
    ],
    "pdfConfig": {
      "shortName": "Security Domain Isolation",
      "responses": {
        "yes": {
          "summary": "✅ Requirement met",
          "detail": "Separate security domain prevents lateral movement from compromised production systems.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Gap identified",
          "detail": "Shared security domain creates a single point of failure if production Active Directory is compromised.",
          "recommendation": "Implement separate authentication mechanism for backup systems independent of production AD.",
          "priority": "Medium"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "backup-architecture-security-domain"
  },
  {
    "id": "4",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1040,
    "text": "Are the backup copies stored in a logically isolated location, unreachable via the network or in an isolated cloud account?",
    "weight": 3,
    "tags": [
      "backup-architecture",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Are the backup copies",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your backup architecture security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your backup architecture protection strategy.",
          "recommendation": "Address this gap to improve your overall backup architecture resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "backup-architecture-isolated-storage"
  },
  {
    "id": "5",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1050,
    "text": "Does the data protection solution ensure rogue administrators cannot make sweeping changes to the software by enabling quorum-based authorization?",
    "weight": 3,
    "tags": [
      "backup-architecture"
    ],
    "pdfConfig": {
      "shortName": "Quorum Authorization",
      "responses": {
        "yes": {
          "summary": "✅ Quorum-based protection enabled",
          "detail": "Quorum authorization prevents rogue administrators from making unilateral changes to backup configurations.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ No quorum authorization",
          "detail": "Single administrator can make sweeping changes, creating insider threat risk.",
          "recommendation": "Implement quorum-based authorization for critical backup system changes.",
          "priority": "High"
        }
      }
    },
    "originalId": "backup-architecture-quorum"
  },
  {
    "id": "6",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1060,
    "text": "Does the data protection system enforce the principle of least privilege through a granular Role-Based Access Control (RBAC) system that applies consistently across all user interfaces (GUI, CLI, API)?",
    "weight": 2,
    "tags": [
      "backup-architecture",
      "access-control",
      "least-privilege",
      "granular-recovery",
      "api-integration"
    ],
    "pdfConfig": {
      "shortName": "Access Control",
      "responses": {
        "yes": {
          "summary": "✅ Requirement met",
          "detail": "This capability strengthens your backup architecture security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Gap identified",
          "detail": "This missing capability represents a moderate gap in your backup architecture protection strategy.",
          "recommendation": "Address this gap to improve your overall backup architecture resilience.",
          "priority": "Medium"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "backup-architecture-rbac"
  },
  {
    "id": "7",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1070,
    "text": "Is data protection solution logically air-gapped from the rest of the infrastructure, where there is no ability for anyone to mount or browse the data protection solution's filesystem",
    "weight": 4,
    "tags": [
      "backup-architecture"
    ],
    "pdfConfig": {
      "shortName": "Air-Gap Protection",
      "responses": {
        "yes": {
          "summary": "✅ Air-gapped isolation in place",
          "detail": "Logical air-gap prevents network-based attacks from reaching backup infrastructure.",
          "score": 100
        },
        "no": {
          "summary": "🚨 No air-gap protection",
          "detail": "Without air-gap isolation, compromised networks can lead to backup system compromise.",
          "recommendation": "Implement logical or physical air-gap for backup infrastructure immediately.",
          "priority": "Critical",
          "remediationSteps": [
            "Deploy isolated backup infrastructure segment",
            "Implement network segmentation and firewall rules",
            "Configure offline or isolated cloud backup copies",
            "Test air-gap effectiveness against simulated attacks"
          ]
        }
      }
    },
    "originalId": "backup-architecture-airgap"
  },
  {
    "id": "8",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1080,
    "text": "Does the data protection platform continuously verify data integrity via checksums throughout the entire data lifecycle to protect against unauthorized modification? ",
    "weight": 2,
    "tags": [
      "backup-architecture",
      "data-integrity"
    ],
    "pdfConfig": {
      "shortName": "Integrity Verification",
      "responses": {
        "yes": {
          "summary": "✅ Continuous integrity monitoring active",
          "detail": "Checksums continuously verify data integrity throughout the lifecycle, detecting corruption or tampering early.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ No continuous integrity checks",
          "detail": "Without continuous checksum verification, silent data corruption or tampering may go undetected until recovery is attempted.",
          "recommendation": "Enable continuous checksum verification across all backup data to ensure integrity.",
          "priority": "Medium"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "Alternative integrity verification methods may be in use."
        }
      }
    },
    "originalId": "backup-architecture-checksum"
  },
  {
    "id": "9",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1090,
    "text": "Does the data protection solution allow shell access only to a minimal set of commands required for troubleshooting, with all commands fully auditable?",
    "weight": 2,
    "tags": [
      "backup-architecture"
    ],
    "pdfConfig": {
      "shortName": "Restricted Shell Access",
      "responses": {
        "yes": {
          "summary": "✅ Shell access restricted and audited",
          "detail": "Limited shell commands with full auditing reduce attack surface and ensure accountability.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Unrestricted shell access",
          "detail": "Full shell access increases risk of malicious commands and unauthorized system changes.",
          "recommendation": "Restrict shell access to minimal required commands with comprehensive auditing.",
          "priority": "Medium"
        }
      }
    },
    "originalId": "backup-architecture-shell-access"
  },
  {
    "id": "10",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1100,
    "text": "Does the data protection solution mandate encryption of data both at rest and in transit, utilizing strong encryption standards such as AES-256 for data at rest and TLS 1.2 or higher for data in transit?",
    "weight": 3,
    "tags": [
      "backup-architecture",
      "encryption"
    ],
    "pdfConfig": {
      "shortName": "Data Encryption",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "Data encryption protects sensitive information both at rest and in transit.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "Unencrypted data is vulnerable to theft and exposure, potentially violating compliance requirements.",
          "recommendation": "Implement AES-256 encryption for data at rest and TLS 1.2+ for data in transit.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "backup-architecture-encryption"
  },
  {
    "id": "11",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1110,
    "text": "Does the data protection solution rely on Network Time Protocol (NTP) to determine the age of backups and when to expire them?",
    "weight": 3,
    "tags": [
      "backup-architecture",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Time-Based Retention",
      "responses": {
        "yes": {
          "summary": "⚠️ NTP-dependent retention",
          "detail": "Relying on NTP for backup expiration creates vulnerability to time manipulation attacks.",
          "score": 0
        },
        "no": {
          "summary": "✅ NTP-independent retention",
          "detail": "Backup retention not dependent on manipulable NTP, protecting against time-based attacks.",
          "score": 100
        }
      }
    },
    "originalId": "backup-architecture-ntp"
  },
  {
    "id": "12",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1120,
    "text": "Is multi-factor authentication (MFA) natively integrated and mandatorily enforced for all administrative access attempts?",
    "weight": 3,
    "tags": [
      "backup-architecture",
      "mfa",
      "authentication"
    ],
    "pdfConfig": {
      "shortName": "Multi-Factor Authentication",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "Multi-factor authentication adds an essential layer of security for administrative access.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "Without MFA, administrative accounts are vulnerable to credential theft and unauthorized access.",
          "recommendation": "Enable mandatory multi-factor authentication for all administrative access immediately.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "backup-architecture-mfa"
  },
  {
    "id": "13",
    "category": "Backup Architecture",
    "subcategory": null,
    "order": 1130,
    "text": "Does the data protection solution rely on the Windows operating system for its core functionality?",
    "weight": 3,
    "tags": [
      "backup-architecture"
    ],
    "pdfConfig": {
      "shortName": "Windows OS Dependency",
      "responses": {
        "yes": {
          "summary": "⚠️ Windows-dependent solution",
          "detail": "Dependency on Windows OS increases attack surface and vulnerability to Windows-specific threats.",
          "score": 0
        },
        "no": {
          "summary": "✅ Non-Windows based",
          "detail": "Solution runs on hardened, purpose-built OS reducing common attack vectors.",
          "score": 100
        }
      }
    },
    "originalId": "backup-architecture-windows"
  },
  {
    "id": "14",
    "category": "Datacenter",
    "subcategory": "datacenter-virtualization",
    "order": 2010,
    "text": "Does the data protection solution support agentless backup of virtualized workloads?",
    "weight": 3,
    "tags": [
      "datacenter",
      "virtualization",
      "backup",
      "agentless"
    ],
    "pdfConfig": {
      "shortName": "Agentless Protection",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "Agentless backup reduces attack surface and simplifies management.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "Agent-based backups increase complexity, maintenance overhead, and potential attack vectors.",
          "recommendation": "Transition to agentless backup methods to reduce complexity and attack surface.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-virtualization-agentless"
  },
  {
    "id": "15",
    "category": "Datacenter",
    "subcategory": "datacenter-virtualization",
    "order": 2020,
    "text": "Does the data protection solution support all major hypervisors including VMware vSphere, Microsoft Hyper-V, Nutanix AHV and Red Hat Virtualization?",
    "weight": 3,
    "tags": [
      "datacenter",
      "virtualization",
      "vmware",
      "hyperv",
      "nutanix"
    ],
    "pdfConfig": {
      "shortName": "Support all major",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-virtualization-vmware"
  },
  {
    "id": "16",
    "category": "Datacenter",
    "subcategory": "datacenter-virtualization",
    "order": 2030,
    "text": "Does the data protection solution allow for restoration of a virtual machine in minutes by running it directly from backup storage, without waiting for a full data restore to complete?",
    "weight": 3,
    "tags": [
      "datacenter",
      "virtualization",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Allow for restoration",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-virtualization-doesthedataprotectionsolutionallowforrestorationofavirtualmachineinminutesbyrunningitdirectlyfrombackupstoragewithoutwaitingforafulldatarestoretocomplete"
  },
  {
    "id": "17",
    "category": "Datacenter",
    "subcategory": "datacenter-virtualization",
    "order": 2040,
    "text": "Does the data protection solution support granular recovery of individual files and application objects directly from VM backups, without the need to first recover the virtual machine?",
    "weight": 3,
    "tags": [
      "datacenter",
      "virtualization",
      "backup",
      "recovery",
      "granular-recovery"
    ],
    "pdfConfig": {
      "shortName": "Granular Recovery",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-virtualization-granular-recovery"
  },
  {
    "id": "18",
    "category": "Datacenter",
    "subcategory": "datacenter-virtualization",
    "order": 2050,
    "text": "Does the data protection solution support recovery of VMs to an isolated 'clean room' environment to facilitate malware remediation and forensic analysis?",
    "weight": 3,
    "tags": [
      "datacenter",
      "virtualization",
      "recovery"
    ],
    "pdfConfig": {
      "shortName": "Isolated Storage",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-virtualization-clean-room"
  },
  {
    "id": "19",
    "category": "Datacenter",
    "subcategory": "datacenter-virtualization",
    "order": 2060,
    "text": "Does the data protection solution provide the ability to automatically discover and protect new virtual machines as they are created, without manual intervention?",
    "weight": 3,
    "tags": [
      "datacenter",
      "virtualization",
      "auto-discovery"
    ],
    "pdfConfig": {
      "shortName": "Auto-Discovery",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "Automated discovery ensures new workloads are protected without manual intervention.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "Manual discovery processes lead to gaps in protection as new workloads may be missed.",
          "recommendation": "Implement automated discovery and protection policies for new workloads.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-virtualization-auto-discovery"
  },
  {
    "id": "20",
    "category": "Datacenter",
    "subcategory": "datacenter-database",
    "order": 2070,
    "text": "Does your current backup solution guarantee application-consistent recovery for all transactional databases (e.g., SQL, Oracle), ensuring no data corruption upon restore?",
    "weight": 3,
    "tags": [
      "datacenter",
      "database",
      "backup",
      "recovery",
      "sql",
      "oracle"
    ],
    "pdfConfig": {
      "shortName": "Does your current backup",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-database-sql"
  },
  {
    "id": "21",
    "category": "Datacenter",
    "subcategory": "datacenter-database",
    "order": 2080,
    "text": "Does the data protection solution support all major database platforms including Microsoft SQL Server, Oracle Database, MySQL, PostgreSQL, and NoSQL databases like MongoDB and Cassandra?",
    "weight": 3,
    "tags": [
      "datacenter",
      "database",
      "sql",
      "oracle",
      "mongodb"
    ],
    "pdfConfig": {
      "shortName": "Support all major",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-database-sql-1"
  },
  {
    "id": "22",
    "category": "Datacenter",
    "subcategory": "datacenter-database",
    "order": 2090,
    "text": "Does the data protection solution automatically discover and protect new database instances as they are created, without manual intervention?",
    "weight": 3,
    "tags": [
      "datacenter",
      "database",
      "auto-discovery"
    ],
    "pdfConfig": {
      "shortName": "Auto-Discovery",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "Automated discovery ensures new workloads are protected without manual intervention.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "Manual discovery processes lead to gaps in protection as new workloads may be missed.",
          "recommendation": "Implement automated discovery and protection policies for new workloads.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-database-auto-discovery"
  },
  {
    "id": "23",
    "category": "Datacenter",
    "subcategory": "datacenter-database",
    "order": 2100,
    "text": "Does the data protection solution support granular recovery of individual database objects (e.g., tables, schemas) directly from database backups, without the need to first recover the entire database?",
    "weight": 3,
    "tags": [
      "datacenter",
      "database",
      "backup",
      "recovery",
      "granular-recovery"
    ],
    "pdfConfig": {
      "shortName": "Granular Recovery",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-database-granular-recovery"
  },
  {
    "id": "24",
    "category": "Datacenter",
    "subcategory": "datacenter-database",
    "order": 2110,
    "text": "Does the data protection solution rely on database adminsistrators to write and maintain complex scripts to ensure application-consistent backups?",
    "weight": 3,
    "tags": [
      "datacenter",
      "database",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Rely on database",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-database-scripts"
  },
  {
    "id": "25",
    "category": "Datacenter",
    "subcategory": "datacenter-database",
    "order": 2120,
    "text": "Does the data protection solution allow for instant, zero-byte recovery of databases by running them directly from backup storage, without waiting for a full data restore to complete?",
    "weight": 3,
    "tags": [
      "datacenter",
      "database",
      "backup",
      "recovery",
      "instant-recovery"
    ],
    "pdfConfig": {
      "shortName": "Allow for instant,",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-database-instant-recovery"
  },
  {
    "id": "26",
    "category": "Datacenter",
    "subcategory": "datacenter-database",
    "order": 2130,
    "text": "Does the data protection systemn provide a unified policy engine for infrastructure teams while also empowering database administrators with self-service, role-based access to perform their own granular, point-in-time restores?",
    "weight": 3,
    "tags": [
      "datacenter",
      "database",
      "access-control",
      "granular-recovery",
      "point-in-time-recovery"
    ],
    "pdfConfig": {
      "shortName": "Access Control",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-database-rbac"
  },
  {
    "id": "27",
    "category": "Datacenter",
    "subcategory": "datacenter-database",
    "order": 2140,
    "text": "Does the data protection solution provide the ability to protect transaction logs, enabling point-in-time recovery to moments within the retention period?",
    "weight": 3,
    "tags": [
      "datacenter",
      "database",
      "recovery",
      "point-in-time-recovery",
      "transaction-logs"
    ],
    "pdfConfig": {
      "shortName": "Transaction Log Backup",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-database-transaction-logs"
  },
  {
    "id": "28",
    "category": "Datacenter",
    "subcategory": "datacenter-unstructured",
    "order": 2150,
    "text": "Does the data protection platform provide a global, indexed catalog of all unstructured data, allowing you to perform a search for any file across your entire enterprise and restore it instantly without needing to know its original location or backup date?",
    "weight": 3,
    "tags": [
      "datacenter",
      "unstructured",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Global File Catalog",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-unstructured-doesthedataprotectionplatformprovideaglobalindexedcatalogofallunstructureddataallowingyoutoperformasearchforanyfileacrossyourentireenterpriseandrestoreitinstantlywithoutneedingtoknowitsoriginallocationorbackupdate"
  },
  {
    "id": "29",
    "category": "Datacenter",
    "subcategory": "datacenter-unstructured",
    "order": 2160,
    "text": "Does the data protection solution leverage the NAS vendor's APIs for performant, scalable backups instead of relying on protocols like NDMP?",
    "weight": 3,
    "tags": [
      "datacenter",
      "unstructured",
      "backup",
      "api-integration"
    ],
    "pdfConfig": {
      "shortName": "NAS API Integration",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-unstructured-nas"
  },
  {
    "id": "30",
    "category": "Datacenter",
    "subcategory": "datacenter-unstructured",
    "order": 2170,
    "text": "Does the data protection solution require NAS data to be moved to a separate backup appliance for protection?",
    "weight": 3,
    "tags": [
      "datacenter",
      "unstructured",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Require NAS to",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-unstructured-nas-1"
  },
  {
    "id": "31",
    "category": "Datacenter",
    "subcategory": "datacenter-unstructured",
    "order": 2180,
    "text": "Does the data protection solution leverage a stateless, data-mover VM, to move data directly from the NAS to the backup storage?",
    "weight": 3,
    "tags": [
      "datacenter",
      "unstructured",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Leverage a stateless,",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-unstructured-nas-2"
  },
  {
    "id": "32",
    "category": "Datacenter",
    "subcategory": "datacenter-unstructured",
    "order": 2190,
    "text": "Can you leverage your backup data to answer security and compliance queries, such as identifying all files that contain sensitive data patterns or have not been accessed in several years, without impacting your production environment?",
    "weight": 3,
    "tags": [
      "datacenter",
      "unstructured",
      "backup",
      "compliance"
    ],
    "pdfConfig": {
      "shortName": "Can you leverage your",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your datacenter security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your datacenter protection strategy.",
          "recommendation": "Address this gap to improve your overall datacenter resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "datacenter-unstructured-compliance"
  },
  {
    "id": "33",
    "category": "Cloud",
    "subcategory": null,
    "order": 3010,
    "text": "Do you use a single data protection platform and policy engine to manage backups, replication, and archival for all your workloads, whether they are on-premises, in AWS, Azure, or GCP?",
    "weight": 3,
    "tags": [
      "cloud",
      "backup",
      "aws",
      "azure",
      "gcp"
    ],
    "pdfConfig": {
      "shortName": "Do you use a",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-aws"
  },
  {
    "id": "34",
    "category": "Cloud",
    "subcategory": null,
    "order": 3020,
    "text": "Does the data protection solution automtically discover and protect new cloud native workloads as they are created, without manual intervention?",
    "weight": 3,
    "tags": [
      "cloud"
    ],
    "pdfConfig": {
      "shortName": "Auto-Discovery",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-auto-discovery"
  },
  {
    "id": "35",
    "category": "Cloud",
    "subcategory": null,
    "order": 3030,
    "text": "Does the data protection solution rely on a least-privilege access model, ensuring that even if the credentials are compromised, an attacker cannot delete or encrypt your backup data?",
    "weight": 3,
    "tags": [
      "cloud",
      "encryption",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Data Encryption",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "Data encryption protects sensitive information both at rest and in transit.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "Unencrypted data is vulnerable to theft and exposure, potentially violating compliance requirements.",
          "recommendation": "Implement AES-256 encryption for data at rest and TLS 1.2+ for data in transit.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-encryption"
  },
  {
    "id": "36",
    "category": "Cloud",
    "subcategory": null,
    "order": 3040,
    "text": "Does the data protection solution leverage a token-based authentication model, avoiding the use of long-lived access keys that can be easily compromised?",
    "weight": 3,
    "tags": [
      "cloud",
      "authentication"
    ],
    "pdfConfig": {
      "shortName": "Leverage a token-based",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-authentication"
  },
  {
    "id": "37",
    "category": "Cloud",
    "subcategory": null,
    "order": 3050,
    "text": "Does the data protection solution leverage ephemeral compute resources that are created on-demand in your cloud account to index backups and generate hashes, ensuring that costs remain low?",
    "weight": 3,
    "tags": [
      "cloud",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Leverage ephemeral compute",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-doesthedataprotectionsolutionleverageephemeralcomputeresourcesthatarecreatedondemandinyourcloudaccounttoindexbackupsandgeneratehashesensuringthatcostsremainlow-doesthedataprotectionsolutionleverageephemeralcomputeresourcesthatarecreatedondemandinyourcloudaccounttoindexbackupsandgeneratehashesensuringthatcostsremainlow"
  },
  {
    "id": "38",
    "category": "Cloud",
    "subcategory": null,
    "order": 3060,
    "text": "Does the data protection solution allow the use of customer-managed key encryption keys (CMKEK) for all cloud workloads, ensuring that only the customer has access to the keys and can rotate or revoke them at any time?",
    "weight": 2,
    "tags": [
      "cloud",
      "encryption"
    ],
    "pdfConfig": {
      "shortName": "Data Encryption",
      "responses": {
        "yes": {
          "summary": "✅ Requirement met",
          "detail": "Data encryption protects sensitive information both at rest and in transit.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Gap identified",
          "detail": "Unencrypted data is vulnerable to theft and exposure, potentially violating compliance requirements.",
          "recommendation": "Implement AES-256 encryption for data at rest and TLS 1.2+ for data in transit.",
          "priority": "Medium"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-encryption-1"
  },
  {
    "id": "39",
    "category": "Cloud",
    "subcategory": null,
    "order": 3070,
    "text": "The data protection solution leverages native cloud APIs to ensure efficient, scalable backups without impacting production workloads",
    "weight": 3,
    "tags": [
      "cloud",
      "backup",
      "api-integration"
    ],
    "pdfConfig": {
      "shortName": "The data protection solution",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-thedataprotectionsolutionleveragesnativecloudapistoensureefficientscalablebackupswithoutimpactingproductionworkloads-thedataprotectionsolutionleveragesnativecloudapistoensureefficientscalablebackupswithoutimpactingproductionworkloads"
  },
  {
    "id": "40",
    "category": "Cloud",
    "subcategory": "cloud-aws",
    "order": 3080,
    "text": "Does the data protection solution allow you to store backups in a separate AWS account or Organization that you control, ensuring that even if your primary account is compromised, your backup data remains safe?",
    "weight": 3,
    "tags": [
      "cloud",
      "aws",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Allow you to",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-aws-aws"
  },
  {
    "id": "41",
    "category": "Cloud",
    "subcategory": "cloud-aws",
    "order": 3090,
    "text": "Does the data protection solution provide a CloudFormation template to automate the deployment of all necessary components and IAM roles in your AWS account, minimizing the risk of human error and allowing for easy modification as new services are supported?",
    "weight": 3,
    "tags": [
      "cloud",
      "aws"
    ],
    "pdfConfig": {
      "shortName": "IAM Role Authentication",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-aws-aws-1"
  },
  {
    "id": "42",
    "category": "Cloud",
    "subcategory": "cloud-aws",
    "order": 3100,
    "text": "Does the data protection solution allow you to leverage your own S3 bucket for backup storage, breaking away from the pre-defined storage tiering and allowing you to take advantage of cost optimzed tiers like S3 Galcier?",
    "weight": 3,
    "tags": [
      "cloud",
      "aws",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Allow you to",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-aws-s3"
  },
  {
    "id": "43",
    "category": "Cloud",
    "subcategory": "cloud-aws",
    "order": 3110,
    "text": "Does the data protection solution leverage a centralized ephemeral compute engine to index backups and generate hashes, minimizing complexity, enhancing security, and keeping costs under control?",
    "weight": 3,
    "tags": [
      "cloud",
      "aws",
      "backup",
      "entra-id"
    ],
    "pdfConfig": {
      "shortName": "Leverage a centralized",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-aws-entra"
  },
  {
    "id": "44",
    "category": "Cloud",
    "subcategory": "cloud-aws",
    "order": 3120,
    "text": "Does the data protection solution allow you to restore cross-region, cross-account, cross-organization, or any combination thereof?",
    "weight": 3,
    "tags": [
      "cloud",
      "aws"
    ],
    "pdfConfig": {
      "shortName": "Cross-Region Recovery",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-aws-doesthedataprotectionsolutionallowyoutorestorecrossregioncrossaccountcrossorganizationoranycombinationthereof"
  },
  {
    "id": "45",
    "category": "Cloud",
    "subcategory": "cloud-aws",
    "order": 3130,
    "text": "Does the data protection solution allow the scanning, indexing and protection of petabytes of S3 data without the need to first move it to a separate backup appliance?",
    "weight": 3,
    "tags": [
      "cloud",
      "aws",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Allow scanning, indexing",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-aws-s3-1"
  },
  {
    "id": "46",
    "category": "Cloud",
    "subcategory": "cloud-azure",
    "order": 3140,
    "text": "Does the data protection solution allow you to store backups in a separate Azure subscription or tenant that you control, ensuring that even if your primary subscription is compromised, your backup data remains safe?",
    "weight": 3,
    "tags": [
      "cloud",
      "azure",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Allow you to",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-azure-scripts"
  },
  {
    "id": "47",
    "category": "Cloud",
    "subcategory": "cloud-azure",
    "order": 3150,
    "text": "Does the data protection solution provide an ARM template to automate the deployment of all necessary components and roles in your Azure subscription, minimizing the risk of human error and allowing for easy modification as new services are supported?",
    "weight": 3,
    "tags": [
      "cloud",
      "azure"
    ],
    "pdfConfig": {
      "shortName": "Provide an ARM",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-azure-scripts-1"
  },
  {
    "id": "48",
    "category": "Cloud",
    "subcategory": "cloud-azure",
    "order": 3160,
    "text": "Does the data protection solution allow you to leverage your own Azure Blob Storage account for backup storage, breaking away from the pre-defined storage tiering and allowing you to take advantage of cost optimzed tiers like Cool and Archive?",
    "weight": 3,
    "tags": [
      "cloud",
      "azure",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Allow you to",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-azure-azure"
  },
  {
    "id": "49",
    "category": "Cloud",
    "subcategory": "cloud-azure",
    "order": 3170,
    "text": "Does the data protection solution leverage a centralized ephemeral compute engine to index backups and generate hashes, minimizing complexity, enhancing security, and keeping costs under control?",
    "weight": 3,
    "tags": [
      "cloud",
      "azure",
      "backup",
      "entra-id"
    ],
    "pdfConfig": {
      "shortName": "Leverage a centralized",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-azure-entra"
  },
  {
    "id": "50",
    "category": "Cloud",
    "subcategory": "cloud-azure",
    "order": 3180,
    "text": "Does the data protection solution allow you to restore cross-region, cross-subscription, cross-tenant, or any combination thereof?",
    "weight": 3,
    "tags": [
      "cloud",
      "azure"
    ],
    "pdfConfig": {
      "shortName": "Cross-Region Recovery",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-azure-scripts-2"
  },
  {
    "id": "51",
    "category": "Cloud",
    "subcategory": "cloud-azure",
    "order": 3190,
    "text": "Does the data protection solution allow the scanning, indexing and protection of petabytes of Azure Blob data without the need to first move it to a separate backup appliance?",
    "weight": 3,
    "tags": [
      "cloud",
      "azure",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Allow scanning, indexing",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-azure-azure-1"
  },
  {
    "id": "52",
    "category": "Cloud",
    "subcategory": "cloud-azure",
    "order": 3200,
    "text": "Does the data protection solution allow you to restore files and folders from protected Azure VMs without first having to restore to an Azure storage account?",
    "weight": 3,
    "tags": [
      "cloud",
      "azure"
    ],
    "pdfConfig": {
      "shortName": "Allow you to",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cloud security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cloud protection strategy.",
          "recommendation": "Address this gap to improve your overall cloud resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cloud-azure-azure-2"
  },
  {
    "id": "53",
    "category": "SaaS",
    "subcategory": "saas-microsoft-365",
    "order": 4010,
    "text": "Is the Microsoft 365 data protected with a third-party tool or is the organization relying on Microsoft's recycle bin and legal hold to preserve data?",
    "weight": 3,
    "tags": [
      "saas",
      "microsoft-365"
    ],
    "pdfConfig": {
      "shortName": "Is the Microsoft 365",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-microsoft-365-m365"
  },
  {
    "id": "54",
    "category": "SaaS",
    "subcategory": "saas-microsoft-365",
    "order": 4020,
    "text": "Does the data protection solution allow you to logically air-gap your M365 data away, outside of your M365 tenant?",
    "weight": 3,
    "tags": [
      "saas",
      "microsoft-365"
    ],
    "pdfConfig": {
      "shortName": "Allow you to",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-microsoft-365-airgap"
  },
  {
    "id": "55",
    "category": "SaaS",
    "subcategory": "saas-microsoft-365",
    "order": 4030,
    "text": "Does the data protection solution allow you to bring your own encryption key, allowing for seamless key rotation and ensuring that you can remove access to the data whenever you require?",
    "weight": 3,
    "tags": [
      "saas",
      "microsoft-365",
      "encryption"
    ],
    "pdfConfig": {
      "shortName": "Data Encryption",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "Data encryption protects sensitive information both at rest and in transit.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "Unencrypted data is vulnerable to theft and exposure, potentially violating compliance requirements.",
          "recommendation": "Implement AES-256 encryption for data at rest and TLS 1.2+ for data in transit.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-microsoft-365-encryption"
  },
  {
    "id": "56",
    "category": "SaaS",
    "subcategory": "saas-microsoft-365",
    "order": 4040,
    "text": "Does the data protection solution allow for granular recovery of email, calendar items, Sharepoint site, OneDrive files, or Teams chats, without needing to restore the entire item, empowered by a 'Google-like' search?",
    "weight": 3,
    "tags": [
      "saas",
      "microsoft-365",
      "recovery",
      "granular-recovery"
    ],
    "pdfConfig": {
      "shortName": "Granular Recovery",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-microsoft-365-granular-recovery"
  },
  {
    "id": "57",
    "category": "SaaS",
    "subcategory": "saas-microsoft-365",
    "order": 4050,
    "text": "Does the data protection solution automatically discover and protect new users, sites, and channels without needing manual configuration?",
    "weight": 3,
    "tags": [
      "saas",
      "microsoft-365",
      "auto-discovery"
    ],
    "pdfConfig": {
      "shortName": "Auto-Discovery",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "Automated discovery ensures new workloads are protected without manual intervention.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "Manual discovery processes lead to gaps in protection as new workloads may be missed.",
          "recommendation": "Implement automated discovery and protection policies for new workloads.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-microsoft-365-auto-discovery"
  },
  {
    "id": "58",
    "category": "SaaS",
    "subcategory": "saas-microsoft-365",
    "order": 4060,
    "text": "Does the data protection solution allow for export of data in native formats (e.g. PST, EML, MSG) directly from the backup without needing to first restore?",
    "weight": 3,
    "tags": [
      "saas",
      "microsoft-365",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Allow for export",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-microsoft-doesthedataprotectionsolutionallowforexportofdatainnativeformatsegpstemlmsgdirectlyfromthebackupwithoutneedingtofirstrestore"
  },
  {
    "id": "59",
    "category": "SaaS",
    "subcategory": "saas-microsoft-365",
    "order": 4070,
    "text": "Does the data protection solution provide legal hold capabilities with immutable compliance copies for M365 data?",
    "weight": 3,
    "tags": [
      "saas",
      "microsoft-365",
      "immutability",
      "compliance"
    ],
    "pdfConfig": {
      "shortName": "Immutable Storage",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "Your backup data is protected with immutable storage, providing strong defense against ransomware and unauthorized modifications.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "Without immutable storage, your backups remain vulnerable to encryption or deletion by ransomware and malicious actors.",
          "recommendation": "Implement an append-only filesystem or immutable storage solution to protect against ransomware.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-microsoft-365-immutable"
  },
  {
    "id": "60",
    "category": "SaaS",
    "subcategory": "saas-microsoft-365",
    "order": 4080,
    "text": "Does the data protection solution include comprehensive Teams data protection including private channels, chat history and file attachments?",
    "weight": 3,
    "tags": [
      "saas",
      "microsoft-365"
    ],
    "pdfConfig": {
      "shortName": "Include comprehensive Teams",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-microsoft-365-teams"
  },
  {
    "id": "61",
    "category": "SaaS",
    "subcategory": "saas-microsoft-365",
    "order": 4090,
    "text": "Does the data protection solution provide an interface where users self-service their own restore operations?",
    "weight": 3,
    "tags": [
      "saas",
      "microsoft-365"
    ],
    "pdfConfig": {
      "shortName": "Provide an interface",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-microsoft-doesthedataprotectionsolutionprovideaninterfacewhereusersselfservicetheirownrestoreoperations"
  },
  {
    "id": "62",
    "category": "SaaS",
    "subcategory": "saas-microsoft-365",
    "order": 4100,
    "text": "Does the data protection solution provide the ability to orchestrate recovery so that capstone users and their most-recent data is recovered first, allowing them to get back to business quicket?",
    "weight": 3,
    "tags": [
      "saas",
      "microsoft-365",
      "recovery"
    ],
    "pdfConfig": {
      "shortName": "Provide ability to",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-microsoft-doesthedataprotectionsolutionprovidetheabilitytoorchestraterecoverysothatcapstoneusersandtheirmostrecentdataisrecoveredfirstallowingthemtogetbacktobusinessquicket"
  },
  {
    "id": "63",
    "category": "SaaS",
    "subcategory": "saas-microsoft-365",
    "order": 4110,
    "text": "Does the data protection solution provide a single admin interface, allowing backup admins to see across the entire data estate, including M365 data?",
    "weight": 3,
    "tags": [
      "saas",
      "microsoft-365",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Provide a single",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-microsoft-365-m365-1"
  },
  {
    "id": "64",
    "category": "SaaS",
    "subcategory": "saas-salesforce",
    "order": 4120,
    "text": "The data protection solution captures and protects metadaa, configuration and customizations alongside data?",
    "weight": 3,
    "tags": [
      "saas",
      "salesforce"
    ],
    "pdfConfig": {
      "shortName": "The data protection solution",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-salesforce-thedataprotectionsolutioncapturesandprotectsmetadaaconfigurationandcustomizationsalongsidedata"
  },
  {
    "id": "65",
    "category": "SaaS",
    "subcategory": "saas-salesforce",
    "order": 4130,
    "text": "The data protection solution allows you to perform point-in-time recovery of Salesforce data to any specific moment within your retention period?",
    "weight": 3,
    "tags": [
      "saas",
      "salesforce",
      "recovery",
      "point-in-time-recovery"
    ],
    "pdfConfig": {
      "shortName": "Point-in-Time Recovery",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-salesforce-point-in-time"
  },
  {
    "id": "66",
    "category": "SaaS",
    "subcategory": "saas-salesforce",
    "order": 4140,
    "text": "The data protection solutions prodivdes the ability to automatically take daily backups without impacting org performance",
    "weight": 3,
    "tags": [
      "saas",
      "salesforce",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "The data protection solutions",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-salesforce-thedataprotectionsolutionsprodivdestheabilitytoautomaticallytakedailybackupswithoutimpactingorgperformance"
  },
  {
    "id": "67",
    "category": "SaaS",
    "subcategory": "saas-salesforce",
    "order": 4150,
    "text": "The data protection solution allows you to restore to a sandbox environment for testing and development purposes?",
    "weight": 3,
    "tags": [
      "saas",
      "salesforce"
    ],
    "pdfConfig": {
      "shortName": "The data protection solution",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-salesforce-thedataprotectionsolutionallowsyoutorestoretoasandboxenvironmentfortestinganddevelopmentpurposes"
  },
  {
    "id": "68",
    "category": "SaaS",
    "subcategory": "saas-salesforce",
    "order": 4160,
    "text": "The data protection solution is able to capture all custom objects, fields and relationship data?",
    "weight": 3,
    "tags": [
      "saas",
      "salesforce"
    ],
    "pdfConfig": {
      "shortName": "The data protection solution",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-salesforce-thedataprotectionsolutionisabletocaptureallcustomobjectsfieldsandrelationshipdata"
  },
  {
    "id": "69",
    "category": "SaaS",
    "subcategory": "saas-salesforce",
    "order": 4170,
    "text": "The data protection solution allows you to compare Salesforce configurations between different snapshots, as well as against the live environment, determining the impact to a restoration operation?",
    "weight": 3,
    "tags": [
      "saas",
      "salesforce"
    ],
    "pdfConfig": {
      "shortName": "The data protection solution",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-salesforce-salesforce"
  },
  {
    "id": "70",
    "category": "SaaS",
    "subcategory": "saas-salesforce",
    "order": 4180,
    "text": "The data protection solution provides granular recovery options, allowing restoration of individual records or fields?",
    "weight": 3,
    "tags": [
      "saas",
      "salesforce",
      "recovery",
      "granular-recovery"
    ],
    "pdfConfig": {
      "shortName": "Granular Recovery",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-salesforce-granular-recovery"
  },
  {
    "id": "71",
    "category": "SaaS",
    "subcategory": "saas-salesforce",
    "order": 4190,
    "text": "The Salesforce backup data is stored outside of Salesforce Infrastructure, providing true air-gap protection?",
    "weight": 4,
    "tags": [
      "saas",
      "salesforce",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "The Salesforce backup data",
      "responses": {
        "yes": {
          "summary": "✅ Critical requirement satisfied",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "🚨 Critical gap identified",
          "detail": "This missing capability represents a significant gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "Critical"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-salesforce-airgap"
  },
  {
    "id": "72",
    "category": "SaaS",
    "subcategory": "saas-dynamics-365",
    "order": 4200,
    "text": "The data protection solution protects both data and customizations including workflows, business rules and forms?",
    "weight": 3,
    "tags": [
      "saas",
      "dynamics-365"
    ],
    "pdfConfig": {
      "shortName": "The data protection solution",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-dynamics-thedataprotectionsolutionprotectsbothdataandcustomizationsincludingworkflowsbusinessrulesandforms"
  },
  {
    "id": "73",
    "category": "SaaS",
    "subcategory": "saas-dynamics-365",
    "order": 4210,
    "text": "The data protection solution performs automated daily backups of Dynamics 365 without requiring export jobs or manual interventions?",
    "weight": 3,
    "tags": [
      "saas",
      "dynamics-365",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "The data protection solution",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-dynamics-thedataprotectionsolutionperformsautomateddailybackupsofdynamics365withoutrequiringexportjobsormanualinterventions"
  },
  {
    "id": "74",
    "category": "SaaS",
    "subcategory": "saas-dynamics-365",
    "order": 4220,
    "text": "The data protection solution can restore Dynamics 365 data to different environments (e.g. production, sandbox, etc.)?",
    "weight": 3,
    "tags": [
      "saas",
      "dynamics-365"
    ],
    "pdfConfig": {
      "shortName": "The data protection solution",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-dynamics-thedataprotectionsolutioncanrestoredynamics365datatodifferentenvironmentsegproductionsandboxetc"
  },
  {
    "id": "75",
    "category": "SaaS",
    "subcategory": "saas-dynamics-365",
    "order": 4230,
    "text": "The data protection solution includes system settings, security roles, and user permissions?",
    "weight": 3,
    "tags": [
      "saas",
      "dynamics-365"
    ],
    "pdfConfig": {
      "shortName": "The data protection solution",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-dynamics-thedataprotectionsolutionincludessystemsettingssecurityrolesanduserpermissions"
  },
  {
    "id": "76",
    "category": "SaaS",
    "subcategory": "saas-dynamics-365",
    "order": 4240,
    "text": "The data protection solution provides granular recovery options allowing restoration of specific entities or records?",
    "weight": 3,
    "tags": [
      "saas",
      "dynamics-365",
      "recovery",
      "granular-recovery"
    ],
    "pdfConfig": {
      "shortName": "Granular Recovery",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-dynamics-365-granular-recovery"
  },
  {
    "id": "77",
    "category": "SaaS",
    "subcategory": "saas-dynamics-365",
    "order": 4250,
    "text": "The data protection solution stores the Dynamics 365 backup data indepenantly from Microsoft's infrastructure, in an immutable format?",
    "weight": 3,
    "tags": [
      "saas",
      "dynamics-365",
      "immutability",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Immutable Storage",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "Your backup data is protected with immutable storage, providing strong defense against ransomware and unauthorized modifications.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "Without immutable storage, your backups remain vulnerable to encryption or deletion by ransomware and malicious actors.",
          "recommendation": "Implement an append-only filesystem or immutable storage solution to protect against ransomware.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-dynamics-365-immutable"
  },
  {
    "id": "78",
    "category": "SaaS",
    "subcategory": "saas-dynamics-365",
    "order": 4260,
    "text": "The data protection solution provides detailed audit logs of all Dynamics 365 backup and recovery operations?",
    "weight": 3,
    "tags": [
      "saas",
      "dynamics-365",
      "backup",
      "recovery"
    ],
    "pdfConfig": {
      "shortName": "The data protection solution",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-dynamics-thedataprotectionsolutionprovidesdetailedauditlogsofalldynamics365backupandrecoveryoperations"
  },
  {
    "id": "79",
    "category": "SaaS",
    "subcategory": "saas-dynamics-365",
    "order": 4270,
    "text": "The data protection solutions provides an easy-to-use, single Admin user interface to configure protection across the data estate, including Dynamics 365?",
    "weight": 4,
    "tags": [
      "saas",
      "dynamics-365"
    ],
    "pdfConfig": {
      "shortName": "The data protection solutions",
      "responses": {
        "yes": {
          "summary": "✅ Critical requirement satisfied",
          "detail": "This capability strengthens your saas security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "🚨 Critical gap identified",
          "detail": "This missing capability represents a significant gap in your saas protection strategy.",
          "recommendation": "Address this gap to improve your overall saas resilience.",
          "priority": "Critical"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "saas-dynamics-thedataprotectionsolutionsprovidesaneasytousesingleadminuserinterfacetoconfigureprotectionacrossthedataestateincludingdynamics365"
  },
  {
    "id": "80",
    "category": "Identity",
    "subcategory": "identity-active-directory",
    "order": 5010,
    "text": "Are you protecting all parts of your Active Directory Forest?",
    "weight": 3,
    "tags": [
      "identity",
      "active-directory"
    ],
    "pdfConfig": {
      "shortName": "Are you protecting all",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your identity security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your identity protection strategy.",
          "recommendation": "Address this gap to improve your overall identity resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "identity-active-directory-active-directory"
  },
  {
    "id": "81",
    "category": "Identity",
    "subcategory": "identity-active-directory",
    "order": 5020,
    "text": "Are you protecting data in Microsoft EntraID, not relying on the recycle bin?",
    "weight": 3,
    "tags": [
      "identity",
      "active-directory",
      "entra-id"
    ],
    "pdfConfig": {
      "shortName": "Are you protecting data",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your identity security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your identity protection strategy.",
          "recommendation": "Address this gap to improve your overall identity resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "identity-active-directory-entra"
  },
  {
    "id": "82",
    "category": "Identity",
    "subcategory": "identity-active-directory",
    "order": 5030,
    "text": "Identity protection solution stores data on logically air gapped system, resilient from cyber attack.",
    "weight": 3,
    "tags": [
      "identity",
      "active-directory",
      "airgap",
      "cybersecurity"
    ],
    "pdfConfig": {
      "shortName": "Air-Gapped Backups",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "Air-gapped isolation ensures your backups remain protected even if production networks are compromised.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "Lack of air-gapped backups means compromised production systems could lead to backup corruption or loss.",
          "recommendation": "Establish air-gapped backup copies using offline storage or isolated cloud accounts.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "identity-active-identityprotectionsolutionstoresdataonlogicallyairgappedsystemresilientfromcyberattack"
  },
  {
    "id": "83",
    "category": "Identity",
    "subcategory": "identity-active-directory",
    "order": 5040,
    "text": "Orchestrate recovery of Active Directory Forests.",
    "weight": 3,
    "tags": [
      "identity",
      "active-directory",
      "recovery"
    ],
    "pdfConfig": {
      "shortName": "Orchestrate recovery of Active",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your identity security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your identity protection strategy.",
          "recommendation": "Address this gap to improve your overall identity resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "identity-active-directory-active-directory-1"
  },
  {
    "id": "84",
    "category": "Identity",
    "subcategory": "identity-active-directory",
    "order": 5050,
    "text": "In addition to Users and Groups, protect Enterprise Applications, Application Registrations and Conditional Access Policies in Microsoft EntraID.",
    "weight": 3,
    "tags": [
      "identity",
      "active-directory",
      "entra-id"
    ],
    "pdfConfig": {
      "shortName": "In addition to Users",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your identity security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your identity protection strategy.",
          "recommendation": "Address this gap to improve your overall identity resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "identity-active-directory-entra-1"
  },
  {
    "id": "85",
    "category": "Identity",
    "subcategory": "identity-active-directory",
    "order": 5060,
    "text": "Recover both Active Directory Forest and EntraID Enterprise Apps, App Registrations and Conditional Access Policies.",
    "weight": 3,
    "tags": [
      "identity",
      "active-directory",
      "recovery",
      "entra-id"
    ],
    "pdfConfig": {
      "shortName": "Recover both Active Directory",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your identity security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your identity protection strategy.",
          "recommendation": "Address this gap to improve your overall identity resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "identity-active-directory-active-directory-2"
  },
  {
    "id": "86",
    "category": "Identity",
    "subcategory": "identity-active-directory",
    "order": 5070,
    "text": "Compare AD object attritbutes between two snapshots.",
    "weight": 3,
    "tags": [
      "identity",
      "active-directory"
    ],
    "pdfConfig": {
      "shortName": "Compare AD object attritbutes",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your identity security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your identity protection strategy.",
          "recommendation": "Address this gap to improve your overall identity resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "identity-active-compareadobjectattritbutesbetweentwosnapshots"
  },
  {
    "id": "87",
    "category": "Identity",
    "subcategory": "identity-active-directory",
    "order": 5080,
    "text": "Recover AD object attributes to production Active Directory without the need to recover the full forest, domain or object",
    "weight": 3,
    "tags": [
      "identity",
      "active-directory",
      "recovery"
    ],
    "pdfConfig": {
      "shortName": "Recover AD object attributes",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your identity security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your identity protection strategy.",
          "recommendation": "Address this gap to improve your overall identity resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "identity-active-directory-active-directory-3"
  },
  {
    "id": "88",
    "category": "Cyber Tools",
    "subcategory": null,
    "order": 6010,
    "text": "Ability to detect and alert on active encryption events across all data sources",
    "weight": 4,
    "tags": [
      "cyber-tools",
      "encryption"
    ],
    "pdfConfig": {
      "shortName": "Data Encryption",
      "responses": {
        "yes": {
          "summary": "✅ Critical requirement satisfied",
          "detail": "Data encryption protects sensitive information both at rest and in transit.",
          "score": 100
        },
        "no": {
          "summary": "🚨 Critical gap identified",
          "detail": "Unencrypted data is vulnerable to theft and exposure, potentially violating compliance requirements.",
          "recommendation": "Implement AES-256 encryption for data at rest and TLS 1.2+ for data in transit.",
          "priority": "Critical"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cyber-tools-encryption"
  },
  {
    "id": "89",
    "category": "Cyber Tools",
    "subcategory": null,
    "order": 6020,
    "text": "Detect and alert on encryption events in VM environment",
    "weight": 4,
    "tags": [
      "cyber-tools",
      "encryption"
    ],
    "pdfConfig": {
      "shortName": "Data Encryption",
      "responses": {
        "yes": {
          "summary": "✅ Critical requirement satisfied",
          "detail": "Data encryption protects sensitive information both at rest and in transit.",
          "score": 100
        },
        "no": {
          "summary": "🚨 Critical gap identified",
          "detail": "Unencrypted data is vulnerable to theft and exposure, potentially violating compliance requirements.",
          "recommendation": "Implement AES-256 encryption for data at rest and TLS 1.2+ for data in transit.",
          "priority": "Critical"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cyber-tools-encryption-1"
  },
  {
    "id": "90",
    "category": "Cyber Tools",
    "subcategory": null,
    "order": 6030,
    "text": "Rapidly hunt for indicators of compromise via YARA rules and file hashes in 60 seconds to identify the clean point of recovery",
    "weight": 4,
    "tags": [
      "cyber-tools",
      "recovery",
      "api-integration"
    ],
    "pdfConfig": {
      "shortName": "Rapidly hunt for indicators",
      "responses": {
        "yes": {
          "summary": "✅ Critical requirement satisfied",
          "detail": "This capability strengthens your cyber tools security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "🚨 Critical gap identified",
          "detail": "This missing capability represents a significant gap in your cyber tools protection strategy.",
          "recommendation": "Address this gap to improve your overall cyber tools resilience.",
          "priority": "Critical"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cyber-tools-rapidlyhuntforindicatorsofcompromiseviayararulesandfilehashesin60secondstoidentifythecleanpointofrecovery"
  },
  {
    "id": "91",
    "category": "Cyber Tools",
    "subcategory": null,
    "order": 6040,
    "text": "Proactively scan and alert on known indicators of compromise from an industry standard list of signatures, alerting customers to threats within their environment before the attack occurs",
    "weight": 4,
    "tags": [
      "cyber-tools",
      "threat-detection"
    ],
    "pdfConfig": {
      "shortName": "Proactively scan and alert",
      "responses": {
        "yes": {
          "summary": "✅ Critical requirement satisfied",
          "detail": "This capability strengthens your cyber tools security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "🚨 Critical gap identified",
          "detail": "This missing capability represents a significant gap in your cyber tools protection strategy.",
          "recommendation": "Address this gap to improve your overall cyber tools resilience.",
          "priority": "Critical"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cyber-tools-threat-detection"
  },
  {
    "id": "92",
    "category": "Cyber Tools",
    "subcategory": null,
    "order": 6050,
    "text": "Add custom YARA rules or file hashes to the scanning engine and scan for those IOCs on every backup",
    "weight": 3,
    "tags": [
      "cyber-tools",
      "backup"
    ],
    "pdfConfig": {
      "shortName": "Add custom YARA rules",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cyber tools security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cyber tools protection strategy.",
          "recommendation": "Address this gap to improve your overall cyber tools resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cyber-tools-addcustomyararulesorfilehashestothescanningengineandscanforthoseiocsoneverybackup"
  },
  {
    "id": "93",
    "category": "Cyber Tools",
    "subcategory": null,
    "order": 6060,
    "text": "Scan all data sources for sensitive data with 60 built-in scanners",
    "weight": 3,
    "tags": [
      "cyber-tools"
    ],
    "pdfConfig": {
      "shortName": "Scan all data sources",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cyber tools security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cyber tools protection strategy.",
          "recommendation": "Address this gap to improve your overall cyber tools resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cyber-tools-scanalldatasourcesforsensitivedatawith60builtinscanners"
  },
  {
    "id": "94",
    "category": "Cyber Tools",
    "subcategory": null,
    "order": 6070,
    "text": "Build custom scanners based off dictionary words or patterns and identify all data that matches across all data sources",
    "weight": 3,
    "tags": [
      "cyber-tools"
    ],
    "pdfConfig": {
      "shortName": "Build custom scanners based",
      "responses": {
        "yes": {
          "summary": "✅ Important capability in place",
          "detail": "This capability strengthens your cyber tools security posture and resilience.",
          "score": 100
        },
        "no": {
          "summary": "⚠️ Important capability missing",
          "detail": "This missing capability represents a important gap in your cyber tools protection strategy.",
          "recommendation": "Address this gap to improve your overall cyber tools resilience.",
          "priority": "High"
        },
        "na": {
          "summary": "⚪ Not applicable",
          "detail": "This requirement does not apply to the current environment or use case."
        }
      }
    },
    "originalId": "cyber-tools-rds"
  }
];

// ID mapping from V1 to V2 (for backward compatibility)
export const v1ToV2Mapping = {
  "1.01": "1",
  "1.02": "2",
  "1.08": "8",
  "1.03": "3",
  "1.04": "4",
  "1.05": "5",
  "1.07": "7",
  "1.12": "12",
  "1.13": "13",
  "1.06": "6",
  "1.09": "9",
  "1.10": "10",
  "1.11": "11",
  "2.01": "14",
  "2.02": "15",
  "2.03": "16",
  "2.04": "17",
  "2.05": "18",
  "2.06": "19",
  "2.07": "20",
  "2.08": "21",
  "2.09": "22",
  "2.10": "23",
  "2.11": "24",
  "2.12": "25",
  "2.13": "26",
  "2.14": "27",
  "2.15": "28",
  "2.16": "29",
  "2.17": "30",
  "2.18": "31",
  "2.19": "32",
  "3.01": "33",
  "3.02": "34",
  "3.03": "35",
  "3.04": "36",
  "3.05": "37",
  "3.06": "38",
  "3.07": "39",
  "3.08": "40",
  "3.09": "41",
  "3.10": "42",
  "3.11": "43",
  "3.12": "44",
  "3.13": "45",
  "3.14": "46",
  "3.15": "47",
  "3.16": "48",
  "3.17": "49",
  "3.18": "50",
  "3.19": "51",
  "3.20": "52",
  "4.01": "53",
  "4.02": "54",
  "4.03": "55",
  "4.04": "56",
  "4.05": "57",
  "4.06": "58",
  "4.07": "59",
  "4.08": "60",
  "4.09": "61",
  "4.10": "62",
  "4.11": "63",
  "4.12": "64",
  "4.13": "65",
  "4.14": "66",
  "4.15": "67",
  "4.16": "68",
  "4.17": "69",
  "4.18": "70",
  "4.19": "71",
  "4.20": "72",
  "4.21": "73",
  "4.22": "74",
  "4.23": "75",
  "4.24": "76",
  "4.25": "77",
  "4.26": "78",
  "4.27": "79",
  "5.01": "80",
  "5.02": "81",
  "5.03": "82",
  "5.04": "83",
  "5.05": "84",
  "5.06": "85",
  "5.07": "86",
  "5.08": "87",
  "6.01": "88",
  "6.02": "89",
  "6.03": "90",
  "6.04": "91",
  "6.05": "92",
  "6.06": "93",
  "6.07": "94"
};

// Descriptive to Numeric ID mapping (for reference)
export const descriptiveToNumericMapping = {
  "backup-architecture-append-only": "1",
  "backup-architecture-immutable": "2",
  "backup-architecture-security-domain": "3",
  "backup-architecture-isolated-storage": "4",
  "backup-architecture-quorum": "5",
  "backup-architecture-rbac": "6",
  "backup-architecture-airgap": "7",
  "backup-architecture-checksum": "8",
  "backup-architecture-shell-access": "9",
  "backup-architecture-encryption": "10",
  "backup-architecture-ntp": "11",
  "backup-architecture-mfa": "12",
  "backup-architecture-windows": "13",
  "datacenter-virtualization-agentless": "14",
  "datacenter-virtualization-vmware": "15",
  "datacenter-virtualization-doesthedataprotectionsolutionallowforrestorationofavirtualmachineinminutesbyrunningitdirectlyfrombackupstoragewithoutwaitingforafulldatarestoretocomplete": "16",
  "datacenter-virtualization-granular-recovery": "17",
  "datacenter-virtualization-clean-room": "18",
  "datacenter-virtualization-auto-discovery": "19",
  "datacenter-database-sql": "20",
  "datacenter-database-sql-1": "21",
  "datacenter-database-auto-discovery": "22",
  "datacenter-database-granular-recovery": "23",
  "datacenter-database-scripts": "24",
  "datacenter-database-instant-recovery": "25",
  "datacenter-database-rbac": "26",
  "datacenter-database-transaction-logs": "27",
  "datacenter-unstructured-doesthedataprotectionplatformprovideaglobalindexedcatalogofallunstructureddataallowingyoutoperformasearchforanyfileacrossyourentireenterpriseandrestoreitinstantlywithoutneedingtoknowitsoriginallocationorbackupdate": "28",
  "datacenter-unstructured-nas": "29",
  "datacenter-unstructured-nas-1": "30",
  "datacenter-unstructured-nas-2": "31",
  "datacenter-unstructured-compliance": "32",
  "cloud-aws": "33",
  "cloud-auto-discovery": "34",
  "cloud-encryption": "35",
  "cloud-authentication": "36",
  "cloud-doesthedataprotectionsolutionleverageephemeralcomputeresourcesthatarecreatedondemandinyourcloudaccounttoindexbackupsandgeneratehashesensuringthatcostsremainlow-doesthedataprotectionsolutionleverageephemeralcomputeresourcesthatarecreatedondemandinyourcloudaccounttoindexbackupsandgeneratehashesensuringthatcostsremainlow": "37",
  "cloud-encryption-1": "38",
  "cloud-thedataprotectionsolutionleveragesnativecloudapistoensureefficientscalablebackupswithoutimpactingproductionworkloads-thedataprotectionsolutionleveragesnativecloudapistoensureefficientscalablebackupswithoutimpactingproductionworkloads": "39",
  "cloud-aws-aws": "40",
  "cloud-aws-aws-1": "41",
  "cloud-aws-s3": "42",
  "cloud-aws-entra": "43",
  "cloud-aws-doesthedataprotectionsolutionallowyoutorestorecrossregioncrossaccountcrossorganizationoranycombinationthereof": "44",
  "cloud-aws-s3-1": "45",
  "cloud-azure-scripts": "46",
  "cloud-azure-scripts-1": "47",
  "cloud-azure-azure": "48",
  "cloud-azure-entra": "49",
  "cloud-azure-scripts-2": "50",
  "cloud-azure-azure-1": "51",
  "cloud-azure-azure-2": "52",
  "saas-microsoft-365-m365": "53",
  "saas-microsoft-365-airgap": "54",
  "saas-microsoft-365-encryption": "55",
  "saas-microsoft-365-granular-recovery": "56",
  "saas-microsoft-365-auto-discovery": "57",
  "saas-microsoft-doesthedataprotectionsolutionallowforexportofdatainnativeformatsegpstemlmsgdirectlyfromthebackupwithoutneedingtofirstrestore": "58",
  "saas-microsoft-365-immutable": "59",
  "saas-microsoft-365-teams": "60",
  "saas-microsoft-doesthedataprotectionsolutionprovideaninterfacewhereusersselfservicetheirownrestoreoperations": "61",
  "saas-microsoft-doesthedataprotectionsolutionprovidetheabilitytoorchestraterecoverysothatcapstoneusersandtheirmostrecentdataisrecoveredfirstallowingthemtogetbacktobusinessquicket": "62",
  "saas-microsoft-365-m365-1": "63",
  "saas-salesforce-thedataprotectionsolutioncapturesandprotectsmetadaaconfigurationandcustomizationsalongsidedata": "64",
  "saas-salesforce-point-in-time": "65",
  "saas-salesforce-thedataprotectionsolutionsprodivdestheabilitytoautomaticallytakedailybackupswithoutimpactingorgperformance": "66",
  "saas-salesforce-thedataprotectionsolutionallowsyoutorestoretoasandboxenvironmentfortestinganddevelopmentpurposes": "67",
  "saas-salesforce-thedataprotectionsolutionisabletocaptureallcustomobjectsfieldsandrelationshipdata": "68",
  "saas-salesforce-salesforce": "69",
  "saas-salesforce-granular-recovery": "70",
  "saas-salesforce-airgap": "71",
  "saas-dynamics-thedataprotectionsolutionprotectsbothdataandcustomizationsincludingworkflowsbusinessrulesandforms": "72",
  "saas-dynamics-thedataprotectionsolutionperformsautomateddailybackupsofdynamics365withoutrequiringexportjobsormanualinterventions": "73",
  "saas-dynamics-thedataprotectionsolutioncanrestoredynamics365datatodifferentenvironmentsegproductionsandboxetc": "74",
  "saas-dynamics-thedataprotectionsolutionincludessystemsettingssecurityrolesanduserpermissions": "75",
  "saas-dynamics-365-granular-recovery": "76",
  "saas-dynamics-365-immutable": "77",
  "saas-dynamics-thedataprotectionsolutionprovidesdetailedauditlogsofalldynamics365backupandrecoveryoperations": "78",
  "saas-dynamics-thedataprotectionsolutionsprovidesaneasytousesingleadminuserinterfacetoconfigureprotectionacrossthedataestateincludingdynamics365": "79",
  "identity-active-directory-active-directory": "80",
  "identity-active-directory-entra": "81",
  "identity-active-identityprotectionsolutionstoresdataonlogicallyairgappedsystemresilientfromcyberattack": "82",
  "identity-active-directory-active-directory-1": "83",
  "identity-active-directory-entra-1": "84",
  "identity-active-directory-active-directory-2": "85",
  "identity-active-compareadobjectattritbutesbetweentwosnapshots": "86",
  "identity-active-directory-active-directory-3": "87",
  "cyber-tools-encryption": "88",
  "cyber-tools-encryption-1": "89",
  "cyber-tools-rapidlyhuntforindicatorsofcompromiseviayararulesandfilehashesin60secondstoidentifythecleanpointofrecovery": "90",
  "cyber-tools-threat-detection": "91",
  "cyber-tools-addcustomyararulesorfilehashestothescanningengineandscanforthoseiocsoneverybackup": "92",
  "cyber-tools-scanalldatasourcesforsensitivedatawith60builtinscanners": "93",
  "cyber-tools-rds": "94"
};
