import { useState, useEffect } from 'react';
import { Mail, ChevronLeft, AlertCircle } from 'lucide-react';
import { validateEmail } from '../utils/validationUtils';
import { DEMO_MODE } from '../constants/assessmentConstants';

const EmailStep = ({ email, setEmail, handleEmailSubmit, goBack }) => {
  const [validationError, setValidationError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    // Only validate if there's an email and not in demo mode
    if (email && !DEMO_MODE) {
      setIsValidating(true);
      const timer = setTimeout(() => {
        const validation = validateEmail(email);
        if (!validation.isValid && validation.errors.length > 0) {
          // Show the first error message
          setValidationError(validation.errors[0]);
        } else {
          setValidationError('');
        }
        setIsValidating(false);
      }, 300); // Debounce validation by 300ms

      return () => clearTimeout(timer);
    } else {
      setValidationError('');
      setIsValidating(false);
    }
  }, [email]);

  const handleSubmit = () => {
    if (DEMO_MODE) {
      handleEmailSubmit();
      return;
    }

    const validation = validateEmail(email);
    if (validation.isValid) {
      handleEmailSubmit();
    } else if (validation.errors.length > 0) {
      setValidationError(validation.errors[0]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

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
        
        <div className="w-full mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full p-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              validationError 
                ? 'border-red-400 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-indigo-500 focus:border-transparent'
            }`}
            placeholder="your@company.com"
            autoFocus
          />
          
          {validationError && !isValidating && (
            <div className="mt-2 flex items-start gap-2 text-red-600">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{validationError}</p>
            </div>
          )}
          
          {!validationError && email && !isValidating && !DEMO_MODE && (
            <p className="mt-2 text-sm text-green-600">
              ✓ Valid company email address
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!DEMO_MODE && (isValidating || (email && validationError))}
          className={`w-full py-4 text-white text-lg font-semibold rounded-lg transition-colors ${
            !DEMO_MODE && (isValidating || (email && validationError))
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
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