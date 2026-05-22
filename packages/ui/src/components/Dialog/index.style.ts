/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to style all dialog components.
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

export const confirmDialogStyles = {
  dialogContainer: (theme: Theme) => ({
    margin: 0,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3, 0, 0, 0),
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
    width: theme.spacing(62.5),
  }),
  logoStyles: (theme: Theme) => ({
    width: theme.spacing(33.125),
    height: 'auto',
    alignSelf: 'center',
  }),
};
