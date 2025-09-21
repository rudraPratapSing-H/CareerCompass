import { Sparkles, Brain, Trophy } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Level Up Your Coding Skills</h1>
          <p className="text-xl mb-8">Master programming through interactive games, challenges, and AI-powered guidance</p>
          <div className="flex justify-center space-x-8 mb-12">
            <div className="flex flex-col items-center">
              <Sparkles className="w-12 h-12 mb-2" />
              <h3 className="font-semibold">Fun Games</h3>
            </div>
            <div className="flex flex-col items-center">
              <Brain className="w-12 h-12 mb-2" />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <div className="flex flex-col items-center">
              <Trophy className="w-12 h-12 mb-2" />
              <h3 className="font-semibold">Compete</h3>
            </div>
          </div>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-100 transition-colors">
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}