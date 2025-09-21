import { Code2, User, LogOut, ArrowLeft, Home, BookOpen, MessageSquare } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
  onLogout: () => void;
  onNavigate?: (view: 'dashboard' | 'modules' | 'chat') => void;
  currentView?: 'dashboard' | 'modules' | 'chat';
  showBackButton?: boolean;
}

export function Header({ onBack, onLogout, onNavigate, currentView, showBackButton = true }: HeaderProps) {
  return (
    <header className="bg-indigo-600 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Back Button */}
        <div className="flex items-center">
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-white hover:text-indigo-200 transition-colors mr-4"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-medium">Back</span>
            </button>
          )}
        </div>

        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <Code2 className="w-8 h-8" />
          <span className="text-2xl font-bold">CareerCompass</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          {onNavigate && (
            <>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center space-x-2 transition-colors ${
                  currentView === 'dashboard' ? 'text-white font-bold' : 'hover:text-indigo-200'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </button>
              <button
                onClick={() => onNavigate('modules')}
                className={`flex items-center space-x-2 transition-colors ${
                  currentView === 'modules' ? 'text-white font-bold' : 'hover:text-indigo-200'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Modules</span>
              </button>
              <button
                onClick={() => onNavigate('chat')}
                className={`flex items-center space-x-2 transition-colors ${
                  currentView === 'chat' ? 'text-white font-bold' : 'hover:text-indigo-200'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">AI Mentor</span>
              </button>
            </>
          )}
          <div className="flex items-center space-x-4 ml-4">
            <div className="flex items-center space-x-2 bg-indigo-500 px-4 py-2 rounded-lg">
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
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
