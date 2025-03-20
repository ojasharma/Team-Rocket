//import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-6xl font-bold text-gray-800 mb-4">404</div>
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-yellow-400 text-white font-medium rounded-md hover:bg-yellow-500 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
