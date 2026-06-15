import { useMemo } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { useUserStore } from '../stores/userStore';
import { todayStr } from '../utils/streak';
import { Flame, TrendingUp, Calendar } from 'lucide-react';
import {
  format,
  getYear,
  getMonth,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from 'date-fns';

export function DailyCheckInPage() {
  const progress = useUserStore((s) => s.progress);
  const checkInToday = useUserStore((s) => s.checkInToday);
  const today = todayStr();
  const checkedToday = progress.checkInDates.includes(today);

  const checkInSet = useMemo(() => new Set(progress.checkInDates), [progress.checkInDates]);

  // Calendar data for current month
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);
  const year = getYear(now);
  const month = getMonth(now);

  return (
    <div className="min-h-dvh bg-gray-50">
      <PageHeader title="每日打卡" />
      <div className="px-4 py-4 max-w-lg mx-auto pb-20 space-y-5">
        {/* Streak display */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-white">
          <div>
            <p className="text-sm opacity-90">当前连续</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl font-bold">{progress.currentStreak}</span>
              <span className="text-lg opacity-80">天</span>
            </div>
            <p className="text-xs opacity-70 mt-1">最长连续 {progress.longestStreak} 天</p>
          </div>
          <Flame size={48} className="opacity-90" />
        </div>

        {/* Check-in button */}
        {!checkedToday && (
          <button
            onClick={checkInToday}
            className="w-full py-3.5 bg-amber-500 text-white rounded-xl text-base font-semibold active:bg-amber-600 shadow-sm"
          >
            🔥 今日打卡
          </button>
        )}
        {checkedToday && (
          <div className="w-full py-3.5 bg-green-50 text-green-700 rounded-xl text-base font-semibold text-center border border-green-200">
            ✅ 今日已打卡
          </div>
        )}

        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '打卡天数', value: progress.checkInDates.length, icon: Calendar },
            { label: '答题总数', value: progress.totalQuestionsAnswered, icon: TrendingUp },
            { label: '练习天数', value: progress.dailyStats.length, icon: Calendar },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center p-3 bg-white rounded-xl border border-gray-100">
              <s.icon size={18} className="text-gray-400 mb-1" />
              <span className="text-lg font-bold text-gray-900">{s.value}</span>
              <span className="text-[10px] text-gray-500 text-center">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            {year}年{month + 1}月
          </h3>
          {/* Day of week headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['日', '一', '二', '三', '四', '五', '六'].map((d) => (
              <div key={d} className="text-center text-[10px] text-gray-400 font-medium py-1">
                {d}
              </div>
            ))}
          </div>
          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {/* Day cells */}
            {daysInMonth.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const isChecked = checkInSet.has(dateStr);
              const isToday = dateStr === today;
              return (
                <div
                  key={dateStr}
                  className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium ${
                    isChecked
                      ? 'bg-amber-500 text-white'
                      : isToday
                      ? 'bg-amber-100 text-amber-700 border border-amber-300'
                      : 'text-gray-500'
                  }`}
                >
                  {format(day, 'd')}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
