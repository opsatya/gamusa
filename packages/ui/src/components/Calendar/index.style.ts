/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Styles for LektusCalendar component
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 11/02/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

import { Theme } from '@mui/material';

export default {
  /**
   * Root container style
   */
  rootStyle: (theme: Theme) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2, 2.5, 2.5),
    width: '100%',

    // Remove default FullCalendar styling
    '& .fc': {
      fontFamily: theme.typography.fontFamily,
    },

    // ── Toolbar ──────────────────────────────────────────────
    '& .fc-toolbar': {
      alignItems: 'center',
      marginBottom: `${theme.spacing(2)} !important`,
    },

    // Month / year title (e.g. "March 2026")
    '& .fc-toolbar-title': {
      fontFamily: theme.typography.fontFamily,
      fontSize: '1rem !important',
      fontWeight: `${700} !important`,
      color: `${theme.palette.text.primary} !important`,
      letterSpacing: '-0.01em',
    },

    // Prev / Next / Today navigation buttons
    '& .fc-button': {
      fontFamily: `${theme.typography.fontFamily} !important`,
      fontSize: '0.8125rem !important',
      fontWeight: `${600} !important`,
      textTransform: 'none !important',
      borderRadius: `${theme.spacing(1)} !important`,
      padding: `${theme.spacing(0.625, 1.5)} !important`,
      border: `1px solid ${theme.palette.divider} !important`,
      backgroundColor: `${theme.palette.common.white} !important`,
      color: `${theme.palette.text.primary} !important`,
      boxShadow: 'none !important',
      transition:
        'background-color 0.15s ease, border-color 0.15s ease !important',
      '&:hover': {
        backgroundColor: `${theme.palette.grey[100]} !important`,
        borderColor: `${theme.palette.grey[300]} !important`,
      },
      '&:focus': {
        outline: 'none !important',
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}30 !important`,
      },
    },

    // Prev / Next icon buttons
    '& .fc-prev-button, & .fc-next-button': {
      padding: `${theme.spacing(0.5, 0.875)} !important`,
    },

    // Today button – highlight with primary colour
    '& .fc-today-button': {
      backgroundColor: `${theme.palette.primary.main}12 !important`,
      color: `${theme.palette.primary.main} !important`,
      borderColor: `${theme.palette.primary.main}40 !important`,
      '&:hover': {
        backgroundColor: `${theme.palette.primary.main}20 !important`,
      },
      '&:disabled': {
        opacity: '0.4 !important',
      },
    },

    // Toolbar button group spacing
    '& .fc-button-group': {
      gap: theme.spacing(0.5),
      '& .fc-button': {
        borderRadius: `${theme.spacing(1)} !important`,
      },
    },

    // ── Grid ─────────────────────────────────────────────────
    '& .fc-scrollgrid': {
      borderRadius: theme.spacing(1),
      overflow: 'hidden',
    },

    // Cell borders using theme divider colour
    '& .fc-theme-standard td, & .fc-theme-standard th': {
      border: `1px solid ${theme.palette.divider}`,
    },

    // Day cell sizing
    '& .fc-daygrid-day': {
      minHeight: theme.spacing(13),
      backgroundColor: theme.palette.common.white,
    },

    // Other-month days (grey background)
    '& .lektrus-day-other-month': {
      backgroundColor: theme.palette.grey[50],
    },

    // Today cell highlight
    '& .fc-day-today': {
      backgroundColor: `${theme.palette.primary.main}06 !important`,
    },

    // Header cell styling
    '& .fc-col-header-cell': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 0),
      backgroundColor: theme.palette.grey[50],
    },

    // Day number link — use theme text color
    '& .fc-daygrid-day-number': {
      color: theme.palette.text.primary,
      fontWeight: 500,
      fontSize: '0.8125rem',
      textDecoration: 'none',
      padding: theme.spacing(0.5, 0.75),
    },

    // Event block default sizing
    '& .fc-daygrid-event': {
      borderRadius: theme.spacing(0.5),
      fontSize: '0.8rem',
      cursor: 'pointer',
    },

    // +more link
    '& .fc-daygrid-more-link': {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: theme.palette.primary.main,
      padding: `0 ${theme.spacing(0.5)}`,
    },

    // Popover styling
    '& .fc-popover': {
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.shadows[5],
      zIndex: '1200 !important',
      position: 'absolute !important',
    },
    '& .fc-popover-header': {
      backgroundColor: theme.palette.grey[100],
      borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
      padding: theme.spacing(1, 1.5),
      fontWeight: 600,
      fontSize: '0.8rem',
      color: theme.palette.text.primary,
    },
    '& .fc-popover-body': {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.common.white,
      borderRadius: `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
    },

    // Column header text
    '& .fc-col-header-cell-cushion': {
      color: theme.palette.text.secondary,
      fontWeight: 600,
      fontSize: '0.6875rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      textDecoration: 'none',
    },
  }),

  /**
   * Day header container (SUN, MON, etc.)
   */
  dayHeaderStyle: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(1.5),
    height: '100%',
  }),

  /**
   * Day header text style
   */
  dayHeaderTextStyle: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
  }),

  /**
   * Day cell container
   */
  dayCellContainerStyle: (theme: Theme) => ({
    padding: theme.spacing(1.5),
    // height: '100%',
    width: '100%',
    // minHeight: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    position: 'relative',
  }),

  /**
   * Day cell header (day number + menu)
   */
  dayCellHeaderStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 'auto',
  },

  /**
   * Day number style
   */
  dayNumberStyle: (theme: Theme, isPastMonth: boolean) => ({
    color: isPastMonth
      ? theme.palette.text.secondary
      : theme.palette.text.primary,
    lineHeight: 1,
  }),

  /**
   * Menu icon button
   */
  menuIconButtonStyle: (theme: Theme) => ({
    padding: theme.spacing(0.5),
    transition: 'opacity 0.2s ease',

    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },

    // Show on parent hover
    '.fc-daygrid-day:hover &': {
      opacity: 1,
    },
  }),

  /**
   * Menu icon
   */
  menuIconStyle: (theme: Theme) => ({
    fontSize: '18px',
    color: theme.palette.text.secondary,
  }),

  /**
   * Events container (bottom-left of cell)
   */
  eventsContainerStyle: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '100%',
  }),

  /**
   * Skeleton container
   */
  skeletonRootStyle: (theme: Theme) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    width: '100%',
  }),

  /**
   * Skeleton header
   */
  skeletonHeaderStyle: (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  }),

  /**
   * Skeleton header cell
   */
  skeletonHeaderCellStyle: (theme: Theme) => ({
    padding: theme.spacing(1.5, 1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),

  /**
   * Skeleton grid
   */
  skeletonGridStyle: (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '1px',
    backgroundColor: theme.palette.divider,
    border: `1px solid ${theme.palette.divider}`,
  }),

  /**
   * Skeleton day cell
   */
  skeletonDayCellStyle: (theme: Theme) => ({
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1.5),
    minHeight: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  }),

  /**
   * Event card style
   */
  eventCardStyle: (theme: Theme, backgroundColor: string) => ({
    backgroundColor,
    borderRadius: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    padding: theme.spacing(1, 1.5),
    cursor: 'pointer',
    overflow: 'auto',
    maxWidth: theme.spacing(20),
    //hide scrollbar
    // '&::-webkit-scrollbar': {
    //     display: 'none',
    // },
  }),

  /**
   * Event title style
   */
  eventTitleStyle: (theme: Theme) => ({
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  /**
   * Event applicant name style
   */
  eventApplicantStyle: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
};
