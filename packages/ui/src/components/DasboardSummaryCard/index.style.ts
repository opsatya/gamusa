/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Performance Summary Component Styles
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 02/25/2026
 * Updated:      03/28/2026 — Full design audit: spacing, typography, toggle, flex math
 */

// ----------------------------------------------------------------------

import { Theme } from '@mui/material';

/**
 * Performance Summary Styles Object
 *
 * Design tokens used throughout:
 *   spacing unit  = 8px (theme.spacing(1) = 8px)
 *   base font     = Inter (set in theme typography)
 *   outer card    = CardWrapper default padding 24px (theme.spacing(3))
 *
 * Vertical rhythm inside the outer card:
 *   24px (CardWrapper) → header content → 12px pb + border → 12px mb → metric grid
 */
export default {
  // ─── Outer Header Row ──────────────────────────────────────────────────────

  /**
   * Title + toggle row.
   * paddingBottom + borderBottom act as a clean visual divider.
   * marginBottom creates the gap between the divider and the cards grid.
   *
   * NOTE: inline paddingTop / paddingBottom props have been removed from the
   * component so ALL vertical rhythm lives here.
   */
  header: (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(1.5),
    },
  }),

  titleBlock: {
    minWidth: 0,
    flexShrink: 0,
  },

  // ─── Header Left: Title block ───────────────────────────────────────────────

  /** Section title — uses theme h6 variant via component prop */
  sectionTitle: {
    color: '#0F172A',
    whiteSpace: 'nowrap' as const,
  },

  /** Optional sub-title line beneath the section title (e.g. "Updated just now") */
  sectionSubtitle: (theme: Theme) => ({
    color: theme.palette.text.disabled,
    lineHeight: 1.4,
    marginTop: theme.spacing(0.25),
    whiteSpace: 'nowrap' as const,
  }),

  // ─── Toggle: segmented pill ────────────────────────────────────────────────

  /**
   * Outer pill container.
   * Deliberately very light background so it doesn't fight the white active pill.
   * No explicit border — the background contrast is enough at this size.
   */
  toggleContainer: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.spacing(1.25), // 10px — subtly rounded, not fully pill
    padding: theme.spacing(0.5),
    gap: theme.spacing(0.25), // 2px between buttons
  }),

  /**
   * Individual segment button (Week / Month / Year).
   *
   * Active:   white bg + prominent shadow + dark text + semibold weight
   * Inactive: transparent bg + muted text + regular weight
   *
   * The contrast between active fontWeight(600) and inactive fontWeight(400)
   * makes the selection immediately scannable without relying on colour alone.
   */
  toggleButton: (isActive: boolean) => (theme: Theme) => ({
    padding: theme.spacing(0.625, 1.375), // 5px 11px — compact, refined
    borderRadius: theme.spacing(1), // 8px inner — slightly less than container
    cursor: 'pointer',
    fontSize: '0.8125rem', // 13px — one step below body2
    fontWeight: isActive ? 600 : 400,
    lineHeight: 1.5,
    letterSpacing: isActive ? '-0.01em' : '0',
    border: 'none',
    outline: 'none',
    userSelect: 'none' as const,
    transition:
      'background-color 0.18s ease, box-shadow 0.18s ease, color 0.18s ease',
    backgroundColor: isActive ? '#FFFFFF' : 'transparent',
    color: isActive ? '#0F172A' : '#94A3B8',
    boxShadow: isActive
      ? '0 1px 3px 0 rgba(0,0,0,0.10), 0 1px 2px -1px rgba(0,0,0,0.08)'
      : 'none',
    '&:hover': {
      color: isActive ? '#0F172A' : '#64748B',
      backgroundColor: isActive ? '#FFFFFF' : 'rgba(0,0,0,0.03)',
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },
  }),

  // ─── Metric Cards Grid ─────────────────────────────────────────────────────

  /**
   * Responsive flex grid.
   * Gap bumped to 16px (was 12px) for more premium breathing room.
   *
   * Flex calc corrected per gap:
   *   4 cards, 3 gaps of 16px → each item = calc(25% - 12px)   [3×16/4=12]
   *   3 cards, 2 gaps of 16px → each item = calc(33.33% - 10.67px) [2×16/3≈10.67]
   *   2 cards, 1 gap  of 16px → each item = calc(50% - 8px)    [1×16/2=8]
   */
  gridContainer: (theme: Theme) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2), // 16px
    width: '100%',
  }),

  /**
   * Individual metric card wrapper.
   *
   * Key changes vs previous version:
   * - borderRadius down from 16px → 12px (outer card is 16px; inner should be smaller)
   * - minHeight up from 130px → 152px to comfortably fit trend badge
   * - hover adds a soft shadow in addition to border colour change
   * - flex calc corrected (see grid comment above)
   */
  metricCard: (theme: Theme) => ({
    flex: '1 1 calc(25% - 12px)',
    [theme.breakpoints.up('lg')]: {
      flex: '0 0 calc(25% - 12px)',
    },
    [theme.breakpoints.down('lg')]: {
      flex: '1 1 calc(33.33% - 10.67px)',
    },
    [theme.breakpoints.down('md')]: {
      flex: '1 1 calc(50% - 8px)',
    },
    [theme.breakpoints.down('sm')]: {
      flex: '1 1 100%',
    },
    minWidth: theme.spacing(27), // 216px
    borderRadius: theme.spacing(1.5), // 12px
    border: `1px solid ${theme.palette.grey[200]}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: theme.spacing(19), // 152px (was 130px)
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    '&:hover': {
      borderColor: theme.palette.grey[300],
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
    },
  }),

  // ─── Inside each metric card ───────────────────────────────────────────────

  /**
   * Icon bubble + label header row.
   * marginBottom increased to 12px (was 8px) for a cleaner break
   * between the label and the main number.
   */
  iconLabelRow: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.5), // 12px (was 8px)
  }),

  /**
   * Coloured rounded-square bubble around the icon.
   * Slightly smaller than before (28px vs 30px) to keep proportional
   * to the 13px label text beside it.
   */
  iconBubble: (color: string) => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(3.5), // 28px
    height: theme.spacing(3.5),
    borderRadius: theme.spacing(0.875), // 7px
    backgroundColor: color,
    flexShrink: 0,
  }),

  /** Card label (e.g. "Open Positions") */
  metricLabel: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    lineHeight: 1.4,
    // Clamp to 2 lines on very narrow cards
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
  }),

  /**
   * Large metric count number.
   * Negative letter-spacing on large numbers is a premium SaaS pattern
   * (used by Stripe, Linear, Vercel) — tightens the visual mass.
   */
  valueText: {
    color: '#0F172A',
    lineHeight: 1,
  },

  /**
   * Trend badge — shown only when trend data exists.
   * Uses a tight pill (5px radius) at 11px to sit neatly below the number.
   */
  trendBadge: (isPositive: boolean) => (theme: Theme) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(0.375), // 3px
    fontSize: '0.6875rem', // 11px
    fontWeight: 600,
    lineHeight: 1,
    color: isPositive ? '#16A34A' : '#DC2626',
    backgroundColor: isPositive ? '#DCFCE7' : '#FEE2E2',
    borderRadius: theme.spacing(0.625), // 5px
    padding: theme.spacing(0.375, 0.625), // 3px 5px
    width: 'fit-content',
  }),

  /** Sparkline chart container — slightly taller (50px vs 45px) for prominence */
  chartContainer: (_theme: Theme) => ({
    width: '88px',
    height: '50px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexShrink: 0,
  }),
};
