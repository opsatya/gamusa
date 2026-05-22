/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Styles for PageHeaderLayout component
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 04/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

import { Theme } from '@mui/material';

export default {
  rootStyle: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    marginBottom: { xs: theme.spacing(1), md: theme.spacing(3) },
  }),

  backButtonStyle: {
    flexShrink: 0,
  },

  rightSectionStyle: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    justifyContent: 'flex-end',
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'flex-start',
    },
  }),

  actionsContainer: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  }),

  saveButton: (theme: Theme) => ({
    ...theme.typography.bodySMedium,
    px: theme.spacing(1.75),
  }),

  cancelButton: (theme: Theme) => ({
    ...theme.typography.bodySRegular,
    px: theme.spacing(1.75),
    color: theme.palette.text.secondary,
    borderColor: theme.palette.divider,
    '&:hover': {
      borderColor: theme.palette.text.disabled,
      backgroundColor: theme.palette.action.hover,
    },
  }),

  secondaryRowStyle: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(0),
  }),

  breadcrumbsStyle: (theme: Theme) => ({
    fontSize: theme.typography.body2.fontSize,
    '& .MuiBreadcrumbs-separator': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),

  breadcrumbLink: (theme: Theme) => ({
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  }),
};
