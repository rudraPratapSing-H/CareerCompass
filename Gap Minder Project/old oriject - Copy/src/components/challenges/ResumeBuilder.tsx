import { useState } from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';

interface Section {
  id: string;
  title: string;
  fields: string[];
}

type FormData = Record<string, Record<string, string>>;

const sections: Section[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    fields: ['Full Name', 'Email', 'Phone', 'Location', 'LinkedIn', 'GitHub'],
  },
  {
    id: 'education',
    title: 'Education',
    fields: ['Degree', 'Institution', 'Year', 'GPA'],
  },
  {
    id: 'experience',
    title: 'Work Experience',
    fields: ['Company', 'Position', 'Duration', 'Responsibilities'],
  },
  {
    id: 'skills',
    title: 'Skills',
    fields: ['Technical Skills', 'Soft Skills', 'Tools & Technologies'],
  },
];

const templates = [
  { id: 'template1', name: 'Classic Professional' },
  { id: 'template2', name: 'Modern Creative' },
];

export function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [formData, setFormData] = useState<FormData>({});
  const [tips, setTips] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('template1');

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value,
      },
    }));

    // Show contextual tips
    const tipsByField: Record<string, string> = {
      'Full Name': 'Use your professional name as it appears on official documents.',
      'Email': 'Use a professional email address, preferably not a nickname.',
      'Technical Skills': 'List relevant skills for the job you\'re applying for.',
      'Responsibilities': 'Use action verbs and quantify achievements where possible.',
    };

    setTips(tipsByField[field] || '');
  };

  const validateForm = () => {
    for (const section of sections) {
      for (const field of section.fields) {
        if (!formData[section.id]?.[field]) {
          return false; // If any field is missing, validation fails
        }
      }
    }
    return true; // All fields are filled
  };

  const generateResume = () => {
    if (!validateForm()) {
      alert('Please complete all fields before downloading your resume.');
      return;
    }

    const doc = new jsPDF();

    // Personal Info
    const personalInfo = formData['personal'] || {};
    if (selectedTemplate === 'template1') {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(16);
      doc.text('Resume', 20, 20);

      doc.setFontSize(14);
      doc.text(`Full Name: ${personalInfo['Full Name'] || ''}`, 20, 30);
      doc.text(`Email: ${personalInfo['Email'] || ''}`, 20, 35);
      doc.text(`Phone: ${personalInfo['Phone'] || ''}`, 20, 40);
      doc.text(`Location: ${personalInfo['Location'] || ''}`, 20, 45);
      doc.text(`LinkedIn: ${personalInfo['LinkedIn'] || ''}`, 20, 50);
      doc.text(`GitHub: ${personalInfo['GitHub'] || ''}`, 20, 55);

      // Education Section
      const education = formData['education'] || {};
      doc.setFontSize(14);
      doc.text('Education', 20, 70);
      doc.setFontSize(12);
      doc.text(`Degree: ${education['Degree'] || ''}`, 20, 80);
      doc.text(`Institution: ${education['Institution'] || ''}`, 20, 85);
      doc.text(`Year: ${education['Year'] || ''}`, 20, 90);
      doc.text(`GPA: ${education['GPA'] || ''}`, 20, 95);

      // Experience Section
      const experience = formData['experience'] || {};
      doc.setFontSize(14);
      doc.text('Work Experience', 20, 110);
      doc.setFontSize(12);
      doc.text(`Company: ${experience['Company'] || ''}`, 20, 120);
      doc.text(`Position: ${experience['Position'] || ''}`, 20, 125);
      doc.text(`Duration: ${experience['Duration'] || ''}`, 20, 130);
      doc.text(`Responsibilities: ${experience['Responsibilities'] || ''}`, 20, 135);

      // Skills Section
      const skills = formData['skills'] || {};
      doc.setFontSize(14);
      doc.text('Skills', 20, 150);
      doc.setFontSize(12);
      doc.text(`Technical Skills: ${skills['Technical Skills'] || ''}`, 20, 160);
      doc.text(`Soft Skills: ${skills['Soft Skills'] || ''}`, 20, 165);
      doc.text(`Tools & Technologies: ${skills['Tools & Technologies'] || ''}`, 20, 170);

    } else if (selectedTemplate === 'template2') {
      // Modern Creative Template
      doc.setFont('times', 'normal');
      doc.setFontSize(20);
      doc.text('Curriculum Vitae', 20, 20);

      doc.setFontSize(16);
      doc.text(`Full Name: ${personalInfo['Full Name'] || ''}`, 20, 40);
      doc.text(`Email: ${personalInfo['Email'] || ''}`, 20, 45);
      doc.text(`Phone: ${personalInfo['Phone'] || ''}`, 20, 50);
      doc.text(`Location: ${personalInfo['Location'] || ''}`, 20, 55);

      doc.setFontSize(14);
      doc.text('Education', 20, 75);
      doc.setFontSize(12);
      doc.text(`Degree: ${education['Degree'] || ''}`, 20, 85);
      doc.text(`Institution: ${education['Institution'] || ''}`, 20, 90);
      doc.text(`Year: ${education['Year'] || ''}`, 20, 95);

      doc.setFontSize(14);
      doc.text('Experience', 20, 115);
      doc.setFontSize(12);
      doc.text(`Company: ${experience['Company'] || ''}`, 20, 125);
      doc.text(`Position: ${experience['Position'] || ''}`, 20, 130);
      doc.text(`Duration: ${experience['Duration'] || ''}`, 20, 135);
      doc.text(`Responsibilities: ${experience['Responsibilities'] || ''}`, 20, 140);

      doc.setFontSize(14);
      doc.text('Skills', 20, 160);
      doc.setFontSize(12);
      doc.text(`Technical Skills: ${skills['Technical Skills'] || ''}`, 20, 170);
      doc.text(`Soft Skills: ${skills['Soft Skills'] || ''}`, 20, 175);
      doc.text(`Tools & Technologies: ${skills['Tools & Technologies'] || ''}`, 20, 180);
    }

    // Save the generated resume as PDF
    doc.save('resume.pdf');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Resume Builder</h2>

          {/* Template Selection Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Choose Resume Template</label>
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={generateResume}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left p-3 rounded-lg ${activeSection === section.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {section.title}
              </button>
            ))}
          </div>

          <div className="col-span-3">
            {sections
              .find((s) => s.id === activeSection)
              ?.fields.map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={formData[activeSection]?.[field] || ''}
                    onChange={(e) =>
                      handleInputChange(activeSection, field, e.target.value)
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder={`Enter your ${field.toLowerCase()}`}
                  />
                </div>
              ))}

            {tips && (
              <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg">
                <p className="text-sm">💡 Tip: {tips}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
