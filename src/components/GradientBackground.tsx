import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Blob {
  color: string;
  size: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  opacity?: number;
}

interface Props {
  colors: string[];
  blobs?: Blob[];
  children: React.ReactNode;
}

/**
 * Depth layer 1: full-screen diagonal gradient + soft colored blobs.
 * Never flat/one-tone (design rule). pointerEvents none — purely decorative.
 */
function GradientBackground({ colors, blobs = [], children }: Props) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.fill}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {blobs.map((b, i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              width: b.size,
              height: b.size,
              borderRadius: b.size / 2,
              backgroundColor: b.color,
              opacity: b.opacity ?? 0.1,
              top: b.top,
              bottom: b.bottom,
              left: b.left,
              right: b.right,
            }}
          />
        ))}
      </View>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});

export default GradientBackground;
