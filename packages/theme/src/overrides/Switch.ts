/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Switch component to override default Mui Switch's style.
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
 * Switch contains the styles to override default Mui Switch and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiSwitch
 */
export default function Switch(theme: Theme): Components<Theme> {
  return {
    MuiSwitch: {
      defaultProps: {
        color: 'primary',
      },

      styleOverrides: {
        root: {
          padding: 0,
          width: 34,
          height: 20,
        },
        thumb: {
          width: 14,
          height: 14,
          boxShadow: theme.customShadows.z1,
        },
        track: {
          borderRadius: '14px',
          opacity: 1,
          backgroundColor: theme.palette.grey[500],
        },
        switchBase: {
          left: 4,
          top: 3,
          padding: 0,
          right: 'auto',
          '&.Mui-checked': {
            transform: 'translateX(13px)',
          },
          '&:not(.Mui-checked)': {
            color: theme.palette.grey[100],
          },
          '&.Mui-checked.Mui-disabled, &.Mui-disabled': {
            color: theme.palette.grey[400],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
      },
    },
  };
}
