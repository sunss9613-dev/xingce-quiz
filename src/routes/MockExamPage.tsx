import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { useQuizStore } from '../stores/quizStore';
import { allQuestions } from '../data/questions';
import { pickMockExamQuestions } from '../utils/questionPicker';
import { MOCK_EXAM_CONFIG, MODULE_NAMES } from '../data/constants';
import { Module } from '../models/question';
import { Timer, AlertTriangle, BookOpen } from 'lucide-react';

export function MockExamPage() {
  const navigate = useNavigate();
  const startSession = useQuizStore((s) => s.startSession);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleStart = useCallback(() => {
    const distribution = MOCK_EXAM_CONFIG.distribution as Record<Module, number>;
    const questionIds = pickMockExamQuestions(allQuestions, distribution).map((q) => q.id);

    startSession({
      questionIds,
      mode: 'mock_exam',
      config: {
        timed: true,
        totalTimeLimit: MOCK_EXAM_CONFIG.timeLimitMinutes * 60,
        showAnswerImmediately: false,
      },
    });

    navigate('/quiz/mock_exam');
  }, [startSession, navigate]);

  return (
    <div className="min-h-dvh bg-white">
      <PageHeader title="模拟考试" />

      <div className="px-4 py-8 max-w-lg mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-4">
            <Timer size={36} className="text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">行测模拟考试</h1>
          <p className="text-sm text-gray-500 mt-1">全真模拟，检验你的真实水平</p>
        </div>

        {/* Exam info */}
        <div className="space-y-3 mb-8">
          {[
            { icon: BookOpen, label: '总题量', value: `${MOCK_EXAM_CONFIG.totalQuestions} 题` },
            { icon: Timer, label: '考试时间', value: `${MOCK_EXAM_CONFIG.timeLimitMinutes} 分钟` },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <item.icon size={20} className="text-gray-500" />
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Module distribution */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">题目分布</h3>
          <div className="space-y-2">
            {(Object.entries(MOCK_EXAM_CONFIG.distribution) as [Module, number][]).map(([module, count]) => (
              <div key={module} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{MODULE_NAMES[module]}</span>
                <span className="text-gray-900 font-medium">{count} 题</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 mb-8">
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-700">
            <p className="font-semibold mb-0.5">注意事项：</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>考试开始后计时不会暂停</li>
              <li>作答时不显示正确答案</li>
              <li>超时系统会自动交卷</li>
              <li>交卷后可查看详细成绩分析</li>
            </ul>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full py-3.5 bg-red-600 text-white rounded-xl text-base font-semibold active:bg-red-700 shadow-sm"
        >
          开始考试
        </button>
      </div>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">确认开始考试？</h3>
            <p className="text-sm text-gray-500 mb-4">
              考试将计时{MOCK_EXAM_CONFIG.timeLimitMinutes}分钟，中途退出将丢失当前考试进度。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700"
              >
                取消
              </button>
              <button
                onClick={handleStart}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold"
              >
                确认开始
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
