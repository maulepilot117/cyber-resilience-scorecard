// Extracted styles to constants for better performance
export const BACKGROUND_STYLE = {
  background:
    "radial-gradient(ellipse at top left, #0a0e27 0%, #1a2b4d 25%, #2d4a6b 50%, #3a5f85 75%, #4682a0 100%)",
  backgroundSize: "200% 200%",
  backgroundPosition: "0% 0%",
};

// Demo mode for hackathon presentations
export const DEMO_MODE = window.location.search.includes('demo=true');
export const DEMO_EMAIL = 'demo@cyberresilience.com';

// Answer options for questions
export const answerOptions = [
  {
    value: "yes",
    label: "Yes",
    className: "bg-green-500 hover:bg-green-600 text-white",
    icon: "✓",
    key: "1",
  },
  {
    value: "no",
    label: "No",
    className: "bg-red-500 hover:bg-red-600 text-white",
    icon: "✗",
    key: "2",
  },
  {
    value: "na",
    label: "N/A",
    className: "bg-gray-500 hover:bg-gray-600 text-white",
    icon: "—",
    key: "3",
  },
];