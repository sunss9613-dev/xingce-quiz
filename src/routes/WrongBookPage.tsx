import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { useUserStore } from '../stores/userStore';
import { useQuizStore } from '../stores/quizStore';
import { allQuestions } from '../data/questions';
import { Module } from '../models/question';
import { MODULE_NAMES } from '../data/constants';
import { Trash2, Play, Filter, BookX } from 'lucide-react';

export function WrongBookPage() {
  const navigate = useNavigate();
  const wrongBook = useUserStore((s) => s.progress.wrongBook);
  const removeFromWrongBook = useUserStore((s) => s.removeFromWrongBook);
  const startSession = useQuizStore((s) => s.startSession);
  const [filterModule, setFilterModule] = useState<string>('all');

  const wrongQuestions = useMemo(
    () => allQuestions.filter((q) => wrongBook.includes(q.id)),
    [wrongBook]
  );

  const filtered = useMemo(() => {
    if (filterModule === 'all') return wrongQuestions;
    return wrongQuestions.filter((q) => q.module === filterModule);
  }, [wrongQuestions, filterModule]);

  const handleRetryAll = () => {
    const ids = filtered.map((q) => q.id);
    if (ids.length === 0) return;
    startSession({
      questionIds: ids,
      mode: 'wrong_book',
      config: { timed: true, showAnswerImmediately: true },
    });
    navigate('/quiz/wrong_book');
  };

  const handleRemove = (id: string) => {
    removeFromWrongBook(id);
  };

  return (
    <div className="min-h-dvh bg-gray-50">
      <PageHeader title="错题本" />
      <div className="px-4 py-4 max-w-lg mx-auto pb-20">
        {wrongQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <BookX size={48} className="text-gray-300" />
            <p className="text-gray-500">错题本还是空的</p>
            <p className="text-xs text-gray-400">答题过程中的错题会自动收录到这里</p>
          </div>
        ) : (
          <>
            {/* Filter + Action bar */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 flex-1 overflow-x-auto no-scrollbar">
                <Filter size={14} className="text-gray-400 shrink-0" />
                {['all', ...Object.values(Module)].map((m) => (
                  <button
                    key={m}
                    onClick={() => setFilterModule(m)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                      filterModule === m
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    {m === 'all' ? '全部' : MODULE_NAMES[m as Module]?.slice(0, 2) ?? m}
                  </button>
                ))}
              </div>
              <button
                onClick={handleRetryAll}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-red-500 text-white rounded-full text-xs font-semibold shrink-0 active:bg-red-600"
              >
                <Play size={12} /> 重做
              </button>
            </div>

            {/* Wrong question list */}
            <div className="space-y-3">
              {filtered.map((q) => (
                <div key={q.id} className="p-4 bg-white rounded-xl border border-gray-100">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full shrink-0">
                      {MODULE_NAMES[q.module]?.slice(0, 2)}
                    </span>
                    <button
                      onClick={() => handleRemove(q.id)}
                      className="text-gray-400 active:text-red-500 shrink-0"
                      title="移出错题本"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-900 leading-relaxed line-clamp-2">{q.stem}</p>
                  <p className="text-xs text-gray-500 mt-1.5">
                    正确答案: <span className="text-green-600 font-bold">{q.answer}</span>
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
