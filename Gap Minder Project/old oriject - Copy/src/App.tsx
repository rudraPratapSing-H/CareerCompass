import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GameGrid } from './components/GameGrid';
import { Leaderboard } from './components/Leaderboard';
import { ChatBot } from './components/ChatBot';
import { JavaScriptPuzzle } from './components/challenges/JavaScriptPuzzle';
import { SQLChallenge } from './components/challenges/SQLChallenge';
import { WebDevQuest } from './components/challenges/WebDevQuest';
import { Onboarding } from './components/auth/Onboarding';
import { ModernDashboard } from './components/ModernDashboard';
import { QuizComponent } from './components/challenges/quiz/QuizComponent';
import { LearningHub } from './components/LearningHub';
import { Opportunities } from './components/Opportunities';
import { Community } from './components/Community';
import { Profile } from './components/Profile';
import { cQuiz } from './data/quizzes/cQuiz';
import { cppQuiz } from './data/quizzes/cppQuiz';
import { pythonQuiz } from './data/quizzes/pythonQuiz';
import type { UserProfile } from './types';


export function App() {
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'modules' | 'chat' | 'learning' | 'opportunities' | 'community' | 'profile'>('dashboard');

  if (!isLoggedIn) {
    return <Onboarding onComplete={(profile: UserProfile) => {
      setUserProfile(profile);
      setIsLoggedIn(true);
    }} />;
  }

  if (!userProfile) return null;

  // If we have a current challenge, show it
  if (currentChallenge) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onBack={() => setCurrentChallenge(null)} onLogout={() => setIsLoggedIn(false)} />
        {renderChallenge()}
      </div>
    );
  }

  // Main app views
  switch (currentView) {
    case 'dashboard':
      return (
        <ModernDashboard
          userProfile={userProfile}
          onNavigate={(view: string) => setCurrentView(view as 'dashboard' | 'modules' | 'chat' | 'learning' | 'opportunities' | 'community' | 'profile')}
        />
      );
    case 'learning':
      return (
        <LearningHub
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view as 'dashboard' | 'modules' | 'chat' | 'learning' | 'opportunities' | 'community' | 'profile')}
          onLogout={() => setIsLoggedIn(false)}
          userName={userProfile.name}
        />
      );
    case 'opportunities':
      return (
        <Opportunities
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view as 'dashboard' | 'modules' | 'chat' | 'learning' | 'opportunities' | 'community' | 'profile')}
          onLogout={() => setIsLoggedIn(false)}
          userName={userProfile.name}
        />
      );
    case 'community':
      return (
        <Community
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view as 'dashboard' | 'modules' | 'chat' | 'learning' | 'opportunities' | 'community' | 'profile')}
          onLogout={() => setIsLoggedIn(false)}
          userName={userProfile.name}
        />
      );
    case 'profile':
      return (
        <Profile
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view as 'dashboard' | 'modules' | 'chat' | 'learning' | 'opportunities' | 'community' | 'profile')}
          onLogout={() => setIsLoggedIn(false)}
          userName={userProfile.name}
        />
      );
    case 'modules':
      return (
        <div className="min-h-screen bg-gray-50">
          <Header 
            onBack={() => setCurrentView('dashboard')} 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={(view) => setCurrentView(view as 'dashboard' | 'modules' | 'chat' | 'learning' | 'opportunities' | 'community' | 'profile')}
            currentView="modules"
            showBackButton={false}
          />
          <Hero />
          <GameGrid onSelectGame={setCurrentChallenge} />
          <Leaderboard />
          <ChatBot userProfile={userProfile} onLaunchChallenge={setCurrentChallenge} />
        </div>
      );
    case 'chat':
      return (
        <div className="min-h-screen bg-gray-50">
          <Header 
            onBack={() => setCurrentView('dashboard')} 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={(view) => setCurrentView(view as 'dashboard' | 'modules' | 'chat' | 'learning' | 'opportunities' | 'community' | 'profile')}
            currentView="chat"
            showBackButton={false}
          />
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Mentor Chat</h2>
              <p className="text-gray-600 mb-8">Your personalized AI assistant is ready to help!</p>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
          <ChatBot userProfile={userProfile} onLaunchChallenge={setCurrentChallenge} />
        </div>
      );
    default:
      return (
        <ModernDashboard
          userProfile={userProfile}
          onNavigate={(view: string) => setCurrentView(view as 'dashboard' | 'modules' | 'chat' | 'learning' | 'opportunities' | 'community' | 'profile')}
        />
      );
  }

  function renderChallenge() {
    switch (currentChallenge) {
      case 'javascript':
        return <JavaScriptPuzzle />;
      case 'sql':
        return <SQLChallenge />;
      case 'webdev':
        return <WebDevQuest />;
      case 'c':
        return <QuizComponent quiz={cQuiz} onComplete={(score) => console.log('C Quiz Score:', score)} />;
      case 'cpp':
        return <QuizComponent quiz={cppQuiz} onComplete={(score) => console.log('C++ Quiz Score:', score)} />;
      case 'python':
        return <QuizComponent quiz={pythonQuiz} onComplete={(score) => console.log('Python Quiz Score:', score)} />;
      default:
        return (
          <>
            <Hero />
            <GameGrid onSelectGame={setCurrentChallenge} />
            <Leaderboard />
          </>
        );
    }
  }
}

export default App;