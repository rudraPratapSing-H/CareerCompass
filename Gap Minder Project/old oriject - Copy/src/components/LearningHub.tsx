import { useState, useEffect } from 'react';
import { PageWrapper } from './PageWrapper';
import { Play, BookOpen, Code, Search, Star, Clock, Users } from 'lucide-react';

interface LearningHubProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  userName?: string;
}

interface VideoTutorial {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  videoUrl: string;
  viewCount: string;
  duration: string;
  publishedAt: string;
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: number;
  rating: number;
  skills: string[];
}

const GOOGLE_API_KEY = 'AIzaSyB2tCiwdr83papZ3AG4W_WVGIaN989rMSo';

export function LearningHub({ currentView, onNavigate, onLogout, userName }: LearningHubProps) {
  const [videos, setVideos] = useState<VideoTutorial[]>([]);
  const [modules] = useState<LearningModule[]>([
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Master the basics of JavaScript programming',
      difficulty: 'Beginner',
      duration: '4 weeks',
      students: 1250,
      rating: 4.8,
      skills: ['JavaScript', 'ES6', 'DOM']
    },
    {
      id: '2',
      title: 'React Development',
      description: 'Build modern web applications with React',
      difficulty: 'Intermediate',
      duration: '6 weeks',
      students: 890,
      rating: 4.9,
      skills: ['React', 'Hooks', 'Redux']
    },
    {
      id: '3',
      title: 'Python Data Science',
      description: 'Learn data analysis and machine learning',
      difficulty: 'Intermediate',
      duration: '8 weeks',
      students: 650,
      rating: 4.7,
      skills: ['Python', 'Pandas', 'NumPy']
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecommendedVideos();
  }, []);

  const loadRecommendedVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=programming+tutorial+beginners&type=video&maxResults=12&key=${GOOGLE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('YouTube API request failed');
      }

      const data = await response.json();

      const videoData: VideoTutorial[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails.medium.url,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        viewCount: 'N/A',
        duration: 'N/A',
        publishedAt: item.snippet.publishedAt
      }));

      setVideos(videoData);
    } catch (error) {
      console.error('Error loading videos:', error);
      // Fallback videos
      setVideos([
        {
          id: '1',
          title: 'JavaScript Tutorial for Beginners',
          channelTitle: 'freeCodeCamp',
          thumbnailUrl: 'https://img.youtube.com/vi/W6NZfCO5SIk/mqdefault.jpg',
          videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
          viewCount: '10M+',
          duration: '3:26:00',
          publishedAt: '2021-01-01'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const searchVideos = async (query: string) => {
    if (!query.trim()) {
      loadRecommendedVideos();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' programming tutorial')}&type=video&maxResults=12&key=${GOOGLE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('YouTube API request failed');
      }

      const data = await response.json();

      const videoData: VideoTutorial[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails.medium.url,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        viewCount: 'N/A',
        duration: 'N/A',
        publishedAt: item.snippet.publishedAt
      }));

      setVideos(videoData);
    } catch (error) {
      console.error('Error searching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.channelTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper
      title="Learning Hub"
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
      userName={userName}
    >
      <div className="space-y-8">
        {/* Interactive Modules Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Interactive Learning Modules</h2>
            <BookOpen className="w-6 h-6 text-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div key={module.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {module.difficulty}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{module.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{module.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {module.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {module.students}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {module.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Module
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Video Library Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Video Library</h2>
            <Play className="w-6 h-6 text-red-500" />
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value.length > 2) {
                    searchVideos(e.target.value);
                  }
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Skills</option>
              <option value="javascript">JavaScript</option>
              <option value="react">React</option>
              <option value="python">Python</option>
              <option value="sql">SQL</option>
            </select>
          </div>

          {/* Video Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <div key={video.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200 relative">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/320x180?text=Video+Thumbnail';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-xs mb-2">{video.channelTitle}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{video.viewCount} views</span>
                      <span>{video.duration}</span>
                    </div>

                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-center block text-sm"
                    >
                      Watch Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Practice Challenges Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Practice Challenges</h2>
            <Code className="w-6 h-6 text-purple-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
              <Code className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">JavaScript Challenges</h3>
              <p className="text-gray-600 text-sm mb-4">Test your JavaScript skills</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Start Challenge
              </button>
            </div>

            <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors cursor-pointer">
              <Code className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">SQL Challenges</h3>
              <p className="text-gray-600 text-sm mb-4">Practice database queries</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Start Challenge
              </button>
            </div>

            <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition-colors cursor-pointer">
              <Code className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Web Development</h3>
              <p className="text-gray-600 text-sm mb-4">Build complete web apps</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Start Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}