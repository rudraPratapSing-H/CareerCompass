import { codeExamples } from './codeExamples';

export function generateResponse(input: string): string {
  const normalizedInput = input.toLowerCase();

  // Code examples
  if (normalizedInput.includes('example')) {
    if (normalizedInput.includes('loop')) {
      return `Here's a for loop example in JavaScript:\n\`\`\`js\n${codeExamples.javascript.forLoop}\`\`\``;
    }
    if (normalizedInput.includes('map')) {
      return `Here's how to use map in JavaScript:\n\`\`\`js\n${codeExamples.javascript.map}\`\`\``;
    }
  }

  // React help
  if (normalizedInput.includes('react')) {
    if (normalizedInput.includes('component')) {
      return `Here's a basic React component:\n\`\`\`jsx\n${codeExamples.react.component}\`\`\``;
    }
    if (normalizedInput.includes('usestate')) {
      return `Here's how to use useState hook:\n\`\`\`jsx\n${codeExamples.react.useState}\`\`\``;
    }
  }

  // Python help
  if (normalizedInput.includes('python')) {
    if (normalizedInput.includes('list comprehension')) {
      return `Here's a Python list comprehension example:\n\`\`\`python\n${codeExamples.python.listComprehension}\`\`\``;
    }
  }

  // General coding concepts
  if (normalizedInput.includes('debug')) {
    return `Here are some debugging tips:
1. Use console.log() or print statements
2. Check your browser's developer tools
3. Use a debugger statement
4. Review error messages carefully
5. Break down the problem into smaller parts`;
  }

  return 'I can help you with coding! Ask me about specific programming concepts, examples, or debugging tips.';
}

// This is the main processMessage function that the chatbot uses
export function processMessage(message: string): Promise<string> {
  return Promise.resolve(generateResponse(message));
}