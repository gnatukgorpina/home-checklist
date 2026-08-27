import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ListTodo, Play, LayoutGrid, ChevronRight, CheckCircle2, Flame } from 'lucide-react-native';
import GradientBackground from '../components/GradientBackground';
import FadeInView from '../components/FadeInView';
import PrimaryButton from '../components/PrimaryButton';
import StatCard from '../components/StatCard';
import BottomNav, { NavKey } from '../components/BottomNav';
import { theme, GRAD } from '../constants/theme';
import { todayLabel, weekdayFull } from '../utils/date';

interface Props {
  taskCount: number;
  doneCount: number;
  streak: number;
  onStart: () => void;
  onNavigate: (key: NavKey) => void;
  onManage: () => void;
}

/** MenuScreen = the "Today" hub (Bento M3). Primary CTA "START TODAY" (rule #11a). */
function MenuScreen({ taskCount, doneCount, streak, onStart, onNavigate, onManage }: Props) {
  const { day } = todayLabel();

  return (
    <GradientBackground
      colors={GRAD.menuBg}
      blobs={[
        { color: theme.colors.mint, size: 300, top: -80, right: -60, opacity: 0.1 },
        { color: theme.colors.primary, size: 280, bottom: -60, left: -70, opacity: 0.06 },
      ]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good day</Text>
            <Text style={styles.headerTitle}>Today</Text>
          </View>
          <View style={styles.datePill}>
            <Text style={styles.dateWeekday}>{weekdayFull()}</Text>
            <Text style={styles.dateDay}>{day}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <FadeInView delay={0}>
            <View style={styles.hero}>
              <View style={styles.heroTop}>
                <View style={styles.heroIcon}>
                  <ListTodo size={26} color={theme.colors.primary} strokeWidth={1.5} />
                </View>
                <View style={styles.heroTextWrap}>
                  <Text style={styles.heroNumber}>{taskCount}</Text>
                  <Text style={styles.heroLabel}>tasks due today</Text>
                </View>
              </View>
              <PrimaryButton title="START TODAY" Icon={Play} onPress={onStart} />
            </View>
          </FadeInView>

          <FadeInView delay={60} style={styles.statsRow}>
            <View style={styles.statSlot}>
              <StatCard
                Icon={CheckCircle2}
                value={`${doneCount}/${taskCount}`}
                label="Done today"
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
          </FadeInView>

          <FadeInView delay={120}>
            <Pressable
              onPress={onManage}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              style={styles.manage}>
              <View style={styles.manageIcon}>
                <LayoutGrid size={22} color={theme.colors.primary} strokeWidth={1.5} />
              </View>
              <View style={styles.manageText}>
                <Text style={styles.manageTitle}>Manage rooms & tasks</Text>
                <Text style={styles.manageSub}>Organise your home</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textMuted} strokeWidth={2} />
            </Pressable>
          </FadeInView>

          <View style={styles.spacer} />

          <FadeInView delay={160}>
            <BottomNav active="today" onNavigate={onNavigate} />
          </FadeInView>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: theme.spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 44,
    paddingBottom: 16,
  },
  greeting: { fontSize: 13, fontWeight: '500', color: theme.colors.textMuted },
  headerTitle: { fontSize: 24, fontWeight: '700', color: theme.colors.textPrimary, marginTop: 2 },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
    ...theme.shadow.soft,
  },
  dateWeekday: { fontSize: 12, fontWeight: '600', color: theme.colors.textSecondary },
  dateDay: { fontSize: 14, fontWeight: '800', color: theme.colors.primary },

  content: { flex: 1, paddingBottom: 24 },

  hero: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    padding: 18,
    gap: 18,
    ...theme.shadow.card,
  },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.primary + '14',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextWrap: { flex: 1 },
  heroNumber: { fontSize: 30, fontWeight: '800', color: theme.colors.textPrimary },
  heroLabel: { fontSize: 13, fontWeight: '500', color: theme.colors.textMuted, marginTop: -2 },

  statsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  statSlot: { flex: 1 },

  manage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: 16,
    marginTop: 16,
    ...theme.shadow.soft,
  },
  manageIcon: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.mint + '22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageText: { flex: 1 },
  manageTitle: { fontSize: 15, fontWeight: '700', color: theme.colors.textPrimary },
  manageSub: { fontSize: 12, fontWeight: '500', color: theme.colors.textMuted, marginTop: 2 },

  spacer: { flex: 1, minHeight: 16 },
});

export default MenuScreen;
