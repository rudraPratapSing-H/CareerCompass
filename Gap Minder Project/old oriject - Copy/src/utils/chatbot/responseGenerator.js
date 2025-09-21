import { codeExamples } from './codeExamples';
import { programmingConcepts } from './concepts';

export function generateResponse(input) {
  const normalizedInput = input.toLowerCase();

  // Programming concepts
  for (const concept of programmingConcepts) {
    if (normalizedInput.includes(concept.keyword)) {
      return concept.explanation;
    }
  }

  // Code examples
  if (normalizedInput.includes('example')) {
    if (normalizedInput.includes('loop')) {
      return `Here's a for loop example:\n\`\`\`js\n${codeExamples.javascript.forLoop}\`\`\``;
    }
    if (normalizedInput.includes('map')) {
      return `Here's how to use map:\n\`\`\`js\n${codeExamples.javascript.map}\`\`\``;
    }
  }

  // Resume help
  if (normalizedInput.includes('resume')) {
    if (normalizedInput.includes('skills')) {
      return 'When listing skills on your resume:\n1. Focus on relevant skills\n2. Use industry keywords\n3. Group similar skills\n4. Include proficiency levels';
    }
    if (normalizedInput.includes('experience')) {
      return 'Tips for writing work experience:\n1. Use action verbs\n2. Quantify achievements\n3. Focus on relevant experience\n4. Include specific examples';
    }
  }

  // Language-specific help
  if (normalizedInput.includes('python')) {
    return `Here's a Python example:\n\`\`\`python\n${codeExamples.python.listComprehension}\`\`\``;
  }

  // Default response
  return 'I can help with programming concepts, code examples, and resume writing. What would you like to know?';
}

export function processMessage(message) {
  return Promise.resolve(generateResponse(message));
}