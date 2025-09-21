import { Code2, Trophy, User, LogOut, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onBack: () => void;
  onLogout: () => void;
}

export function Header({ onBack, onLogout }: HeaderProps) {
  return (
    <header className="bg-indigo-600 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Back Button with Padding */}
        <div className="flex items-center pl-4"> {/* Added padding-left */}
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-indigo-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Back</span>
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <Code2 className="w-8 h-8" />
          <span className="text-2xl font-bold">GapMinders</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <a
            href="#games"
            className="flex items-center space-x-2 hover:text-indigo-200 transition-colors"
          >
            <span className="font-medium">Games</span>
          </a>
          <a
            href="#leaderboard"
            className="flex items-center space-x-2 hover:text-indigo-200 transition-colors"
          >
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Leaderboard</span>
          </a>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-indigo-500 px-4 py-2 rounded-lg">
              <User className="w-5 h-5" />
              <span className="font-medium">Demo User</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 hover:text-indigo-200 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
