import React, { useState, useEffect } from 'react';

const scorecardData = {
  categories: [
    {
      name: "Architecture",
      icon: "🏗️",
      questions: [
        { id: "1.01", text: "The data protection solution leverages natively immutable storage layer", weight: 4 },
        { id: "1.02", text: "The data protection solution does not leverage open storage protocols such as NFS or CIFS/SMB to transfer data", weight: 3 },
        { id: "1.03", text: "The data protection solution does not rely on Network Time Protocol to determine the age of backups", weight: 2 },
        { id: "1.04", text: "The data protection solution leverages end-to-end encryption for both data in flight and data at rest", weight: 3 },
        { id: "1.05", text: "The data protection solution ensures rogue administrators cannot make sweeping changes to the software by enabling quorum-based authorization for destructive changes", weight: 3 },
        { id: "1.06", text: "The data protection solution does not require proxies or agents", weight: 2 },
        { id: "1.07", text: "The data protection solution is logically air-gapped from the rest of the infrastructure. There is no ability for anyone to mount or browse the data protection solution's filesystem", weight: 4 },
        { id: "1.08", text: "Storage consumption in the data protection solution is easily predictable", weight: 2 },
        { id: "1.09", text: "Easily scale the data protection solution by simply adding more appliances. Compute and storage scale together", weight: 2 },
        { id: "1.10", text: "Manage backups via policy, not backup jobs", weight: 3 },
        { id: "1.11", text: "Automate discovery and protection of new workloads", weight: 3 },
        { id: "1.12", text: "Data protection solution should be installed on hardened Linux, with no shell or SSH access", weight: 3 },
        { id: "1.13", text: "Data protection solution should not operate as a virtual machine, but in a standalone appliance", weight: 3 },
        { id: "1.14", text: "From the backup policy, configure data replication and data archival", weight: 3 }
      ]
    },
    {
      name: "Cloud",
      icon: "☁️",
      questions: [
        { id: "2.01", text: "The data protection solution leverages native cloud APIs to orchestrate protection and recovery", weight: 3 },
        { id: "2.02", text: "Backups can be stored in user determined storage tiers. There is no requirement to follow the cloud providers data tiering requirements", weight: 3 },
        { id: "2.03", text: "Authentication to the cloud leverages a least-privilege model and is configured by an easy-to-follow wizard", weight: 3 },
        { id: "2.04", text: "Data protection solution does not store cloud credentials", weight: 3 },
        { id: "2.05", text: "Data protection solution does not require administrator credentials to protect cloud native workloads", weight: 3 },
        { id: "2.06", text: "Data protection solution does not require infrastructure to be deployed in the customer cloud environment", weight: 2 },
        { id: "2.07", text: "Data protection solution leverages ephemeral compute to calculate hashes, index files all from within the customer's cloud account", weight: 3 }
      ]
    },
    {
      name: "SaaS (M365)",
      icon: "📧",
      questions: [
        { id: "3.01", text: "Data protection solution requires no infrastructure be deployed to protect Microsoft 365 data", weight: 3 },
        { id: "3.02", text: "Data protection solution air-gaps data away from Microsoft tenant, ensuring survivability of data in case of a tenant issue", weight: 3 },
        { id: "3.03", text: "Customers can optionally utilize their own encryption keys, ensuring the security of their M365 backup data. Customers are able to rotate and invalidate keys at will", weight: 3 },
        { id: "3.04", text: "Data protection solution leverages Microsoft best practices in interfacing with the M365 graph API, intelligently backing off, to achieve the highest possible performance without throttling", weight: 3 },
        { id: "3.05", text: "File indexing enabling a \"Google-like\" search for file and folder level recovery", weight: 3 }
      ]
    },
    {
      name: "Cyber Tools",
      icon: "🔒",
      questions: [
        { id: "4.01", text: "Ability to detect and alert on active encryption events across all data sources", weight: 4 },
        { id: "4.02", text: "Detect and alert on encryption events in VM environment", weight: 4 },
        { id: "4.03", text: "Rapidly hunt for indicators of compromise via YARA rules and file hashes in 60 seconds to identify the clean point of recovery", weight: 4 },
        { id: "4.04", text: "Proactively scan and alert on known indicators of compromise from an industry standard list of signatures, alerting customers to threats within their environment before the attack occurs", weight: 4 },
        { id: "4.05", text: "Add custom YARA rules or file hashes to the scanning engine and scan for those IOCs on every backup", weight: 3 },
        { id: "4.06", text: "Scan all data sources for sensitive data with 60 built-in scanners", weight: 3 },
        { id: "4.07", text: "Build custom scanners based off dictionary words or patterns and identify all data that matches across all data sources", weight: 3 }
      ]
    }
  ]
};