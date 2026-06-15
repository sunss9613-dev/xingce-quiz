import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizSession, QuizConfig } from '../models/user';
import type { Module, SubCategory } from '../models/question';
import { STORAGE_KEYS } from '../data/constants';
import { nanoid } from 'nanoid';

interface QuizStore {
  currentSession: QuizSession | null;

  startSession: (params: {
    questionIds: string[];
    mode: QuizSession['mode'];
    module?: Module;
    subCategory?: SubCategory;
    config: QuizConfig;
  }) => QuizSession;

  setCurrentIndex: (index: number) => void;
  clearSession: () => void;
  updateSessionConfig: (config: Partial<QuizConfig>) => void;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      currentSession: null,

      startSession: ({ questionIds, mode, module, subCategory, config }) => {
        const session: QuizSession = {
          id: nanoid(8),
          startedAt: Date.now(),
          finishedAt: null,
          mode,
          module,
          subCategory,
          questionCount: questionIds.length,
          config,
          questionIds,
          currentIndex: 0,
          records: [],
        };
        set({ currentSession: session });
        return session;
      },

      setCurrentIndex: (index) => {
        set((state) => {
          if (!state.currentSession) return state;
          return {
            currentSession: {
              ...state.currentSession,
              currentIndex: Math.max(0, Math.min(index, state.currentSession.questionIds.length - 1)),
            },
          };
        });
      },

      clearSession: () => {
        set({ currentSession: null });
      },

      updateSessionConfig: (config) => {
        set((state) => {
          if (!state.currentSession) return state;
          return {
            currentSession: {
              ...state.currentSession,
              config: { ...state.currentSession.config, ...config },
            },
          };
        });
      },
    }),
    {
      name: STORAGE_KEYS.CURRENT_SESSION,
    }
  )
);
