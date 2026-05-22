/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create styles for auth layout.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 10/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

export default {
  wrapperStyle: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
  },
  loginContainerStyle: {
    height: '100vh',
    display: 'flex',
    overflow: 'hidden',
  },
  leftPanelStyle: (theme: any) => ({
    backgroundColor: theme.palette.text.primary,
    width: '50%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }),
  rightPanelStyle: (theme: any) => ({
    backgroundColor: theme.palette.background.default,
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
    minHeight: 0,
  },
  coverImageStyle: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  leftTemplateContainer: (theme: any) => ({
    padding: theme.spacing(6.25, 6.25, 10, 6.25),
    borderTopWidth: 3,
    borderTopStyle: 'solid',
    borderColor: theme.palette.primary.main,
    flexShrink: 0,
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(6.25),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(5),
    },
  }),
  leftTemplateLogoContainer: {
    width: '100%',
    maxWidth: 124,
    mb: 3,
  },
  leftTemplateTitleContainer: (theme: any) => ({
    color: theme.palette.common.white,
    mb: 3,
  }),
  leftTemplateSubTitleContainer: (theme: any) => ({
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightRegular,
  }),
  ornamentStyle: (theme: any) => ({
    position: 'absolute',
    left: 50,
    top: 125,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }),

  logoContainer: (theme: any) => ({
    width: '100%',
    maxWidth: 125,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 125,
    },
  }),

  formStyle: {
    width: '100%',
    maxWidth: 480,
    py: 3,
  },

  footerContainer: (theme: any) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0.5,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  }),

  footerText: (theme: any) => ({
    color: theme.palette.grey[500],
    // fontWeight: theme.typography.fontWeightSemiBold,
  }),

  footerLink: (theme: any) => ({
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
  }),
};
