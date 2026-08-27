import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  ChevronLeft,
  CookingPot,
  BedDouble,
  Bath,
  Sofa,
  Shirt,
  Refrigerator,
  Plus,
} from 'lucide-react-native';
import GradientBackground from '../components/GradientBackground';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import FadeInView from '../components/FadeInView';
import { theme, GRAD } from '../constants/theme';
import { roomTaskCount } from '../game/taskLogic';
import type { IconCmp } from '../components/PrimaryButton';
import type { Room, Task } from '../game/taskLogic';

interface Props {
  rooms: Room[];
  tasks: Task[];
  onBack: () => void;
  onOpenEditor: () => void;
}

const ROOM_ICONS: Record<string, IconCmp> = {
  kitchen: CookingPot,
  bedroom: BedDouble,
  bathroom: Bath,
  living: Sofa,
  laundry: Shirt,
  other: Refrigerator,
};

function RoomsScreen({ rooms, tasks, onBack, onOpenEditor }: Props) {
  const back = (
    <Pressable onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={styles.back}>
      <ChevronLeft size={24} color={theme.colors.textPrimary} strokeWidth={2} />
    </Pressable>
  );

  return (
    <GradientBackground
      colors={GRAD.menuBg}
      blobs={[{ color: theme.colors.mint, size: 260, top: 100, left: -70, opacity: 0.08 }]}>
      <View style={styles.container}>
        <ScreenHeader title="Rooms" leftSlot={back} />

        <View style={styles.area}>
          <View style={styles.grid}>
            {rooms.map((room, i) => {
              const Icon = ROOM_ICONS[room.icon] ?? Refrigerator;
              const count = roomTaskCount(tasks, room.id);
              return (
                <FadeInView key={room.id} delay={i * 60} style={styles.tileSlot}>
                  <Pressable
                    onPress={onOpenEditor}
                    hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
                    style={styles.tile}>
                    <View style={[styles.dot, { backgroundColor: room.color }]} />
                    <View style={[styles.tileIcon, { backgroundColor: room.color + '1A' }]}>
                      <Icon size={26} color={room.color} strokeWidth={1.5} />
                    </View>
                    <Text style={styles.tileName} numberOfLines={1}>
                      {room.name}
                    </Text>
                    <Text style={styles.tileCount}>
                      {count} {count === 1 ? 'task' : 'tasks'}
                    </Text>
                  </Pressable>
                </FadeInView>
              );
            })}
          </View>

          <View style={styles.spacer} />

          <View style={styles.footer}>
            <PrimaryButton title="NEW TASK" Icon={Plus} onPress={onOpenEditor} height={52} />
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  back: { width: 48, height: 48, alignItems: 'flex-start', justifyContent: 'center' },
  area: { flex: 1, paddingHorizontal: theme.spacing.lg, paddingTop: 16, paddingBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tileSlot: { width: '48%', marginBottom: 14 },
  tile: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: 18,
    gap: 4,
    ...theme.shadow.soft,
  },
  dot: { position: 'absolute', top: 14, right: 14, width: 10, height: 10, borderRadius: 5 },
  tileIcon: {
    width: 52,
    height: 52,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tileName: { fontSize: 15, fontWeight: '700', color: theme.colors.textPrimary },
  tileCount: { fontSize: 12, fontWeight: '500', color: theme.colors.textMuted },
  spacer: { flex: 1, minHeight: 8 },
  footer: {},
});

export default RoomsScreen;
