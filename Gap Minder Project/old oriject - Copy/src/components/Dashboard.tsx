import { useState, useEffect } from 'react';
import { Calendar, Clock, Target, Bell, BookOpen, Play, Users } from 'lucide-react';
import type { UserProfile } from '../types';

interface DashboardProps {
  userProfile: UserProfile;
  onNavigateToChat: () => void;
  onNavigateToModules: () => void;
}

interface ScheduleItem {
  time: string;
  activity: string;
  type: 'class' | 'study' | 'break' | 'task';
}

export function Dashboard({ userProfile, onNavigateToChat, onNavigateToModules }: DashboardProps) {
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userProfile.name}!
          </h1>
          <p className="text-gray-600">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Activity Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Current Activity</h2>
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

            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
                <Calendar className="w-6 h-6 text-gray-500" />
              </div>
              <div className="space-y-3">
                {todaySchedule.map((item, index) => (
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
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={onNavigateToChat}
                  className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Users className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-blue-900">AI Mentor</span>
                </button>
                <button
                  onClick={onNavigateToModules}
                  className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <BookOpen className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-green-900">Modules</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Play className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-purple-900">Videos</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <Target className="w-8 h-8 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-orange-900">Tasks</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-semibold text-green-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Study Hours</span>
                  <span className="font-semibold text-blue-600">8.5h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-semibold text-orange-600">5 days</span>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Bell className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Data Structures Quiz</p>
                    <p className="text-xs text-gray-600">Tomorrow, 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Bell className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">React Project Due</p>
                    <p className="text-xs text-gray-600">Friday, 11:59 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Bell className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Hackathon Registration</p>
                    <p className="text-xs text-gray-600">Next Monday</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Goals</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Master React Hooks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-700">Complete Python Course</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-700">Build Portfolio Project</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}