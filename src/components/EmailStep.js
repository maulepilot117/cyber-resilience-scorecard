import React from 'react';
import { Mail, ChevronLeft } from 'lucide-react';

const EmailStep = ({ email, setEmail, handleEmailSubmit, goBack }) => {
  return (
    <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-opacity duration-300">
      <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto">
        <Mail className="w-16 h-16 text-indigo-600 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Enter Your Email
        </h2>
        <p className="text-gray-600 text-center mb-8">
          We'll send your personalized report to this email address.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
          className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-6"
          placeholder="your@email.com"
          autoFocus
        />
        <button
          onClick={handleEmailSubmit}
          className="w-full py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Start Assessment
        </button>

        <button
          onClick={goBack}
          className="mt-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      </div>
    </div>
  );
};

export default EmailStep;