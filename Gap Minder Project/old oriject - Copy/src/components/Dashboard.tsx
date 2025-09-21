import { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, TrendingUp, Award, BookOpen, Users, Briefcase, Star } from 'lucide-react';
import { NavigationHeader, QuickActions } from './NavigationHeader';
import type { UserProfile } from '../types';

interface DashboardProps {
  userProfile: UserProfile;
  onNavigate: (view: string) => void;
}

interface ScheduleItem {
  time: string;
  activity: string;
  type: 'class' | 'study' | 'break' | 'task';
}

interface CareerMilestone {
  title: string;
  progress: number;
  target: string;
  icon: React.ReactNode;
}

export function Dashboard({ userProfile, onNavigate }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todaySchedule, setTodaySchedule] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Generate today's schedule based on user profile
    generateDailySchedule();
  }, [userProfile]);

  const generateDailySchedule = () => {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = daysOfWeek[today];

    const schedule: ScheduleItem[] = [];

    // Add college classes from timetable
    const todayClasses = userProfile.timetable.find(day => day.day === todayName)?.classes || [];
    todayClasses.forEach(classItem => {
      schedule.push({
        time: classItem.time,
        activity: `${classItem.subject} Class`,
        type: 'class'
      });
    });

    // Add study slots and breaks
    schedule.push(
      { time: '09:00', activity: 'Morning Study Session', type: 'study' },
      { time: '11:00', activity: 'Break & Refresh', type: 'break' },
      { time: '14:00', activity: 'Skill Practice', type: 'task' },
      { time: '16:00', activity: 'Project Work', type: 'task' },
      { time: '18:00', activity: 'Evening Study', type: 'study' }
    );

    // Sort by time
    schedule.sort((a, b) => a.time.localeCompare(b.time));
    setTodaySchedule(schedule);
  };

  const getCurrentActivity = () => {
    const now = currentTime.toTimeString().slice(0, 5);
    const currentItem = todaySchedule.find(item => item.time <= now);
    return currentItem || { activity: 'Free Time', type: 'break' };
  };

  const currentActivity = getCurrentActivity();

  const careerMilestones: CareerMilestone[] = [
    {
      title: 'Technical Skills',
      progress: 75,
      target: 'Master 5 programming languages',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: 'Projects Completed',
      progress: 60,
      target: 'Build 10 portfolio projects',
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      title: 'Networking',
      progress: 40,
      target: 'Connect with 50 professionals',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Certifications',
      progress: 80,
      target: 'Earn 3 industry certifications',
      icon: <Award className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <NavigationHeader
        currentView="dashboard"
        onNavigate={onNavigate}
        onLogout={() => {}}
        userName={userProfile.name}
      />
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {userProfile.name}! 👋
              </h1>
              <p className="text-blue-100 text-lg mb-4">
                Ready to accelerate your career journey today?
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{userProfile.currentSkills?.length || 0}</div>
                  <div className="text-sm text-blue-100">Skills Learned</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Activity & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Activity Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Current Focus</h2>
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${
                    currentActivity.type === 'class' ? 'bg-red-500' :
                    currentActivity.type === 'study' ? 'bg-blue-500' :
                    currentActivity.type === 'task' ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                  <div>
                    <p className="text-lg font-medium text-gray-900">{currentActivity.activity}</p>
                    <p className="text-sm text-gray-600">{currentTime.toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>

              {/* Daily Progress */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Today's Progress</h2>
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Study Hours</span>
                    <span className="font-semibold text-green-600">2.5h / 4h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-2/4"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tasks Completed</span>
                    <span className="font-semibold text-blue-600">3 / 6</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Career Milestones */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Career Milestones</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {careerMilestones.map((milestone, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {milestone.icon}
                        <span className="font-medium text-gray-900">{milestone.title}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">{milestone.target}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
                <Calendar className="w-6 h-6 text-gray-500" />
              </div>
              <div className="space-y-3">
                {todaySchedule.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      item.type === 'class' ? 'bg-red-500' :
                      item.type === 'study' ? 'bg-blue-500' :
                      item.type === 'task' ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-600 w-16">{item.time}</span>
                    <span className="text-gray-900">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <QuickActions onNavigate={onNavigate} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievement Highlights */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Achievement Unlocked!</h2>
              </div>
              <p className="text-yellow-100 mb-3">5-Day Learning Streak</p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-white rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Skills Progress</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Projects Completed</span>
                  <span className="font-semibold text-green-600">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Study Hours (This Week)</span>
                  <span className="font-semibold text-blue-600">24.5h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-semibold text-orange-600">5 days</span>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <Bell className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Data Structures Quiz</p>
                    <p className="text-xs text-red-600">Tomorrow, 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Bell className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">React Project Due</p>
                    <p className="text-xs text-yellow-600">Friday, 11:59 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Hackathon Registration</p>
                    <p className="text-xs text-blue-600">Next Monday</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended for You</h2>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-700">Continue React Course</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Module 3: State Management</p>
                </button>
                <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700">Apply for Internship</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">TechCorp - Frontend Developer</p>
                </button>
                <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-700">Join Study Group</span>
                  </div>
                  <p className="text-xs text-purple-600 mt-1">Advanced JavaScript Study Circle</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}