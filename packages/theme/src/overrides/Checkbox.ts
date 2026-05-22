/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Checkbox component to override default Mui Checkbox's style.
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
 * Checkbox contains the styles to override default Mui Checkbox and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiCheckbox
 */

export default function Checkbox(theme: Theme): Components<Theme> {
  /* Output */
  return {
    MuiCheckbox: {
      defaultProps: {
        color: 'primary',
      },

      styleOverrides: {
        root: {
          padding: theme.spacing(1),
          color: theme.palette.grey[400],
          '&:hover': {
            background: 'none',
          },
          '&.Mui-checked.Mui-disabled, &.Mui-disabled': {
            color: theme.palette.action.disabled,
          },
          '& .MuiSvgIcon-root': {
            borderRadius: '10px',
          },
        },
      },
    },
  };
}
