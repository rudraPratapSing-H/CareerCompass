export const cQuiz = {
  id: 'c-quiz',
  title: 'C Programming Quiz',
  description: 'Test your knowledge of C programming fundamentals',
  questions: [
    {
      question: 'What is the output of this code?',
      code: `int x = 5;
printf("%d", x++);`,
      options: ['5', '6', 'Undefined behavior', 'Compilation error'],
      correctAnswer: '5'
    },
    {
      question: 'Which of these is NOT a valid variable name in C?',
      options: ['_variable', 'variable123', '123variable', 'my_variable'],
      correctAnswer: '123variable'
    },
    {
      question: 'What is a pointer in C?',
      options: [
        'A variable that stores a memory address',
        'A variable that can store multiple values',
        'A function that points to another function',
        'A special type of array'
      ],
      correctAnswer: 'A variable that stores a memory address'
    }
  ]
};