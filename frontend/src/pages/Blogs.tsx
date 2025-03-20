import React from "react";
import { Link } from "react-router-dom";
import UserBlogs from "../components/blog/UserBlogs";

const Blogs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-6 bg-gray-800 text-white shadow-md">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold mr-4 text-yellow-300">
            Founderly
          </Link>
        </div>
        <div>
          <ul className="flex space-x-8">
            <li className="cursor-pointer text-gray-400 hover:text-yellow-300 transition-colors duration-300">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer text-yellow-300 transition-colors duration-300">
              <Link to="/blogs">Blog</Link>
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-yellow-300 transition-colors duration-300">
              About Us
            </li>
          </ul>
        </div>
      </nav>

      {/* Blogs Header */}
      <div className="bg-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-yellow-300 mb-4">
            Founder Stories
          </h1>
          <p className="text-white text-lg">
            Share your startup journey and connect with fellow entrepreneurs
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <UserBlogs />
      </div>
    </div>
  );
};

export default Blogs;
