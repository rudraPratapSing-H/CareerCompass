import React, { useState } from "react";
import { User, Lock, Code2 } from "lucide-react";

export function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Demo credentials check
    if (formData.email === "demo@codequest.com" && formData.password === "demo123") {
      onLogin();
      return;
    }

    setError("Invalid credentials. Try the demo account!");
  };

  const setDemoCredentials = () => {
    setFormData({
      email: "demo@codequest.com",
      password: "demo123",
      username: "",
    });
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 px-6 sm:px-8">
      {/* Logo */}
      <div className="text-white flex items-center mb-8">
        <Code2 className="w-12 h-12 mr-3" />
        <h1 className="text-4xl font-bold tracking-wide">GapMinders</h1>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 transition-transform">
            {isLogin ? "Welcome Back!" : "Create Your Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Continue your journey of learning and coding" : "Join the quest and start learning today"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-100 text-red-800 p-3 rounded-md text-sm shadow-sm">
            {error}
          </div>
        )}

        {/* Demo Credentials */}
        <div className="mt-4 bg-indigo-100 text-indigo-800 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-medium">Demo Account</p>
          <p className="text-sm">Email: <span className="font-semibold">demo@codequest.com</span></p>
          <p className="text-sm">Password: <span className="font-semibold">demo123</span></p>
          <button
            onClick={setDemoCredentials}
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Use Demo Credentials
          </button>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="relative">
              <input
                id="username"
                type="text"
                required
                className="w-full px-4 py-3 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            </div>
          )}

          <div className="relative">
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
              placeholder="     Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          </div>

          <div className="relative">
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
              placeholder="     Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
          >
            {isLogin ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
