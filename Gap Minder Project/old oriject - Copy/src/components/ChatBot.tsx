import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, HelpCircle } from 'lucide-react';
import { processMessage } from '../utils/chatbot';
import type { Message } from '../types';
import type { UserProfile } from '../types';

export function ChatBot({ userProfile, onLaunchChallenge }: { 
  userProfile: UserProfile | null;
  onLaunchChallenge: (challenge: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'bot', content: 'Hi! I\'m your coding assistant. How can I help you today?' }
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
      { id: '1', type: 'bot', content: 'Hi! I\'m your coding assistant. How can I help you today?' }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>AI Coding Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleClear}
                className="text-white hover:text-indigo-200"
                title="Clear chat"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-indigo-200"
                title="Close chat"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.type === 'user' ? 'flex justify-end' : ''
                }`}
              >
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about coding..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSend}
                className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-500"
                title="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-500 transition-colors"
          title="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
