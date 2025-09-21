import { useState } from 'react';
import { Puzzle } from '../../../types';
import { Play, RefreshCw } from 'lucide-react';
import { CodeEditor } from '../CodeEditor';

interface CodePuzzleProps {
  puzzle: Puzzle;
  onComplete: (solved: boolean) => void;
}

export function CodePuzzle({ puzzle, onComplete }: CodePuzzleProps) {
  const [code, setCode] = useState(puzzle.initialCode);
  const [output, setOutput] = useState('');
  const [isSolved, setIsSolved] = useState(false);

  const runCode = () => {
    try {
      // Evaluate the code using Function constructor
      const result = new Function('return ' + code)();

      // Ensure we compare the result with expected output as a string to avoid type mismatches
      const solved = String(result) === String(puzzle.expectedOutput);

      setOutput(solved ? 'Puzzle solved! 🎉' : 'Not quite right. Try again!');
      setIsSolved(solved);

      if (solved) onComplete(true);
    } catch (error) {
      // Safe handling of the error message
      const errorMessage = error instanceof Error ? error.message : String(error);
      setOutput('Error: ' + errorMessage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{puzzle.title}</h2>
        <p className="text-gray-600 mb-6">{puzzle.description}</p>

        <div className="mb-6">
          <CodeEditor
            value={code}
            onChange={setCode}
            language="javascript"
            className="min-h-[200px] border rounded-lg"
          />
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={runCode}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
          >
            <Play className="w-4 h-4" />
            <span>Run Code</span>
          </button>
          <button
            onClick={() => setCode(puzzle.initialCode)}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {output && (
          <div className={`p-4 rounded-lg ${isSolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {output}
          </div>
        )}
      </div>
    </div>
  );
}
