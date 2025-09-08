import React, { useEffect, useState } from 'react';
import { getScoreColor, getScoreMessage } from '../utils/scoring/scoringHelpers';

const SummaryResults = ({
  finalScore,
  categoryResults,
  email,
  isSubmitting,
  emailSent,
  emailError,
  setEmailError,
  setEmailSent,
  calculateAndSubmitScore,
  completionTime
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = finalScore / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= finalScore) {
        setAnimatedScore(finalScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [finalScore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Assessment Complete!
          </h2>

          {/* Completion Time */}
          {completionTime && (
            <div className="text-center mb-6">
              <p className="text-gray-600">
                Completed in {Math.floor(completionTime / 60)}m {completionTime % 60}s
              </p>
            </div>
          )}

          {/* Score Display */}
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(animatedScore)}`}>
              {animatedScore}%
            </div>
            <p className="text-xl text-gray-600">{getScoreMessage(animatedScore)}</p>
          </div>

          {/* Category Breakdown */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Category Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries(categoryResults).map(([category, result]) => (
                <div key={category} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{category}</span>
                    <span className={`font-semibold ${getScoreColor(result.percentage)}`}>
                      {Math.round(result.percentage)}%
                    </span>
                  </div>
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${result.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Score: {result.score} / {result.max} points
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Status */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-blue-700">
                  Sending your detailed report to {email}...
                </span>
              </div>
            ) : emailSent ? (
              <div>
                <p className="text-green-700 font-semibold mb-2">
                  ✅ Report sent successfully!
                </p>
                <p className="text-gray-600">
                  Your detailed PDF report has been sent to{" "}
                  <span className="font-semibold">{email}</span>
                </p>
              </div>
            ) : emailError ? (
              <div>
                <p className="text-red-700 font-semibold mb-2">
                  ⚠️ Unable to send email
                </p>
                <p className="text-gray-600">{emailError}</p>
                <p className="text-sm text-gray-500 mt-2">
                  You can take a screenshot of this page for your records.
                </p>
              </div>
            ) : (
              <p className="text-gray-600">Preparing your report...</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start New Assessment
            </button>
            {emailError && (
              <button
                onClick={() => {
                  setEmailError(null);
                  setEmailSent(false);
                  calculateAndSubmitScore();
                }}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Retry Email
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryResults;