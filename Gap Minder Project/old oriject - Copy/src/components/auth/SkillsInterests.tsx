import React, { useState } from 'react';
import { Code2, Palette, ChevronLeft, ChevronRight } from 'lucide-react';

const domains = [
  {
    id: 'tech',
    title: 'Technical',
    description: 'Software development, programming, and technical skills',
    icon: Code2,
    color: 'purple'
  },
  {
    id: 'nontech',
    title: 'Non-Technical',
    description: 'Design, marketing, management, and business skills',
    icon: Palette,
    color: 'indigo'
  }
];

const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'Python', 'C++', 'C', 'Java', 'SQL', 'MongoDB',
  'Docker', 'Git', 'AWS', 'GraphQL', 'Redux',
  'Vue.js', 'Angular', 'PHP', 'Ruby', 'Swift',
  'HTML', 'CSS', 'Tailwind CSS', 'Figma', 'Adobe XD',
  'UI/UX Design', 'Graphic Design', 'Digital Marketing',
  'Data Analysis', 'Machine Learning', 'AI/ML'
];

const interestOptions = [
  'Artificial Intelligence', 'Web Development', 'Mobile Development',
  'Data Science', 'Cybersecurity', 'Cloud Computing', 'DevOps',
  'Blockchain', 'IoT', 'Game Development', 'UI/UX Design',
  'Digital Marketing', 'Finance', 'Healthcare', 'Education',
  'E-commerce', 'Sustainability', 'Social Impact'
];

const careerGoals = [
  'Software Engineer', 'Data Scientist', 'Product Manager',
  'UI/UX Designer', 'DevOps Engineer', 'Full Stack Developer',
  'Frontend Developer', 'Backend Developer', 'Mobile Developer',
  'AI/ML Engineer', 'Cybersecurity Analyst', 'Cloud Architect',
  'Entrepreneur', 'Researcher', 'Consultant', 'Teacher'
];

interface SkillsInterestsProps {
  onNext: (data: {
    domain: string;
    currentSkills: string[];
    desiredSkills: string[];
    interests: string[];
    desiredRole: string;
    careerGoals: string[];
  }) => void;
  onBack: () => void;
}

export function SkillsInterests({ onNext, onBack }: SkillsInterestsProps) {
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [desiredSkills, setDesiredSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [desiredRole, setDesiredRole] = useState<string>('');
  const [careerGoalsSelected, setCareerGoalsSelected] = useState<string[]>([]);

  const toggleSkill = (skill: string, skillsList: string[], setSkillsList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (skillsList.includes(skill)) {
      setSkillsList(skillsList.filter(s => s !== skill));
    } else {
      setSkillsList([...skillsList, skill]);
    }
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const toggleCareerGoal = (goal: string) => {
    if (careerGoalsSelected.includes(goal)) {
      setCareerGoalsSelected(careerGoalsSelected.filter(g => g !== goal));
    } else {
      setCareerGoalsSelected([...careerGoalsSelected, goal]);
    }
  };

  const handleSubmit = () => {
    if (selectedDomain && currentSkills.length > 0 && desiredSkills.length > 0 && desiredRole) {
      onNext({
        domain: selectedDomain,
        currentSkills,
        desiredSkills,
        interests,
        desiredRole,
        careerGoals: careerGoalsSelected
      });
    }
  };

  const isFormValid = selectedDomain && currentSkills.length > 0 && desiredSkills.length > 0 && desiredRole;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-900 mb-4">
            Skills & Interests
          </h1>
          <p className="text-purple-700">
            Tell us about your skills and what you're passionate about
          </p>
        </div>

        {/* Domain Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Choose Your Domain</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {domains.map((domain) => {
              const Icon = domain.icon;
              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDomain === domain.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="w-6 h-6 text-purple-600 mr-3" />
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">{domain.title}</h3>
                      <p className="text-sm text-gray-600">{domain.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Skills */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Skills You Currently Have</h2>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill, currentSkills, setCurrentSkills)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  currentSkills.includes(skill)
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Desired Skills */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Skills You Want to Learn</h2>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill, desiredSkills, setDesiredSkills)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  desiredSkills.includes(skill)
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Your Interests</h2>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  interests.includes(interest)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Desired Role */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Desired Career Role</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {careerGoals.map((role) => (
              <button
                key={role}
                onClick={() => setDesiredRole(role)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  desiredRole === role
                    ? 'bg-green-600 text-white'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Career Goals */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Additional Career Goals</h2>
          <div className="flex flex-wrap gap-2">
            {['Research', 'Entrepreneurship', 'Teaching', 'Consulting', 'Startups'].map((goal) => (
              <button
                key={goal}
                onClick={() => toggleCareerGoal(goal)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  careerGoalsSelected.includes(goal)
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              isFormValid
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}