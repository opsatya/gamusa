/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description View Wrapper component styles
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

const styles = {
  container: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2.5),
    width: '100%',
  }),
  headerContainer: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    marginBottom: theme.spacing(1),
  }),
  fieldContainer: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(3),

    // Desktop → horizontal (Figma)
    flexDirection: 'row',

    // Mobile → stacked
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(1),
    },
  }),
  labelContainer: (theme: Theme) => ({
    minWidth: 150,
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'unset',
    },
  }),
  htmlContent: (theme: Theme) => ({
    ...theme.typography.bodyMSemibold,
  }),
};

export default styles;
