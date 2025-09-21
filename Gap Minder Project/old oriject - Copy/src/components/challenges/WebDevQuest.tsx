import { useState } from 'react';
import { Code, Eye } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { Timer } from '../Timer';

const initialChallenge = {
  title: "Responsive Navigation Bar",
  description: "Create a responsive navigation bar using HTML and CSS. It should collapse into a hamburger menu on mobile devices.",
  initialHTML: `<!-- Write your HTML here -->
<nav class="navbar">
  <div class="brand">Brand</div>
  <ul class="nav-links">
    <!-- Add navigation items -->
  </ul>
</nav>`,
  initialCSS: `/* Write your CSS here */
.navbar {
  /* Add styles */
}

.nav-links {
  /* Add styles */
}`,
};

export function WebDevQuest() {
  const [html, setHtml] = useState(initialChallenge.initialHTML);
  const [css, setCss] = useState(initialChallenge.initialCSS);
  const [preview, setPreview] = useState<string>('');
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);

  const updatePreview = () => {
    if (isTimeUp) {
      alert("Time's up! You can't preview the code anymore.");
      return;
    }

    const combined = `
      <style>${css}</style>
      ${html}
    `;
    setPreview(combined);
  };

  const handleTimeUp = () => {
    setIsTimeUp(true);
    setTimerRunning(false);
    alert("Time's up! Try again.");
  };

  const resetChallenge = () => {
    setHtml(initialChallenge.initialHTML);
    setCss(initialChallenge.initialCSS);
    setPreview('');
    setIsTimeUp(false);
    setTimerRunning(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{initialChallenge.title}</h2>
          <Timer duration={300} onTimeUp={handleTimeUp} isRunning={timerRunning} />
        </div>

        <p className="text-gray-600 mb-6">{initialChallenge.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-2">HTML</h3>
            <CodeEditor
              value={html}
              onChange={setHtml}
              language="html"
              className="min-h-[200px] border rounded-lg"
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">CSS</h3>
            <CodeEditor
              value={css}
              onChange={setCss}
              language="css"
              className="min-h-[200px] border rounded-lg"
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={updatePreview}
            disabled={isTimeUp}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              isTimeUp
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500'
            } text-white`}
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={resetChallenge}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            <Code className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {preview && (
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Preview:</h3>
            <div
              className="preview-container"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
