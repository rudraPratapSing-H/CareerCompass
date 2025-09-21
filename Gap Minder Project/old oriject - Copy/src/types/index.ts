// types/index.ts
export interface Question {
  question: string;         // The question text
  options: string[];        // The list of answer options
  correctAnswer: string;    // The correct answer
  code?: string;            // Optional code snippet for coding-related questions
}

export interface Quiz {
  questions: Question[];    // An array of Question objects
}

// types.ts or similar file
export type Message = {
  id: string;
  type: 'user' | 'bot'; // Type can be 'user' or 'bot' based on the message origin
  content: string;
};

export interface Puzzle {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  expectedOutput: string;
}

export interface UserProfile {
  // Basic Info
  name: string;
  college: string;
  course: string;
  year: string;
  
  // Skills & Interests
  domain: string;
  currentSkills: string[];
  desiredSkills: string[];
  interests: string[];
  
  // Career
  desiredRole: string;
  careerGoals: string[];
  level: string;
  
  // Academic Details
  currentSubjects: { name: string; credits: number }[];
  timetable: { day: string; classes: { subject: string; time: string }[] }[];
  learningPreferences: string[];
  
  // Learning History
  completedTasks: string[];
  watchedVideos: string[];
  quizScores: { quiz: string; score: number }[];
  
  // Community
  connections: string[];
  groups: string[];
}

