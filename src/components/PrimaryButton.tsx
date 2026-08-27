import React, { useRef } from 'react';
import { Pressable, Text, Animated, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';
import { SPRING } from '../constants/config';

// lucide's LucideIcon (ForwardRefExoticComponent) is not assignable to a
// narrow ComponentType due to propTypes variance — use `any` (known trap).
export type IconCmp = React.ComponentType<any>;

interface Props {
  title: string;
  onPress: () => void;
  Icon?: IconCmp;
  colors?: string[];
  height?: number;
}

/**
 * Primary CTA. Pressable is the PARENT (working press pattern for this stack);
 * the Animated.View lives INSIDE it, so no box-none needed. Native-driver
 * scale on transform only.
 *
 * Icon-centering (rule #14/#20): row + center + gap:10, icon 24×24,
 * label lineHeight 24. No absolute positioning, no mixed icon sizes.
 */
function PrimaryButton({ title, onPress, Icon, colors, height = 56 }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

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
      <Animated.View style={[styles.shell, { height }, theme.shadow.button, { transform: [{ scale }] }]}>
        <LinearGradient
          colors={colors ?? ['#4A90E2', '#5B9EE8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.grad, { height }]}>
          <View style={styles.row}>
            {Icon ? <Icon size={24} color="#FFFFFF" strokeWidth={2} /> : null}
            <Text style={styles.label}>{title}</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: '100%',
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
  },
  grad: {
    flex: 1,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});

export default PrimaryButton;
