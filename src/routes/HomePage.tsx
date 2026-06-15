import { useNavigate } from 'react-router-dom';
import { ModuleGrid } from '../components/home/ModuleGrid';
import { DailyCheckInBanner } from '../components/home/DailyCheckInBanner';
import { QuickStartCard } from '../components/home/QuickStartCard';
import { HomeStatSummary } from '../components/home/HomeStatSummary';
import { useQuizStore } from '../stores/quizStore';
import { allQuestions } from '../data/questions';
import { pickQuestions } from '../utils/questionPicker';
import { useUserStore } from '../stores/userStore';
import { todayStr } from '../utils/streak';

export function HomePage() {
  const navigate = useNavigate();
  const startSession = useQuizStore((s) => s.startSession);
  const progress = useUserStore((s) => s.progress);

  const handleStartPractice = (mode: string) => {
    let count = 20;
    const config = {
      timed: true,
      showAnswerImmediately: true,
    };

    const questionIds = pickQuestions(allQuestions, {
      count,
      prioritizeWeakAreas: mode === 'daily',
      userProgress: progress,
    }).map((q) => q.id);

    startSession({
      questionIds,
      mode: mode as 'practice' | 'daily',
      config,
    });

    navigate(`/quiz/${mode}`);
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 safe-area-top">
        <h1 className="text-xl font-bold text-gray-900">行测刷题</h1>
        <p className="text-xs text-gray-500 mt-0.5">行政职业能力测验 · 移动练习</p>
      </div>

      {/* Daily Check-in Banner */}
      <div className="mt-3">
        <DailyCheckInBanner />
      </div>

      {/* Quick Stats */}
      <div className="mt-4">
        <HomeStatSummary />
      </div>

      {/* Quick Start Actions */}
      <div className="mt-4">
        <QuickStartCard onStartPractice={handleStartPractice} />
      </div>

      {/* Module Grid */}
      <div className="mt-5">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
          专项练习
        </h2>
        <ModuleGrid />
      </div>
    </div>
  );
}
