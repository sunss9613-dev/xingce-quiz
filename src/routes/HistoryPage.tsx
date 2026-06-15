import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { useUserStore } from '../stores/userStore';
import { MODULE_NAMES, MODULE_COLORS } from '../data/constants';
import { Module } from '../models/question';
import { Clock, Target, ChevronRight } from 'lucide-react';

export function HistoryPage() {
  const navigate = useNavigate();
  const sessions = useUserStore((s) => s.progress.sessions);
  const completedSessions = [...sessions].filter((s) => s.finishedAt).reverse();

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const getModeLabel = (mode: string) => {
    const map: Record<string, string> = {
      practice: '随机练习',
      mock_exam: '模拟考试',
      category_practice: '专项练习',
      wrong_book: '错题重做',
      favorites: '收藏练习',
      daily: '每日挑战',
    };
    return map[mode] ?? mode;
  };

  return (
    <div className="min-h-dvh bg-gray-50">
      <PageHeader title="练习历史" />
      <div className="px-4 py-4 max-w-lg mx-auto pb-20">
        {completedSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Clock size={48} className="text-gray-300" />
            <p className="text-gray-500">暂无练习记录</p>
            <p className="text-xs text-gray-400">完成一次练习后，记录会出现在这里</p>
          </div>
        ) : (
          <div className="space-y-3">
            {completedSessions.map((session) => {
              const correctCount = session.records.filter((r) => r.isCorrect).length;
              const accuracy = session.questionCount > 0
                ? Math.round((correctCount / session.questionCount) * 100)
                : 0;
              const totalTime = session.records.reduce((sum, r) => sum + r.timeSpentMs, 0);

              return (
                <div
                  key={session.id}
                  className="p-4 bg-white rounded-xl border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: session.module ? MODULE_COLORS[session.module] : '#6b7280' }}
                      />
                      <span className="text-sm font-semibold text-gray-900">
                        {getModeLabel(session.mode)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {session.finishedAt ? formatDate(session.finishedAt) : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Target size={12} />
                      {correctCount}/{session.questionCount} ({accuracy}%)
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {Math.round(totalTime / 1000 / 60)}分钟
                    </span>
                    {session.module && (
                      <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
                        {MODULE_NAMES[session.module]?.slice(0, 2)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
