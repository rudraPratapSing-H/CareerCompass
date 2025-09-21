import { useState, useEffect } from 'react';
import { PageWrapper } from './PageWrapper';
import { MapPin, Building, DollarSign, Clock, Users, Search, Star, ExternalLink, Calendar } from 'lucide-react';

interface OpportunitiesProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  userName?: string;
}

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  salary: string;
  description: string;
  skills: string[];
  postedDate: string;
  applicationDeadline: string;
  companyLogo?: string;
  latitude?: number;
  longitude?: number;
}

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  description: string;
  skills: string[];
  deadline: string;
}

const GOOGLE_API_KEY = 'AIzaSyB2tCiwdr83papZ3AG4W_WVGIaN989rMSo';

export function Opportunities({ currentView, onNavigate, onLogout, userName }: OpportunitiesProps) {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJobData();
  }, []);

  const loadJobData = async () => {
    setLoading(true);
    try {
      // Mock job data with location coordinates for Google Maps integration
      const mockJobs: JobPosting[] = [
        {
          id: '1',
          title: 'Frontend Developer',
          company: 'TechCorp Solutions',
          location: 'Mumbai, Maharashtra',
          type: 'Full-time',
          salary: '₹8-12 LPA',
          description: 'Build modern web applications using React, TypeScript, and modern frontend technologies.',
          skills: ['React', 'TypeScript', 'JavaScript', 'CSS'],
          postedDate: '2024-01-15',
          applicationDeadline: '2024-02-15',
          latitude: 19.0760,
          longitude: 72.8777
        },
        {
          id: '2',
          title: 'Python Developer',
          company: 'DataTech Innovations',
          location: 'Bangalore, Karnataka',
          type: 'Full-time',
          salary: '₹10-15 LPA',
          description: 'Develop backend services and data processing pipelines using Python and cloud technologies.',
          skills: ['Python', 'Django', 'AWS', 'PostgreSQL'],
          postedDate: '2024-01-12',
          applicationDeadline: '2024-02-12',
          latitude: 12.9716,
          longitude: 77.5946
        },
        {
          id: '3',
          title: 'UI/UX Designer',
          company: 'Creative Studios',
          location: 'Delhi, NCR',
          type: 'Full-time',
          salary: '₹6-10 LPA',
          description: 'Design user interfaces and experiences for web and mobile applications.',
          skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
          postedDate: '2024-01-10',
          applicationDeadline: '2024-02-10',
          latitude: 28.7041,
          longitude: 77.1025
        }
      ];

      const mockInternships: Internship[] = [
        {
          id: '1',
          title: 'Software Development Intern',
          company: 'Google India',
          location: 'Bangalore, Karnataka',
          duration: '6 months',
          stipend: '₹50,000/month',
          description: 'Work on real projects with Google\'s engineering team and learn from industry experts.',
          skills: ['JavaScript', 'Python', 'Git', 'Problem Solving'],
          deadline: '2024-02-28'
        },
        {
          id: '2',
          title: 'Data Science Intern',
          company: 'Microsoft India',
          location: 'Hyderabad, Telangana',
          duration: '3 months',
          stipend: '₹45,000/month',
          description: 'Analyze data and build machine learning models for Microsoft products.',
          skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
          deadline: '2024-02-20'
        }
      ];

      // Try to get location data from Google Maps API
      for (const job of mockJobs) {
        try {
          const geocodeResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(job.location)}&key=${GOOGLE_API_KEY}`
          );

          if (geocodeResponse.ok) {
            const geocodeData = await geocodeResponse.json();
            if (geocodeData.results && geocodeData.results[0]) {
              const location = geocodeData.results[0].geometry.location;
              job.latitude = location.lat;
              job.longitude = location.lng;
            }
          }
        } catch (error) {
          console.error('Geocoding error for job:', job.id, error);
        }
      }

      setJobs(mockJobs);
      setInternships(mockInternships);
    } catch (error) {
      console.error('Error loading job data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = typeFilter === 'all' || job.type === typeFilter;

    return matchesSearch && matchesLocation && matchesType;
  });

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = !locationFilter || internship.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  return (
    <PageWrapper
      title="Career Opportunities"
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
      userName={userName}
    >
      <div className="space-y-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
                />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Board */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Job Opportunities</h2>
            <Building className="w-6 h-6 text-blue-500" />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Building className="w-4 h-4 mr-2" />
                        <span className="font-medium">{job.company}</span>
                        <span className="mx-2">•</span>
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
                          job.type === 'Internship' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {job.type}
                        </span>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-2">Deadline</div>
                      <div className="text-sm font-medium text-red-600">
                        {new Date(job.applicationDeadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </button>

                    {job.latitude && job.longitude && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${job.latitude},${job.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        View Location
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Internship Opportunities */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Internship Programs</h2>
            <Users className="w-6 h-6 text-green-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredInternships.map((internship) => (
              <div key={internship.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{internship.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Building className="w-4 h-4 mr-2" />
                      <span>{internship.company}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{internship.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Deadline</div>
                    <div className="text-sm font-medium text-red-600">
                      {new Date(internship.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {internship.duration}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {internship.stipend}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{internship.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {internship.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Apply for Internship
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Career Resources */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Career Resources</h2>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
              <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Resume Builder</h3>
              <p className="text-gray-600 text-sm mb-4">Create professional resumes with AI assistance</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Build Resume
              </button>
            </div>

            <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
              <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Mock Interviews</h3>
              <p className="text-gray-600 text-sm mb-4">Practice interviews with AI-powered feedback</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Start Practice
              </button>
            </div>

            <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
              <Star className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Career Counseling</h3>
              <p className="text-gray-600 text-sm mb-4">Get personalized career guidance</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Get Advice
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}