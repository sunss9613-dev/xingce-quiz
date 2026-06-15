import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { useQuizStore } from '../stores/quizStore';
import { useUserStore } from '../stores/userStore';
import { allQuestions } from '../data/questions';
import { pickQuestions } from '../utils/questionPicker';
import { Module } from '../models/question';
import { MODULE_NAMES, MODULE_COLORS, MODULE_SUB_CATEGORIES, SUB_CATEGORY_NAMES } from '../data/constants';
import { ChevronRight, Play, BookOpen } from 'lucide-react';

export function CategoryPage() {
  const { module, sub } = useParams<{ module: string; sub?: string }>();
  const navigate = useNavigate();
  const startSession = useQuizStore((s) => s.startSession);
  const getModuleAccuracy = useUserStore((s) => s.getModuleAccuracy);

  const currentModule = module as Module;
  const moduleName = MODULE_NAMES[currentModule];
  const moduleColor = MODULE_COLORS[currentModule];
  const subCategories = MODULE_SUB_CATEGORIES[currentModule] ?? [];
  const accuracy = getModuleAccuracy(currentModule);

  if (!moduleName) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh gap-4">
        <p className="text-gray-500">模块不存在</p>
        <button onClick={() => navigate('/')} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold">返回首页</button>
      </div>
    );
  }

  const handleStartPractice = (subCategory?: string) => {
    const questions = pickQuestions(allQuestions, {
      count: 20,
      module: currentModule,
      subCategory: subCategory as any,
    });
    startSession({
      questionIds: questions.map((q) => q.id),
      mode: 'category_practice',
      module: currentModule,
      subCategory: subCategory as any,
      config: { timed: true, showAnswerImmediately: true },
    });
    navigate(`/quiz/category_practice`);
  };

  return (
    <div className="min-h-dvh bg-gray-50">
      <PageHeader title={moduleName} />

      <div className="px-4 py-4 max-w-lg mx-auto space-y-4 pb-20">
        {/* Module header card */}
        <div className="p-4 rounded-xl text-white" style={{ backgroundColor: moduleColor }}>
          <h1 className="text-lg font-bold">{moduleName}</h1>
          <p className="text-sm opacity-80 mt-1">
            正确率 {Math.round(accuracy * 100)}% · {subCategories.length} 个子类别
          </p>
          <button
            onClick={() => handleStartPractice()}
            className="mt-3 flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold active:bg-white/30"
          >
            <Play size={16} /> 随机练习20题
          </button>
        </div>

        {/* Sub-category list */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">专项练习</h3>
          <div className="space-y-2">
            {subCategories.map((subCat) => {
              const count = allQuestions.filter(
                (q) => q.module === currentModule && q.subCategory === subCat
              ).length;
              return (
                <button
                  key={subCat}
                  onClick={() => handleStartPractice(subCat)}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 active:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50">
                      <BookOpen size={18} className="text-gray-500" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-gray-900">
                        {SUB_CATEGORY_NAMES[subCat]}
                      </div>
                      <div className="text-xs text-gray-500">{count} 题可用</div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
