const CyberResilienceScorecard = () => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [categoryScores, setCategoryScores] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  // Calculate total questions
  const totalQuestions = scorecardData.categories.reduce(
    (sum, cat) => sum + cat.questions.length, 
    0
  );
  
  // Calculate answered questions
  const answeredQuestions = Object.keys(answers).length;
  const progressPercent = (answeredQuestions / totalQuestions) * 100;

  const selectAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    const categoryResults = {};
    const recommendationsList = [];

    scorecardData.categories.forEach(category => {
      let categoryScore = 0;
      const categoryMax = category.questions.reduce((sum, q) => sum + q.weight, 0);

      category.questions.forEach(question => {
        const answer = answers[question.id];
        const weight = question.weight;
        
        switch(answer) {
          case 'yes':
            categoryScore += weight;
            break;
          case 'partial':
            categoryScore += weight * 0.5;
            recommendationsList.push({
              category: category.name,
              question: question.id,
              text: question.text,
              status: 'partial',
              potentialPoints: weight * 0.5
            });
            break;
          case 'no':
            recommendationsList.push({
              category: category.name,
              question: question.id,
              text: question.text,
              status: 'missing',
              potentialPoints: weight
            });
            break;
          case 'na':
            // No points for N/A
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

    setScore(Math.round(totalScore));
    setCategoryScores(categoryResults);
    setRecommendations(recommendationsList);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 rounded-t-2xl shadow-xl">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <span>🛡️</span> Cyber Resilience Scorecard
          </h1>
          <p className="text-xl opacity-90">Assess your organization's data protection and cyber resilience capabilities</p>
          
          {/* Progress Bar */}
          <div className="mt-6 bg-white/20 h-3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-400 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm mt-2 opacity-80">{answeredQuestions} of {totalQuestions} questions answered</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-xl p-8">
          {/* Results Display */}
          {showResults && (
            <Results 
              score={score}
              categoryScores={categoryScores}
              recommendations={recommendations}
            />
          )}

          {/* Questions */}
          {scorecardData.categories.map((category) => (
            <Category
              key={category.name}
              category={category}
              answers={answers}
              onSelectAnswer={selectAnswer}
            />
          ))}

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              onClick={calculateScore}
              disabled={answeredQuestions < totalQuestions}
              className={`px-12 py-4 rounded-xl text-xl font-bold transition-all duration-200 transform
                ${answeredQuestions === totalQuestions
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-xl hover:-translate-y-1'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
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