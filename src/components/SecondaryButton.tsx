import React, { useRef } from 'react';
import { Pressable, Text, Animated, StyleSheet, View } from 'react-native';
import { theme } from '../constants/theme';
import { SPRING } from '../constants/config';
import type { IconCmp } from './PrimaryButton';

interface Props {
  title: string;
  onPress: () => void;
  Icon?: IconCmp;
  tint?: string;
  danger?: boolean;
  height?: number;
}

/**
 * Secondary action: translucent fill + border. Same icon-centering contract as
 * PrimaryButton (icon 24, lineHeight 24, gap 10) for cross-button consistency.
 */
function SecondaryButton({ title, onPress, Icon, tint, danger, height = 48 }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const color = danger ? theme.colors.coral : tint ?? theme.colors.primary;

  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, ...SPRING }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, ...SPRING }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={{ width: '100%', height }}>
      <Animated.View
        style={[
          styles.shell,
          { height, borderColor: color, backgroundColor: color + '14' },
          { transform: [{ scale }] },
        ]}>
        <View style={styles.row}>
          {Icon ? <Icon size={24} color={color} strokeWidth={2} /> : null}
          <Text style={[styles.label, { color }]}>{title}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: '100%',
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  label: { fontSize: 15, fontWeight: '700', lineHeight: 24, letterSpacing: 0.3 },
});

export default SecondaryButton;
