import { codeExamples } from './codeExamples';
import type { UserProfile } from '../../types';

export function generateResponse(input: string, userProfile: UserProfile | null): string {
  const normalizedInput = input.toLowerCase();

  // Personalized greeting based on user profile
  if (normalizedInput.includes('hello') || normalizedInput.includes('hi') || normalizedInput.includes('start')) {
    if (userProfile) {
      return `Hello! I see you're interested in ${userProfile.desiredSkills.join(', ')} and want to become a ${userProfile.desiredRole}. I'm here to help you learn and access our modules. What would you like to do today?`;
    }
    return 'Hi! I\'m your coding assistant. How can I help you today?';
  }

  // Access modules
  if (normalizedInput.includes('module') || normalizedInput.includes('challenge') || normalizedInput.includes('quiz')) {
    if (userProfile) {
      const skills = userProfile.desiredSkills;
      let response = `Based on your skills (${skills.join(', ')}), here are some modules you can access:\n\n`;
      
      if (skills.some(skill => ['JavaScript', 'React', 'Node.js'].includes(skill))) {
        response += '• JavaScript Puzzle\n• Web Development Quest\n';
      }
      if (skills.includes('SQL')) {
        response += '• SQL Challenge\n';
      }
      if (skills.includes('Python')) {
        response += '• Python Quiz\n';
      }
      if (skills.includes('C')) {
        response += '• C Programming Quiz\n';
      }
      if (skills.includes('C++')) {
        response += '• C++ Quiz\n';
      }
      
      response += '\nType the module name to start it!';
      return response;
    }
    return 'Please complete your skills assessment first to access personalized modules.';
  }

  // Launch specific challenges
  if (normalizedInput.includes('javascript puzzle')) {
    return 'LAUNCH_CHALLENGE:javascript Starting JavaScript Puzzle...';
  }
  if (normalizedInput.includes('sql challenge')) {
    return 'LAUNCH_CHALLENGE:sql Starting SQL Challenge...';
  }
  if (normalizedInput.includes('web development quest') || normalizedInput.includes('webdev')) {
    return 'LAUNCH_CHALLENGE:webdev Starting Web Development Quest...';
  }
  if (normalizedInput.includes('python quiz')) {
    return 'LAUNCH_CHALLENGE:python Starting Python Quiz...';
  }
  if (normalizedInput.includes('c quiz') || normalizedInput.includes('c programming quiz')) {
    return 'LAUNCH_CHALLENGE:c Starting C Programming Quiz...';
  }
  if (normalizedInput.includes('c++ quiz') || normalizedInput.includes('cpp quiz')) {
    return 'LAUNCH_CHALLENGE:cpp Starting C++ Quiz...';
  }

  // Video recommendations
  if (normalizedInput.includes('video') || normalizedInput.includes('tutorial') || normalizedInput.includes('learn')) {
    if (userProfile) {
      const skills = userProfile.desiredSkills;
      let response = `Here are some video recommendations for your skills:\n\n`;
      
      skills.forEach(skill => {
        switch(skill) {
          case 'JavaScript':
            response += `• JavaScript: https://www.youtube.com/watch?v=W6NZfCO5SIk\n`;
            break;
          case 'React':
            response += `• React: https://www.youtube.com/watch?v=w7ejDZ8SWv8\n`;
            break;
          case 'Python':
            response += `• Python: https://www.youtube.com/watch?v=rfscVS0vtbw\n`;
            break;
          case 'SQL':
            response += `• SQL: https://www.youtube.com/watch?v=HXV3zeQKqGY\n`;
            break;
          default:
            response += `• ${skill}: Search for "${skill} tutorial" on YouTube\n`;
        }
      });
      
      return response;
    }
    return 'Please complete your skills assessment to get personalized video recommendations.';
  }

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

  return 'I can help you with coding! Ask me about specific programming concepts, examples, or debugging tips. You can also ask for modules or video recommendations based on your skills.';
}

// This is the main processMessage function that the chatbot uses
export function processMessage(message: string, userProfile: UserProfile | null): Promise<string> {
  return Promise.resolve(generateResponse(message, userProfile));
}