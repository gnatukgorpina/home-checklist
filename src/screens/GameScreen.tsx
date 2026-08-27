import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, ListRenderItemInfo, StatusBar } from 'react-native';
import { ChevronLeft, Plus, ClipboardList } from 'lucide-react-native';
import GradientBackground from '../components/GradientBackground';
import ScreenHeader from '../components/ScreenHeader';
import ProgressRing from '../components/ProgressRing';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import TaskCard from '../components/TaskCard';
import { theme, GRAD } from '../constants/theme';
import { IDLE_FINISH_MS } from '../constants/config';
import { computeStats, repeatLabel } from '../game/taskLogic';
import type { Room, Task } from '../game/taskLogic';

interface Props {
  tasks: Task[];
  rooms: Room[];
  onToggle: (id: string) => void;
  onFinish: () => void;
  onAddTask: () => void;
  onBack: () => void;
}

/** Active session — tap tasks to complete them; live progress ring + bar. */
function GameScreen({ tasks, rooms, onToggle, onFinish, onAddTask, onBack }: Props) {
  const stats = computeStats(tasks);
  const roomMap = useMemo(() => {
    const m: Record<string, Room> = {};
    rooms.forEach(r => (m[r.id] = r));
    return m;
  }, [rooms]);

  // keep latest onFinish for the timers without re-arming them
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;

  // idle backstop: guarantees the Result screen surfaces even with no taps
  useEffect(() => {
    const t = setTimeout(() => finishRef.current(), IDLE_FINISH_MS);
    return () => clearTimeout(t);
  }, []);

  // finish shortly after everything is checked off
  useEffect(() => {
    if (!stats.allDone) return;
    const t = setTimeout(() => finishRef.current(), 800);
    return () => clearTimeout(t);
  }, [stats.allDone]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Task>) => {
      const room = roomMap[item.roomId];
      return (
        <TaskCard
          id={item.id}
          name={item.name}
          roomName={room ? room.name : 'Home'}
          roomColor={room ? room.color : theme.colors.primary}
          repeatText={repeatLabel(item.repeat)}
          done={item.done}
          onToggle={onToggle}
        />
      );
    },
    [roomMap, onToggle],
  );

  const back = (
    <Pressable onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={styles.back}>
      <ChevronLeft size={24} color={theme.colors.textPrimary} strokeWidth={2} />
    </Pressable>
  );
  const ring = (
    <ProgressRing size={40} progress={stats.ratio} label={`${stats.done}/${stats.total}`} />
  );

  return (
    <GradientBackground colors={GRAD.menuBg} blobs={[{ color: theme.colors.mint, size: 260, top: 120, right: -80, opacity: 0.08 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <ScreenHeader title="Today's tasks" leftSlot={back} rightSlot={ring} />

        <View style={styles.area}>
          {stats.total === 0 ? (
            <View style={styles.empty}>
              <ClipboardList size={40} color={theme.colors.textMuted} strokeWidth={1.5} />
              <Text style={styles.emptyText}>No tasks yet</Text>
              <Text style={styles.emptySub}>Add your first chore to get started</Text>
            </View>
          ) : (
            <FlatList
              data={tasks}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <View style={styles.controls}>
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>
              {stats.done} of {stats.total} done
            </Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${Math.round(stats.ratio * 100)}%` }]} />
          </View>
          <PrimaryButton title="FINISH DAY" onPress={onFinish} height={52} />
          <SecondaryButton title="+ Add task" Icon={Plus} onPress={onAddTask} height={48} />
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  back: {
    width: 48,
    height: 48,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  area: { flex: 1, paddingHorizontal: theme.spacing.lg },
  listContent: { paddingTop: 16, paddingBottom: 8 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyText: { fontSize: 17, fontWeight: '700', color: theme.colors.textSecondary, marginTop: 8 },
  emptySub: { fontSize: 13, color: theme.colors.textMuted },

  controls: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressText: { fontSize: 13, fontWeight: '600', color: theme.colors.textSecondary },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.border,
    overflow: 'hidden',
  },
  fill: { height: 8, borderRadius: 4, backgroundColor: theme.colors.mint },
});

export default GameScreen;
