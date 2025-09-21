export const programmingTopics = [
  {
    keyword: 'variable',
    explanation: 'Variables are containers for storing data values. In most programming languages, you declare a variable with a specific type and name, then assign it a value. Variables allow you to store, modify, and retrieve data throughout your program. In JavaScript, you can use `let`, `const`, or `var` to declare variables.',
    exampleCode: `
      // Using 'let' to declare a variable
      let name = "John";
      console.log(name); // Output: John

      // 'const' for constant values
      const age = 25;
      console.log(age); // Output: 25
    `
  },
  {
    keyword: 'function',
    explanation: 'Functions are blocks of reusable code that perform specific tasks. They can take inputs (parameters) and return outputs. Functions help organize code, reduce repetition, and improve readability. You can declare functions with the `function` keyword in JavaScript, or use arrow functions.',
    exampleCode: `
      // Declaring a function in JavaScript
      function greet(name) {
        return "Hello, " + name + "!";
      }

      console.log(greet("Alice")); // Output: Hello, Alice!

      // Arrow function
      const add = (a, b) => a + b;
      console.log(add(3, 4)); // Output: 7
    `
  },
  {
    keyword: 'loop',
    explanation: 'Loops are used to execute a block of code multiple times. Common types of loops include `for`, `while`, and `do-while` loops. Loops are essential for iterating over arrays or objects and performing repetitive tasks efficiently without needing to write duplicate code.',
    exampleCode: `
      // 'for' loop
      for (let i = 0; i < 5; i++) {
        console.log(i); // Output: 0, 1, 2, 3, 4
      }

      // 'while' loop
      let j = 0;
      while (j < 3) {
        console.log(j); // Output: 0, 1, 2
        j++;
      }

      // 'do-while' loop (executes at least once)
      let k = 0;
      do {
        console.log(k); // Output: 0
        k++;
      } while (k < 0); // Won't repeat
    `
  },
  {
    keyword: 'array',
    explanation: 'Arrays are ordered collections of items, which can store multiple values in a single variable. Arrays are zero-indexed, meaning the first element is at index 0. Arrays can contain elements of various types, such as strings, numbers, or even other arrays and objects. They are particularly useful for working with lists of data.',
    exampleCode: `
      // Declaring an array
      let fruits = ["apple", "banana", "orange"];
      console.log(fruits[0]); // Output: apple

      // Adding an item to an array
      fruits.push("grape");
      console.log(fruits); // Output: ["apple", "banana", "orange", "grape"]

      // Looping through an array
      fruits.forEach((fruit, index) => {
        console.log(index + ": " + fruit);
      });
    `
  },
  {
    keyword: 'object',
    explanation: 'Objects are collections of key-value pairs. They are used to store data in a structured way, where each key (property) is associated with a value. Objects are fundamental to Object-Oriented Programming (OOP), and can store primitive values or even functions as values.',
    exampleCode: `
      // Declaring an object
      let person = {
        name: "John",
        age: 30,
        greet: function() {
          return "Hello, " + this.name;
        }
      };

      console.log(person.name); // Output: John
      console.log(person.greet()); // Output: Hello, John

      // Adding new property to an object
      person.city = "New York";
      console.log(person.city); // Output: New York
    `
  },
  {
    keyword: 'conditional statement',
    explanation: 'Conditional statements allow you to execute different code depending on whether a condition is true or false. In JavaScript, the most common conditional statements are `if`, `else`, and `else if`. They help in making decisions based on certain conditions.',
    exampleCode: `
      // Simple if-else statement
      let age = 18;
      if (age >= 18) {
        console.log("You are an adult."); // Output: You are an adult.
      } else {
        console.log("You are a minor.");
      }

      // Using 'else if' for multiple conditions
      let score = 85;
      if (score >= 90) {
        console.log("Grade: A");
      } else if (score >= 75) {
        console.log("Grade: B");
      } else {
        console.log("Grade: C");
      }
    `
  },
  {
    keyword: 'array methods',
    explanation: 'JavaScript arrays come with built-in methods for adding, removing, and modifying elements. Some common array methods include `map()`, `filter()`, `reduce()`, and `forEach()`. These methods help perform operations on arrays more efficiently.',
    exampleCode: `
      // Using map() to create a new array
      let numbers = [1, 2, 3, 4];
      let doubled = numbers.map(num => num * 2);
      console.log(doubled); // Output: [2, 4, 6, 8]

      // Using filter() to filter elements
      let evenNumbers = numbers.filter(num => num % 2 === 0);
      console.log(evenNumbers); // Output: [2, 4]

      // Using reduce() to sum all elements
      let sum = numbers.reduce((acc, num) => acc + num, 0);
      console.log(sum); // Output: 10
    `
  },
  {
    keyword: 'ES6 features',
    explanation: 'ES6 (ECMAScript 2015) introduced several new features to JavaScript, including `let`, `const`, arrow functions, template literals, classes, promises, and destructuring. These features make JavaScript code more concise, readable, and powerful.',
    exampleCode: `
      // Template literals
      const name = "Alice";
      const greeting = \`Hello, \${name}!\`;
      console.log(greeting); // Output: Hello, Alice!

      // Destructuring assignment
      const person = { name: "Bob", age: 30 };
      const { name, age } = person;
      console.log(name, age); // Output: Bob 30
    `
  },
  {
    keyword: 'asynchronous programming',
    explanation: 'Asynchronous programming allows the execution of code without blocking other operations. This is essential for tasks like fetching data from an API or reading files. JavaScript handles asynchronous operations using callbacks, promises, and async/await.',
    exampleCode: `
      // Using a Promise
      const fetchData = new Promise((resolve, reject) => {
        let success = true;
        if (success) {
          resolve("Data fetched!");
        } else {
          reject("Error fetching data");
        }
      });

      fetchData.then((message) => {
        console.log(message); // Output: Data fetched!
      }).catch((error) => {
        console.log(error); // Output: Error fetching data
      });

      // Using async/await
      async function getData() {
        try {
          let response = await fetch("https://api.example.com/data");
          let data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    `
  },
  {
    keyword: 'recursion',
    explanation: 'Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. Recursive functions must have a base case to stop the recursion. Recursion is commonly used for tasks like traversing tree structures or solving mathematical problems.',
    exampleCode: `
      // A simple recursive function to calculate factorial
      function factorial(n) {
        if (n === 0) return 1;
        return n * factorial(n - 1);
      }

      console.log(factorial(5)); // Output: 120
    `
  },
  {
    keyword: 'data structures',
    explanation: 'Data structures are ways to organize and store data in a way that makes it easier to access and modify. Some common data structures include arrays, linked lists, stacks, queues, hash maps, and trees. Understanding data structures is fundamental to writing efficient algorithms.',
    exampleCode: `
      // Stack (LIFO)
      let stack = [];
      stack.push(1); // Push 1 to stack
      stack.push(2); // Push 2 to stack
      console.log(stack.pop()); // Output: 2 (Last In, First Out)

      // Queue (FIFO)
      let queue = [];
      queue.push(1); // Enqueue 1
      queue.push(2); // Enqueue 2
      console.log(queue.shift()); // Output: 1 (First In, First Out)
    `
  }
];
