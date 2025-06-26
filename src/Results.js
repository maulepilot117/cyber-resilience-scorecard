import React, { useState, useEffect } from 'react';

const Results = ({ score, categoryScores, recommendations }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          const increment = score / 50;
          if (prev + increment >= score) {
            clearInterval(interval);
            return score;
          }
          return prev + increment;
        });
      }, 20);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getGradeInfo = (score) => {
    if (score >= 90) return { grade: 'Excellent - Industry Leading', color: 'text-green-600', bgColor: 'bg-green-100', message: 'Your organization has implemented comprehensive cyber resilience measures.' };
    if (score >= 75) return { grade: 'Good - Well Protected', color: 'text-green-500', bgColor: 'bg-green-50', message: 'Your data protection is strong but has room for improvement.' };
    if (score >= 60) return { grade: 'Fair - Some Gaps', color: 'text-orange-600', bgColor: 'bg-orange-50', message: 'Several important cyber resilience capabilities are missing.' };
    if (score >= 40) return { grade: 'Poor - Significant Gaps', color: 'text-red-600', bgColor: 'bg-red-50', message: 'Your organization faces substantial cyber resilience risks.' };
    return { grade: 'Critical - High Risk', color: 'text-red-700', bgColor: 'bg-red-100', message: 'Immediate action needed to protect against ransomware and data loss.' };
  };

  const gradeInfo = getGradeInfo(score);
  const totalPotentialPoints = recommendations.reduce((sum, rec) => sum + rec.potentialPoints, 0);

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="text-lg opacity-90 mb-2">Your Cyber Resilience Score</div>
          <div className="text-6xl font-bold mb-4">{Math.round(animatedScore)}/100</div>
          <div className={`inline-block px-6 py-3 rounded-lg ${gradeInfo.bgColor} ${gradeInfo.color}`}>
            <div className="font-bold text-lg">{gradeInfo.grade}</div>
            <div className="text-sm mt-1">{gradeInfo.message}</div>
          </div>
        </div>
        <div className="mt-8 bg-white/10 p-6 rounded-xl">
          <h4 className="text-lg font-semibold mb-4">Score Breakdown by Category:</h4>
          {Object.entries(categoryScores).map(([category, data]) => {
            const percentage = Math.round(data.percentage);
            const barColor = percentage >= 75 ? 'bg-green-400' : percentage >= 50 ? 'bg-orange-400' : 'bg-red-400';
            return (
              <div key={category} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{category}</span>
                  <span>{data.score}/{data.max} points ({percentage}%)</span>
                </div>
                <div className="bg-white/20 h-3 rounded-full overflow-hidden">
                  <div className={`h-full ${barColor} rounded-full`} style={{ width: `${percentage}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {recommendations.length > 0 && (
        <div className="mt-8 bg-green-50 p-6 rounded-xl">
          <h3 className="text-2xl font-bold text-green-800 mb-4">📋 Recommendations</h3>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">📊 Improvement Potentialconnecting</h4>
            <p className="text-yellow-700">
              By addressing the gaps below, you could gain up to <strong>{Math.round(totalPotentialPoints)} additional points</strong>,
              bringing your total score to <strong>{Math.min(100, score + Math.round(totalPotentialPoints))}/100</strong>.
            </p>
          </div>
          {Object.entries(recommendations.reduce((acc, rec) => {
            acc[rec.category] = acc[rec.category] || [];
            acc[rec.category].push(rec);
            return acc;
          }, {})).map(([category, recs]) => (
            <div key={category} className="mb-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">{category}</h4>
              {recs.map((rec, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg mb-3 border-l-4 border-green-500">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold">
                        {rec.status === 'partial' ? '⚠️ Partially Implemented' : '❌ Not Implemented'} - Question {rec.question}
                      </span>
                      <p className="text-gray-600 mt-1">{rec.text}</p>
                    </div>
                    <span className="text-blue-600 font-semibold">+{rec.potentialPoints} pts</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;