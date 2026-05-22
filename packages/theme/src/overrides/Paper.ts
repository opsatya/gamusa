/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Paper component to override default Mui Paper's style.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 08/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import type { Components } from '@mui/material/styles';
import type { Theme } from '@mui/material';

// ----------------------------------------------------------------------

/**
 * Paper contains the styles to override default Mui Paper and it's children's styles.
 *
 * @component
 * @returns Add-on styles for MuiPaper
 */
export default function Paper(): Components<Theme> {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  };
}
