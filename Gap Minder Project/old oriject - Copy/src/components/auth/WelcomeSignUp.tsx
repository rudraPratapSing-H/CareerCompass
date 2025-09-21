import React, { useState } from 'react';
import { User, GraduationCap, Calendar, ChevronRight } from 'lucide-react';

interface WelcomeSignUpProps {
  onNext: (data: { name: string; college: string; course: string; year: string }) => void;
}

export function WelcomeSignUp({ onNext }: WelcomeSignUpProps) {
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    course: '',
    year: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.college && formData.course && formData.year) {
      onNext(formData);
    }
  };

  const isFormValid = formData.name && formData.college && formData.course && formData.year;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to CareerCompass
          </h1>
          <p className="text-lg text-gray-600">
            Let's set up your profile to create your personalized learning journey
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* College */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <GraduationCap className="w-4 h-4 mr-2" />
                College/University
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your college name"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              />
            </div>

            {/* Course */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <GraduationCap className="w-4 h-4 mr-2" />
                Course/Program
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Computer Science, Engineering"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              />
            </div>

            {/* Year */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
                Current Year
              </label>
              <select
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              >
                <option value="">Select your year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                isFormValid
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}