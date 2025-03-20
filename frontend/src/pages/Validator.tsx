import React, { useState } from 'react';
import axios from 'axios';

const BusinessIdeaValidator: React.FC = () => {
  const [businessIdea, setBusinessIdea] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<string | null>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessIdea(e.target.value);
  };

  // Handle button click
  const validateIdea = async () => {
    if (!businessIdea) {
      alert("Please enter a business idea.");
      return;
    }

    setLoading(true); // Show loader
    setValidationResult(null); // Reset previous validation result

    try {
      // Send the request to your backend (replace with actual endpoint)
      const response = await axios.post('https://api.example.com/validate', {
        idea: businessIdea,
      });

      // Assuming the API returns a message on whether the idea is viable or not
      setValidationResult(response.data.message);
    } catch (error) {
      console.error('Error validating business idea:', error);
      setValidationResult('There was an error validating your idea. Please try again.');
    } finally {
      setLoading(false); // Hide loader after the request is done
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4">Business Idea Validator</h1>
      <p className="text-lg mb-6">
        Welcome to the Business Idea Validator! Here, you can input your business idea, and we will tell you whether it has potential to succeed. Just type in your idea below and click "Validate your idea" to get feedback!
      </p>

      <div className="mb-6">
      <input
              type="text"
              id="business-idea"
              value={businessIdea}
              onChange={handleInputChange}
              placeholder="Describe your business idea here"
              className="w-[50vw] p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
            />
      </div>

      <button
        onClick={validateIdea}
        className="w-[12vw] py-3 bg-white text-black border-2 cursor-pointer text-lg rounded-lg hover:bg-yellow-500 transition duration-300"
      >
        Validate your idea
      </button>

      {/* Show loader while validating */}
      {loading && (
        <div className="mt-4">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      )}

      {/* Show validation result */}
      {validationResult && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">{validationResult}</h3>
        </div>
      )}
    </div>
  );
};

export default BusinessIdeaValidator;
