export const scorecardData = {
  categories: [
    {
      name: "Backup Architecture",
      icon: "🏗️",
      questions: [
        {
          id: "1.01",
          text: "The data protection solution leverages natively immutable storage layer",
          weight: 4,
        },
        {
          id: "1.02",
          text: "The data protection solution does not leverage open storage protocols such as NFS or CIFS/SMB to transfer data",
          weight: 3,
        },
        {
          id: "1.08",
          text: "Storage consumption in the data protection solution is easily predictable",
          weight: 2,
        },
        {
          id: "1.03",
          text: "The data protection solution does not rely on Network Time Protocol to determine the age of backups",
          weight: 2,
        },
        {
          id: "1.04",
          text: "The data protection solution leverages end-to-end encryption for both data in flight and data at rest",
          weight: 3,
        },
        {
          id: "1.05",
          text: "The data protection solution ensures rogue administrators cannot make sweeping changes to the software by enabling quorum-based authorization for destructive changes",
          weight: 3,
        },
        {
          id: "1.07",
          text: "The data protection solution is logically air-gapped from the rest of the infrastructure. There is no ability for anyone to mount or browse the data protection solution's filesystem",
          weight: 4,
        },
        {
          id: "1.12",
          text: "Data protection solution should be installed on hardened Linux, with no shell or SSH access",
          weight: 3,
        },
        {
          id: "1.13",
          text: "Data protection solution should not operate as a virtual machine, but in a standalone appliance",
          weight: 3,
        },
        {
          id: "1.06",
          text: "The data protection solution does not require proxies or agents",
          weight: 2,
        },
        {
          id: "1.09",
          text: "Easily scale the data protection solution by simply adding more appliances. Compute and storage scale together",
          weight: 2,
        },
        {
          id: "1.10",
          text: "Manage backups via policy, not backup jobs",
          weight: 3,
        },
        {
          id: "1.11",
          text: "Automate discovery and protection of new workloads",
          weight: 3,
        },
        {
          id: "1.14",
          text: "From the backup policy, configure data replication and data archival",
          weight: 3,
        },
      ],
      subCategories: [
        {
          name: "Architecture",
          questions: [],
        },
        {
          name: "Business Processes",
          questions: [],
        },
      ],
    },
    {
      name: "Datacenter",
      icon: "🏬",
      subCategories: [
        {
          name: "Virtualization",
          questions: [
            {
              id: "2.01",
              text: "Backups of virtualized workloads occur without the need to deploy or manage proxies",
              weight: 3,
            },
            {
              id: "2.02",
              text: "Auto-discovery and auto-protection of virtualized workloads",
              weight: 3,
            },
            {
              id: "2.03",
              text: "Ability to recover virtualized workloads instantly in-place or in an isolated environment",
              weight: 3,
            },
            {
              id: "2.04",
              text: "Automatically deploy agents for file indexing and cyber monitoring",
              weight: 3,
            },
          ],
        },
        {
          name: "Database",
          questions: [
            {
              id: "2.05",
              text: "Protect databases without the need to write custom scripts",
              weight: 3,
            },
            {
              id: "2.06",
              text: "Protect databases through native APIs, not a 'dump and scrape'",
              weight: 3,
            },
            {
              id: "2.07",
              text: "Automatically discover and protect new and existing databases on a database host",
              weight: 3,
            },
            {
              id: "2.08",
              text: "Protect database logs alongside database to allow point-in-time recovery",
              weight: 3,
            },
            {
              id: "2.09",
              text: "Instantly recover database in-place or live mount with a zero-byte copy on a new database host",
              weight: 3,
            },
            {
              id: "2.10",
              text: "Enable quick database zero-byte copies for test/dev environments",
              weight: 3,
            },
            {
              id: "2.11",
              text: "Quickly recover entire database or granular recovery of only the data required",
              weight: 3,
            },
            {
              id: "2.12",
              text: "Centralized management of database protection irregardless of database engine",
              weight: 3,
            },
          ],
        },
        {
          name: "Unstructured",
          questions: [
            {
              id: "2.13",
              text: "Automatically discover, scan, index and move billions of files across any unstructured data source, including cloud data stores",
              weight: 3,
            },
            {
              id: "2.14",
              text: "Ability to process NAS data in parallel streams with an incrimental forever approach",
              weight: 3,
            },
            {
              id: "2.15",
              text: "Manage NAS backups in the same interface as other datacenter, cloud and SaaS protection",
              weight: 3,
            },
            {
              id: "2.16",
              text: "Leverage modern data protection strategies with NAS sources, relying on vendor APIs instead of legacy protocols",
              weight: 3,
            },
            {
              id: "2.17",
              text: "Leverage any archival or recovery location and change at any time to most cost effective storage tier",
              weight: 3,
            },
          ],
        },
      ],
    },
    {
      name: "Cloud",
      icon: "☁️",
      questions: [
        {
          id: "3.01",
          text: "The data protection solution leverages native cloud APIs to orchestrate protection and recovery",
          weight: 3,
        },
        {
          id: "3.02",
          text: "Backups can be stored in user determined storage tiers. There is no requirement to follow the cloud providers data tiering requirements",
          weight: 3,
        },
        {
          id: "3.03",
          text: "Authentication to the cloud leverages a least-privilege model and is configured by an easy-to-follow wizard",
          weight: 3,
        },
        {
          id: "3.04",
          text: "Data protection solution does not store cloud credentials",
          weight: 3,
        },
        {
          id: "3.05",
          text: "Data protection solution does not require administrator credentials to protect cloud native workloads",
          weight: 3,
        },
        {
          id: "3.06",
          text: "Data protection solution does not require infrastructure to be deployed in the customer cloud environment",
          weight: 2,
        },
        {
          id: "3.07",
          text: "Data protection solution leverages ephemeral compute to calculate hashes, index files all from within the customer's cloud account",
          weight: 3,
        },
      ],
      subCategories: [
        {
          name: "AWS",
          questions: [
            {
              id: "3.08",
              text: "Backups are able to be stored outside of the AWS Organization, providing a logical air-gap",
              weight: 3,
            },
            {
              id: "3.09",
              text: "Automate the autentication of data protection solution via a CloudFormation template",
              weight: 3,
            },
            {
              id: "3.10",
              text: "As additional workloads are supported by the data protection solution, adding support in the user account is a simple update to the CloudFormation template",
              weight: 3,
            },
            {
              id: "3.11",
              text: "Ephmemeral compute resources are centrally deployed by the data protection solution, leveraging elastic Kuberenetes service",
              weight: 3,
            },
            {
              id: "3.12",
              text: "Restoration of EC2 or RDS instances can be done across regions, accounts or organizations",
              weight: 3,
            },
            {
              id: "3.13",
              text: "Scan and index all objects in protected S3 buckets, providing for granular file/object level recovery",
              weight: 3,
            },
            {
              id: "3.14",
              text: "Data protection solution provides single interface to protect EC2, RDS, S3, EKS, FSxW, FSxN and VMC-A workloads",
              weight: 3,
            },
          ],
        },
        {
          name: "Azure",
          questions: [],
        },
        {
          name: "GCP",
          questions: [],
        },
        {
          name: "Oracle Cloud",
          questions: [],
        },
      ],
    },
    {
      name: "SaaS",
      icon: "📧",
      subCategories: [
        {
          name: "Microsoft 365",
          questions: [
            {
              id: "4.01",
              text: "Data protection solution requires no infrastructure be deployed to protect Microsoft 365 data",
              weight: 3,
            },
            {
              id: "4.02",
              text: "Data protection solution air-gaps data away from Microsoft tenant, ensuring survivability of data in case of a tenant issue",
              weight: 3,
            },
            {
              id: "4.03",
              text: "Customers can optionally utilize their own encryption keys, ensuring the security of their M365 backup data. Customers are able to rotate and invalidate keys at will",
              weight: 3,
            },
            {
              id: "4.04",
              text: "Data protection solution leverages Microsoft best practices in interfacing with the M365 graph API, intelligently backing off, to achieve the highest possible performance without throttling",
              weight: 3,
            },
            {
              id: "4.05",
              text: 'File indexing enabling a "Google-like" search for file and folder level recovery',
              weight: 3,
            },
          ],
        },
        {
          name: "Salesforce",
          questions: [],
        },
        {
          name: "Jira",
          questions: [],
        },
        {
          name: "Dynamics 365",
          questions: [],
        },
      ],
    },
    {
      name: "Identity",
      icon: "👤",
      subCategories: [
        {
          name: "Active Directory",
          questions: [
            {
              id: "5.01",
              text: "Are you protecting all parts of your Active Directory Forest?",
              weight: 3,
            },
            {
              id: "5.02",
              text: "Are you protecting data in Microsoft EntraID, not relying on the recycle bin?",
              weight: 3,
            },
            {
              id: "5.03",
              text: "Identity protection solution stores data on logically air gapped system, resilient from cyber attack.",
              weight: 3,
            },
            {
              id: "5.04",
              text: "Orchestrate recovery of Active Directory Forests.",
              weight: 3,
            },
            {
              id: "5.05",
              text: "In addition to Users and Groups, protect Enterprise Applications, Application Registrations and Conditional Access Policies in Microsoft EntraID.",
              weight: 3,
            },
            {
              id: "5.06",
              text: "Recover both Active Directory Forest and EntraID Enterprise Apps, App Registrations and Conditional Access Policies.",
              weight: 3,
            },
            {
              id: "5.07",
              text: "Compare AD object attritbutes between two snapshots.",
              weight: 3,
            },
            {
              id: "5.08",
              text: "Recover AD object attributes to production Active Directory without the need to recover the full forest, domain or object",
              weight: 3,
            },
          ],
        },
        {
          name: "EntraID",
          questions: [],
        },
      ],
    },
    {
      name: "Cyber Tools",
      icon: "🔒",
      questions: [
        {
          id: "6.01",
          text: "Ability to detect and alert on active encryption events across all data sources",
          weight: 4,
        },
        {
          id: "6.02",
          text: "Detect and alert on encryption events in VM environment",
          weight: 4,
        },
        {
          id: "5.03",
          text: "Rapidly hunt for indicators of compromise via YARA rules and file hashes in 60 seconds to identify the clean point of recovery",
          weight: 4,
        },
        {
          id: "6.04",
          text: "Proactively scan and alert on known indicators of compromise from an industry standard list of signatures, alerting customers to threats within their environment before the attack occurs",
          weight: 4,
        },
        {
          id: "6.05",
          text: "Add custom YARA rules or file hashes to the scanning engine and scan for those IOCs on every backup",
          weight: 3,
        },
        {
          id: "6.06",
          text: "Scan all data sources for sensitive data with 60 built-in scanners",
          weight: 3,
        },
        {
          id: "6.07",
          text: "Build custom scanners based off dictionary words or patterns and identify all data that matches across all data sources",
          weight: 3,
        },
      ],
      subCategories: [
        {
          name: "Anamoly Detection",
          questions: [],
        },
        {
          name: "Threat Hunting",
          questions: [],
        },
        {
          name: "Data Security Posture Management",
          questions: [],
        },
        {
          name: "Automated Recovery Plans",
          questions: [],
        },
      ],
    },
  ],
};
