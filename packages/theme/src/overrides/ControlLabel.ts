/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description ControlLabel component to override default Mui ControlLabel's style.
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

/* Relative Imports */
import { pxToRem } from '@lektus/utils';

// ----------------------------------------------------------------------

/**
 * ControlLabel contains the styles to override default Mui ControlLabel and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiControlLabel
 */
export default function ControlLabel(theme: Theme): Components<Theme> {
  /* Output */
  return {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          ...theme.typography.subtitle2,
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: theme.spacing(0.5, 0.5, 0),
          '& .MuiSvgIcon-root': {
            fontSize: pxToRem(14),
          },
          '& .MuiTypography-root': {
            ...theme.typography.caption,
            fontWeight: theme.typography.fontWeightMedium,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          ...theme.typography.subtitle2,
          color: theme.palette.text.primary,
          '&.Mui-disabled': {
            color: theme.palette.action.disabled,
          },
          '&.Mui-focused': {
            color: theme.palette.text.primary,
          },
        },
        asterisk: {
          color: theme.palette.error.main,
        },
      },
    },
  };
}
