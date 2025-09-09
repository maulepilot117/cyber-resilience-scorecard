export const scorecardData = {
  categories: [
    {
      name: "Backup Architecture",
      icon: "🏗️",
      questions: [
        {
          id: "1.01",
          text: "Is your backup data protected by an append-only file system that makes it architecturally impossible to modify, encrypt, or delete, even by an administrator with root-level credentials?",
          weight: 4,
        },
        {
          id: "1.02",
          text: "Is the data protection system's immutability achieved through an inherent, append-only file system, rather than relying on configurable retention lock policies on a separate storage system?",
          weight: 3,
        },
        {
          id: "1.08",
          text: "Does the data protection platform continuously verify data integrity via checksums throughout the entire data lifecycle to protect against unauthorized modification? ",
          weight: 2,
        },
        {
          id: "1.03",
          text: "Does the data protection system operate in a separate security domain with an independent authentication mechanism, ensuring that a compromise of your primary production directory (e.g., Active Directory) does not grant an attacker access to the backup data?",
          weight: 2,
        },
        {
          id: "1.04",
          text: "Are the backup copies stored in a logically isolated location, unreachable via the network or in an isolated cloud account?",
          weight: 3,
        },
        {
          id: "1.05",
          text: "Does the data protection solution ensure rogue administrators cannot make sweeping changes to the software by enabling quorum-based authorization?",
          weight: 3,
        },
        {
          id: "1.07",
          text: "Is data protection solution logically air-gapped from the rest of the infrastructure, where there is no ability for anyone to mount or browse the data protection solution's filesystem",
          weight: 4,
        },
        {
          id: "1.12",
          text: "Is multi-factor authentication (MFA) natively integrated and mandatorily enforced for all administrative access attempts?",
          weight: 3,
        },
        {
          id: "1.13",
          text: "Does the data protection solution rely on the Windows operating system for its core functionality?",
          weight: 3,
        },
        {
          id: "1.06",
          text: "Does the data protection system enforce the principle of least privilege through a granular Role-Based Access Control (RBAC) system that applies consistently across all user interfaces (GUI, CLI, API)?",
          weight: 2,
        },
        {
          id: "1.09",
          text: "Does the data protection solution allow shell access only to a minimal set of commands required for troubleshooting, with all commands fully auditable?",
          weight: 2,
        },
        {
          id: "1.10",
          text: "Does the data protection solution mandate encryption of data both at rest and in transit, utilizing strong encryption standards such as AES-256 for data at rest and TLS 1.2 or higher for data in transit?",
          weight: 3,
        },
        {
          id: "1.11",
          text: "Does the data protection solution rely on Network Time Protocol (NTP) to determine the age of backups and when to expire them?",
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
              text: "Does the data protection solution support agentless backup of virtualized workloads?",
              weight: 3,
            },
            {
              id: "2.02",
              text: "Does the data protection solution support all major hypervisors including VMware vSphere, Microsoft Hyper-V, Nutanix AHV and Red Hat Virtualization?",
              weight: 3,
            },
            {
              id: "2.03",
              text: "Does the data protection solution allow for restoration of a virtual machine in minutes by running it directly from backup storage, without waiting for a full data restore to complete?",
              weight: 3,
            },
            {
              id: "2.04",
              text: "Does the data protection solution support granular recovery of individual files and application objects directly from VM backups, without the need to first recover the virtual machine?",
              weight: 3,
            },
            {
              id: "2.05",
              text: "Does the data protection solution support recovery of VMs to an isolated 'clean room' environment to facilitate malware remediation and forensic analysis?",
              weight: 3,
            },
            {
              id: "2.06",
              text: "Does the data protection solution provide the ability to automatically discover and protect new virtual machines as they are created, without manual intervention?",
              weight: 3,
            }
          ],
        },
        {
          name: "Database",
          questions: [
            {
              id: "2.07",
              text: "Does your current backup solution guarantee application-consistent recovery for all transactional databases (e.g., SQL, Oracle), ensuring no data corruption upon restore?",
              weight: 3,
            },
            {
              id: "2.08",
              text: "Does the data protection solution support all major database platforms including Microsoft SQL Server, Oracle Database, MySQL, PostgreSQL, and NoSQL databases like MongoDB and Cassandra?",
              weight: 3,
            },
            {
              id: "2.09",
              text: "Does the data protection solution automatically discover and protect new database instances as they are created, without manual intervention?",
              weight: 3,
            },
            {
              id: "2.10",
              text: "Does the data protection solution support granular recovery of individual database objects (e.g., tables, schemas) directly from database backups, without the need to first recover the entire database?",
              weight: 3,
            },
            {
              id: "2.11",
              text: "Does the data protection solution rely on database adminsistrators to write and maintain complex scripts to ensure application-consistent backups?",
              weight: 3,
            },
            {
              id: "2.12",
              text: "Does the data protection solution allow for instant, zero-byte recovery of databases by running them directly from backup storage, without waiting for a full data restore to complete?",
              weight: 3,
            },
            {
              id: "2.13",
              text: "Does the data protection systemn provide a unified policy engine for infrastructure teams while also empowering database administrators with self-service, role-based access to perform their own granular, point-in-time restores?",
              weight: 3,
            },
            {
              id: "2.14",
              text: "Does the data protection solution provide the ability to protect transaction logs, enabling point-in-time recovery to moments within the retention period?",
              weight: 3,
            },
          ],
        },
        {
          name: "Unstructured",
          questions: [
            {
              id: "2.15",
              text: "Does the data protection platform provide a global, indexed catalog of all unstructured data, allowing you to perform a search for any file across your entire enterprise and restore it instantly without needing to know its original location or backup date?",
              weight: 3,
            },
            {
              id: "2.16",
              text: "Does the data protection solution leverage the NAS vendor's APIs for performant, scalable backups instead of relying on protocols like NDMP?",
              weight: 3,
            },
            {
              id: "2.17",
              text: "Does the data protection solution require NAS data to be moved to a separate backup appliance for protection?",
              weight: 3,
            },
            {
              id: "2.18",
              text: "Does the data protection solution leverage a stateless, data-mover VM, to move data directly from the NAS to the backup storage?",
              weight: 3,
            },
            {
              id: "2.19",
              text: "Can you leverage your backup data to answer security and compliance queries, such as identifying all files that contain sensitive data patterns or have not been accessed in several years, without impacting your production environment?",
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
          text: "Do you use a single data protection platform and policy engine to manage backups, replication, and archival for all your workloads, whether they are on-premises, in AWS, Azure, or GCP?",
          weight: 3,
        },
        {
          id: "3.02",
          text: "Does the data protection solution automtically discover and protect new cloud native workloads as they are created, without manual intervention?",
          weight: 3,
        },
        {
          id: "3.03",
          text: "Does the data protection solution rely on a least-privilege access model, ensuring that even if the credentials are compromised, an attacker cannot delete or encrypt your backup data?",
          weight: 3,
        },
        {
          id: "3.04",
          text: "Does the data protection solution leverage a token-based authentication model, avoiding the use of long-lived access keys that can be easily compromised?",
          weight: 3,
        },
        {
          id: "3.05",
          text: "Does the data protection solution leverage ephemeral compute resources that are created on-demand in your cloud account to index backups and generate hashes, ensuring that costs remain low?",
          weight: 3,
        },
        {
          id: "3.06",
          text: "Does the data protection solution allow the use of customer-managed key encryption keys (CMKEK) for all cloud workloads, ensuring that only the customer has access to the keys and can rotate or revoke them at any time?",
          weight: 2,
        },
        {
          id: "3.07",
          text: "The data protection solution leverages native cloud APIs to ensure efficient, scalable backups without impacting production workloads",
          weight: 3,
        },
      ],
      subCategories: [
        {
          name: "AWS",
          questions: [
            {
              id: "3.08",
              text: "Does the data protection solution allow you to store backups in a separate AWS account or Organization that you control, ensuring that even if your primary account is compromised, your backup data remains safe?",
              weight: 3,
            },
            {
              id: "3.09",
              text: "Does the data protection solution provide a CloudFormation template to automate the deployment of all necessary components and IAM roles in your AWS account, minimizing the risk of human error and allowing for easy modification as new services are supported?",
              weight: 3,
            },
            {
              id: "3.10",
              text: "Does the data protection solution allow you to leverage your own S3 bucket for backup storage, breaking away from the pre-defined storage tiering and allowing you to take advantage of cost optimzed tiers like S3 Galcier?",
              weight: 3,
            },
            {
              id: "3.11",
              text: "Does the data protection solution leverage a centralized ephemeral compute engine to index backups and generate hashes, minimizing complexity, enhancing security, and keeping costs under control?",
              weight: 3,
            },
            {
              id: "3.12",
              text: "Does the data protection solution allow you to restore cross-region, cross-account, cross-organization, or any combination thereof?",
              weight: 3,
            },
            {
              id: "3.13",
              text: "Does the data protection solution allow the scanning, indexing and protection of petabytes of S3 data without the need to first move it to a separate backup appliance?",
              weight: 3,
            },
          ],
        },
        {
          name: "Azure",
          questions: [
            {
              id: "3.14",
              text: "Does the data protection solution allow you to store backups in a separate Azure subscription or tenant that you control, ensuring that even if your primary subscription is compromised, your backup data remains safe?",
              weight: 3,
            },
            {
              id: "3.15",
              text: "Does the data protection solution provide an ARM template to automate the deployment of all necessary components and roles in your Azure subscription, minimizing the risk of human error and allowing for easy modification as new services are supported?",
              weight: 3,
            },
            {
              id: "3.16",
              text: "Does the data protection solution allow you to leverage your own Azure Blob Storage account for backup storage, breaking away from the pre-defined storage tiering and allowing you to take advantage of cost optimzed tiers like Cool and Archive?",
              weight: 3,
            },
            {
              id: "3.17",
              text: "Does the data protection solution leverage a centralized ephemeral compute engine to index backups and generate hashes, minimizing complexity, enhancing security, and keeping costs under control?",
              weight: 3,
            },
            {
              id: "3.18",
              text: "Does the data protection solution allow you to restore cross-region, cross-subscription, cross-tenant, or any combination thereof?",
              weight: 3,
            },
            {
              id: "3.19",
              text: "Does the data protection solution allow the scanning, indexing and protection of petabytes of Azure Blob data without the need to first move it to a separate backup appliance?",
              weight: 3,
            },
            {
              id: "3.20",
              text: "Does the data protection solution allow you to restore files and folders from protected Azure VMs without first having to restore to an Azure storage account?",
              weight: 3,
            },
          ],
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
              text: "Is the Microsoft 365 data protected with a third-party tool or is the organization relying on Microsoft's recycle bin and legal hold to preserve data?",
              weight: 3,
            },
            {
              id: "4.02",
              text: "Does the data protection solution allow you to logically air-gap your M365 data away, outside of your M365 tenant?",
              weight: 3,
            },
            {
              id: "4.03",
              text: "Does the data protection solution allow you to bring your own encryption key, allowing for seamless key rotation and ensuring that you can remove access to the data whenever you require?",
              weight: 3,
            },
            {
              id: "4.04",
              text: "Does the data protection solution allow for granular recovery of email, calendar items, Sharepoint site, OneDrive files, or Teams chats, without needing to restore the entire item, empowered by a 'Google-like' search?",
              weight: 3,
            },
            {
              id: "4.05",
              text: 'Does the data protection solution automatically discover and protect new users, sites, and channels without needing manual configuration?',
              weight: 3,
            },
            {
              id: "4.06",
              text: "Does the data protection solution allow for export of data in native formats (e.g. PST, EML, MSG) directly from the backup without needing to first restore?",
              weight: 3,
            },
            {
              id: "4.07",
              text: "Does the data protection solution provide legal hold capabilities with immutable compliance copies for M365 data?",
              weight: 3,
            },
            {
              id: "4.08",
              text: "Does the data protection solution include comprehensive Teams data protection including private channels, chat history and file attachments?",
              weight: 3,
            },
            {
              id: "4.09",
              text: "Does the data protection solution provide an interface where users self-service their own restore operations?",
              weight: 3,
            },
            {
              id: "4.10",
              text: "Does the data protection solution provide the ability to orchestrate recovery so that capstone users and their most-recent data is recovered first, allowing them to get back to business quicket?",
              weight: 3,
            },
            {
              id: "4.11",
              text: "Does the data protection solution provide a single admin interface, allowing backup admins to see across the entire data estate, including M365 data?",
              weight: 3,
            },
          ],
        },
        {
          name: "Salesforce",
          questions: [
            {
              id: "4.12",
              text: "The data protection solution captures and protects metadaa, configuration and customizations alongside data?",
              weight: 3,
            },
            {
              id: "4.13",
              text: "The data protection solution allows you to perform point-in-time recovery of Salesforce data to any specific moment within your retention period?",
              weight: 3,
            },
            {
              id: "4.14",
              text: "The data protection solutions prodivdes the ability to automatically take daily backups without impacting org performance",
              weight: 3,
            },
            {
              id: "4.15",
              text: "The data protection solution allows you to restore to a sandbox environment for testing and development purposes?",
              weight: 3,
            },
            {
              id: "4.16",
              text: "The data protection solution is able to capture all custom objects, fields and relationship data?",
              weight: 3,
            },
            {
              id: "4.17",
              text: "The data protection solution allows you to compare Salesforce configurations between different snapshots, as well as against the live environment, determining the impact to a restoration operation?",
              weight: 3,
            },
            {
              id: "4.18",
              text: "The data protection solution provides granular recovery options, allowing restoration of individual records or fields?",
              weight: 3,
            },
            {
              id: "4.19",
              text: "The Salesforce backup data is stored outside of Salesforce Infrastructure, providing true air-gap protection?",
              weight: 4,
            },
          ],
        },
        {
          name: "Jira",
          questions: [],
        },
        {
          name: "Dynamics 365",
          questions: [
            {
              id: "4.20",
              text: "The data protection solution protects both data and customizations including workflows, business rules and forms?",
              weight: 3,
            },
            {
              id: "4.21",
              text: "The data protection solution performs automated daily backups of Dynamics 365 without requiring export jobs or manual interventions?",
              weight: 3,
            },
            {
              id: "4.22",
              text: "The data protection solution can restore Dynamics 365 data to different environments (e.g. production, sandbox, etc.)?",
              weight: 3,
            },
            {
              id: "4.23",
              text: "The data protection solution includes system settings, security roles, and user permissions?",
              weight: 3,
            },
            {
              id: "4.24",
              text: "The data protection solution provides granular recovery options allowing restoration of specific entities or records?",
              weight: 3,
            },
            {
              id: "4.25",
              text: "The data protection solution stores the Dynamics 365 backup data indepenantly from Microsoft's infrastructure, in an immutable format?",
              weight: 3,
            },
            {
              id: "4.26",
              text: "The data protection solution provides detailed audit logs of all Dynamics 365 backup and recovery operations?",
              weight: 3,
            },
            {
              id: "4.27",
              text: "The data protection solutions provides an easy-to-use, single Admin user interface to configure protection across the data estate, including Dynamics 365?",
              weight: 4,
            },
          ],
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
