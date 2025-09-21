import { useState } from 'react';
import { PageWrapper } from './PageWrapper';
import { User, Mail, Phone, MapPin, Calendar, Award, BookOpen, Briefcase, Upload, Download, Edit, FileText, Star, TrendingUp } from 'lucide-react';

interface ProfileProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  userName?: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  experience: string;
  education: string;
  linkedin: string;
  github: string;
  portfolio: string;
  resumeUrl?: string;
  profilePicture?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'course' | 'project' | 'certification' | 'milestone';
}

interface LearningProgress {
  completedModules: number;
  totalModules: number;
  skillsAcquired: number;
  hoursLearned: number;
  currentStreak: number;
  longestStreak: number;
}

export function Profile({ currentView, onNavigate, onLogout, userName }: ProfileProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: userName || 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    bio: 'Passionate software developer with 2+ years of experience in full-stack development.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    experience: '2 years',
    education: 'Bachelor of Technology in Computer Science',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    portfolio: 'https://johndoe.dev'
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'JavaScript Fundamentals Completed',
      description: 'Successfully completed the JavaScript fundamentals course',
      date: '2024-01-15',
      type: 'course'
    },
    {
      id: '2',
      title: 'First Project Deployed',
      description: 'Deployed your first full-stack application',
      date: '2024-01-10',
      type: 'project'
    },
    {
      id: '3',
      title: 'React Certification',
      description: 'Earned React Developer certification',
      date: '2024-01-05',
      type: 'certification'
    }
  ]);

  const [learningProgress] = useState<LearningProgress>({
    completedModules: 12,
    totalModules: 50,
    skillsAcquired: 8,
    hoursLearned: 45,
    currentStreak: 7,
    longestStreak: 14
  });

  const [isEditing, setIsEditing] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingResume(true);
    try {
      // In a real implementation, you would upload to Google Drive
      // For now, we'll simulate the upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock Google Drive URL
      const mockDriveUrl = `https://drive.google.com/file/d/mock-file-id/view?usp=sharing`;

      setProfile(prev => ({
        ...prev,
        resumeUrl: mockDriveUrl
      }));

      alert('Resume uploaded successfully to Google Drive!');
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume. Please try again.');
    } finally {
      setUploadingResume(false);
    }
  };

  const saveProfile = () => {
    // In a real app, this would save to a backend
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <PageWrapper
      title="My Profile"
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
      userName={userName}
    >
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                <button
                  onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
              <p className="text-gray-600 mb-4">{profile.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {profile.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {profile.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {profile.phone}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Resume & Documents</h2>
            <FileText className="w-6 h-6 text-blue-500" />
          </div>

          <div className="space-y-4">
            {profile.resumeUrl ? (
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">Resume.pdf</p>
                    <p className="text-sm text-gray-500">Stored on Google Drive</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 p-2"
                    title="View resume"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => document.getElementById('resume-upload')?.click()}
                    className="text-green-600 hover:text-green-800 p-2"
                    title="Update resume"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No resume uploaded yet</p>
                <button
                  onClick={() => document.getElementById('resume-upload')?.click()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Resume to Google Drive
                </button>
              </div>
            )}

            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="hidden"
            />

            {uploadingResume && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 mt-2">Uploading to Google Drive...</p>
              </div>
            )}
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Learning Progress</h2>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {learningProgress.completedModules}/{learningProgress.totalModules}
              </div>
              <div className="text-gray-600">Modules Completed</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(learningProgress.completedModules / learningProgress.totalModules) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{learningProgress.skillsAcquired}</div>
              <div className="text-gray-600">Skills Acquired</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{learningProgress.hoursLearned}h</div>
              <div className="text-gray-600">Hours Learned</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-600">{learningProgress.currentStreak}</div>
                  <div className="text-orange-800">Current Streak</div>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{learningProgress.longestStreak}</div>
                  <div className="text-blue-800">Longest Streak</div>
                </div>
                <Star className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
              <Award className="w-6 h-6 text-yellow-500" />
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Experience & Education</h2>
              <Briefcase className="w-6 h-6 text-green-500" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Experience</h3>
                <p className="text-gray-600">{profile.experience}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Education</h3>
                <p className="text-gray-600">{profile.education}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
            <Award className="w-6 h-6 text-yellow-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    achievement.type === 'course' ? 'bg-blue-100' :
                    achievement.type === 'project' ? 'bg-green-100' :
                    achievement.type === 'certification' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    {achievement.type === 'course' && <BookOpen className="w-5 h-5 text-blue-600" />}
                    {achievement.type === 'project' && <Briefcase className="w-5 h-5 text-green-600" />}
                    {achievement.type === 'certification' && <Award className="w-5 h-5 text-purple-600" />}
                    {achievement.type === 'milestone' && <Star className="w-5 h-5 text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Connect With Me</h2>
            <User className="w-6 h-6 text-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Li</span>
                </div>
                <span className="text-gray-700">LinkedIn Profile</span>
              </a>
            )}

            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-800 rounded mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Gh</span>
                </div>
                <span className="text-gray-700">GitHub Profile</span>
              </a>
            )}

            {profile.portfolio && (
              <a
                href={profile.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-green-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-gray-700">Portfolio Website</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}