import React from 'react';
import { Code, Database, Globe, Sparkles, Terminal, FileText } from 'lucide-react';

const games = [
  {
    id: 'javascript',
    title: "JavaScript Puzzle",
    description: "Master JavaScript through interactive coding challenges. Perfect for beginners and intermediate developers.",
    icon: Code,
    level: "Beginner",
    players: 1200,
    color: "from-yellow-400 to-orange-500",
    hasTimer: true
  },
  {
    id: 'python',
    title: "Python Challenge",
    description: "Learn Python programming through interactive quizzes and coding challenges.",
    icon: Terminal,
    level: "Beginner",
    players: 950,
    color: "from-green-400 to-green-600",
    hasTimer: true
  },
  {
    id: 'resume',
    title: "Resume Builder",
    description: "Learn to create a professional resume with step-by-step guidance and expert tips.",
    icon: FileText,
    level: "All Levels",
    players: 1500,
    color: "from-blue-400 to-blue-600",
    hasTimer: false
  },
  {
    id: 'sql',
    title: "SQL Adventure",
    description: "Learn database queries through engaging challenges. Ideal for aspiring data analysts.",
    icon: Database,
    level: "Intermediate",
    players: 850,
    color: "from-purple-400 to-purple-600",
    hasTimer: true
  },
  {
    id: 'webdev',
    title: "Web Dev Quest",
    description: "Create beautiful websites and learn responsive design principles through hands-on challenges.",
    icon: Globe,
    level: "Advanced",
    players: 650,
    color: "from-indigo-400 to-indigo-600",
    hasTimer: true
  }
];

export function GameGrid({ onSelectGame }) {
  return (
    <section className="py-16 bg-gray-50" id="games">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Popular Coding Games</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your challenge and start coding! Each game is designed to help you master different aspects of programming.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${game.color}`}>
                    <game.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    {game.hasTimer && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        1 min
                      </span>
                    )}
                    <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                      {game.level}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
                  {game.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {game.description}
                </p>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-500">{game.players} players</span>
                  </div>
                  <button
                    onClick={() => onSelectGame(game.id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors"
                  >
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}