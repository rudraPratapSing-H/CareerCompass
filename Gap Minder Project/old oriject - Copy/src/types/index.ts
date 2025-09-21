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

