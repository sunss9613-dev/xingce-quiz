import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, QuizSession, AnswerRecord, DailyStats, ModuleStats } from '../models/user';
import { Module } from '../models/question';
import type { SubCategory } from '../models/question';
import { DATA_VERSION, STORAGE_KEYS, MODULE_SUB_CATEGORIES } from '../data/constants';
import { todayStr } from '../utils/streak';

function createInitialModuleStats(): ModuleStats[] {
  const modules = Object.values(Module);
  return modules.map((m) => ({
    module: m as Module,
    totalAttempted: 0,
    totalCorrect: 0,
    subCategoryBreakdown: {},
  }));
}

function createInitialProgress(): UserProgress {
  return {
    version: DATA_VERSION,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: '',
    dailyStats: [],
    moduleStats: createInitialModuleStats(),
    sessions: [],
    wrongBook: [],
    favorites: [],
    checkInDates: [],
  };
}

interface UserStore {
  progress: UserProgress;
  // Actions
  recordAnswer: (sessionId: string, record: AnswerRecord, questionModule: Module) => void;
  finishSession: (session: QuizSession) => void;
  addToWrongBook: (questionId: string) => void;
  removeFromWrongBook: (questionId: string) => void;
  toggleFavorite: (questionId: string) => void;
  isFavorite: (questionId: string) => boolean;
  checkInToday: () => void;
  getTodayStats: () => DailyStats | null;
  getModuleAccuracy: (module: Module) => number;
  resetAll: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      progress: createInitialProgress(),

      recordAnswer: (sessionId, record, questionModule) => {
        set((state) => {
          const progress = { ...state.progress };
          const session = progress.sessions.find((s) => s.id === sessionId);
          if (!session) return state;

          session.records.push(record);
          progress.totalQuestionsAnswered++;
          if (record.isCorrect) progress.totalCorrect++;

          // Update module stats
          const ms = progress.moduleStats.find((m) => m.module === questionModule);
          if (ms) {
            ms.totalAttempted++;
            if (record.isCorrect) ms.totalCorrect++;
          }

          return { progress };
        });
      },

      finishSession: (session) => {
        set((state) => {
          const progress = { ...state.progress };
          const existingIdx = progress.sessions.findIndex((s) => s.id === session.id);
          if (existingIdx >= 0) {
            progress.sessions[existingIdx] = { ...session, finishedAt: Date.now() };
          } else {
            progress.sessions.push({ ...session, finishedAt: Date.now() });
          }

          // Keep only last 100 sessions
          if (progress.sessions.length > 100) {
            progress.sessions = progress.sessions.slice(-100);
          }

          // Update daily stats
          const today = todayStr();
          const correctCount = session.records.filter((r) => r.isCorrect).length;
          const totalTime = session.records.reduce((sum, r) => sum + r.timeSpentMs, 0);
          const modulesPracticed = [...new Set(
            session.records.map(() => session.module).filter(Boolean) as Module[]
          )];

          const existingDaily = progress.dailyStats.find((d) => d.date === today);
          if (existingDaily) {
            existingDaily.questionsAnswered += session.records.length;
            existingDaily.correctCount += correctCount;
            existingDaily.totalTimeSpentMs += totalTime;
            existingDaily.modulesPracticed = [...new Set([...existingDaily.modulesPracticed, ...modulesPracticed])];
          } else {
            progress.dailyStats.push({
              date: today,
              questionsAnswered: session.records.length,
              correctCount,
              totalTimeSpentMs: totalTime,
              modulesPracticed,
            });
          }

          // Keep last 365 days
          if (progress.dailyStats.length > 365) {
            progress.dailyStats = progress.dailyStats.slice(-365);
          }

          // Update streak
          progress.lastPracticeDate = today;

          // Auto check-in
          if (!progress.checkInDates.includes(today)) {
            progress.checkInDates.push(today);
          }

          // Calculate streak
          const sortedDates = [...progress.checkInDates].sort();
          let streak = 0;
          if (sortedDates.length > 0) {
            const lastDate = sortedDates[sortedDates.length - 1];
            const last = new Date(lastDate);
            const todayDate = new Date();
            const diffDays = Math.floor(
              (todayDate.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
            );
            if (diffDays <= 1) {
              streak = 1;
              for (let i = sortedDates.length - 2; i >= 0; i--) {
                const curr = new Date(sortedDates[i]);
                const next = new Date(sortedDates[i + 1]);
                const diff = Math.floor((next.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24));
                if (diff === 1) streak++;
                else break;
              }
            }
          }
          progress.currentStreak = streak;
          if (streak > progress.longestStreak) progress.longestStreak = streak;

          // Update subcategory breakdowns per record
          const sessionModule = session.module;
          const sessionSub = session.subCategory;
          if (sessionModule && sessionSub) {
            const ms = progress.moduleStats.find((m) => m.module === sessionModule);
            if (ms) {
              if (!ms.subCategoryBreakdown[sessionSub]) {
                ms.subCategoryBreakdown[sessionSub] = { attempted: 0, correct: 0 };
              }
              ms.subCategoryBreakdown[sessionSub].attempted += session.records.length;
              ms.subCategoryBreakdown[sessionSub].correct += correctCount;
            }
          }

          return { progress };
        });
      },

      addToWrongBook: (questionId) => {
        set((state) => {
          if (state.progress.wrongBook.includes(questionId)) return state;
          return {
            progress: {
              ...state.progress,
              wrongBook: [...state.progress.wrongBook, questionId],
            },
          };
        });
      },

      removeFromWrongBook: (questionId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            wrongBook: state.progress.wrongBook.filter((id) => id !== questionId),
          },
        }));
      },

      toggleFavorite: (questionId) => {
        set((state) => {
          const isFav = state.progress.favorites.includes(questionId);
          return {
            progress: {
              ...state.progress,
              favorites: isFav
                ? state.progress.favorites.filter((id) => id !== questionId)
                : [...state.progress.favorites, questionId],
            },
          };
        });
      },

      isFavorite: (questionId) => {
        return get().progress.favorites.includes(questionId);
      },

      checkInToday: () => {
        const today = todayStr();
        set((state) => {
          if (state.progress.checkInDates.includes(today)) return state;
          const newDates = [...state.progress.checkInDates, today];
          // Recalculate streak
          const sortedDates = [...newDates].sort();
          let streak = 1;
          for (let i = sortedDates.length - 2; i >= 0; i--) {
            const curr = new Date(sortedDates[i]);
            const next = new Date(sortedDates[i + 1]);
            const diff = Math.floor((next.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24));
            if (diff === 1) streak++;
            else break;
          }
          return {
            progress: {
              ...state.progress,
              checkInDates: newDates,
              currentStreak: streak,
              longestStreak: Math.max(streak, state.progress.longestStreak),
            },
          };
        });
      },

      getTodayStats: () => {
        const today = todayStr();
        return get().progress.dailyStats.find((d) => d.date === today) ?? null;
      },

      getModuleAccuracy: (module) => {
        const ms = get().progress.moduleStats.find((m) => m.module === module);
        if (!ms || ms.totalAttempted === 0) return 0;
        return ms.totalCorrect / ms.totalAttempted;
      },

      resetAll: () => {
        set({ progress: createInitialProgress() });
      },

      exportData: () => {
        return JSON.stringify(get().progress, null, 2);
      },

      importData: (json: string) => {
        try {
          const data = JSON.parse(json) as UserProgress;
          if (typeof data.version !== 'number') return false;
          set({ progress: data });
          return true;
        } catch {
          return false;
        }
      },
    }),
    {
      name: STORAGE_KEYS.USER_PROGRESS,
    }
  )
);
