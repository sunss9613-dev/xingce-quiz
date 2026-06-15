import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { useUserStore } from '../stores/userStore';
import { Module } from '../models/question';
import { MODULE_NAMES, MODULE_COLORS } from '../data/constants';
import { Settings, Clock, History, LogOut } from 'lucide-react';

export function StatsPage() {
  const navigate = useNavigate();
  const progress = useUserStore((s) => s.progress);

  const accuracy = progress.totalQuestionsAnswered > 0
    ? Math.round((progress.totalCorrect / progress.totalQuestionsAnswered) * 100)
    : 0;

  return (
    <div className="min-h-dvh bg-gray-50">
      <PageHeader title="我的" showBack={false} />

      <div className="px-4 py-4 max-w-lg mx-auto pb-20 space-y-4">
        {/* Key stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '答题总数', value: progress.totalQuestionsAnswered },
            { label: '整体正确率', value: `${accuracy}%` },
            { label: '连续打卡', value: `${progress.currentStreak}天` },
            { label: '练习天数', value: `${progress.dailyStats.length}天` },
          ].map((s) => (
            <div key={s.label} className="p-4 bg-white rounded-xl border border-gray-100">
              <span className="text-2xl font-bold text-gray-900">{s.value}</span>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Module accuracy bars */}
        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">模块正确率</h3>
          <div className="space-y-3">
            {progress.moduleStats.map((ms) => {
              const modAccuracy = ms.totalAttempted > 0 ? ms.totalCorrect / ms.totalAttempted : 0;
              const color = MODULE_COLORS[ms.module];
              return (
                <div key={ms.module}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 font-medium">
                      {MODULE_NAMES[ms.module]}
                    </span>
                    <span className="text-xs text-gray-500">
                      {ms.totalCorrect}/{ms.totalAttempted} ({Math.round(modAccuracy * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${modAccuracy * 100}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Menu items */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {[
            { icon: History, label: '练习历史', path: '/history' },
            { icon: Clock, label: '模拟考试记录', path: '/mock-exam' },
            { icon: Settings, label: '设置', path: '/settings' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors"
            >
              <item.icon size={20} className="text-gray-500" />
              <span className="flex-1 text-left text-sm text-gray-700">{item.label}</span>
              <span className="text-gray-400">→</span>
            </button>
          ))}
        </div>

        <p className="text-center text-[11px] text-gray-400">
          行测刷题 v1.0 · 数据仅保存在本设备
        </p>
      </div>
    </div>
  );
}
