import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface Props {
  title: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

/**
 * Shared header reused across Game / Rooms / Editor / Progress so the back
 * button, title and right accessory never drift in style between screens.
 * paddingTop:44 clears the status bar (rule #6).
 */
function ScreenHeader({ title, leftSlot, rightSlot }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.side}>{leftSlot ?? <View style={styles.slot} />}</View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.side, styles.sideRight]}>
        {rightSlot ?? <View style={styles.slot} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 44,
    paddingBottom: 12,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  side: { width: 56, alignItems: 'flex-start', justifyContent: 'center' },
  sideRight: { alignItems: 'flex-end' },
  slot: { width: 48, height: 48 },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: 0.2,
  },
});

export default ScreenHeader;
