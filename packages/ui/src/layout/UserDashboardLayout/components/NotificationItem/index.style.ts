/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create styles for Notification item component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 13/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import { Theme } from '@mui/material';

export default {
  containerStyle: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    gap: theme.spacing(1.5),
    p: theme.spacing(2.5, 2, 2.5, 2),
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      p: theme.spacing(2.5, 2, 0, 2),
      borderBottom: 'none',
    },
  }),
  iconContainer: (theme: Theme, background: string) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: theme.spacing(1.25),
    borderRadius: '50%',
    backgroundColor: background,
    width: theme.spacing(5),
    height: theme.spacing(5),
    mb: theme.spacing(1),
  }),
  contentContainer: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // bgcolor: 'blue',
    width: '100%',
    mt: -1.25,
    // gap: theme.spacing(2)
  }),
  content: (theme: Theme) => ({
    maxWidth: theme.spacing(25),
  }),
  icon: (theme: Theme, color: string) => ({
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    color: color,
  }),
  errorIcon: (theme: Theme) => ({
    width: theme.spacing(1),
    height: theme.spacing(1),
    mt: 1,
  }),
};
