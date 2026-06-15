import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { QuizProgress } from '../components/quiz/QuizProgress';
import { QuizTimer } from '../components/quiz/QuizTimer';
import { MaterialDisplay } from '../components/quiz/MaterialDisplay';
import { OptionList } from '../components/quiz/OptionList';
import { AnswerFeedback } from '../components/quiz/AnswerFeedback';
import { QuizControls } from '../components/quiz/QuizControls';
import { useQuiz } from '../hooks/useQuiz';
import { useTimer } from '../hooks/useTimer';
import { useSwipe } from '../hooks/useSwipe';
import { useUserStore } from '../stores/userStore';
import { allQuestions } from '../data/questions';
import type { AnswerKey, Question } from '../models/question';

export function QuizPage() {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const {
    session,
    currentQuestionIndex,
    currentQuestionId,
    currentRecord,
    submitAnswer,
    goNext,
    goPrev,
    finishSession,
    markQuestionStart,
    totalQuestions,
    answeredCount,
  } = useQuiz();
  const toggleFavorite = useUserStore((s) => s.toggleFavorite);
  const isFavorite = useUserStore((s) => s.isFavorite);
  const progress = useUserStore((s) => s.progress);

  const [selectedAnswer, setSelectedAnswer] = useState<AnswerKey | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Find current question
  const question: Question | undefined = useMemo(
    () => allQuestions.find((q) => q.id === currentQuestionId),
    [currentQuestionId]
  );

  const isMockMode = mode === 'mock_exam';

  // Timer
  const timer = useTimer({
    countdown: isMockMode,
    initialSeconds: isMockMode ? 7200 : 0, // 120min for mock
    autoStart: true,
    onTimeUp: () => {
      if (isMockMode) handleFinish();
    },
  });

  // Reset answer state when question changes
  useEffect(() => {
    setSelectedAnswer(currentRecord?.userAnswer ?? null);
    setShowFeedback(currentRecord != null && currentRecord.userAnswer !== null);
    markQuestionStart();
  }, [currentQuestionIndex]);

  // Handle answer selection
  const handleSelect = useCallback(
    (answer: AnswerKey) => {
      if (showFeedback) return; // Don't allow changing after feedback
      setSelectedAnswer(answer);
    },
    [showFeedback]
  );

  // Submit answer
  const handleSubmit = useCallback(() => {
    if (!selectedAnswer || !question || !currentQuestionId) return;

    submitAnswer(currentQuestionId, selectedAnswer, question.answer, question.module);
    setShowFeedback(true);

    // Vibrate on mobile
    if (navigator.vibrate && selectedAnswer === question.answer) {
      navigator.vibrate(50);
    }
  }, [selectedAnswer, question, currentQuestionId, submitAnswer]);

  // Navigation
  const handleNext = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      goNext();
    }
  }, [currentQuestionIndex, totalQuestions, goNext]);

  const handlePrev = useCallback(() => {
    goPrev();
  }, [goPrev]);

  // Finish session
  const handleFinish = useCallback(() => {
    finishSession();
    navigate(`/quiz/${mode}/result`, { replace: true });
  }, [finishSession, navigate, mode]);

  // Toggle favorite
  const handleToggleFavorite = useCallback(() => {
    if (currentQuestionId) toggleFavorite(currentQuestionId);
  }, [currentQuestionId, toggleFavorite]);

  // Swipe navigation
  useSwipe({
    onSwipeLeft: () => {
      if (showFeedback && currentQuestionIndex < totalQuestions - 1) handleNext();
    },
    onSwipeRight: () => {
      if (currentQuestionIndex > 0) handlePrev();
    },
  });

  if (!session || !question) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh gap-4 p-8">
        <p className="text-gray-500">没有正在进行的练习</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold"
        >
          返回首页
        </button>
      </div>
    );
  }

  const title = isMockMode ? '模拟考试' : mode === 'daily' ? '每日挑战' : '练习模式';
  const hasAnswered = showFeedback;

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Header */}
      <PageHeader
        title={title}
        showBack={!isMockMode}
        rightAction={
          <button
            onClick={handleToggleFavorite}
            className="w-8 h-8 flex items-center justify-center"
          >
            {currentQuestionId && isFavorite(currentQuestionId) ? (
              <span className="text-amber-500 text-lg">★</span>
            ) : (
              <span className="text-gray-300 text-lg">☆</span>
            )}
          </button>
        }
      />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <QuizProgress
          current={currentQuestionIndex}
          total={totalQuestions}
          answeredCount={answeredCount}
        />
        <div className="ml-3">
          <QuizTimer
            display={timer.elapsedDisplay}
            isCountdown={isMockMode}
            warning={isMockMode && timer.remaining < 300}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Shared material */}
        {question.sharedMaterial && (
          <MaterialDisplay material={question.sharedMaterial} />
        )}

        {/* Question stem */}
        <div className="mb-4">
          <p className="text-base leading-relaxed text-gray-900 font-medium">
            {question.stem}
          </p>
        </div>

        {/* Options */}
        <OptionList
          options={question.options}
          selectedAnswer={selectedAnswer}
          correctAnswer={hasAnswered ? question.answer : null}
          showResult={hasAnswered}
          disabled={hasAnswered}
          onSelect={handleSelect}
        />

        {/* Feedback */}
        {hasAnswered && (
          <AnswerFeedback
            question={question}
            userAnswer={selectedAnswer}
            isCorrect={selectedAnswer === question.answer}
            isFavorite={currentQuestionId ? isFavorite(currentQuestionId) : false}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>

      {/* Bottom controls */}
      <div className="px-4 py-3 border-t border-gray-100 safe-area-bottom bg-white">
        {!hasAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`w-full py-3 rounded-xl text-base font-semibold transition-all ${
              selectedAnswer
                ? 'bg-blue-600 text-white active:bg-blue-700 shadow-sm'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedAnswer ? '提交答案' : '请选择一个选项'}
          </button>
        ) : (
          <QuizControls
            currentIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            hasAnswered={hasAnswered}
            onPrev={handlePrev}
            onNext={handleNext}
            onSubmit={handleSubmit}
            onFinish={handleFinish}
            showSubmit={false}
          />
        )}
      </div>
    </div>
  );
}
