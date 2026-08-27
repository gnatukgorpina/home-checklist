import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, StatusBar } from 'react-native';
import { Home, CheckCircle2 } from 'lucide-react-native';
import GradientBackground from '../components/GradientBackground';
import { theme, GRAD } from '../constants/theme';
import { LOADER_DURATION_MS, SPRING } from '../constants/config';

interface Props {
  onDone: () => void;
}

const BAR_W = 168;

/**
 * Splash. Dark steel-blue palette — deliberately different from the light Menu
 * (rule #14) so the loader/menu pHash never collides. Wall-clock setTimeout
 * drives the transition; the bar fill is a short ONE-SHOT (no loop, so uiautomator
 * stays responsive for the capture pass).
 */
function LoaderScreen({ onDone }: Props) {
  const cardScale = useRef(new Animated.Value(0.6)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(12)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const barW = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(cardScale, { toValue: 1, useNativeDriver: true, ...SPRING }),
        Animated.timing(cardOpacity, { toValue: 1, duration: 320, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(titleY, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(titleOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]),
    ]).start();

    // width animation cannot use the native driver (rule #4/#8) — kept short & one-shot
    Animated.timing(barW, {
      toValue: BAR_W,
      duration: 1800,
      useNativeDriver: false,
    }).start();

    const t = setTimeout(onDone, LOADER_DURATION_MS);
    return () => clearTimeout(t);
  }, [onDone, cardScale, cardOpacity, titleY, titleOpacity, barW]);

  return (
    <GradientBackground
      colors={GRAD.loaderBg}
      blobs={[{ color: theme.colors.primary, size: 320, top: -60, left: 40, opacity: 0.18 }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.center}>
        <Animated.View
          style={[styles.brandCard, { opacity: cardOpacity, transform: [{ scale: cardScale }] }]}>
          <Home size={48} color={theme.colors.primary} strokeWidth={1.5} />
          <View style={styles.badge}>
            <CheckCircle2 size={26} color={theme.colors.mint} strokeWidth={2} />
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleY }] }}>
          <Text style={styles.title}>HomeChecklist</Text>
          <Text style={styles.subtitle}>TIDY HOME, CLEAR MIND</Text>
        </Animated.View>

        <View style={styles.track}>
          <Animated.View style={[styles.fill, { width: barW }]} />
        </View>
        <Text style={styles.loading}>LOADING…</Text>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 40 },
  brandCard: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: theme.colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  badge: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: theme.colors.bg,
    borderRadius: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#FAFAFA',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  track: {
    width: BAR_W,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginTop: 40,
    overflow: 'hidden',
  },
  fill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.mint,
  },
  loading: {
    marginTop: 14,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.5)',
  },
});

export default LoaderScreen;
