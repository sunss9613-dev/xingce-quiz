import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizControlsProps {
  currentIndex: number;
  totalQuestions: number;
  hasAnswered: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onFinish: () => void;
  showSubmit: boolean;
}

export function QuizControls({
  currentIndex,
  totalQuestions,
  hasAnswered,
  onPrev,
  onNext,
  onSubmit,
  onFinish,
  showSubmit,
}: QuizControlsProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="flex items-center justify-between mt-5 gap-3">
      <button
        onClick={onPrev}
        disabled={isFirst}
        className={`flex items-center gap-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
          isFirst
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 active:bg-gray-100'
        }`}
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline">上一题</span>
      </button>

      <div className="flex items-center gap-2">
        {!hasAnswered && showSubmit && (
          <button
            onClick={onSubmit}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold active:bg-blue-700 transition-colors shadow-sm"
          >
            提交答案
          </button>
        )}

        {hasAnswered && isLast && (
          <button
            onClick={onFinish}
            className="px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold active:bg-green-700 transition-colors shadow-sm"
          >
            完成练习
          </button>
        )}

        {hasAnswered && !isLast && (
          <button
            onClick={onNext}
            className="flex items-center gap-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold active:bg-blue-700 transition-colors shadow-sm"
          >
            <span>下一题</span>
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      <div className="w-[68px]" /> {/* Spacer for alignment */}
    </div>
  );
}
