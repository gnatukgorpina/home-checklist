import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface Props {
  label: string;
  color: string;
  active?: boolean;
  onPress?: () => void;
}

/** Small selectable pill used for rooms / repeat rules in the editor & meta. */
function RoomChip({ label, color, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      style={[
        styles.chip,
        {
          backgroundColor: active ? color + '22' : theme.colors.bgSecondary,
          borderColor: active ? color : theme.colors.border,
        },
      ]}>
      <Text
        style={[styles.text, { color: active ? color : theme.colors.textSecondary }]}
        numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 13, fontWeight: '600', letterSpacing: 0.2 },
});

export default RoomChip;
