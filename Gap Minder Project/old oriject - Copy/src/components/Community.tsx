import { useState, useEffect } from 'react';
import { PageWrapper } from './PageWrapper';
import { MessageSquare, Users, MapPin, Calendar, Clock, Search, Plus } from 'lucide-react';

interface CommunityProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  userName?: string;
}

interface DiscussionForum {
  id: string;
  title: string;
  description: string;
  category: string;
  posts: number;
  lastActivity: string;
  participants: number;
}

interface StudyGroup {
  id: string;
  name: string;
  topic: string;
  location: string;
  schedule: string;
  members: number;
  maxMembers: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  latitude?: number;
  longitude?: number;
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'Workshop' | 'Hackathon' | 'Meetup' | 'Webinar';
  attendees: number;
  maxAttendees: number;
}

const GOOGLE_API_KEY = 'AIzaSyB2tCiwdr83papZ3AG4W_WVGIaN989rMSo';

export function Community({ currentView, onNavigate, onLogout, userName }: CommunityProps) {
  const [forums, setForums] = useState<DiscussionForum[]>([]);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadCommunityData();
  }, []);

  const loadCommunityData = async () => {
    try {
      // Mock community data
      const mockForums: DiscussionForum[] = [
        {
          id: '1',
          title: 'JavaScript Best Practices',
          description: 'Discuss modern JavaScript development techniques and best practices',
          category: 'Programming',
          posts: 245,
          lastActivity: '2024-01-15T10:30:00Z',
          participants: 89
        },
        {
          id: '2',
          title: 'Career Advice for Developers',
          description: 'Share experiences and get advice on career growth in tech',
          category: 'Career',
          posts: 156,
          lastActivity: '2024-01-14T15:45:00Z',
          participants: 67
        },
        {
          id: '3',
          title: 'React vs Vue.js',
          description: 'Compare different frontend frameworks and their use cases',
          category: 'Frameworks',
          posts: 98,
          lastActivity: '2024-01-13T09:20:00Z',
          participants: 45
        }
      ];

      const mockStudyGroups: StudyGroup[] = [
        {
          id: '1',
          name: 'Advanced React Study Circle',
          topic: 'React Hooks & Advanced Patterns',
          location: 'Mumbai, Maharashtra',
          schedule: 'Every Saturday, 10:00 AM - 12:00 PM',
          members: 12,
          maxMembers: 15,
          skillLevel: 'Intermediate',
          latitude: 19.0760,
          longitude: 72.8777
        },
        {
          id: '2',
          name: 'Python Data Science Group',
          topic: 'Machine Learning with Python',
          location: 'Bangalore, Karnataka',
          schedule: 'Every Wednesday, 7:00 PM - 9:00 PM',
          members: 8,
          maxMembers: 12,
          skillLevel: 'Intermediate',
          latitude: 12.9716,
          longitude: 77.5946
        },
        {
          id: '3',
          name: 'Web Development Beginners',
          topic: 'HTML, CSS, JavaScript Basics',
          location: 'Delhi, NCR',
          schedule: 'Every Sunday, 2:00 PM - 4:00 PM',
          members: 15,
          maxMembers: 20,
          skillLevel: 'Beginner',
          latitude: 28.7041,
          longitude: 77.1025
        }
      ];

      const mockEvents: CommunityEvent[] = [
        {
          id: '1',
          title: 'React Workshop: Building Modern UIs',
          description: 'Hands-on workshop on React 18 features and best practices',
          date: '2024-02-20',
          time: '10:00 AM - 4:00 PM',
          location: 'TechHub Mumbai',
          type: 'Workshop',
          attendees: 45,
          maxAttendees: 50
        },
        {
          id: '2',
          title: '24-Hour Hackathon',
          description: 'Build innovative solutions for real-world problems',
          date: '2024-02-25',
          time: '9:00 AM - 9:00 AM (next day)',
          location: 'Innovation Center Bangalore',
          type: 'Hackathon',
          attendees: 120,
          maxAttendees: 150
        },
        {
          id: '3',
          title: 'Tech Meetup: AI & Machine Learning',
          description: 'Network with AI enthusiasts and learn about latest trends',
          date: '2024-02-15',
          time: '6:00 PM - 8:00 PM',
          location: 'CoWorking Space Delhi',
          type: 'Meetup',
          attendees: 35,
          maxAttendees: 40
        }
      ];

      // Add geocoding for study groups
      for (const group of mockStudyGroups) {
        try {
          const geocodeResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(group.location)}&key=${GOOGLE_API_KEY}`
          );

          if (geocodeResponse.ok) {
            const geocodeData = await geocodeResponse.json();
            if (geocodeData.results && geocodeData.results[0]) {
              const location = geocodeData.results[0].geometry.location;
              group.latitude = location.lat;
              group.longitude = location.lng;
            }
          }
        } catch (error) {
          console.error('Geocoding error for study group:', group.id, error);
        }
      }

      setForums(mockForums);
      setStudyGroups(mockStudyGroups);
      setEvents(mockEvents);
    } catch (error) {
      console.error('Error loading community data:', error);
    }
  };

  const filteredForums = forums.filter(forum => {
    const matchesSearch = forum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         forum.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || forum.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredStudyGroups = studyGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.topic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <PageWrapper
      title="Community"
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
      userName={userName}
    >
      <div className="space-y-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search discussions, groups, or events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Programming">Programming</option>
              <option value="Career">Career</option>
              <option value="Frameworks">Frameworks</option>
            </select>
          </div>
        </div>

        {/* Discussion Forums */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Discussion Forums</h2>
            <MessageSquare className="w-6 h-6 text-blue-500" />
          </div>

          <div className="space-y-4">
            {filteredForums.map((forum) => (
              <div key={forum.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{forum.title}</h3>
                    <p className="text-gray-600 mb-3">{forum.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        forum.category === 'Programming' ? 'bg-blue-100 text-blue-800' :
                        forum.category === 'Career' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {forum.category}
                      </span>
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {forum.posts} posts
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {forum.participants} participants
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(forum.lastActivity).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Join Discussion
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Groups */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Study Groups</h2>
            <Users className="w-6 h-6 text-green-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudyGroups.map((group) => (
              <div key={group.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{group.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{group.topic}</p>

                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{group.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{group.schedule}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{group.members}/{group.maxMembers} members</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        group.skillLevel === 'Beginner' ? 'bg-green-100 text-green-800' :
                        group.skillLevel === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {group.skillLevel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1 mr-2">
                    Join Group
                  </button>

                  {group.latitude && group.longitude && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${group.latitude},${group.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 p-2"
                      title="View location"
                    >
                      <MapPin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto">
              <Plus className="w-5 h-5 mr-2" />
              Create New Study Group
            </button>
          </div>
        </div>

        {/* Community Events */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
            <Calendar className="w-6 h-6 text-purple-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{event.description}</p>

                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{event.attendees}/{event.maxAttendees} attending</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.type === 'Workshop' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'Hackathon' ? 'bg-purple-100 text-purple-800' :
                        event.type === 'Meetup' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Register for Event
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Community Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2,450+</div>
              <div className="text-blue-100">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1,200+</div>
              <div className="text-blue-100">Study Groups</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">350+</div>
              <div className="text-blue-100">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">15,000+</div>
              <div className="text-blue-100">Success Stories</div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}