import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { useQuizStore } from '../stores/quizStore';
import { useUserStore } from '../stores/userStore';
import { allQuestions } from '../data/questions';
import { CheckCircle2, XCircle, RotateCcw, Home } from 'lucide-react';

export function QuizResultPage() {
  const navigate = useNavigate();
  const clearSession = useQuizStore((s) => s.clearSession);
  const sessions = useUserStore((s) => s.progress.sessions);

  // Find the most recently completed session
  const lastSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;

  const handleGoHome = () => {
    clearSession();
    navigate('/');
  };

  const handleRetry = () => {
    clearSession();
    navigate(-1);
  };

  if (!lastSession) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh gap-4">
        <p className="text-gray-500">暂无练习记录</p>
        <button
          onClick={handleGoHome}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold"
        >
          返回首页
        </button>
      </div>
    );
  }

  const records = lastSession.records;
  const correctCount = records.filter((r) => r.isCorrect).length;
  const wrongCount = records.filter((r) => r.isCorrect === false).length;
  const accuracy = lastSession.questionCount > 0
    ? Math.round((correctCount / lastSession.questionCount) * 100)
    : 0;
  const totalTime = records.reduce((sum, r) => sum + r.timeSpentMs, 0);
  const avgTime = records.length > 0 ? Math.round(totalTime / records.length / 1000) : 0;

  const accuracyEmoji = accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '💪';

  return (
    <div className="min-h-dvh bg-white">
      <PageHeader title="练习结果" />
      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Score circle */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-3">
            <span className="text-4xl font-bold text-blue-600">{accuracy}%</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {accuracyEmoji} {accuracy >= 80 ? '太棒了！' : accuracy >= 60 ? '继续加油！' : '多多练习！'}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: '总题数', value: lastSession.questionCount },
            { label: '正确', value: correctCount, color: 'text-green-600' },
            { label: '错误', value: wrongCount, color: 'text-red-500' },
            { label: '均时', value: `${avgTime}s` },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
              <span className={`text-lg font-bold ${s.color ?? 'text-gray-900'}`}>{s.value}</span>
              <span className="text-[11px] text-gray-500 mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleRetry}
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 active:bg-gray-50"
          >
            <RotateCcw size={18} />
            再来一次
          </button>
          <button
            onClick={handleGoHome}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 rounded-xl text-sm font-semibold text-white active:bg-blue-700"
          >
            <Home size={18} />
            返回首页
          </button>
        </div>

        {/* Question review list (compact) */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">答题回顾</h3>
          <div className="flex flex-wrap gap-1.5">
            {records.map((record, i) => {
              const q = allQuestions.find((q) => q.id === record.questionId);
              return (
                <div
                  key={record.questionId}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
                    record.isCorrect
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                  title={`第${i + 1}题: ${record.isCorrect ? '正确' : '错误'} (${q?.tags?.[0] ?? ''})`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
