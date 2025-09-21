export const pythonQuiz = {
  id: 'python-quiz',
  title: 'Python Programming Quiz',
  description: 'Test your Python programming skills',
  questions: [
    {
      question: 'What is the output of this code?',
      code: `x = [1, 2, 3]
y = x
y.append(4)
print(x)`,
      options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', 'None'],
      correctAnswer: '[1, 2, 3, 4]'
    },
    {
      question: 'What is a list comprehension in Python?',
      options: [
        'A shorter syntax for creating lists',
        'A way to sort lists',
        'A method to combine multiple lists',
        'A type of loop'
      ],
      correctAnswer: 'A shorter syntax for creating lists'
    }
  ]
};