/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to styles for text input component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 11/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default {
  formLabelStyle: (theme: Theme) => ({
    position: 'relative',
    marginBottom: theme.spacing(0.5),
    width: '100%',
    color: theme.palette.text.primary,
  }),
  formHelperTextStyle: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  }),
};
