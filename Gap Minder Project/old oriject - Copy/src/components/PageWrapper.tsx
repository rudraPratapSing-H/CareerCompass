import { NavigationHeader } from './NavigationHeader';

interface PageWrapperProps {
  title: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  userName?: string;
  children: React.ReactNode;
}

export function PageWrapper({ title, currentView, onNavigate, onLogout, userName, children }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader
        currentView={currentView}
        onNavigate={onNavigate}
        onLogout={onLogout}
        userName={userName}
      />
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">This feature is coming soon!</p>
        </div>
        {children}
      </div>
    </div>
  );
}