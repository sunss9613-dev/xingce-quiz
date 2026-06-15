import type { Question } from '../models/question';
import type { UserProgress } from '../models/user';
import { Module, SubCategory } from '../models/question';
import { shuffle } from './shuffle';

/**
 * Pick questions for a practice session.
 */
export function pickQuestions(
  allQuestions: Question[],
  options: {
    count: number;
    module?: Module;
    subCategory?: SubCategory;
    excludeIds?: string[];
    prioritizeWeakAreas?: boolean;
    userProgress?: UserProgress;
  }
): Question[] {
  let pool = [...allQuestions];

  // Filter by module
  if (options.module) {
    pool = pool.filter((q) => q.module === options.module);
  }

  // Filter by subcategory
  if (options.subCategory) {
    pool = pool.filter((q) => q.subCategory === options.subCategory);
  }

  // Exclude already-seen IDs if needed
  if (options.excludeIds && options.excludeIds.length > 0) {
    const excludeSet = new Set(options.excludeIds);
    pool = pool.filter((q) => !excludeSet.has(q.id));
  }

  // If prioritizing weak areas, sort by wrong count
  if (options.prioritizeWeakAreas && options.userProgress) {
    const wrongCounts = getWrongCounts(options.userProgress);
    pool.sort((a, b) => (wrongCounts.get(b.id) ?? 0) - (wrongCounts.get(a.id) ?? 0));
  }

  // Shuffle and take requested count
  const shuffled = shuffle(pool);
  return shuffled.slice(0, Math.min(options.count, shuffled.length));
}

/**
 * Pick questions evenly distributed across modules (for mock exams).
 */
export function pickMockExamQuestions(
  allQuestions: Question[],
  distribution: Record<Module, number>
): Question[] {
  const result: Question[] = [];

  for (const [module, count] of Object.entries(distribution) as [Module, number][]) {
    const modulePool = allQuestions.filter((q) => q.module === module);
    const picked = shuffle(modulePool).slice(0, count);
    result.push(...picked);
  }

  return shuffle(result); // Shuffle so modules are interleaved
}

/** Count how many times each question was answered wrong */
function getWrongCounts(progress: UserProgress): Map<string, number> {
  const counts = new Map<string, number>();
  for (const session of progress.sessions) {
    for (const record of session.records) {
      if (record.isCorrect === false) {
        counts.set(record.questionId, (counts.get(record.questionId) ?? 0) + 1);
      }
    }
  }
  return counts;
}
