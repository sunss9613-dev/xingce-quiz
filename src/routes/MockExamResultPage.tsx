import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { useUserStore } from '../stores/userStore';
import { useQuizStore } from '../stores/quizStore';
import { Module } from '../models/question';
import { MODULE_NAMES, MODULE_COLORS } from '../data/constants';
import { Home, RotateCcw, Trophy } from 'lucide-react';

export function MockExamResultPage() {
  const navigate = useNavigate();
  const clearSession = useQuizStore((s) => s.clearSession);
  const sessions = useUserStore((s) => s.progress.sessions);

  const lastSession = sessions.filter((s) => s.mode === 'mock_exam').pop();

  const handleGoHome = () => {
    clearSession();
    navigate('/');
  };

  if (!lastSession) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh gap-4">
        <p className="text-gray-500">暂无模拟考试记录</p>
        <button
          onClick={handleGoHome}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold"
        >
          返回首页
        </button>
      </div>
    );
  }

  const correctCount = lastSession.records.filter((r) => r.isCorrect).length;
  const totalScore = correctCount;
  const accuracy = lastSession.questionCount > 0
    ? Math.round((correctCount / lastSession.questionCount) * 100)
    : 0;

  // Per-module breakdown
  const moduleBreakdown: Record<string, { total: number; correct: number }> = {};
  // We need the actual questions to get module info
  // For now just use the session module

  return (
    <div className="min-h-dvh bg-white">
      <PageHeader title="考试成绩" />
      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Trophy */}
        <div className="flex flex-col items-center mb-6">
          <Trophy size={48} className="text-amber-500 mb-3" />
          <h1 className="text-xl font-bold text-gray-900">考试完成！</h1>
        </div>

        {/* Score display */}
        <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl mb-6">
          <span className="text-5xl font-bold text-blue-600">{totalScore}</span>
          <span className="text-sm text-gray-500 mt-1">总分</span>
          <div className="flex items-center gap-6 mt-4">
            <div className="text-center">
              <span className="text-lg font-bold text-gray-900">{accuracy}%</span>
              <p className="text-[11px] text-gray-500">正确率</p>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-gray-900">{correctCount}/{lastSession.questionCount}</span>
              <p className="text-[11px] text-gray-500">正确/总题数</p>
            </div>
          </div>
        </div>

        {/* Quick summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: '答对', value: correctCount, color: 'text-green-600' },
            { label: '答错', value: lastSession.questionCount - correctCount, color: 'text-red-500' },
            {
              label: '用时',
              value: `${Math.round(lastSession.records.reduce((s, r) => s + r.timeSpentMs, 0) / 60000)}分`,
            },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
              <span className={`text-lg font-bold ${s.color ?? 'text-gray-900'}`}>{s.value}</span>
              <span className="text-[11px] text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              clearSession();
              navigate('/mock-exam');
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 active:bg-gray-50"
          >
            <RotateCcw size={18} />
            再考一次
          </button>
          <button
            onClick={handleGoHome}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 rounded-xl text-sm font-semibold text-white active:bg-blue-700"
          >
            <Home size={18} />
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
}
