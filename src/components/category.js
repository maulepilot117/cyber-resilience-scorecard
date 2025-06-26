const Category = ({ category, answers, onSelectAnswer }) => (
  <div className="mb-8 bg-gray-50 p-6 rounded-xl">
    <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
      <span className="text-3xl">{category.icon}</span>
      {category.name}
    </h2>
    
    {category.questions.map((question) => (
      <Question
        key={question.id}
        question={question}
        answer={answers[question.id]}
        onSelect={onSelectAnswer}
      />
    ))}
  </div>
);
