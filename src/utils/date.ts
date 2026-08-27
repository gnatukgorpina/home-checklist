const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function todayLabel(): { weekday: string; day: number } {
  const d = new Date();
  return { weekday: WEEKDAYS[d.getDay()], day: d.getDate() };
}

export function weekdayFull(): string {
  return WEEKDAYS_FULL[new Date().getDay()];
}

export function weekdayLetters(): string[] {
  // Mon..Sun single letters for the week chart
  return ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
}

export function genId(): string {
  return `t${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;
}
