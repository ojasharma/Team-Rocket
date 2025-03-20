import { useState } from "react";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "FOUNDER",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isSignUp ? "Signing Up" : "Signing In");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white nunito">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            required
          />
          {isSignUp && (
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            >
              <option value="FOUNDER">FOUNDER</option>
              <option value="INVESTOR">INVESTOR</option>
            </select>
          )}
          <button type="submit" className="w-full p-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600 cursor-pointer">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-yellow-500 font-semibold cursor-pointer">
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
