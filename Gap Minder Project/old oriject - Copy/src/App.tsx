import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GameGrid } from './components/GameGrid';
import { Leaderboard } from './components/Leaderboard';
import { ChatBot } from './components/ChatBot';
import { JavaScriptPuzzle } from './components/challenges/JavaScriptPuzzle';
import { SQLChallenge } from './components/challenges/SQLChallenge';
import { WebDevQuest } from './components/challenges/WebDevQuest';
import { LoginForm } from './components/auth/LoginForm';
import { QuizComponent } from './components/challenges/quiz/QuizComponent';
import { cQuiz } from './data/quizzes/cQuiz';
import { cppQuiz } from './data/quizzes/cppQuiz';
import { pythonQuiz } from './data/quizzes/pythonQuiz';


export function App() {
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderChallenge = () => {
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBack={() => setCurrentChallenge(null)} onLogout={() => setIsLoggedIn(false)} />
      {renderChallenge()}
      <ChatBot />
    </div>
  );
}

export default App;