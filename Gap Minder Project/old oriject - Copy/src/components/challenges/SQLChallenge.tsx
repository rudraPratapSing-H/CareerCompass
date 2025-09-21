import { useState } from 'react';
import { Play, Database } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { Timer } from '../Timer';

const initialChallenge = {
  title: "Employee Database Query",
  description: "Write a SQL query to find all employees with a salary greater than the average salary.",
  schema: `
-- Employees Table
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(100),
  salary DECIMAL(10,2)
);`,
  initialQuery: `-- Write your query here
SELECT * FROM employees
WHERE salary > (
  -- Complete the subquery
);`
};

export function SQLChallenge() {
  const [query, setQuery] = useState(initialChallenge.initialQuery);
  const [result, setResult] = useState<string>('');
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);

  const runQuery = () => {
    if (isTimeUp) {
      alert("Time's up! You can't run the query anymore.");
      return;
    }

    // In a real implementation, this would connect to a SQL database
    // For now, we'll just validate the query structure
    const formattedQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
    if (formattedQuery.includes('select') && 
        formattedQuery.includes('from employees') && 
        formattedQuery.includes('salary') && 
        formattedQuery.includes('avg')) {
      setResult('Query looks correct! In a real database, this would return employees with above-average salaries.');
    } else {
      setResult('Query needs work. Make sure to select employees with salaries above the average.');
    }
  };

  const handleTimeUp = () => {
    setIsTimeUp(true);
    setTimerRunning(false);
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
          <h3 className="font-semibold mb-2">Database Schema:</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm text-gray-700">{initialChallenge.schema}</pre>
          </div>
        </div>
        
        <div className="mb-6">
          <CodeEditor
            value={query}
            onChange={setQuery}
            language="sql"
            className="min-h-[150px] border rounded-lg"
          />
        </div>

        <button
          onClick={runQuery}
          disabled={isTimeUp}
          className={`flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 mb-6 ${
            isTimeUp ? 'bg-gray-400 cursor-not-allowed' : ''
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Run Query</span>
        </button>

        {result && (
          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Database className="w-5 h-5" />
              <h3 className="font-semibold">Query Result:</h3>
            </div>
            <p className="text-sm">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
