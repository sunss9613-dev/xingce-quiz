import { useUserStore } from '../../stores/userStore';

export function HomeStatSummary() {
  const progress = useUserStore((s) => s.progress);
  const accuracy = progress.totalQuestionsAnswered > 0
    ? Math.round((progress.totalCorrect / progress.totalQuestionsAnswered) * 100)
    : 0;

  const stats = [
    { label: '总题数', value: String(progress.totalQuestionsAnswered) },
    { label: '正确率', value: `${accuracy}%` },
    { label: '最长连续', value: `${progress.longestStreak}天` },
    { label: '练习天数', value: `${progress.dailyStats.length}天` },
  ];

  return (
    <div className="px-4">
      <div className="flex items-center justify-around py-3 bg-white rounded-xl border border-gray-100 shadow-sm">
        {stats.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center">
            <span className="text-lg font-bold text-gray-900">{s.value}</span>
            <span className="text-[11px] text-gray-500 mt-0.5">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
