import React, { useState } from 'react';
import { scorecardData } from './scorecardData';
import Category from './Category';
import Results from './Results';

const CyberResilienceScorecard = () => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [categoryScores, setCategoryScores] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [email, setEmail] = useState(''); // State for email input

  const totalQuestions = scorecardData.categories.reduce((sum, cat) => sum + cat.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progressPercent = (answeredQuestions / totalQuestions) * 100;

  const selectAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    if (!email) {
      alert('Please enter your email to receive the results.');
      return;
    }

    let totalScore = 0;
    let totalMax = 0; // Sum of all question weights
    const categoryResults = {};
    const recommendationsList = [];

    scorecardData.categories.forEach(category => {
      let categoryScore = 0;
      const categoryMax = category.questions.reduce((sum, q) => sum + q.weight, 0);
      totalMax += categoryMax; // Add to total maximum score

      category.questions.forEach(question => {
        const answer = answers[question.id];
        const weight = question.weight;
        switch (answer) {
          case 'yes':
            categoryScore += weight;
            break;
          case 'partial':
            categoryScore += weight * 0.5;
            recommendationsList.push({ category: category.name, question: question.id, text: question.text, status: 'partial' });
            break;
          case 'no':
            recommendationsList.push({ category: category.name, question: question.id, text: question.text, status: 'missing' });
            break;
          case 'na':
            break;
          default:
            break;
        }
      });

      categoryResults[category.name] = {
        score: categoryScore,
        max: categoryMax,
        percentage: (categoryScore / categoryMax) * 100
      };
      totalScore += categoryScore;
    });

    // Normalize the score to be out of 100
    const normalizedScore = totalMax > 0 ? (totalScore / totalMax) * 100 : 0;
    const finalScore = Math.round(normalizedScore);

    // Update state to display results
    setScore(finalScore);
    setCategoryScores(categoryResults);
    setRecommendations(recommendationsList);
    setShowResults(true);

    // Convert categoryScores to array format for backend
    const categoryScoresArray = Object.entries(categoryResults).map(([name, data]) => ({
      name,
      score: data.score,
      max: data.max,
      percentage: data.percentage
    }));

    const requestBody = JSON.stringify({
      email,
      score: finalScore,
      categoryScore: categoryScoresArray,
      recommendations: recommendationsList,
      htmlContent: "<h1>Your Report</h1><p>Details here...</p>"
    });
    console.log("Body being sent:", requestBody)

    // Send POST request to backend
    fetch('http://localhost:3000/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => { 
        console.log(data.message);
        alert('Results have been emailed to you successfully!');
      })
      .catch(error => {
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again later.');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 rounded-t-2xl shadow-xl">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <span>🛡️</span> Cyber Resilience Scorecard
          </h1>
          <p className="text-xl opacity-90">Assess your organization's data protection and cyber resilience capabilities</p>
          <div className="mt-6 bg-white/20 h-3 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-sm mt-2 opacity-80">{answeredQuestions} of {totalQuestions} questions answered</p>
        </div>
        <div className="bg-white rounded-b-2xl shadow-xl p-8">
          {/* Email Input Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email for Results
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Categories and Questions */}
          {scorecardData.categories.map((category) => (
            <Category
              key={category.name}
              category={category}
              answers={answers}
              onSelectAnswer={selectAnswer}
            />
          ))}

          {/* Results Display */}
          {showResults && (
            <Results score={score} categoryScores={categoryScores} recommendations={recommendations} />
          )}

          {/* Calculate Score Button */}
          <div className="text-center mt-8">
            <button
              onClick={calculateScore}
              disabled={answeredQuestions < totalQuestions || !email}
              className={`px-12 py-4 rounded-xl text-xl font-bold transition-all duration-200
                ${answeredQuestions === totalQuestions && email
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Calculate Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberResilienceScorecard;