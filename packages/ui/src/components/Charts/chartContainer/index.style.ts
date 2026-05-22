/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Chart container styles
 * --------------------------------------------------------------------
 * Updated: 03/28/2026 — Added segmented toggle styles (consistent with
 *                       DashboardSummaryCard); fixed leftSection gap;
 *                       header alignItems; marginBottom tightened.
 */
// ----------------------------------------------------------------------

export default {
  // ─── Outer container ────────────────────────────────────────────────────────
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  // ─── Header row (title+legend on left, toggle on right) ─────────────────────
  header: (theme: any) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // title tops align; toggle aligns to its own height
    marginBottom: theme.spacing(2.5), // 20px (was 24px)
    flexWrap: 'nowrap', // keep title + toggle on one line always
    gap: theme.spacing(1.5),
  }),

  // ─── Left: title + legend column ────────────────────────────────────────────
  /**
   * Title and legend stacked with a 6px gap.
   * minWidth:0 allows this side to shrink when the card is narrow so
   * the toggle is never pushed to a second line.
   */
  leftSection: (theme: any) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(0.75), // 6px (was 16px)
    minWidth: 0, // allows shrinking so toggle stays on same row
    overflow: 'hidden',
  }),

  /** Chart section title — subtitle1 (16px/600) matches the summary card header */
  chartTitle: {
    fontWeight: 600,
    letterSpacing: '-0.01em',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  legendWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  // ─── Right: segmented filter toggle ─────────────────────────────────────────

  /**
   * Outer pill container — identical pattern to DashboardSummaryCard toggle.
   * Keeps the filter control visually consistent across the entire dashboard.
   */
  toggleContainer: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.spacing(1.25), // 10px
    padding: theme.spacing(0.5),
    gap: theme.spacing(0.25), // 2px between segments
    flexShrink: 0, // never squish — title side absorbs any shortfall
  }),

  /**
   * Individual segment button.
   * Active:   white bg + shadow + dark text + semibold
   * Inactive: transparent + muted text + regular weight
   */
  toggleButton: (isActive: boolean) => (theme: any) => ({
    padding: theme.spacing(0.625, 1.375),
    borderRadius: theme.spacing(1),
    cursor: 'pointer',
    fontSize: '0.8125rem', // 13px
    fontWeight: isActive ? 600 : 400,
    lineHeight: 1.5,
    letterSpacing: isActive ? '-0.01em' : '0',
    border: 'none',
    outline: 'none',
    userSelect: 'none',
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

  // ─── Chart area ─────────────────────────────────────────────────────────────
  chartArea: {
    flex: 1,
    position: 'relative',
  },

  loaderWrapper: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
  },

  emptyWrapper: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
