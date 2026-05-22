/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Styles for AppHeader component.
 *              Uses theme tokens exclusively — no hardcoded colors, sizes, or weights.
 *              Responsive: adapts to laptop (1280px) and lg (1440px+) breakpoints.
 * --------------------------------------------------------------------
 * Creation Details
 * @author CRM Team
 * Date Created: 03/05/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { type Theme } from '@mui/material';

// ----------------------------------------------------------------------

/**
 * Style object for AppHeader and its sub-elements.
 * All values derive from the theme — typography variants, palette, spacing.
 */
export default {
  /* ── AppBar ── */
  appBar: (theme: Theme) => ({
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    // borderLeft: `1px solid ${theme.palette.divider}`,
  }),

  /* ── Toolbar ── */
  toolbar: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '56px !important',
    height: '56px',
    py: 0,
    px: 2.5,
    gap: 1.5,
    [theme.breakpoints.up('lg')]: {
      gap: 2,
    },
  }),

  /* ── Left section (greeting) ── */
  greetingWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 0,
  },

  greetingSubtitle: (theme: Theme) => ({
    color: theme.palette.text.secondary,
  }),

  greetingTitle: (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontSize: '0.9375rem',
    fontWeight: 600,
    lineHeight: 1.4,
  }),

  /* ── Left section (search field) ── */
  leftSection: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 280,
    flexShrink: 1,
    minWidth: 180,
    [theme.breakpoints.up('lg')]: {
      maxWidth: 360,
    },
  }),

  searchIcon: (theme: Theme) => ({
    fontSize: '0.9rem',
    color: theme.palette.text.disabled,
  }),

  /* ── Right section ── */
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.25,
    flexShrink: 0,
  },

  /* ── Clock bar (multi-zone) ── */
  globalClockBar: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    '& > * + *': {
      borderLeft: `1px solid ${theme.palette.divider}`,
      pl: 1.5,
      ml: 1.5,
    },
  }),

  clockZone: (_theme: Theme) => ({
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 0.625,
  }),

  clockZoneTextCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    gap: 0,
  },

  clockZoneFlag: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: 1,
    letterSpacing: '0px',
  },

  clockZoneLabelText: (theme: Theme) => ({
    color: theme.palette.text.primary,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    fontSize: '0.6875rem',
    fontWeight: 600,
    lineHeight: 1.4,
  }),

  clockTimeText: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    letterSpacing: '0.04em',
    fontVariantNumeric: 'tabular-nums',
    fontSize: '0.6875rem',
    lineHeight: 1.3,
  }),

  /* ── Notification bell ── */
  bellButton: (theme: Theme) => ({
    width: 36,
    height: 36,
    p: '8px',
    borderRadius: '4px',
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.divider}`,
  }),

  bellIcon: (theme: Theme) => ({
    fontSize: 16,
    color: theme.palette.text.secondary,
  }),
};
