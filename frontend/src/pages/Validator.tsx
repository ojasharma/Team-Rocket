import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
//import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

const BusinessIdeaValidator: React.FC = () => {
  const [businessIdea, setBusinessIdea] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<any | null>(null);
  const [charCount, setCharCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [industryTag, setIndustryTag] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  const MAX_CHARS = 1500;

  // Sample industry tags
  const industryTags = [
    "SaaS",
    "E-commerce",
    "FinTech",
    "HealthTech",
    "EdTech",
    "AI/ML",
    "IoT",
    "Mobile App",
    "Marketplace",
    "Sustainability",
    "Consumer",
    "B2B",
    "Food & Beverage",
    "Travel",
    "Entertainment",
  ];

  // Handle input change with character count
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setBusinessIdea(text);
      setCharCount(text.length);
      setError(null);
    }
  };

  // Handle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Handle custom tag input
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndustryTag(e.target.value);
  };

  // Add custom tag
  const addCustomTag = () => {
    if (
      industryTag &&
      industryTag.length > 0 &&
      !selectedTags.includes(industryTag) &&
      selectedTags.length < 3
    ) {
      setSelectedTags([...selectedTags, industryTag]);
      setIndustryTag("");
    }
  };

  // Extract score from markdown response
  const extractScore = (response: string): number | null => {
    const scoreRegex = /\*\*Score:\s*(\d+)\*\*/i;
    const match = response.match(scoreRegex);
    return match ? parseInt(match[1]) : null;
  };

  // Handle button click
  const validateIdea = async () => {
    if (!businessIdea.trim()) {
      setError("Please enter a business idea to validate.");
      return;
    }

    // Prepare message with tags if they exist
    let message = businessIdea;
    if (selectedTags.length > 0) {
      message += `\n\nIndustry/Category: ${selectedTags.join(", ")}`;
    }

    setLoading(true);
    setValidationResult(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/validate/idea",
        { message }
      );

      const responseData = response.data;
      const score = extractScore(responseData.response);

      setValidationResult({
        ...responseData,
        score: score || 60, // Fallback to 60 if score extraction fails
      });

      // Scroll to results after loading
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      // Move to results step
      setCurrentStep(3);
    } catch (error) {
      console.error("Error validating business idea:", error);
      setError(
        "There was an error validating your idea. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to handle step progression
  const handleContinue = () => {
    if (currentStep === 1 && businessIdea.trim().length > 20) {
      setCurrentStep(2);
    } else if (currentStep === 1) {
      setError("Please provide more details about your business idea.");
    } else if (currentStep === 2) {
      validateIdea();
    }
  };

  // Function to go back to previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Reset everything
  const handleReset = () => {
    setBusinessIdea("");
    setValidationResult(null);
    setSelectedTags([]);
    setCharCount(0);
    setCurrentStep(1);
  };

  // Function to render score visualization
  const renderScoreVisualization = (score: number) => {
    const getScoreCategory = () => {
      if (score >= 80)
        return {
          label: "Highly promising",
          color: "#10B981",
          gradient: "from-emerald-300 to-emerald-600",
        }; // Green
      if (score >= 60)
        return {
          label: "Good potential",
          color: "#3B82F6",
          gradient: "from-blue-300 to-blue-600",
        }; // Blue
      if (score >= 40)
        return {
          label: "Needs improvement",
          color: "#F59E0B",
          gradient: "from-amber-300 to-amber-600",
        }; // Amber
      return {
        label: "Unlikely to succeed",
        color: "#EF4444",
        gradient: "from-red-300 to-red-600",
      }; // Red
    };

    const scoreInfo = getScoreCategory();
    const circumference = 2 * Math.PI * 45; // r = 45, circumference = 2πr
    const offset = circumference - (score / 100) * circumference;

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center my-8"
      >
        <div className="relative w-48 h-48">
          {/* Background circle */}
          <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 100 100">
            <defs>
              <linearGradient
                id="scoreGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={scoreInfo.color}
                  stopOpacity="0.6"
                />
                <stop offset="100%" stopColor={scoreInfo.color} />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            {/* Score circle with gradient and animation */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
              style={{
                transition:
                  "stroke-dashoffset 1.5s cubic-bezier(0.45, 0, 0.55, 1)",
              }}
            />
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl font-bold"
              style={{ color: scoreInfo.color }}
            >
              {score}
            </motion.span>
            <span className="text-sm text-gray-500">out of 100</span>
          </div>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div
            className={`mt-2 px-4 py-2 rounded-full bg-gradient-to-r ${scoreInfo.gradient} text-white font-medium shadow-md`}
          >
            {scoreInfo.label}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Custom ReactMarkdown component with styled sections
  const EnhancedMarkdown = ({ text }: { text: string }) => {
    // Extract strengths and weaknesses for better display
    const extractStrengthsWeaknesses = () => {
      const strengthsMatch = text.match(
        /Strengths:([\s\S]*?)(?=Weaknesses:|$)/i
      );
      const weaknessesMatch = text.match(
        /Weaknesses:([\s\S]*?)(?=\*\*Score|\*\*)/i
      );

      const strengths = strengthsMatch
        ? strengthsMatch[1]
            .split("-")
            .filter((item) => item.trim().length > 0)
            .map((item) => item.trim())
        : [];

      const weaknesses = weaknessesMatch
        ? weaknessesMatch[1]
            .split("-")
            .filter((item) => item.trim().length > 0)
            .map((item) => item.trim())
        : [];

      return { strengths, weaknesses };
    };

    const { strengths, weaknesses } = extractStrengthsWeaknesses();
    const problemMatch = text.match(
      /\*\*Problem-Solving Ability:\*\*([\s\S]*?)(?=\*\*Strengths & Weaknesses|$)/i
    );
    const problemSolving = problemMatch ? problemMatch[1].trim() : "";

    const recommendationMatch = text.match(/\*\*Score:.*?\*\*([\s\S]*?)$/i);
    const recommendation = recommendationMatch
      ? recommendationMatch[1].trim()
      : "";

    return (
      <div className="space-y-8">
        {/* Problem-Solving Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500"
        >
          <h3 className="text-xl font-semibold text-indigo-700 mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            Problem-Solution Analysis
          </h3>
          <p className="text-gray-700 leading-relaxed">{problemSolving}</p>
        </motion.div>

        {/* Strengths & Weaknesses Section */}
        <div className="flex flex-col md:flex-row gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md flex-1 border-t-4 border-emerald-500"
          >
            <h3 className="text-xl font-semibold text-emerald-600 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Strengths
            </h3>
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <motion.li
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  key={`strength-${index}`}
                  className="flex items-start"
                >
                  <span className="inline-flex items-center justify-center bg-emerald-100 rounded-full p-1 mr-3 mt-1">
                    <svg
                      className="h-4 w-4 text-emerald-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700">{strength}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md flex-1 border-t-4 border-red-500"
          >
            <h3 className="text-xl font-semibold text-red-500 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Improvement Areas
            </h3>
            <ul className="space-y-3">
              {weaknesses.map((weakness, index) => (
                <motion.li
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  key={`weakness-${index}`}
                  className="flex items-start"
                >
                  <span className="inline-flex items-center justify-center bg-red-100 rounded-full p-1 mr-3 mt-1">
                    <svg
                      className="h-4 w-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700">{weakness}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Recommendation Section */}
        {recommendation && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-md border-l-4 border-purple-500"
          >
            <h3 className="text-xl font-semibold text-purple-700 mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                  clipRule="evenodd"
                />
              </svg>
              Strategic Recommendations
            </h3>
            <p className="text-gray-700 leading-relaxed">{recommendation}</p>
          </motion.div>
        )}
      </div>
    );
  };

  // Example prompts for inspiration
  const examplePrompts = [
    "A subscription service for personalized workout plans based on AI analysis of body type and fitness goals.",
    "A mobile app that helps small local restaurants optimize their delivery routes and reduce food waste.",
    "A platform that connects homeowners with excess solar energy to neighbors who want to buy renewable energy.",
    "An AI-powered tool that helps non-native English speakers write professional business emails.",
  ];

  // Render tips overlay
  const renderTips = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={() => setShowTips(false)}
      >
        <div
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-indigo-700">
              Writing an Effective Business Idea
            </h3>
            <button
              onClick={() => setShowTips(false)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-5">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium text-indigo-700 mb-2">
                Key Elements to Include:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-indigo-100 rounded-full p-1 mr-2 mt-1">
                    <svg
                      className="h-3 w-3 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>
                    <strong>The Problem:</strong> What specific pain point or
                    unmet need does your idea address?
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-indigo-100 rounded-full p-1 mr-2 mt-1">
                    <svg
                      className="h-3 w-3 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>
                    <strong>Target Audience:</strong> Who will benefit most from
                    your solution?
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-indigo-100 rounded-full p-1 mr-2 mt-1">
                    <svg
                      className="h-3 w-3 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>
                    <strong>Your Solution:</strong> How does your idea solve the
                    problem?
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-indigo-100 rounded-full p-1 mr-2 mt-1">
                    <svg
                      className="h-3 w-3 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>
                    <strong>Unique Value:</strong> What makes your solution
                    different from existing alternatives?
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-indigo-700 mb-2">
                Example Format:
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700 text-sm">
                <p>
                  My business idea is [brief description]. It solves the problem
                  of [specific problem] for [target audience]. Currently,
                  [describe current solutions and their limitations]. My
                  solution works by [how it solves the problem] and stands out
                  because [unique advantages]. I believe this has potential
                  because [market opportunity or trend].
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-indigo-700 mb-2">
                Example Ideas:
              </h4>
              <div className="grid gap-3">
                {examplePrompts.map((prompt, index) => (
                  <div
                    key={index}
                    className="bg-white border border-indigo-100 p-3 rounded-lg text-gray-700 text-sm hover:bg-indigo-50 hover:border-indigo-200 transition cursor-pointer"
                    onClick={() => {
                      setBusinessIdea(prompt);
                      setCharCount(prompt.length);
                      setShowTips(false);
                    }}
                  >
                    {prompt}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowTips(false)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
            >
              Got it
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Next steps section
  const renderNextSteps = () => {
    const score = validationResult?.score || 0;

    const nextStepItems = [
      {
        title: "Refine Your Concept",
        description:
          "Address the weaknesses identified in your validation report.",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        ),
      },
      {
        title: "Market Research",
        description:
          "Validate demand with potential customers through surveys or interviews.",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        title: "Build a Prototype",
        description:
          "Create a minimum viable product to test your core assumptions.",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        title: score >= 70 ? "Seek Funding" : "Pivot or Persevere",
        description:
          score >= 70
            ? "Prepare a pitch deck and business plan for potential investors."
            : "Consider pivoting elements of your business model based on feedback.",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {score >= 70 ? (
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            ) : (
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            )}
          </svg>
        ),
      },
    ];

    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-md border border-indigo-100 mt-8"
      >
        <h3 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
          Recommended Next Steps
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {nextStepItems.map((item, index) => (
            <motion.div
              initial={{ x: index % 2 === 0 ? -10 : 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition border border-indigo-100"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-full text-indigo-600 mr-3">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-medium text-indigo-700">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleReset}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Validate Another Idea
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-indigo-800 mb-2"
          >
            Business Idea Validator
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Get expert feedback on your business idea and discover its potential
            strengths, weaknesses, and opportunities.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Progress bar */}
          <div className="bg-indigo-50 p-4">
            <div className="flex items-center justify-between mx-4 mb-2">
              <span className="text-xs font-medium text-indigo-700">
                Step {currentStep} of 3
              </span>
              <span className="text-xs font-medium text-indigo-700">
                {currentStep === 1
                  ? "Describe your idea"
                  : currentStep === 2
                  ? "Categorize"
                  : "Results"}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Idea Description */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Describe Your Business Idea
                  </h2>
                  <button
                    onClick={() => setShowTips(true)}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition text-sm font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Tips for Better Results
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    value={businessIdea}
                    onChange={handleInputChange}
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none transition"
                    placeholder="Describe your business idea in detail. Include: the problem you're solving, your target audience, how your solution works, and what makes it unique..."
                  ></textarea>
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {charCount}/{MAX_CHARS}
                  </div>
                </div>

                {error && (
                  <div className="mt-2 text-red-500 text-sm">{error}</div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleContinue}
                    className={`px-6 py-2 rounded-lg shadow-md text-white flex items-center ${
                      businessIdea.trim().length > 20
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-indigo-400 cursor-not-allowed"
                    } transition`}
                    disabled={businessIdea.trim().length <= 20}
                  >
                    Continue
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Industry Tags */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Categorize Your Business Idea
                </h2>
                <p className="text-gray-600 mb-6">
                  Select up to 3 industry categories that best describe your
                  business idea (optional but recommended).
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {industryTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                          selectedTags.includes(tag)
                            ? "bg-indigo-100 text-indigo-700 border-indigo-300"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
                        } border`}
                      >
                        {tag}
                        {selectedTags.includes(tag) && (
                          <span className="ml-2">✓</span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="text"
                      value={industryTag}
                      onChange={handleTagInput}
                      placeholder="Add a custom category..."
                      className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                      disabled={selectedTags.length >= 3}
                    />
                    <button
                      onClick={addCustomTag}
                      className={`px-4 py-2 rounded-r-lg ${
                        industryTag && selectedTags.length < 3
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      } transition`}
                      disabled={!industryTag || selectedTags.length >= 3}
                    >
                      Add
                    </button>
                  </div>

                  {selectedTags.length >= 3 && (
                    <p className="text-amber-600 text-sm mt-2">
                      Maximum of 3 categories reached
                    </p>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md text-gray-700 flex items-center transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Back
                  </button>
                  <button
                    onClick={validateIdea}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md text-white flex items-center transition"
                  >
                    Validate Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Results */}
            {currentStep === 3 && validationResult && (
              <div ref={resultRef} key="step3" className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Validation Results
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleReset}
                      className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 text-sm flex items-center transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                      New Validation
                    </button>
                  </div>
                </div>

                {/* Idea Summary */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-indigo-50 p-4 rounded-lg mb-6"
                >
                  <h3 className="font-medium text-indigo-800 mb-2">
                    Your Idea Summary
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {businessIdea.length > 180
                      ? businessIdea.substring(0, 180) + "..."
                      : businessIdea}
                  </p>
                  {selectedTags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selectedTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Score visualization */}
                {renderScoreVisualization(validationResult.score)}

                {/* Detailed analysis */}
                <EnhancedMarkdown text={validationResult.response} />

                {/* Next steps */}
                {renderNextSteps()}
              </div>
            )}
          </AnimatePresence>

          {/* Loading state */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-md">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full mb-4"
                ></motion.div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2">
                  Analyzing Your Idea
                </h3>
                <p className="text-gray-600 text-center">
                  Our AI is evaluating your business idea across multiple
                  dimensions including market potential, uniqueness, and
                  execution feasibility.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          © 2025 Business Idea Validator By Founderly • Powered by AI • Not
          financial advice
        </motion.div>
      </div>

      {/* Tips modal */}
      <AnimatePresence>{showTips && renderTips()}</AnimatePresence>
    </div>
  );
};

export default BusinessIdeaValidator;
