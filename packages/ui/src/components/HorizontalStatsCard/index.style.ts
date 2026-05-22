/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Horizontal Stats Card Styles
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 16/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

import { Theme } from '@mui/material';

export default {
  card: {
    main: (theme: any) => ({
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
      alignItems: 'flex-start',
      p: theme.spacing(2),
    }),

    // Icon circle container
    iconContainer: (theme: any) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: theme.spacing(6.5),
      height: theme.spacing(6.5),
      borderRadius: '50%',
      backgroundColor: theme.palette.grey[100],
    }),

    // Container for value number and trend badge
    valueContainer: (theme: any) => ({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(2),
      flexWrap: 'wrap',
    }),

    // Trend badge for POSITIVE values (up arrow)
    trendUpContainer: (theme: any) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.info.main,
      gap: theme.spacing(0.5),
      py: theme.spacing(0.5),
      px: theme.spacing(1.25),
      backgroundColor: theme.palette.info.lighter,
    }),

    // Trend arrow icon
    trendIcon: (theme: any) => ({
      width: theme.spacing(1.75),
      height: theme.spacing(1.75),
    }),
  },

  // Loading skeleton state
  loadingState: (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(4),
    py: theme.spacing(6),
    px: theme.spacing(4),
  }),

  // Empty state (no data)
  emptyState: (theme: any) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(18.75),
    color: theme.palette.text.disabled,
  }),
};
