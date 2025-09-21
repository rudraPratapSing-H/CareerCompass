export const codePuzzles = [
  {
    id: 'string-reverse',
    level: 'Beginner',
    title: 'Reverse a String',
    description: 'Create a function that reverses a string without using the built-in reverse() method.',
    initialCode: `function reverseString(str) {
  // Your code here
}`,
    testCases: [
      { input: 'hello', expected: 'olleh' },
      { input: 'world', expected: 'dlrow' }
    ]
  },
  {
    id: 'palindrome',
    level: 'Beginner',
    title: 'Palindrome Checker',
    description: 'Write a function that checks if a string is a palindrome (reads the same forwards and backwards).',
    initialCode: `function isPalindrome(str) {
  // Your code here
}`,
    testCases: [
      { input: 'racecar', expected: true },
      { input: 'hello', expected: false }
    ]
  },
  {
    id: 'fibonacci',
    level: 'Intermediate',
    title: 'Fibonacci Sequence',
    description: 'Create a function that returns the nth number in the Fibonacci sequence.',
    initialCode: `function fibonacci(n) {
  // Your code here
}`,
    testCases: [
      { input: 5, expected: 5 },
      { input: 8, expected: 21 }
    ]
  },
  {
    id: 'anagram',
    level: 'Intermediate',
    title: 'Anagram Detector',
    description: 'Write a function that determines if two strings are anagrams of each other.',
    initialCode: `function areAnagrams(str1, str2) {
  // Your code here
}`,
    testCases: [
      { input: ['listen', 'silent'], expected: true },
      { input: ['hello', 'world'], expected: false }
    ]
  },
  {
    id: 'binary-search',
    level: 'Advanced',
    title: 'Binary Search',
    description: 'Implement a binary search algorithm to find a number in a sorted array.',
    initialCode: `function binarySearch(arr, target) {
  // Your code here
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5], 3], expected: 2 },
      { input: [[1, 2, 3, 4, 5], 6], expected: -1 }
    ]
  }
];