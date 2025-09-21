import { useState } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { Timer } from '../Timer';

const initialChallenge = {
  title: "Array Sum Calculator",
  description: "Create a function that calculates the sum of all numbers in an array.",
  initialCode: `function arraySum(numbers) {
  // Your code here
}`,
  testCases: [
    { input: "[1, 2, 3]", expectedOutput: "6", description: "Should sum positive numbers" },
    { input: "[-1, 0, 1]", expectedOutput: "0", description: "Should handle negative numbers" },
  ],
};

export function JavaScriptPuzzle() {
  const [code, setCode] = useState(initialChallenge.initialCode);
  const [results, setResults] = useState<Array<{ passed: boolean; message: string }>>([]);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);

  const runTests = () => {
    if (isTimeUp) {
      alert("Time's up! Try again.");
      return;
    }

    try {
      const testFunction = new Function('return ' + code)();
      const newResults = initialChallenge.testCases.map((test) => {
        try {
          const input = JSON.parse(test.input);
          const result = testFunction(input);
          const passed = result.toString() === test.expectedOutput;
          return {
            passed,
            message: passed
              ? "Test passed!"
              : `Expected ${test.expectedOutput}, but got ${result}`,
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          return { passed: false, message: "Error: " + errorMessage };
        }
      });

      setResults(newResults);

      if (newResults.every((result) => result.passed)) {
        setTimerRunning(false); // Stop the timer when all tests pass
        alert("Congratulations! All test cases passed.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setResults([{ passed: false, message: "Syntax Error: " + errorMessage }]);
    }
  };

  const handleTimeUp = () => {
    setIsTimeUp(true);
    setTimerRunning(false); // Stop the timer when time's up
    alert("Time's up! Try again.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{initialChallenge.title}</h2>
          <Timer duration={60} onTimeUp={handleTimeUp} isRunning={timerRunning} />
        </div>

        <p className="text-gray-600 mb-6">{initialChallenge.description}</p>

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
            onClick={runTests}
            disabled={isTimeUp}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              isTimeUp
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            } text-white`}
          >
            <Play className="w-4 h-4" />
            <span>Run Tests</span>
          </button>
          <button
            onClick={() => {
              setCode(initialChallenge.initialCode);
              setTimerRunning(true); // Restart the timer
              setIsTimeUp(false);
              setResults([]);
            }}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Code</span>
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Test Results:</h3>
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                result.passed
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <p className="font-medium">Test Case {index + 1}</p>
              <p className="text-sm">{result.message}</p>
              <p className="text-sm mt-1">Input: {initialChallenge.testCases[index].input}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
