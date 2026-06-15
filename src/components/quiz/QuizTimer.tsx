import { Clock } from 'lucide-react';

interface QuizTimerProps {
  display: string;
  isCountdown: boolean;
  warning: boolean;
}

export function QuizTimer({ display, isCountdown, warning }: QuizTimerProps) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-mono font-bold ${
      warning
        ? 'bg-red-100 text-red-600 animate-pulse'
        : 'bg-gray-100 text-gray-700'
    }`}>
      <Clock size={14} />
      <span>{display}</span>
    </div>
  );
}
