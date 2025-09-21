import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Bell, 
  Award, 
  Users, 
  Briefcase, 
  Star,
  ArrowRight,
  Target,
  Code,
  Trophy,
  Zap,
  BarChart3,
  Play,
  MessageSquare
} from 'lucide-react';
import { NavigationHeader } from './NavigationHeader';
import type { UserProfile } from '../types';

interface ModernDashboardProps {
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
  color: string;
}

export function ModernDashboard({ userProfile, onNavigate }: ModernDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todaySchedule, setTodaySchedule] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    generateDailySchedule();
  }, [userProfile]);

  const generateDailySchedule = () => {
    const today = new Date().getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = daysOfWeek[today];

    const schedule: ScheduleItem[] = [];
    const todayClasses = userProfile.timetable.find(day => day.day === todayName)?.classes || [];
    
    todayClasses.forEach(classItem => {
      schedule.push({
        time: classItem.time,
        activity: `${classItem.subject} Class`,
        type: 'class'
      });
    });

    schedule.push(
      { time: '09:00', activity: 'Morning Focus Session', type: 'study' },
      { time: '11:00', activity: 'Skill Practice', type: 'task' },
      { time: '14:00', activity: 'Project Work', type: 'task' },
      { time: '16:00', activity: 'Community Learning', type: 'study' },
      { time: '18:00', activity: 'Career Planning', type: 'task' }
    );

    schedule.sort((a, b) => a.time.localeCompare(b.time));
    setTodaySchedule(schedule);
  };

  const careerMilestones: CareerMilestone[] = [
    {
      title: 'Technical Mastery',
      progress: 78,
      target: 'Expert level in chosen domain',
      icon: <Code className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Project Portfolio',
      progress: 65,
      target: '10 impressive projects',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Industry Network',
      progress: 42,
      target: '100+ professional connections',
      icon: <Users className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Certifications',
      progress: 85,
      target: '5 industry-recognized certs',
      icon: <Award className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume your React masterclass',
      icon: <Play className="w-6 h-6" />,
      action: () => onNavigate('learning'),
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      progress: 67
    },
    {
      title: 'Practice Coding',
      description: 'Solve daily challenges',
      icon: <Code className="w-6 h-6" />,
      action: () => onNavigate('modules'),
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      badge: '3 new'
    },
    {
      title: 'Find Opportunities',
      description: 'Explore jobs & internships',
      icon: <Briefcase className="w-6 h-6" />,
      action: () => onNavigate('opportunities'),
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      badge: '12 new jobs'
    },
    {
      title: 'AI Career Mentor',
      description: 'Get personalized guidance',
      icon: <MessageSquare className="w-6 h-6" />,
      action: () => onNavigate('chat'),
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      isNew: true
    }
  ];

  const achievements = [
    { title: '7-Day Streak', description: 'Consistent learning', icon: <Zap className="w-5 h-5" />, color: 'text-yellow-500' },
    { title: 'Fast Learner', description: 'Completed 5 modules', icon: <Trophy className="w-5 h-5" />, color: 'text-blue-500' },
    { title: 'Team Player', description: 'Active in community', icon: <Users className="w-5 h-5" />, color: 'text-green-500' },
  ];

  const upcomingDeadlines = [
    { task: 'React Project Submission', due: 'Tomorrow, 11:59 PM', priority: 'high' },
    { task: 'JavaScript Assessment', due: 'This Friday, 2:00 PM', priority: 'medium' },
    { task: 'Portfolio Review', due: 'Next Monday', priority: 'low' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavigationHeader
        currentView="dashboard"
        onNavigate={onNavigate}
        onLogout={() => {}}
        userName={userProfile.name}
      />

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold">
                    Welcome back, {userProfile.name}! 🚀
                  </h1>
                  <p className="text-indigo-100 text-lg">
                    Ready to accelerate your career journey?
                  </p>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {currentTime.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{currentTime.toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">{userProfile.currentSkills?.length || 0}</div>
                    <div className="text-xs text-indigo-100">Skills Mastered</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-xs text-indigo-100">Hours This Week</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">87%</div>
                    <div className="text-xs text-indigo-100">Career Progress</div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <BarChart3 className="w-16 h-16 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={action.action}
              className="relative group cursor-pointer"
            >
              <div className={`${action.color} rounded-2xl p-6 text-white transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}>
                {action.isNew && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
                {action.badge && (
                  <div className="absolute -top-2 -right-2 bg-white text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                    {action.badge}
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  {action.icon}
                  <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                <p className="text-white/80 text-sm mb-3">{action.description}</p>
                
                {action.progress && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{action.progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <div 
                        className="bg-white h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${action.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Career Milestones */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Career Journey</h2>
                <Target className="w-6 h-6 text-gray-500" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {careerMilestones.map((milestone, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${milestone.color} text-white`}>
                        {milestone.icon}
                      </div>
                      <span className="text-2xl font-bold text-gray-600">{milestone.progress}%</span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{milestone.target}</p>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${milestone.color} transition-all duration-500`}
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Today's Focus</h2>
                <Calendar className="w-6 h-6 text-gray-500" />
              </div>
              
              <div className="space-y-4">
                {todaySchedule.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className={`w-4 h-4 rounded-full ${
                      item.type === 'class' ? 'bg-red-500' :
                      item.type === 'study' ? 'bg-blue-500' :
                      item.type === 'task' ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-600 w-16">{item.time}</span>
                    <span className="text-gray-900 font-medium flex-1">{item.activity}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Star className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold text-gray-900">Recent Achievements</h2>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`${achievement.color}`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{achievement.title}</p>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Bell className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-bold text-gray-900">Upcoming Deadlines</h2>
              </div>
              
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    deadline.priority === 'high' ? 'border-red-500 bg-red-50' :
                    deadline.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <p className="font-medium text-gray-900">{deadline.task}</p>
                    <p className={`text-sm ${
                      deadline.priority === 'high' ? 'text-red-600' :
                      deadline.priority === 'medium' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`}>
                      {deadline.due}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Streak */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-6 h-6" />
                <h2 className="text-xl font-bold">Learning Streak</h2>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">7</div>
                <p className="text-yellow-100 mb-4">Days in a row!</p>
                <div className="flex justify-center space-x-1">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-white rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}