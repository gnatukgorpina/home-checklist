import { useCallback, useEffect, useState } from 'react';
import type { Task } from '../game/taskLogic';
import { SEED_TASKS } from '../constants/config';
import { storage, KEYS } from './useStorage';

export interface UseTasks {
  tasks: Task[];
  toggle: (id: string) => void;
  resetDone: () => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
}

function loadInitial(): Task[] {
  // clone so seed data is never mutated
  return storage.get<Task[]>(KEYS.tasks, SEED_TASKS.map(t => ({ ...t })));
}

export function useTasks(): UseTasks {
  const [tasks, setTasks] = useState<Task[]>(loadInitial);

  useEffect(() => {
    storage.set(KEYS.tasks, tasks);
  }, [tasks]);

  const toggle = useCallback((id: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const resetDone = useCallback(() => {
    setTasks(prev => prev.map(t => ({ ...t, done: false })));
  }, []);

  const addTask = useCallback((task: Task) => {
    setTasks(prev => [...prev, task]);
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  return { tasks, toggle, resetDone, addTask, removeTask };
}
