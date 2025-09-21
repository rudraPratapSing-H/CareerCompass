import React, { useState } from 'react';
import { BookOpen, Clock, Play, FileText, CheckCircle, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

const learningPreferences = [
  { id: 'videos', label: 'Video Tutorials', icon: Play },
  { id: 'articles', label: 'Articles & Blogs', icon: FileText },
  { id: 'quizzes', label: 'Interactive Quizzes', icon: CheckCircle },
  { id: 'projects', label: 'Hands-on Projects', icon: BookOpen }
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface Subject {
  name: string;
  credits: number;
}

interface Class {
  subject: string;
  time: string;
}

interface AcademicDetailsProps {
  onComplete: (data: {
    currentSubjects: Subject[];
    timetable: { day: string; classes: Class[] }[];
    learningPreferences: string[];
  }) => void;
  onBack: () => void;
}

export function AcademicDetails({ onComplete, onBack }: AcademicDetailsProps) {
  const [currentSubjects, setCurrentSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState({ name: '', credits: 0 });
  const [timetable, setTimetable] = useState<{ day: string; classes: Class[] }[]>(
    daysOfWeek.map(day => ({ day, classes: [] }))
  );
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const addSubject = () => {
    if (newSubject.name && newSubject.credits > 0) {
      setCurrentSubjects([...currentSubjects, newSubject]);
      setNewSubject({ name: '', credits: 0 });
    }
  };

  const removeSubject = (index: number) => {
    setCurrentSubjects(currentSubjects.filter((_, i) => i !== index));
  };

  const addClass = (dayIndex: number, subject: string, time: string) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[dayIndex].classes.push({ subject, time });
    setTimetable(updatedTimetable);
  };

  const removeClass = (dayIndex: number, classIndex: number) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[dayIndex].classes.splice(classIndex, 1);
    setTimetable(updatedTimetable);
  };

  const togglePreference = (preferenceId: string) => {
    if (selectedPreferences.includes(preferenceId)) {
      setSelectedPreferences(selectedPreferences.filter(p => p !== preferenceId));
    } else {
      setSelectedPreferences([...selectedPreferences, preferenceId]);
    }
  };

  const handleSubmit = () => {
    if (currentSubjects.length > 0 && selectedPreferences.length > 0) {
      onComplete({
        currentSubjects,
        timetable,
        learningPreferences: selectedPreferences
      });
    }
  };

  const isFormValid = currentSubjects.length > 0 && selectedPreferences.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-900 mb-4">
            Academic Details
          </h1>
          <p className="text-green-700">
            Help us understand your academic schedule and learning style
          </p>
        </div>

        {/* Current Subjects */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Current Subjects & Credits
          </h2>

          {/* Add Subject Form */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Subject name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Credits"
              min="1"
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={newSubject.credits || ''}
              onChange={(e) => setNewSubject({ ...newSubject, credits: parseInt(e.target.value) || 0 })}
            />
            <button
              onClick={addSubject}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* Subject List */}
          <div className="space-y-2">
            {currentSubjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                <span className="font-medium text-green-900">{subject.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-700">{subject.credits} credits</span>
                  <button
                    onClick={() => removeSubject(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timetable */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            College Timetable
          </h2>

          <div className="space-y-4">
            {timetable.map((daySchedule, dayIndex) => (
              <div key={daySchedule.day} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{daySchedule.day}</h3>

                {/* Add Class Form */}
                <div className="flex gap-2 mb-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>Select subject</option>
                    {currentSubjects.map((subject, idx) => (
                      <option key={idx} value={subject.name}>{subject.name}</option>
                    ))}
                  </select>
                  <input
                    type="time"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => {
                      const subjectSelect = document.querySelector(`select`) as HTMLSelectElement;
                      const timeInput = document.querySelector(`input[type="time"]`) as HTMLInputElement;
                      if (subjectSelect.value && timeInput.value) {
                        addClass(dayIndex, subjectSelect.value, timeInput.value);
                        subjectSelect.value = 'Select subject';
                        timeInput.value = '';
                      }
                    }}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Add Class
                  </button>
                </div>

                {/* Classes List */}
                <div className="space-y-2">
                  {daySchedule.classes.map((classItem, classIndex) => (
                    <div key={classIndex} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                      <span className="text-sm">{classItem.subject} at {classItem.time}</span>
                      <button
                        onClick={() => removeClass(dayIndex, classIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <h2 className="text-xl font-semibold text-green-900 mb-4">Learning Preferences</h2>
          <p className="text-green-700 mb-4">How do you prefer to learn new concepts?</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {learningPreferences.map((preference) => {
              const Icon = preference.icon;
              const isSelected = selectedPreferences.includes(preference.id);

              return (
                <button
                  key={preference.id}
                  onClick={() => togglePreference(preference.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <Icon className={`w-8 h-8 mb-2 ${isSelected ? 'text-green-600' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${isSelected ? 'text-green-900' : 'text-gray-700'}`}>
                      {preference.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              isFormValid
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Complete Setup
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}