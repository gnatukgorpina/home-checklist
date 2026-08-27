/**
 * Task model + pure logic: today-filter, repeat rules, stats, streak.
 * No side effects — used by hooks/screens.
 */

export type RepeatRule = 'daily' | 'weekly' | 'once';

export interface Room {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Task {
  id: string;
  name: string;
  roomId: string;
  repeat: RepeatRule;
  done: boolean;
  reminder?: string;
}

export interface DayStats {
  done: number;
  total: number;
  ratio: number; // 0..1
  allDone: boolean;
}

export function repeatLabel(rule: RepeatRule): string {
  switch (rule) {
    case 'daily':
      return 'Daily';
    case 'weekly':
      return 'Weekly';
    case 'once':
      return 'Once';
  }
}

// which tasks are relevant "today". daily always, weekly/once while not done.
export function dueToday(tasks: Task[]): Task[] {
  return tasks.filter(t => t.repeat === 'daily' || t.repeat === 'weekly' || !t.done);
}

export function computeStats(tasks: Task[]): DayStats {
  const total = tasks.length;
  const done = tasks.reduce((n, t) => (t.done ? n + 1 : n), 0);
  const ratio = total === 0 ? 0 : done / total;
  return { done, total, ratio, allDone: total > 0 && done === total };
}

export function tasksForRoom(tasks: Task[], roomId: string): Task[] {
  return tasks.filter(t => t.roomId === roomId);
}

export function roomTaskCount(tasks: Task[], roomId: string): number {
  return tasks.reduce((n, t) => (t.roomId === roomId ? n + 1 : n), 0);
}

export function nextStreak(current: number, allDone: boolean): number {
  return allDone ? current + 1 : current;
}
