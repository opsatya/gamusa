/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create styles for profile wrapper component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 02/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { Theme } from '@mui/material';

/**
 * Styles for profile wrapper component
 * @param theme - theme object
 * @returns styles object
 */
export default {
  rootStyle: (theme: Theme) => ({
    backgroundColor: theme.palette.common.white,
    width: '100%',
    p: theme.spacing(3),
    borderRadius: theme.spacing(2),
  }),
  avataStyle: (theme: Theme) => ({
    width: theme.spacing(12.5),
    height: theme.spacing(12.5),
    backgroundColor: theme.palette.grey[200],
  }),
  iconButton: (theme: Theme) => ({
    width: theme.spacing(2),
    height: theme.spacing(2),
    color: theme.palette.grey[500],
  }),
  chipStyle: (theme: Theme) => ({
    textTransform: 'capitalize',
    p: theme.spacing(0.5, 2, 0.5, 2),
  }),
  dividerStyles: (theme: Theme) => ({
    width: '100%',
  }),
  profileInfoContainer: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1.25),
  }),
  profileInfoIcon: (theme: Theme) => ({
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    color: theme.palette.text.secondary,
  }),
  tabContainer: (theme: Theme) => ({
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    mb: theme.spacing(1),
  }),
  tabItem: (theme: Theme) => ({
    textTransform: 'none',
    fontSize: theme.spacing(1.75),
    fontWeight: 700,
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
    px: theme.spacing(3),
  }),
  stickGrid: (theme: Theme) => ({
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      top: 0,
      alignSelf: 'flex-start',
    },
  }),
};
