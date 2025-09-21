export const cppQuiz = {
  id: 'cpp-quiz',
  title: 'C++ Programming Quiz',
  description: 'Challenge yourself with C++ concepts',
  questions: [
    {
      question: 'What is the difference between struct and class in C++?',
      options: [
        'Members are public by default in struct, private in class',
        'Struct cannot have member functions',
        'Class cannot have member variables',
        'There is no difference',
      ],
      correctAnswer: 'Members are public by default in struct, private in class',
    },
    {
      question: 'What is the output of this code?',
      code: `vector<int> v = {1, 2, 3};
auto it = v.begin();
v.push_back(4);
cout << *it;`,
      options: ['1', '4', 'Undefined behavior', 'Compilation error'],
      correctAnswer: 'Undefined behavior',
    },
  ],
};
