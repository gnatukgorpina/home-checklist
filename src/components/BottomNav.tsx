import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CalendarCheck, Grid2x2, BarChart3 } from 'lucide-react-native';
import { theme } from '../constants/theme';
import type { IconCmp } from './PrimaryButton';

export type NavKey = 'today' | 'rooms' | 'progress';

interface Props {
  active: NavKey;
  onNavigate: (key: NavKey) => void;
}

const ITEMS: { key: NavKey; label: string; Icon: IconCmp }[] = [
  { key: 'today', label: 'Today', Icon: CalendarCheck },
  { key: 'rooms', label: 'Rooms', Icon: Grid2x2 },
  { key: 'progress', label: 'Progress', Icon: BarChart3 },
];

function BottomNav({ active, onNavigate }: Props) {
  return (
    <View style={styles.bar}>
      {ITEMS.map(({ key, label, Icon }) => {
        const on = key === active;
        const color = on ? theme.colors.primary : theme.colors.textMuted;
        return (
          <Pressable
            key={key}
            onPress={() => onNavigate(key)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={[styles.pill, on && { backgroundColor: theme.colors.primary + '1F' }]}>
            <Icon size={22} color={color} strokeWidth={1.8} />
            <Text style={[styles.label, { color }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    padding: 8,
    ...theme.shadow.soft,
  },
  pill: {
    flex: 1,
    height: 56,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
});

export default BottomNav;
