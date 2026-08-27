/**
 * NORDIC_MINIMAL — brief-adjusted (rule #11b: keep preset `name`).
 * Soft-UI: white pastel cards, radius 18–24, very soft shadow, airy.
 */

export const theme = {
  name: 'nordic-minimal',

  colors: {
    bg: '#FAFAFA',
    bgSecondary: '#F2F2F4',
    border: '#E8E8EC',
    borderStrong: '#DDDDE2',
    card: '#FFFFFF',

    primary: '#4A90E2',
    primaryEnd: '#5B9EE8',
    mint: '#7FE8C5',
    coral: '#FF7B7B',

    textPrimary: '#1C2530',
    textSecondary: '#6B7280',
    textMuted: '#8A8F98',

    loaderTop: '#2B3A4A',
    loaderBottom: '#1C2530',

    white: '#FFFFFF',
  },

  // room accent colors (chips / left accent bars)
  room: {
    kitchen: '#F2A65A',
    bedroom: '#9B8CFF',
    bathroom: '#4A90E2',
    living: '#7FE8C5',
    laundry: '#E88CB4',
    other: '#6BC5D8',
  } as Record<string, string>,

  radius: { sm: 8, md: 14, lg: 18, xl: 24, pill: 999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },

  shadow: {
    card: {
      shadowColor: '#4A90E2',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 3,
    },
    soft: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    button: {
      shadowColor: '#4A90E2',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 14,
      elevation: 6,
    },
  },
} as const;

// gradient tuples (inline in JSX where possible; exported for reuse)
export const GRAD = {
  primaryBtn: ['#4A90E2', '#5B9EE8'] as string[],
  menuBg: ['#FAFAFA', '#F2F2F4'] as string[],
  loaderBg: ['#2B3A4A', '#1C2530'] as string[],
  resultBg: ['#EAF6FF', '#F2FBF7'] as string[],
  progressFill: ['#7FE8C5', '#4A90E2'] as string[],
};

export type Theme = typeof theme;
