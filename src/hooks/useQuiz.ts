import { useCallback, useRef } from 'react';
import { useQuizStore } from '../stores/quizStore';
import { useUserStore } from '../stores/userStore';
import type { AnswerKey } from '../models/question';
import type { Module } from '../models/question';

export function useQuiz() {
  const session = useQuizStore((s) => s.currentSession);
  const setCurrentIndex = useQuizStore((s) => s.setCurrentIndex);
  const clearSession = useQuizStore((s) => s.clearSession);
  const recordAnswer = useUserStore((s) => s.recordAnswer);
  const finishSessionAction = useUserStore((s) => s.finishSession);
  const addToWrongBook = useUserStore((s) => s.addToWrongBook);
  const questionStartTime = useRef<number>(Date.now());

  const currentQuestionIndex = session?.currentIndex ?? 0;
  const questionIds = session?.questionIds ?? [];
  const currentQuestionId = questionIds[currentQuestionIndex] ?? null;
  const records = session?.records ?? [];
  const currentRecord = records.find((r) => r.questionId === currentQuestionId) ?? null;

  const markQuestionStart = useCallback(() => {
    questionStartTime.current = Date.now();
  }, []);

  const submitAnswer = useCallback(
    (questionId: string, answer: AnswerKey, correctAnswer: AnswerKey, questionModule: Module) => {
      if (!session) return;
      const timeSpent = Date.now() - questionStartTime.current;
      const isCorrect = answer === correctAnswer;
      const record = {
        questionId,
        userAnswer: answer,
        isCorrect,
        timeSpentMs: timeSpent,
        timestamp: Date.now(),
      };

      // Don't double-record
      const existingRecord = session.records.find((r) => r.questionId === questionId);
      if (!existingRecord) {
        recordAnswer(session.id, record, questionModule);
        // Add to wrong book if incorrect
        if (!isCorrect) {
          addToWrongBook(questionId);
        }
      }
    },
    [session, recordAnswer, addToWrongBook]
  );

  const goToQuestion = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      markQuestionStart();
    },
    [setCurrentIndex, markQuestionStart]
  );

  const goNext = useCallback(() => {
    if (currentQuestionIndex < questionIds.length - 1) {
      goToQuestion(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex, questionIds.length, goToQuestion]);

  const goPrev = useCallback(() => {
    if (currentQuestionIndex > 0) {
      goToQuestion(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex, goToQuestion]);

  const finishSession = useCallback(() => {
    if (!session) return;
    finishSessionAction({ ...session, finishedAt: Date.now() });
    clearSession();
  }, [session, finishSessionAction, clearSession]);

  const getAnsweredCount = useCallback(() => {
    return session?.records.filter((r) => r.userAnswer !== null).length ?? 0;
  }, [session]);

  const getUnansweredIndices = useCallback(() => {
    const answered = new Set(session?.records.filter((r) => r.userAnswer !== null).map((r) => r.questionId) ?? []);
    return questionIds
      .map((id, idx) => (!answered.has(id) ? idx : -1))
      .filter((idx) => idx >= 0);
  }, [session, questionIds]);

  return {
    session,
    currentQuestionIndex,
    questionIds,
    currentQuestionId,
    currentRecord,
    submitAnswer,
    goToQuestion,
    goNext,
    goPrev,
    finishSession,
    markQuestionStart,
    getAnsweredCount,
    getUnansweredIndices,
    isFinished: session?.finishedAt !== null,
    totalQuestions: questionIds.length,
    answeredCount: getAnsweredCount(),
  };
}
