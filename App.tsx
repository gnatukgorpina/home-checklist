import React, { useCallback, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import LoaderScreen from './src/screens/LoaderScreen';
import MenuScreen from './src/screens/MenuScreen';
import GameScreen from './src/screens/GameScreen';
import RoomsScreen from './src/screens/RoomsScreen';
import TaskEditorScreen from './src/screens/TaskEditorScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import ResultScreen from './src/screens/ResultScreen';

import { useTasks } from './src/hooks/useTasks';
import { useProgress } from './src/hooks/useProgress';
import { useNotifications } from './src/hooks/useNotifications';
import { SEED_ROOMS } from './src/constants/config';
import { computeStats } from './src/game/taskLogic';
import type { Task } from './src/game/taskLogic';
import type { NavKey } from './src/components/BottomNav';
import { theme } from './src/constants/theme';

// Screen union includes the discrete 'result' (game-over) state (rule #12).
type Screen = 'loader' | 'today' | 'game' | 'rooms' | 'editor' | 'progress' | 'result';

function App(): React.JSX.Element {
  const [screen, setScreen] = useState<Screen>('loader');
  const [completedCount, setCompletedCount] = useState(0);

  const { tasks, toggle, resetDone, addTask } = useTasks();
  const { streak, weekData, weekPercent, bumpStreak, recordDay } = useProgress();
  const { enabled: notifEnabled, toggle: toggleNotif, schedule } = useNotifications();

  const stats = computeStats(tasks);

  const goToday = useCallback(() => setScreen('today'), []);
  const goGame = useCallback(() => setScreen('game'), []);
  const goRooms = useCallback(() => setScreen('rooms'), []);
  const goEditor = useCallback(() => setScreen('editor'), []);

  const goResult = useCallback(() => {
    const s = computeStats(tasks);
    setCompletedCount(s.done);
    bumpStreak(s.allDone);
    recordDay(s.done);
    setScreen('result');
  }, [tasks, bumpStreak, recordDay]);

  const goAgain = useCallback(() => {
    resetDone();
    setScreen('game');
  }, [resetDone]);

  const onNavigate = useCallback((key: NavKey) => {
    if (key === 'rooms') setScreen('rooms');
    else if (key === 'progress') setScreen('progress');
    else setScreen('today');
  }, []);

  const handleSaveTask = useCallback(
    (task: Task) => {
      addTask(task);
      schedule(task.name, task.reminder);
      setScreen('today');
    },
    [addTask, schedule],
  );

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {screen === 'loader' ? <LoaderScreen onDone={goToday} /> : null}

      {screen === 'today' ? (
        <MenuScreen
          taskCount={stats.total}
          doneCount={stats.done}
          streak={streak}
          onStart={goGame}
          onNavigate={onNavigate}
          onManage={goRooms}
        />
      ) : null}

      {screen === 'game' ? (
        <GameScreen
          tasks={tasks}
          rooms={SEED_ROOMS}
          onToggle={toggle}
          onFinish={goResult}
          onAddTask={goEditor}
          onBack={goToday}
        />
      ) : null}

      {screen === 'rooms' ? (
        <RoomsScreen rooms={SEED_ROOMS} tasks={tasks} onBack={goToday} onOpenEditor={goEditor} />
      ) : null}

      {screen === 'editor' ? (
        <TaskEditorScreen rooms={SEED_ROOMS} onSave={handleSaveTask} onClose={goToday} />
      ) : null}

      {screen === 'progress' ? (
        <ProgressScreen
          weekData={weekData}
          doneCount={stats.done}
          totalCount={stats.total}
          streak={streak}
          weekPercent={weekPercent}
          notifEnabled={notifEnabled}
          onToggleNotif={toggleNotif}
          onBack={goToday}
        />
      ) : null}

      {screen === 'result' ? (
        <ResultScreen
          completedCount={completedCount}
          streak={streak}
          onAgain={goAgain}
          onMenu={goToday}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
});

export default App;
