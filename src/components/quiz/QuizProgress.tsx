interface QuizProgressProps {
  current: number;
  total: number;
  answeredCount: number;
}

export function QuizProgress({ current, total, answeredCount }: QuizProgressProps) {
  const progress = total > 0 ? (answeredCount / total) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-gray-500 font-medium">
          第 <span className="text-gray-900 font-bold">{current + 1}</span>/{total} 题
        </span>
        <span className="text-xs text-gray-400">
          已答 {answeredCount} 题
        </span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
