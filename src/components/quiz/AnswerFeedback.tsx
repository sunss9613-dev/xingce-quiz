import { CheckCircle2, XCircle, Star } from 'lucide-react';
import type { Question } from '../../models/question';

interface AnswerFeedbackProps {
  question: Question;
  userAnswer: string | null;
  isCorrect: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function AnswerFeedback({
  question,
  userAnswer,
  isCorrect,
  isFavorite,
  onToggleFavorite,
}: AnswerFeedbackProps) {
  return (
    <div className={`mt-4 p-4 rounded-xl border-2 animate-[fadeInUp_0.2s_ease-out] ${
      isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'
    }`}>
      {/* Result header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <>
              <CheckCircle2 size={22} className="text-green-600" />
              <span className="font-semibold text-green-700">回答正确！</span>
            </>
          ) : (
            <>
              <XCircle size={22} className="text-red-500" />
              <span className="font-semibold text-red-700">回答错误</span>
              {userAnswer && (
                <span className="text-sm text-red-500 ml-1">
                  （你选了{userAnswer}，正确答案是{question.answer}）
                </span>
              )}
            </>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={onToggleFavorite}
          className="flex items-center justify-center w-8 h-8 rounded-full active:bg-amber-100 transition-colors"
          aria-label={isFavorite ? '取消收藏' : '收藏'}
        >
          <Star
            size={20}
            className={isFavorite ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* Explanation */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">解析</h4>
        <p className="text-sm leading-relaxed text-gray-700">{question.explanation}</p>
      </div>

      {/* Tags */}
      {question.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] bg-gray-100 text-gray-500 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
