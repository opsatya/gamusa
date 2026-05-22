/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description IconButton component to override default Mui IconButton's style.
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
 * IconButton contains the styles to override default Mui IconButton and it's children's styles.
 *
 * @component
 * @returns Add-on styles for MuiIconButton
 */
export default function IconButton(): Components<Theme> {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 0,
          '&:hover': {
            background: 'none',
          },
        },
      },
    },
  };
}
