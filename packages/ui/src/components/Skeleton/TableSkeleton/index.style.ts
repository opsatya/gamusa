/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Styles for Table Skeleton layout.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 19/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

import { Theme } from '@mui/material';

export default {
  wrapper: {
    width: '100%',
  },

  filterBar: (theme: Theme) => ({
    width: '100%',
    height: 48,
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      height: 44,
    },
  }),

  headerRow: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(2),
      padding: theme.spacing(1.75, 2),
    },
  }),

  dataRow: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    padding: theme.spacing(2.25, 3),
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    width: '100%',
    '&:last-child': {
      borderBottom: 'none',
    },
    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(2),
      padding: theme.spacing(2, 2),
    },
  }),

  circle: (theme: Theme) => ({
    width: 28,
    height: 28,
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      width: 22,
      height: 22,
    },
  }),

  pill: (theme: Theme) => ({
    borderRadius: 999,
    height: 18,
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 0,
    [theme.breakpoints.down('md')]: {
      height: 22,
    },
  }),

  headerPill: (theme: Theme) => ({
    borderRadius: 999,
    height: 22,
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 0,
    [theme.breakpoints.down('md')]: {
      height: 26,
    },
  }),
};
