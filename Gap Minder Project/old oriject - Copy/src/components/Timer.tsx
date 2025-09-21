import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isRunning: boolean; // Controls whether the timer runs
}

export function Timer({ duration, onTimeUp, isRunning }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp(); // Trigger callback when time is up
      return;
    }

    if (!isRunning) return; // Pause the timer if not running

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount or state change
  }, [timeLeft, onTimeUp, isRunning]);

  useEffect(() => {
    setTimeLeft(duration); // Reset timeLeft when duration changes
  }, [duration]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center space-x-2 text-indigo-600 font-mono">
      <Clock className="w-5 h-5" />
      <span className="text-xl">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}
