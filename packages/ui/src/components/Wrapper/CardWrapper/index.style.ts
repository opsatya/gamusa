/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create styles for card wrapper component.
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
 * Styles for card wrapper component
 * @param theme - theme object
 * @returns styles object
 */
export default {
  rootStyle: (theme: Theme) => ({
    backgroundColor: theme.palette.common.white,
    width: '100%',
    overflow: 'auto',
    p: theme.spacing(3),
    borderRadius: '12px',
  }),
};
