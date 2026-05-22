/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Radio component to override default Mui Radio's style.
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
import { Theme } from '@mui/material';
import type { Components } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * Radio contains the styles to override default Mui Radio and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiRadio
 */
export default function Radio(theme: Theme): Components<Theme> {
  /* Output */
  return {
    MuiRadio: {
      defaultProps: {
        color: 'primary',
      },

      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
  };
}
