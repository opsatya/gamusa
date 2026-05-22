/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Total Applications area chart styles
 * --------------------------------------------------------------------
 * Updated: 03/28/2026 — legend dots → line segments; tooltip border-radius fix;
 *                       consistent spacing via theme.spacing(); label size fix.
 */
// ----------------------------------------------------------------------

export const styles = {
  // ─── Legend ─────────────────────────────────────────────────────────────────

  /**
   * Legend row container.
   * Removed raw `marginBottom: 1.3` — ChartContainer's leftSection gap handles spacing.
   */
  legend: (theme: any) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
  }),

  legendItem: (theme: any) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(0.875), // 7px between swatch and label
  }),

  /**
   * Horizontal line segment swatch — tells the eye "this represents a line/area"
   * better than a circle dot (which implies a point, not a trend).
   * 16px wide × 3px tall, fully rounded ends.
   */
  legendSwatch: {
    width: '16px',
    height: '3px',
    borderRadius: '2px',
    flexShrink: 0,
  },

  /** Legend label — 12px/500, subtle grey, not competing with chart data */
  legendLabel: (theme: any) => ({
    fontSize: '0.75rem', // 12px
    fontWeight: 500,
    color: theme.palette.text.secondary,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
  }),

  // ─── Tooltip ────────────────────────────────────────────────────────────────

  /**
   * Tooltip card.
   * Border-radius reduced from 16px → 8px (less bubbly, more refined).
   * minWidth tightened slightly.
   */
  tooltipContainer: (theme: any) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1.5, 2),
    borderRadius: theme.spacing(1), // 8px (was 16px)
    boxShadow: theme.shadows[8],
    border: `1px solid ${theme.palette.divider}`,
    minWidth: theme.spacing(18), // 144px (was 160px — slightly tighter)
  }),

  /** Tooltip date/period label */
  tooltipTitle: (theme: any) => ({
    fontSize: '0.8125rem', // 13px
    fontWeight: 600,
    lineHeight: 1.4,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),

  /** Each series row inside the tooltip */
  tooltipItem: (theme: any) => ({
    paddingTop: theme.spacing(0.5), // 4px (was 8px — was very loose)
    paddingBottom: theme.spacing(0.5),
  }),

  /** Colour swatch dot in each tooltip row */
  tooltipDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
};
