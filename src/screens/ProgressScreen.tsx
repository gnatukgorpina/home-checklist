import React from 'react';
import { View, Text, Pressable, Switch, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
  ChevronLeft,
  Bell,
  Clock,
  Trash2,
  Info,
  CheckCircle2,
  Flame,
  BarChart3,
} from 'lucide-react-native';
import GradientBackground from '../components/GradientBackground';
import ScreenHeader from '../components/ScreenHeader';
import StatCard from '../components/StatCard';
import WeekBarChart from '../components/WeekBarChart';
import { theme, GRAD } from '../constants/theme';
import type { IconCmp } from '../components/PrimaryButton';

interface Props {
  weekData: number[];
  doneCount: number;
  totalCount: number;
  streak: number;
  weekPercent: number;
  notifEnabled: boolean;
  onToggleNotif: () => void;
  onBack: () => void;
}

const { width: SCREEN_W } = Dimensions.get('window');
const CHART_W = SCREEN_W - 32 - 36;

function ProgressScreen({
  weekData,
  doneCount,
  totalCount,
  streak,
  weekPercent,
  notifEnabled,
  onToggleNotif,
  onBack,
}: Props) {
  const back = (
    <Pressable onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={styles.back}>
      <ChevronLeft size={24} color={theme.colors.textPrimary} strokeWidth={2} />
    </Pressable>
  );

  return (
    <GradientBackground colors={GRAD.menuBg}>
      <View style={styles.container}>
        <ScreenHeader title="Progress" leftSlot={back} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.chartCard}>
            <Text style={styles.cardTitle}>This week</Text>
            <WeekBarChart data={weekData} width={CHART_W} />
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statSlot}>
              <StatCard
                Icon={CheckCircle2}
                value={`${doneCount}/${totalCount}`}
                label="Today"
                valueColor={theme.colors.mint}
              />
            </View>
            <View style={styles.statSlot}>
              <StatCard
                Icon={Flame}
                value={`${streak}`}
                label="Streak"
                valueColor={theme.colors.primary}
              />
            </View>
            <View style={styles.statSlot}>
              <StatCard
                Icon={BarChart3}
                value={`${weekPercent}%`}
                label="This week"
                valueColor={theme.colors.primary}
              />
            </View>
          </View>

          <Text style={styles.section}>SETTINGS</Text>

          <SettingRow Icon={Bell} title="Local notifications" subtitle="Gentle reminders for today">
            <Switch
              value={notifEnabled}
              onValueChange={onToggleNotif}
              trackColor={{ false: theme.colors.border, true: theme.colors.mint }}
              thumbColor="#FFFFFF"
            />
          </SettingRow>

          <SettingRow Icon={Clock} title="Reset day at" subtitle="Repeating tasks refresh daily">
            <Text style={styles.value}>05:00</Text>
          </SettingRow>

          <SettingRow Icon={Trash2} title="Clear completed" subtitle="Tidy up finished chores">
            <Text style={styles.value}>{doneCount}</Text>
          </SettingRow>

          <SettingRow Icon={Info} title="About" subtitle="Everything stored on device">
            <Text style={styles.value}>v1.0</Text>
          </SettingRow>
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function SettingRow({
  Icon,
  title,
  subtitle,
  children,
}: {
  Icon: IconCmp;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowIcon}>
        <Icon size={20} color={theme.colors.primary} strokeWidth={2} />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSub}>{subtitle}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  back: { width: 48, height: 48, alignItems: 'flex-start', justifyContent: 'center' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: theme.spacing.lg, paddingTop: 16, paddingBottom: 32 },

  chartCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    padding: 18,
    ...theme.shadow.card,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: theme.colors.textPrimary, marginBottom: 14 },

  statsRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  statSlot: { flex: 1 },

  section: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.textMuted,
    marginTop: 24,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: 14,
    marginBottom: 10,
    ...theme.shadow.soft,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary + '14',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: '700', color: theme.colors.textPrimary },
  rowSub: { fontSize: 12, fontWeight: '500', color: theme.colors.textMuted, marginTop: 2 },
  value: { fontSize: 14, fontWeight: '700', color: theme.colors.textSecondary },
});

export default ProgressScreen;
