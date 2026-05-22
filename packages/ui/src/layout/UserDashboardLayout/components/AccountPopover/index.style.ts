/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create styles for account popover component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 10/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default {
  accountPopover: {
    '& .MuiMenuList-root': {
      p: 10,
    },
  },
  popoverProfile: {
    my: 1.5,
    px: 2.5,
    flexWrap: 'nowrap',
  },
  popoverMenuItem: {
    fontSize: '14px',
    fontWeight: 700,
    p: 2,
  },
  modeMenuItem: {
    cursor: 'default',
    '&:hover': {
      background: 'none',
    },
  },
  menu: (theme: any) => ({
    '& .MuiPaper-root': {
      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
      borderRadius: theme.spacing(1.5),
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightBold,
      p: 2,
      width: theme.spacing(50),
      maxWidth: theme.spacing(50),
    },
  }),

  menuItem: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 1.5,
    py: 2,
    pl: 0,
    pr: 6,
    transition: theme.transitions.create('padding-left', {
      duration: theme.transitions.duration.shorter,
    }),

    '&:hover': {
      backgroundColor: theme.palette.primary.lighter,
      pl: 2,
    },
  }),
  profileDivider: {
    my: 1,
  },
  logoutDivider: {
    marginBottom: '0px !important',
  },
  logout: {
    width: '100%',
    justifyContent: 'center',
  },
  notificationContainer: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  }),
  notificationItemContainer: (theme: Theme) => ({
    maxHeight: theme.spacing(46),
    overflowY: 'auto',
  }),
  iconContainer: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: theme.spacing(1.25),
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[200],
    width: theme.spacing(5),
    height: theme.spacing(5),
    mb: theme.spacing(1),
  }),
  emptyNotificationContainer: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    px: theme.spacing(0.5),
    pb: theme.spacing(1),
    textAlign: 'center',
  }),
};
