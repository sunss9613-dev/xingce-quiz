import type { Module, SubCategory, AnswerKey } from './question';

export interface AnswerRecord {
  questionId: string;
  userAnswer: AnswerKey | null;
  isCorrect: boolean | null;
  timeSpentMs: number;
  timestamp: number;
}

export interface QuizSession {
  id: string;
  startedAt: number;
  finishedAt: number | null;
  mode: 'practice' | 'mock_exam' | 'category_practice' | 'wrong_book' | 'favorites' | 'daily';
  module?: Module;
  subCategory?: SubCategory;
  questionCount: number;
  config: QuizConfig;
  questionIds: string[];
  currentIndex: number;
  records: AnswerRecord[];
}

export interface QuizConfig {
  timed: boolean;
  timeLimitPerQuestion?: number;
  totalTimeLimit?: number;
  showAnswerImmediately: boolean;
}

export interface DailyStats {
  date: string;
  questionsAnswered: number;
  correctCount: number;
  totalTimeSpentMs: number;
  modulesPracticed: Module[];
}

export interface ModuleStats {
  module: Module;
  totalAttempted: number;
  totalCorrect: number;
  subCategoryBreakdown: Record<string, { attempted: number; correct: number }>;
}

export interface UserProgress {
  version: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string;
  dailyStats: DailyStats[];
  moduleStats: ModuleStats[];
  sessions: QuizSession[];
  wrongBook: string[];
  favorites: string[];
  checkInDates: string[];
}
