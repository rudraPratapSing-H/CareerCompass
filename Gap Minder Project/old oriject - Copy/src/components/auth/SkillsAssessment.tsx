import React, { useState } from 'react';
import { Code2, BookOpen, Briefcase, Send, Code, Palette, Star, Sparkles } from 'lucide-react';
import type { UserProfile } from '../../types';
const domains = [
  {
    id: 'tech',
    title: 'Technical',
    description: 'Software development, programming, and technical skills',
    icon: Code,
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

// Define skill levels
const skillLevels = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'New to the field, eager to learn fundamentals',
    icon: Star,
    features: ['Basic concepts', 'Foundational skills', 'Entry-level projects']
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Experienced professional seeking to enhance skills',
    icon: Sparkles,
    features: ['Complex topics', 'Advanced techniques', 'Real-world projects']
  }
];

// Define skill options
const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'Python', 'C++', 'C', 'Java', 'SQL', 'MongoDB',
  'Docker', 'Git', 'AWS', 'GraphQL', 'Redux',
  'Vue.js', 'Angular', 'PHP', 'Ruby', 'Swift'
];

const careerOptions = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Software Tester',
  'SEO Specialist',
  'UI/UX Designer',
  'Data Scientist',
  'Mobile App Developer',
  'Cloud Engineer'
];

interface SkillsAssessmentProps {
  onComplete: (profile: UserProfile) => void;
}

export function SkillsAssessment({ onComplete }: SkillsAssessmentProps) {
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [desiredSkills, setDesiredSkills] = useState<string[]>([]);
  const [desiredRole, setDesiredRole] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLevelSelection, setShowLevelSelection] = useState(false);

  const toggleSkill = (skill: string, skillsList: string[], setSkillsList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (skillsList.includes(skill)) {
      setSkillsList(skillsList.filter(s => s !== skill));
    } else {
      setSkillsList([...skillsList, skill]);
    }
  };

  const handleSubmit = () => {
    setShowLevelSelection(true);
  };

  const handleFinalSubmit = () => {
    setIsSubmitted(true);
    const profile: UserProfile = {
        domain: selectedDomain,
        level: selectedLevel,
        currentSkills,
        desiredSkills,
        desiredRole,
        name: '',
        college: '',
        course: '',
        year: '',
        interests: [],
        careerGoals: [],
        currentSubjects: [],
        timetable: [],
        learningPreferences: [],
        completedTasks: [],
        watchedVideos: [],
        quizScores: [],
        connections: [],
        groups: []
    };
    onComplete(profile);
  };

  const isFormComplete = currentSkills.length > 0 && desiredSkills.length > 0 && desiredRole !== '';

  // Domain Selection Page
  if (!selectedDomain) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-purple-900 mb-8">
            Choose Your Learning Path
          </h1>
          <p className="text-center text-purple-700 mb-12 text-lg">
            Select the domain you want to explore and develop your skills in
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {domains.map((domain) => {
              const Icon = domain.icon;
              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain.id)}
                  className="group bg-white rounded-2xl shadow-lg p-8 border border-purple-100 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-purple-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-4 rounded-full bg-${domain.color}-100 group-hover:bg-${domain.color}-200 transition-colors duration-300 mb-4`}>
                      <Icon className={`w-12 h-12 text-${domain.color}-600`} />
                    </div>
                    <h2 className="text-2xl font-bold text-purple-900 mb-3">
                      {domain.title}
                    </h2>
                    <p className="text-purple-600">
                      {domain.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Skill Level Selection Page (shown after skills assessment)
  if (showLevelSelection && !isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-purple-900 mb-4">
              Choose Your Skill Level
            </h1>
            <p className="text-purple-700 text-lg mb-4">
              Based on your selected skills, what's your current proficiency level?
            </p>
            <button
              onClick={() => setShowLevelSelection(false)}
              className="text-purple-600 hover:text-purple-800 underline text-sm"
            >
              ← Back to Skills Assessment
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillLevels.map((level) => {
              const Icon = level.icon;
              return (
                <button
                  key={level.id}
                  onClick={() => {
                    setSelectedLevel(level.id);
                    handleFinalSubmit();
                  }}
                  className="group bg-white rounded-2xl shadow-lg p-8 border border-purple-100 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-purple-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300 mb-4">
                      <Icon className="w-12 h-12 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-purple-900 mb-3">
                      {level.title}
                    </h2>
                    <p className="text-purple-600 mb-6">
                      {level.description}
                    </p>
                    <ul className="text-left w-full space-y-2">
                      {level.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-purple-700">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Skills Assessment Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-900 mb-4">
            Skills Assessment
          </h1>
          <button
            onClick={() => setSelectedDomain('')}
            className="text-purple-600 hover:text-purple-800 underline text-sm"
          >
            ← Change Domain
          </button>
        </div>

        {/* Current Skills Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="text-purple-600 w-6 h-6" />
            <h2 className="text-xl font-semibold text-purple-900">What skills do you currently have?</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill, currentSkills, setCurrentSkills)}
                disabled={isSubmitted}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105
                  ${currentSkills.includes(skill)
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  } ${isSubmitted ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Desired Skills Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-purple-600 w-6 h-6" />
            <h2 className="text-xl font-semibold text-purple-900">What skills would you like to learn?</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill, desiredSkills, setDesiredSkills)}
                disabled={isSubmitted}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105
                  ${desiredSkills.includes(skill)
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  } ${isSubmitted ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Future Role Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="text-purple-600 w-6 h-6" />
            <h2 className="text-xl font-semibold text-purple-900">What role would you like to pursue?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {careerOptions.map((role) => (
              <button
                key={role}
                onClick={() => setDesiredRole(role)}
                disabled={isSubmitted}
                className={`p-4 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 text-center
                  ${desiredRole === role
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  } ${isSubmitted ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        {(currentSkills.length > 0 || desiredSkills.length > 0 || desiredRole) && (
          <div className="bg-purple-100 rounded-xl p-6 mt-8 border border-purple-200 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">Your Profile Summary</h3>
            <p className="text-purple-800 mb-2">
              <span className="font-medium">Domain:</span> {selectedDomain === 'tech' ? 'Technical' : 'Non-Technical'}
            </p>
            {currentSkills.length > 0 && (
              <p className="text-purple-800 mb-2">
                <span className="font-medium">Current Skills:</span> {currentSkills.join(', ')}
              </p>
            )}
            {desiredSkills.length > 0 && (
              <p className="text-purple-800 mb-2">
                <span className="font-medium">Skills to Learn:</span> {desiredSkills.join(', ')}
              </p>
            )}
            {desiredRole && (
              <p className="text-purple-800">
                <span className="font-medium">Desired Role:</span> {desiredRole}
              </p>
            )}

            {/* Continue to Skill Level Button */}
            {isFormComplete && !showLevelSelection && !isSubmitted && (
              <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Send className="w-5 h-5" />
                Continue to Skill Level
              </button>
            )}

            {/* Success Message */}
            {isSubmitted && (
              <div className="mt-6 text-center p-4 bg-green-100 text-green-800 rounded-lg border border-green-200">
                <p className="font-medium mb-2">Thank you for submitting your assessment!</p>
                <p>Your selected level: <span className="font-semibold">{selectedLevel === 'beginner' ? 'Beginner' : 'Advanced'}</span></p>
                <p className="mt-2">We'll analyze your profile and provide personalized recommendations.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}