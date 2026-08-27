import { useCallback, useState } from 'react';
import { storage, KEYS } from './useStorage';

export interface UseProgress {
  streak: number;
  weekData: number[]; // completed tasks per weekday (Mon..Sun)
  weekPercent: number; // 0..100
  bumpStreak: (allDone: boolean) => void;
  recordDay: (doneCount: number) => void;
}

// seed a pleasant-looking week so the chart/stat is never empty on first run
const SEED_WEEK = [3, 5, 2, 4, 6, 1, 0];

export function useProgress(): UseProgress {
  const [streak, setStreak] = useState<number>(() => storage.get<number>(KEYS.streak, 4));
  const [weekData, setWeekData] = useState<number[]>(SEED_WEEK);

  const bumpStreak = useCallback((allDone: boolean) => {
    setStreak(prev => {
      const next = allDone ? prev + 1 : prev;
      storage.set(KEYS.streak, next);
      return next;
    });
  }, []);

  const recordDay = useCallback((doneCount: number) => {
    setWeekData(prev => {
      const next = prev.slice();
      const idx = (new Date().getDay() + 6) % 7; // Mon=0 .. Sun=6
      next[idx] = Math.max(next[idx], doneCount);
      return next;
    });
  }, []);

  const total = weekData.reduce((a, b) => a + b, 0);
  const max = weekData.length * 6; // rough weekly capacity for a percent
  const weekPercent = max === 0 ? 0 : Math.min(100, Math.round((total / max) * 100));

  return { streak, weekData, weekPercent, bumpStreak, recordDay };
}
