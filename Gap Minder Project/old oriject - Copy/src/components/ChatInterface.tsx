import { useState, useRef, useEffect } from 'react';
import { Send, HelpCircle, Bot, User as UserIcon, ArrowLeft } from 'lucide-react';
import { processMessage } from '../utils/chatbot';
import type { Message } from '../types';
import type { UserProfile } from '../types';

interface ChatInterfaceProps {
  userProfile: UserProfile | null;
  onLaunchChallenge: (challenge: string) => void;
  onBack?: () => void;
}

export function ChatInterface({ userProfile, onLaunchChallenge, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: userProfile
        ? `Hello ${userProfile.name}! I'm your AI career mentor. I can help you with coding questions, recommend learning resources, and guide you through our interactive modules. What would you like to explore today?`
        : 'Hello! I\'m your AI career mentor. How can I help you with your coding journey today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await processMessage(input, userProfile);

      // Check for special commands
      if (response.startsWith('LAUNCH_CHALLENGE:')) {
        const challenge = response.split(':')[1].split(' ')[0];
        onLaunchChallenge(challenge);
        // Extract the message part
        const message = response.split(' ').slice(1).join(' ');
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: message
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: response
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'bot',
        content: 'Sorry, I encountered an issue processing your message. Please try again later.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: userProfile
          ? `Hello ${userProfile.name}! I'm your AI career mentor. I can help you with coding questions, recommend learning resources, and guide you through our interactive modules. What would you like to explore today?`
          : 'Hello! I\'m your AI career mentor. How can I help you with your coding journey today?'
      }
    ]);
  };

  const quickSuggestions = userProfile ? [
    'What modules are available for my skills?',
    'Show me JavaScript examples',
    'Recommend learning videos',
    'Help me debug my code',
    'Tell me about React components',
    `How can I improve my ${userProfile.desiredSkills[0] || 'programming'} skills?`
  ] : [
    'What modules are available?',
    'Show me JavaScript examples',
    'Recommend learning videos',
    'Help me debug my code',
    'Tell me about React components'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Back to Dashboard"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Career Mentor</h1>
                <p className="text-blue-100">Your personalized coding assistant</p>
              </div>
            </div>
            <button
              onClick={handleClear}
              className="text-white hover:text-blue-200 transition-colors"
              title="Clear chat"
            >
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-[60vh] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
              }`}>
                {message.type === 'user' ? (
                  <UserIcon className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div className={`max-w-[70%] rounded-lg p-4 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  <span className="text-sm text-gray-500 ml-2">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <div className="text-sm text-gray-600 mb-2">Quick suggestions:</div>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInput(suggestion)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t p-6">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about coding, career advice, or learning resources..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            💡 Try asking about: modules, code examples, video tutorials, debugging help, or career advice
            {userProfile && (
              <span className="block mt-1">
                🎯 Based on your skills ({userProfile.desiredSkills.slice(0, 3).join(', ')}), I can provide personalized recommendations!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}