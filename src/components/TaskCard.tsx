import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Pressable, View, Text, Animated, StyleSheet } from 'react-native';
import { Check, Repeat } from 'lucide-react-native';
import { theme } from '../constants/theme';
import { SPRING } from '../constants/config';

interface Props {
  id: string;
  name: string;
  roomName: string;
  roomColor: string;
  repeatText: string;
  done: boolean;
  onToggle: (id: string) => void;
}

/**
 * Checklist row. Whole card is the tap target. Toggling `done` visibly changes
 * state: the toggle fills mint, a Check springs in, and the label dims +
 * strikes through. Lightweight & memoised (rule 2.x).
 */
const TaskCard = memo(function TaskCard({
  id,
  name,
  roomName,
  roomColor,
  repeatText,
  done,
  onToggle,
}: Props) {
  const checkScale = useRef(new Animated.Value(done ? 1 : 0)).current;
  const cardScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(checkScale, {
      toValue: done ? 1 : 0,
      useNativeDriver: true,
      ...SPRING,
    }).start();
  }, [done, checkScale]);

  const handlePress = useCallback(() => onToggle(id), [id, onToggle]);
  const pressIn = () =>
    Animated.spring(cardScale, { toValue: 0.98, useNativeDriver: true, ...SPRING }).start();
  const pressOut = () =>
    Animated.spring(cardScale, { toValue: 1, useNativeDriver: true, ...SPRING }).start();

  return (
    <Pressable onPress={handlePress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View style={[styles.card, { transform: [{ scale: cardScale }], opacity: done ? 0.72 : 1 }]}>
        <View style={[styles.accent, { backgroundColor: roomColor }]} />

        <View
          style={[
            styles.toggle,
            done
              ? { backgroundColor: theme.colors.mint, borderColor: theme.colors.mint }
              : { borderColor: theme.colors.borderStrong },
          ]}>
          <Animated.View style={{ transform: [{ scale: checkScale }] }}>
            <Check size={18} color="#FFFFFF" strokeWidth={2.5} />
          </Animated.View>
        </View>

        <View style={styles.body}>
          <Text
            style={[
              styles.name,
              done && { textDecorationLine: 'line-through', color: theme.colors.textMuted },
            ]}
            numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.meta}>
            <View style={[styles.roomChip, { backgroundColor: roomColor + '22' }]}>
              <Text style={[styles.roomText, { color: roomColor }]} numberOfLines={1}>
                {roomName}
              </Text>
            </View>
            <Repeat size={12} color={theme.colors.textMuted} strokeWidth={2} />
            <Text style={styles.repeat}>{repeatText}</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
    ...theme.shadow.soft,
  },
  accent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  toggle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginLeft: 4,
  },
  body: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  roomChip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: theme.radius.pill },
  roomText: { fontSize: 11, fontWeight: '700' },
  repeat: { fontSize: 12, fontWeight: '500', color: theme.colors.textMuted },
});

export default TaskCard;
