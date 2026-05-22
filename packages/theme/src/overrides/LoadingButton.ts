/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description LoadingButton component to override default Mui LoadingButton's style.
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
 * LoadingButton contains the styles to override default Mui LoadingButton and it's children's styles.
 *
 * @component
 * @returns Add-on styles for MuiLoadingButton
 */
export default function LoadingButton(): Components<Theme> {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-text': {
            '& .MuiLoadingButton-startIconPendingStart': {
              marginLeft: 0,
            },
            '& .MuiLoadingButton-endIconPendingEnd': {
              marginRight: 0,
            },
          },
        },
      },
    },
  };
}
