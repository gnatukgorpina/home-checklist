import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Switch, StyleSheet } from 'react-native';
import { X, Bell } from 'lucide-react-native';
import GradientBackground from '../components/GradientBackground';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import RoomChip from '../components/RoomChip';
import { theme, GRAD } from '../constants/theme';
import { genId } from '../utils/date';
import type { Room, Task, RepeatRule } from '../game/taskLogic';

interface Props {
  rooms: Room[];
  onSave: (task: Task) => void;
  onClose: () => void;
}

const REPEATS: { key: RepeatRule; label: string }[] = [
  { key: 'daily', label: 'Daily' },
  { key: 'weekly', label: 'Weekly' },
  { key: 'once', label: 'Once' },
];

function TaskEditorScreen({ rooms, onSave, onClose }: Props) {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState(rooms.length ? rooms[0].id : 'kitchen');
  const [repeat, setRepeat] = useState<RepeatRule>('daily');
  const [notify, setNotify] = useState(true);

  const handleSave = () => {
    const task: Task = {
      id: genId(),
      name: name.trim() || 'New task',
      roomId,
      repeat,
      done: false,
      reminder: notify ? '09:00' : undefined,
    };
    onSave(task);
  };

  const close = (
    <Pressable onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={styles.close}>
      <X size={24} color={theme.colors.textPrimary} strokeWidth={2} />
    </Pressable>
  );

  return (
    <GradientBackground colors={GRAD.menuBg}>
      <View style={styles.container}>
        <ScreenHeader title="New task" rightSlot={close} />

        <View style={styles.area}>
          <Text style={styles.section}>TASK NAME</Text>
          <View style={styles.inputCard}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Take out the trash"
              placeholderTextColor={theme.colors.textMuted}
              style={styles.input}
            />
          </View>

          <Text style={styles.section}>ROOM</Text>
          <View style={styles.chipRow}>
            {rooms.map(room => (
              <RoomChip
                key={room.id}
                label={room.name}
                color={room.color}
                active={roomId === room.id}
                onPress={() => setRoomId(room.id)}
              />
            ))}
          </View>

          <Text style={styles.section}>REPEAT</Text>
          <View style={styles.chipRow}>
            {REPEATS.map(r => (
              <RoomChip
                key={r.key}
                label={r.label}
                color={theme.colors.primary}
                active={repeat === r.key}
                onPress={() => setRepeat(r.key)}
              />
            ))}
          </View>

          <View style={styles.reminder}>
            <View style={styles.reminderIcon}>
              <Bell size={18} color={theme.colors.primary} strokeWidth={2} />
            </View>
            <View style={styles.reminderText}>
              <Text style={styles.reminderTitle}>Remind me</Text>
              <Text style={styles.reminderSub}>Local notification at 09:00</Text>
            </View>
            <Switch
              value={notify}
              onValueChange={setNotify}
              trackColor={{ false: theme.colors.border, true: theme.colors.mint }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.spacer} />

          <PrimaryButton title="SAVE TASK" onPress={handleSave} />
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  close: { width: 48, height: 48, alignItems: 'flex-end', justifyContent: 'center' },
  area: { flex: 1, paddingHorizontal: theme.spacing.lg, paddingTop: 16, paddingBottom: 24 },
  section: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.textMuted,
    marginTop: 20,
    marginBottom: 10,
  },
  inputCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    ...theme.shadow.soft,
  },
  input: { height: 52, fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  reminder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: 16,
    marginTop: 24,
    ...theme.shadow.soft,
  },
  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary + '14',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderText: { flex: 1 },
  reminderTitle: { fontSize: 15, fontWeight: '700', color: theme.colors.textPrimary },
  reminderSub: { fontSize: 12, fontWeight: '500', color: theme.colors.textMuted, marginTop: 2 },
  spacer: { flex: 1, minHeight: 16 },
});

export default TaskEditorScreen;
