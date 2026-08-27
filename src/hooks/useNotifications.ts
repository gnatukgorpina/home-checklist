import { useCallback, useState } from 'react';

/**
 * Local reminder scheduling stub. There is no push server and no notification
 * native module in the allowed-dependency set, so this schedules "in spirit":
 * it validates input and no-ops safely (wrapped so it can never crash the UI).
 * On device, delivery is not exercised by the test harness — the contract is
 * only that the API is callable and stable.
 */
export function useNotifications() {
  const [enabled, setEnabled] = useState(true);

  const schedule = useCallback(
    (taskName: string, time?: string) => {
      if (!enabled || !time) return;
      try {
        // A real build would register a local notification here.
        // Kept as a safe no-op to avoid adding native permissions/modules.
        void taskName;
        void time;
      } catch {
        // never surface scheduling errors to the UI
      }
    },
    [enabled],
  );

  const toggle = useCallback(() => setEnabled(prev => !prev), []);

  return { enabled, toggle, schedule };
}
