import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Rect } from 'react-native-svg';
import { theme } from '../constants/theme';
import { weekdayLetters } from '../utils/date';

interface Props {
  data: number[]; // 7 values (Mon..Sun)
  width: number;
  height?: number;
}

/**
 * Weekly completed-tasks bar chart (static SVG). mint-to-blue vertical gradient
 * per bar. Labels below use single letters (rule #16 — no emoji).
 */
function WeekBarChart({ data, width, height = 120 }: Props) {
  const letters = weekdayLetters();
  const max = Math.max(1, ...data);
  const n = data.length;
  const gap = 12;
  const barW = (width - gap * (n - 1)) / n;
  const chartH = height - 22; // leave room for labels

  return (
    <View style={{ width }}>
      <Svg width={width} height={chartH}>
        <Defs>
          <SvgGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={theme.colors.mint} />
            <Stop offset="1" stopColor={theme.colors.primary} />
          </SvgGradient>
        </Defs>
        {data.map((v, i) => {
          const h = Math.max(6, (v / max) * (chartH - 8));
          const x = i * (barW + gap);
          const y = chartH - h;
          return (
            <Rect
              key={i}
              x={x}
              y={y}
              width={barW}
              height={h}
              rx={barW / 3}
              fill="url(#barFill)"
            />
          );
        })}
      </Svg>
      <View style={styles.labels}>
        {letters.map((l, i) => (
          <Text key={i} style={[styles.label, { width: barW, marginRight: i < n - 1 ? gap : 0 }]}>
            {l}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labels: { flexDirection: 'row', marginTop: 8 },
  label: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
});

export default WeekBarChart;
