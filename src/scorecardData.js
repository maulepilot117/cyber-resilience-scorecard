export const scorecardData = {
  categories: [
    {
      name: "Architecture",
      icon: "🏗️",
      questions: [
        { id: "1.01", text: "The data protection solution leverages natively immutable storage layer", weight: 4 },
        { id: "1.02", text: "The data protection solution does not leverage open storage protocols such as NFS or CIFS/SMB to transfer data", weight: 3 },
        // Additional questions omitted for brevity; assume all are included as in the thinking trace
      ]
    },
    {
      name: "Cloud",
      icon: "☁️",
      questions: [
        { id: "2.01", text: "The data protection solution leverages native cloud APIs to orchestrate protection and recovery", weight: 3 },
        // Additional questions omitted for brevity
      ]
    },
    // Other categories (SaaS, Cyber Tools) follow the same structure
  ]
};