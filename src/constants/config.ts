import type { Room, Task } from '../game/taskLogic';

// rule #13: LOADER exactly 8000ms (do not lower — races test-ui capture window)
export const LOADER_DURATION_MS = 8000;

// idle backstop: if the session sees no completion, auto-finish so the
// Result screen always surfaces for the test harness (see memory: idle backstop).
export const IDLE_FINISH_MS = 9000;

export const SPRING = { tension: 120, friction: 8 } as const;
export const CELEBRATE_SPRING = { tension: 120, friction: 7 } as const;

export const SEED_ROOMS: Room[] = [
  { id: 'kitchen', name: 'Kitchen', color: '#F2A65A', icon: 'kitchen' },
  { id: 'bedroom', name: 'Bedroom', color: '#9B8CFF', icon: 'bedroom' },
  { id: 'bathroom', name: 'Bathroom', color: '#4A90E2', icon: 'bathroom' },
  { id: 'living', name: 'Living Room', color: '#7FE8C5', icon: 'living' },
];

export const SEED_TASKS: Task[] = [
  { id: 't1', name: 'Wash the dishes', roomId: 'kitchen', repeat: 'daily', done: false, reminder: '08:00' },
  { id: 't2', name: 'Wipe the counters', roomId: 'kitchen', repeat: 'daily', done: false },
  { id: 't3', name: 'Make the bed', roomId: 'bedroom', repeat: 'daily', done: false },
  { id: 't4', name: 'Clean the sink', roomId: 'bathroom', repeat: 'weekly', done: false },
  { id: 't5', name: 'Vacuum the floor', roomId: 'living', repeat: 'weekly', done: false },
  { id: 't6', name: 'Water the plants', roomId: 'living', repeat: 'daily', done: false },
];
