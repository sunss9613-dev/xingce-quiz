import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { useUserStore } from '../stores/userStore';
import { useQuizStore } from '../stores/quizStore';
import { allQuestions } from '../data/questions';
import { MODULE_NAMES } from '../data/constants';
import { Star, Play } from 'lucide-react';

export function FavoritesPage() {
  const navigate = useNavigate();
  const favorites = useUserStore((s) => s.progress.favorites);
  const toggleFavorite = useUserStore((s) => s.toggleFavorite);
  const startSession = useQuizStore((s) => s.startSession);

  const favQuestions = useMemo(
    () => allQuestions.filter((q) => favorites.includes(q.id)),
    [favorites]
  );

  const handlePractice = () => {
    const ids = favQuestions.map((q) => q.id);
    if (ids.length === 0) return;
    startSession({
      questionIds: ids,
      mode: 'favorites',
      config: { timed: true, showAnswerImmediately: true },
    });
    navigate('/quiz/favorites');
  };

  return (
    <div className="min-h-dvh bg-gray-50">
      <PageHeader
        title="收藏夹"
        rightAction={
          favQuestions.length > 0 && (
            <button
              onClick={handlePractice}
              className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 text-white rounded-full text-xs font-semibold active:bg-amber-600"
            >
              <Play size={12} /> 练习
            </button>
          )
        }
      />
      <div className="px-4 py-4 max-w-lg mx-auto pb-20">
        {favQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Star size={48} className="text-gray-300" />
            <p className="text-gray-500">还没有收藏的题目</p>
            <p className="text-xs text-gray-400">答题时点击星标即可收藏题目</p>
          </div>
        ) : (
          <div className="space-y-3">
            {favQuestions.map((q) => (
              <div key={q.id} className="p-4 bg-white rounded-xl border border-gray-100">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                    {MODULE_NAMES[q.module]?.slice(0, 2)}
                  </span>
                  <button
                    onClick={() => toggleFavorite(q.id)}
                    className="text-amber-500 shrink-0"
                  >
                    <Star size={16} fill="#f59e0b" />
                  </button>
                </div>
                <p className="text-sm text-gray-900 leading-relaxed line-clamp-2">{q.stem}</p>
                <p className="text-xs text-gray-500 mt-1.5">
                  正确答案: <span className="text-green-600 font-bold">{q.answer}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
