import { codeExamples } from './codeExamples';
import type { UserProfile } from '../../types';

// Google API Configuration
const GOOGLE_API_KEY = 'AIzaSyB2tCiwdr83papZ3AG4W_WVGIaN989rMSo';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

// Enhanced response generation with Google APIs
export async function generateResponse(input: string, userProfile: UserProfile | null): Promise<string> {
  const normalizedInput = input.toLowerCase();

  // Personalized greeting based on user profile
  if (normalizedInput.includes('hello') || normalizedInput.includes('hi') || normalizedInput.includes('start')) {
    if (userProfile) {
      return `Hello! I see you're interested in ${userProfile.desiredSkills.join(', ')} and want to become a ${userProfile.desiredRole}. I'm here to help you learn and access our modules. What would you like to do today?`;
    }
    return 'Hi! I\'m your AI coding assistant powered by Google Gemini. How can I help you today?';
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

  // Enhanced video recommendations using YouTube API
  if (normalizedInput.includes('video') || normalizedInput.includes('tutorial') || normalizedInput.includes('learn')) {
    if (userProfile) {
      try {
        const skills = userProfile.desiredSkills;
        const videoPromises = skills.slice(0, 3).map(skill => searchYouTubeVideos(skill));
        const videoResults = await Promise.all(videoPromises);

        let response = `🎥 Here are personalized video recommendations for your skills:\n\n`;

        videoResults.forEach((videos, index) => {
          const skill = skills[index];
          response += `📚 **${skill} Tutorials:**\n`;
          videos.slice(0, 2).forEach(video => {
            response += `• ${video.title}\n  👁️ ${video.viewCount} views | ⏱️ ${video.duration}\n  🔗 ${video.url}\n\n`;
          });
        });

        response += `💡 Tip: Watch these videos and practice what you learn in our interactive modules!`;
        return response;
      } catch (error) {
        console.error('YouTube API error:', error);
        // Fallback to static recommendations
        return getStaticVideoRecommendations(userProfile);
      }
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

  // For complex queries, use Google Gemini AI
  try {
    const geminiResponse = await queryGeminiAI(input, userProfile);
    return geminiResponse;
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'I can help you with coding! Ask me about specific programming concepts, examples, or debugging tips. You can also ask for modules or video recommendations based on your skills.';
  }
}

// YouTube API integration
async function searchYouTubeVideos(skill: string): Promise<Array<{title: string, url: string, viewCount: string, duration: string}>> {
  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet&q=${encodeURIComponent(skill + ' tutorial beginners')}&type=video&maxResults=3&key=${GOOGLE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }

    const data = await response.json();

    return data.items.map((item: any) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      viewCount: 'N/A', // Would need additional API call for view count
      duration: 'N/A'   // Would need additional API call for duration
    }));
  } catch (error) {
    console.error('YouTube search error:', error);
    return [];
  }
}

// Google Gemini AI integration
async function queryGeminiAI(input: string, userProfile: UserProfile | null): Promise<string> {
  try {
    const context = userProfile
      ? `You are a helpful coding assistant for a career guidance platform. The user is learning ${userProfile.desiredSkills.join(', ')} and wants to become a ${userProfile.desiredRole}. Provide helpful, educational responses about programming and career development.`
      : 'You are a helpful coding assistant for a career guidance platform. Provide educational responses about programming and career development.';

    const response = await fetch(`${GEMINI_API_URL}?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${context}\n\nUser question: ${input}\n\nProvide a helpful, educational response. Keep it concise but informative.`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Gemini API request failed');
    }

    const data = await response.json();
    const generatedText = data.candidates[0]?.content?.parts[0]?.text;

    if (generatedText) {
      return generatedText.trim();
    } else {
      throw new Error('No response generated');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

// Fallback static video recommendations
function getStaticVideoRecommendations(userProfile: UserProfile): string {
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

// This is the main processMessage function that the chatbot uses
export function processMessage(message: string, userProfile: UserProfile | null): Promise<string> {
  return generateResponse(message, userProfile);
}