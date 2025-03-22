import { useState } from "react";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import axios from "axios";

export default function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "FOUNDER",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      const response = await axios.post(
        "http://localhost:5000/api/sig",
        formData
      );
      if (response.status === 200) {
        console.log("User created successfully");
      }
    } catch (e) {
      console.log("Error", e);
    } finally {
      console.log(isSignUp ? "Signing Up" : "Signing In");
      setIsSubmitting(false);
    }

    // await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white nunito bg-gradient-to-br from-black to-gray-900 px-4 py-6">
      <div className="w-full max-w-sm bg-gray-900 rounded-lg shadow-lg border border-gray-800 transition-all duration-300">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold">
            <span className="text-yellow-500">Founderly</span>
          </h1>
          <h2 className="text-lg font-semibold text-gray-300">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            {isSignUp
              ? "Join our community of founders and investors"
              : "Sign in to access your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-4 pb-4 space-y-4">
          {isSignUp && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <User size={16} />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 p-2.5 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 transition-all text-sm"
                required
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <Mail size={16} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-9 p-2.5 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 transition-all text-sm"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <Lock size={16} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-9 p-2.5 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 transition-all text-sm"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {isSignUp && (
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2.5 pl-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500/50 transition-all appearance-none text-sm"
              >
                <option value="FOUNDER">FOUNDER</option>
                <option value="INVESTOR">INVESTOR</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 10.5a.5.5 0 0 1-.354-.146l-4-4a.5.5 0 1 1 .708-.708L8 9.293l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.354.146z" />
                </svg>
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-2.5 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 transition-all transform active:scale-95 text-sm ${
                isSubmitting ? "opacity-75 cursor-wait" : "cursor-pointer"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-3 w-3 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-xs">
                    {isSignUp ? "Creating Account..." : "Signing In..."}
                  </span>
                </span>
              ) : (
                <span>{isSignUp ? "Create Account" : "Sign In"}</span>
              )}
            </button>
          </div>
        </form>

        {!isSignUp && (
          <div className="px-4 pb-2 text-center">
            <a href="#" className="text-yellow-500 text-xs hover:underline">
              Forgot your password?
            </a>
          </div>
        )}

        <div className="px-4 pb-6 text-center">
          <div className="relative flex items-center my-3">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-3 text-xs text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          <p className="text-xs text-gray-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors"
              type="button"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
