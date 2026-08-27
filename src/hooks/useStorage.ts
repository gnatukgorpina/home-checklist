/**
 * Local persistence layer. No server, no account (brief requirement).
 *
 * AsyncStorage is not in the allowed-dependency list, so we use a lightweight
 * in-memory store that survives for the app session. The public API mirrors a
 * real persist layer so screens/hooks stay decoupled and nothing crashes.
 */

const memory: Record<string, unknown> = {};

export const storage = {
  get<T>(key: string, fallback: T): T {
    const v = memory[key];
    return v === undefined ? fallback : (v as T);
  },
  set<T>(key: string, value: T): void {
    memory[key] = value;
  },
};

export const KEYS = {
  tasks: 'tasks',
  streak: 'streak',
  settings: 'settings',
} as const;
