import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { CheckCircle2, Flame } from 'lucide-react-native';
import GradientBackground from '../components/GradientBackground';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import StatCard from '../components/StatCard';
import { theme, GRAD } from '../constants/theme';
import { CELEBRATE_SPRING } from '../constants/config';

interface Props {
  completedCount: number;
  streak: number;
  onAgain: () => void;
  onMenu: () => void;
}

const { width: SCREEN_W } = Dimensions.get('window');
const CONFETTI_COLORS = [theme.colors.mint, theme.colors.primary, '#F2A65A', '#9B8CFF'];

/** Confetti kept in the TOP band only — never crosses the heading letters (rule #17). */
function Confetti() {
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: 16 + Math.random() * (SCREEN_W - 32),
        y: 20 + Math.random() * 150,
        size: 6 + Math.random() * 8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 250,
      })),
    [],
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {dots.map(d => (
        <ConfettiDot key={d.id} {...d} />
      ))}
    </View>
  );
}

function ConfettiDot({
  x,
  y,
  size,
  color,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0.85, duration: 450, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 550, delay, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY, delay]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
        transform: [{ translateY }],
      }}
    />
  );
}

function ResultScreen({ completedCount, streak, onAgain, onMenu }: Props) {
  const circleScale = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.spring(circleScale, {
      toValue: 1,
      useNativeDriver: true,
      ...CELEBRATE_SPRING,
    }).start();
  }, [circleScale]);

  return (
    <GradientBackground colors={GRAD.resultBg}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Confetti />
      <View style={styles.container}>
        <Animated.View style={[styles.circle, { transform: [{ scale: circleScale }] }]}>
          <CheckCircle2 size={64} color="#FFFFFF" strokeWidth={1.5} />
        </Animated.View>

        <Text style={styles.title}>ALL DONE!</Text>
        <Text style={styles.subtitle}>
          You completed {completedCount} {completedCount === 1 ? 'task' : 'tasks'} today
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statSlot}>
            <StatCard
              Icon={CheckCircle2}
              value={`${completedCount}`}
              label="Done"
              valueColor={theme.colors.mint}
            />
          </View>
          <View style={styles.statSlot}>
            <StatCard
              Icon={Flame}
              value={`${streak} days`}
              label="Streak"
              valueColor={theme.colors.primary}
            />
          </View>
        </View>

        <View style={styles.actions}>
          <PrimaryButton title="START AGAIN" onPress={onAgain} />
          <SecondaryButton title="Back to Today" onPress={onMenu} />
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: theme.colors.mint,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 28, width: '100%' },
  statSlot: { flex: 1 },
  actions: { width: '100%', gap: 12, marginTop: 32 },
});

export default ResultScreen;
