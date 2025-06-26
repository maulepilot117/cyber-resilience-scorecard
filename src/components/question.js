import React, { useState, useEffect } from 'react';

const Question = ({ question, answer, onSelect }) => {
  const options = [
    { value: 'yes', label: 'Yes', className: 'bg-green-500 text-white border-green-500' },
    { value: 'partial', label: 'Partial', className: 'bg-orange-500 text-white border-orange-500' },
    { value: 'no', label: 'No', className: 'bg-red-500 text-white border-red-500' },
    { value: 'na', label: 'N/A', className: 'bg-gray-500 text-white border-gray-500' }
  ];

  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="font-semibold text-purple-600 mb-2">Question {question.id}</div>
      <div className="text-gray-700 mb-4 leading-relaxed">{question.text}</div>
      
      <div className="flex gap-3 flex-wrap">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(question.id, option.value)}
            className={`px-6 py-2 rounded-lg border-2 transition-all duration-200 font-medium
              ${answer === option.value 
                ? option.className
                : 'bg-white border-gray-300 hover:border-purple-400 hover:bg-purple-50'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
