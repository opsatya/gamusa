/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Styles for KanbanBoard component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author CRM Team
 * Date Created: 27/04/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

export default {
  /* ── Board container — horizontal scroll ── */
  container: {
    display: 'flex',
    gap: '10px',
    flex: 1,
    overflowX: 'auto' as const,
    paddingBottom: '6px',
  },

  /* ── Column ── */
  column: (theme: any) => ({
    minWidth: 196,
    width: 196,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#F8FAFC',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden' as const,
    [theme.breakpoints.down('sm')]: {
      minWidth: 170,
      width: 170,
    },
  }),

  columnHeader: (bg: string, dotColor: string) => ({
    padding: '10px 12px',
    borderBottom: `2px solid ${dotColor}`,
    backgroundColor: bg,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  columnCount: (dotColor: string) => ({
    backgroundColor: dotColor,
    color: 'white',
    borderRadius: '20px',
    padding: '1px 7px',
    fontWeight: 700,
  }),

  columnBody: {
    padding: '8px',
    flex: 1,
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '7px',
  },

  /* ── Card ── */
  card: (theme: any) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: '9px',
    padding: '11px 12px',
    border: `1px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    transition: 'box-shadow 0.15s, transform 0.15s',
    '&:hover': {
      boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
      transform: 'translateY(-1px)',
    },
  }),

  /* ── Empty state ── */
  empty: (theme: any) => ({
    textAlign: 'center' as const,
    color: theme.palette.text.secondary,
    padding: '14px 0',
  }),

  /* ── Card content — shared across Leads / Pipeline ── */
  cardBadges: {
    display: 'flex',
    gap: '4px',
    mb: 0.875,
  },

  cardBadge: {
    height: 18,
  },

  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardOwnerAvatar: (theme: any, bgColor: string) => ({
    width: 18,
    height: 18,
    fontSize: '0.5rem',
    fontWeight: 700,
    color: theme.palette.common.white,
    backgroundColor: bgColor,
  }),
};
