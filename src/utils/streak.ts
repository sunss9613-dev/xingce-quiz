import { isYesterday, isToday, parseISO, differenceInCalendarDays } from 'date-fns';

/**
 * Calculate current streak from check-in dates.
 * Assumes dates is a sorted array of "YYYY-MM-DD" strings.
 */
export function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const sorted = [...dates].sort();
  const lastDate = parseISO(sorted[sorted.length - 1]);

  // Streak is broken if the last check-in is not today or yesterday
  if (!isToday(lastDate) && !isYesterday(lastDate)) return 0;

  let streak = 1;
  for (let i = sorted.length - 2; i >= 0; i--) {
    const current = parseISO(sorted[i]);
    const next = parseISO(sorted[i + 1]);
    if (differenceInCalendarDays(next, current) === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/** Get today's date as "YYYY-MM-DD" */
export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
