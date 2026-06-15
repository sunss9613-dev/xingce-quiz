import { useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { todayStr } from '../../utils/streak';

export function DailyCheckInBanner() {
  const navigate = useNavigate();
  const streak = useUserStore((s) => s.progress.currentStreak);
  const checkInDates = useUserStore((s) => s.progress.checkInDates);
  const today = todayStr();
  const checkedToday = checkInDates.includes(today);

  return (
    <div className="px-4">
      <button
        onClick={() => navigate('/daily-check-in')}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 active:scale-[0.99] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${checkedToday ? 'bg-amber-500' : 'bg-amber-200'}`}>
            <Flame size={22} className={checkedToday ? 'text-white' : 'text-amber-500'} />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-gray-900">
              {checkedToday ? '今日已打卡' : '今日打卡'}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              连续 <span className="font-bold text-amber-600">{streak}</span> 天
            </div>
          </div>
        </div>
        <div className="text-xs text-amber-600 font-medium">
          {checkedToday ? '查看记录 →' : '去打卡 →'}
        </div>
      </button>
    </div>
  );
}
