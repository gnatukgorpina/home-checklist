import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import type { IconCmp } from './PrimaryButton';

interface Props {
  Icon: IconCmp;
  value: string;
  label: string;
  valueColor: string;
}

/**
 * Single stat pill, one shared component across every screen (rule #21).
 * lucide icon in a fixed 44x44 circle - perfectly centred, no AI-sprite
 * aspect chaos. card uses width:'100%' (NOT flex:1) so its parent slot can be
 * flex:1 without the circular-flex collapse bug (rule #17).
 */
const StatCard = memo(function StatCard({ Icon, value, label, valueColor }: Props) {
  return (
    <View style={[styles.card, { borderColor: valueColor + '33' }]}>
      <View style={[styles.iconWrap, { backgroundColor: valueColor + '1A' }]}>
        <Icon size={22} color={valueColor} strokeWidth={2} />
      </View>
      <Text style={[styles.value, { color: valueColor }]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 6,
    ...theme.shadow.soft,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  value: { fontSize: 22, fontWeight: '700' },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
  },
});

export default StatCard;
