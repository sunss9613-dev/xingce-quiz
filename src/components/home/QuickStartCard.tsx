import { useNavigate } from 'react-router-dom';
import { Play, Timer, BookOpen, Zap } from 'lucide-react';

const QUICK_ACTIONS = [
  {
    label: '随机练习',
    description: '20题综合练习',
    icon: Play,
    gradient: 'from-blue-500 to-blue-600',
    bgGlow: 'bg-blue-100',
    action: () => '/quiz/practice',
  },
  {
    label: '模拟考试',
    description: '135题·120分钟',
    icon: Timer,
    gradient: 'from-red-500 to-red-600',
    bgGlow: 'bg-red-100',
    action: () => '/mock-exam',
  },
  {
    label: '每日挑战',
    description: '20题·全模块',
    icon: Zap,
    gradient: 'from-purple-500 to-purple-600',
    bgGlow: 'bg-purple-100',
    action: () => '/quiz/daily',
  },
];

interface QuickStartCardProps {
  onStartPractice: (mode: string) => void;
}

export function QuickStartCard({ onStartPractice }: QuickStartCardProps) {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">快速开始</h2>
      <div className="grid grid-cols-3 gap-2">
        {QUICK_ACTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.label === '随机练习') onStartPractice('practice');
                else if (item.label === '模拟考试') navigate('/mock-exam');
                else onStartPractice('daily');
              }}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b ${item.gradient} text-white shadow-sm active:scale-95 transition-transform`}
            >
              <Icon size={20} />
              <span className="text-xs font-semibold">{item.label}</span>
              <span className="text-[10px] opacity-80 -mt-1">{item.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
