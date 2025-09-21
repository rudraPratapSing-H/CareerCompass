import { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react'; // Import icons from lucide-react
import { Quiz } from '../../../types'; // Make sure to define the `Quiz` type correctly

interface QuizComponentProps {
  quiz: Quiz; // Type for quiz prop
  onComplete: (score: number) => void; // Callback when quiz is completed with the score
}

export function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0); // State for current question index
  const [score, setScore] = useState(0); // State for tracking score
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // State for tracking selected answer
  const [showResult, setShowResult] = useState(false); // State for showing the result screen
  const [timeTaken, setTimeTaken] = useState(0); // State to track the time taken for the question
  const [startTime, setStartTime] = useState(0); // Store the start time for the stopwatch
  const [stopwatchRunning, setStopwatchRunning] = useState(false); // To track if stopwatch is running
  const [questionTimes, setQuestionTimes] = useState<number[]>([]); // Store time taken for each question
  const [questionResults, setQuestionResults] = useState<boolean[]>([]); // Store correctness of answers for each question
  const timerDuration = 60; // Set timer duration in seconds (e.g., 1 minute)

  // Start the timer whenever a new question is displayed
  const startTimer = () => {
    setStartTime(Date.now()); // Start time when the question is displayed
    setStopwatchRunning(true); // Start the stopwatch
  };

  const handleAnswer = (answer: string) => {
    const correct = answer === quiz.questions[currentQuestion].correctAnswer; // Check if the answer is correct
    setSelectedAnswer(answer);

    // Save the time taken for the question
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    setQuestionTimes((prevTimes) => [...prevTimes, timeSpent]);
    setQuestionResults((prevResults) => [...prevResults, correct]);

    if (correct) {
      setScore(prev => prev + 1); // Increment score if the answer is correct
    }

    // Stop the stopwatch when the question is answered
    setStopwatchRunning(false);

    // After 1 second delay, move to next question
    if (currentQuestion < quiz.questions.length - 1) {
      setTimeout(() => {
        setSelectedAnswer(null); // Reset selected answer
        setCurrentQuestion(prev => prev + 1); // Move to the next question
        startTimer(); // Restart the timer for the next question
      }, 1000); // Delay before moving to the next question
    } else {
      setTimeout(() => {
        setShowResult(true); // Show the result screen after the last question
        onComplete(score); // Pass the score to the parent component when the quiz is complete
      }, 1000);
    }
  };

  useEffect(() => {
    let timer: number; // Use `number` for the timer ID
    if (stopwatchRunning) {
      timer = window.setInterval(() => {
        setTimeTaken(Math.floor((Date.now() - startTime) / 1000)); // Update the time taken in seconds
      }, 1000);
    }
    return () => {
      clearInterval(timer); // Clear interval when stopwatch is stopped or component is unmounted
    };
  }, [stopwatchRunning, startTime]);

  // Start timer for the first question
  useEffect(() => {
    startTimer();
  }, [currentQuestion]);

  if (showResult) {
    return (
      <div className="text-center p-8">
        <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
        <p className="text-xl mb-4">Your score: {score} / {quiz.questions.length}</p>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-indigo-800">
            {score === quiz.questions.length
              ? "Perfect score! You're a master!"
              : score > quiz.questions.length / 2
              ? "Great job! Keep practicing!"
              : "Keep learning! You'll get better!"}
          </p>
        </div>

        {/* Summary of the quiz */}
        <div className="mt-8">
          <h4 className="text-xl font-semibold">Quiz Summary</h4>
          <div className="mt-4">
            {quiz.questions.map((question, index) => (
              <div key={index} className="mb-4">
                <div className="font-semibold">Q{index + 1}: {question.question}</div>
                <div>
                  Time Taken: {questionTimes[index]}s
                </div>
                <div>
                  {questionResults[index] ? (
                    <span className="text-green-500">Correct Answer</span>
                  ) : (
                    <span className="text-red-500">Wrong Answer</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion]; // Get the current question

  // Calculate the remaining time for the current question
  const remainingTime = timerDuration - timeTaken;
  const progressPercentage = (remainingTime / timerDuration) * 100;

  // Determine progress bar color based on time remaining
  let progressBarColor = 'bg-green-500'; // Default color is green
  if (remainingTime < timerDuration / 2) {
    progressBarColor = 'bg-yellow-500'; // Change to yellow if less than half time
  }
  if (remainingTime < timerDuration / 4) {
    progressBarColor = 'bg-red-500'; // Change to red if less than quarter time
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <span className="text-sm text-gray-500">
            Score: {score} | Time Left: {remainingTime}s
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
        {question.code && (
          <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto">
            <code>{question.code}</code>
          </pre>
        )}
      </div>

      {/* Timer Progress Bar */}
      <div className="mb-6">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="font-semibold text-sm">Time Left</span>
            </div>
          </div>
          <div className="flex mb-2 justify-between items-center">
            <div className="w-full bg-gray-200 rounded-full">
              <div
                className={`bg-gradient-to-r ${progressBarColor} h-2 rounded-full`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)} // Handle the answer selection
            disabled={selectedAnswer !== null} // Disable buttons once an answer is selected
            className={`w-full text-left p-4 rounded-lg transition-colors 
              ${selectedAnswer === option
                ? (option === question.correctAnswer ? 'bg-green-100' : 'bg-red-100')
                : 'bg-white hover:bg-gray-50'} 
              border`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {selectedAnswer === option && (
                option === question.correctAnswer
                  ? <CheckCircle className="w-5 h-5 text-green-500" />
                  : <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
