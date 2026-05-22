/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create styles for auth layout.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 02/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default {
  wrapperStyle: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
  },
  loginContainerStyle: (img: string, theme: Theme) => ({
    height: '100vh',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  }),
  leftPanelStyle: (theme: any) => ({
    margin: theme.spacing(3.5, 4, 3.5, 4),
    borderRadius: theme.spacing(2.5),
    width: '48%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 10,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      padding: theme.spacing(5, 3.5, 5, 3.5),
    },
  }),
  dropdown: (theme: Theme) => ({
    '& .Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 1,
        borderColor: theme.palette.primary.light,
      },
    },
  }),
  rightPanelStyle: (theme: Theme) => ({
    margin: theme.spacing(1.68, 1.25, 1.68, 1.25),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(2),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    position: 'relative',
  }),
  coverContainerStyle: {
    position: 'relative',
    flexGrow: 1,
  },

  leftTemplateContainer: (theme: any) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: theme.spacing(4),
    position: 'relative',
    zIndex: 1,
    flexShrink: 0,
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(6.25),
      gap: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(5),
      gap: theme.spacing(1),
    },
  }),
  leftTemplateLogoContainer: {
    width: '100%',
    maxWidth: 133,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftTemplateTitleContainer: (theme: any) => ({
    color: theme.palette.common.white,
    whiteSpace: 'pre-line',
  }),
  leftTemplateSubTitleContainer: (theme: any) => ({
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightRegular,
  }),

  formStyle: {
    width: '100%',
    maxWidth: 480,
    py: 3,
  },

  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0.5,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 24,
    width: '100%',
    textAlign: 'center',
  },

  footerText: (theme: any) => ({
    color: theme.palette.grey[500],
  }),
  subFooterDivider: (theme: any) => ({
    backgroundColor: theme.palette.grey[400],
    width: 4,
    height: 4,
    borderRadius: '50%',
  }),
  footerLink: (theme: any) => ({
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
  }),
};
