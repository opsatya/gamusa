/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Button component to override default Mui Button's style.
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
import { alpha, Theme } from '@mui/material';
import type { Components } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * Button contains the styles to override default Mui Button and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiButton
 */
export default function Button(theme: Theme): Components<Theme> {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          ...theme.typography.button,
          boxShadow: 'none',
          borderRadius: theme.shape.borderRadiusXs,
          textTransform: 'none',
          textAlign: 'center',
          padding: theme.spacing(2),
          [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5),
          },
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
          padding: theme.spacing(1.5, 3),
        },
        sizeMedium: {
          height: 40,
          padding: theme.spacing(1, 2.5),
        },
        sizeSmall: {
          height: 32,
          padding: theme.spacing(0.5, 1.5),
        },
        containedPrimary: {
          color: theme.palette.common.white,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
          },
        },
        containedError: {
          backgroundColor: theme.palette.error.dark,
          color: theme.palette.common.white,
        },
        outlinedPrimary: {
          border: `1px solid ${theme.palette.grey[800]}`,
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        outlinedSecondary: {
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.text.primary}`,
          '&:hover': {
            backgroundColor: alpha(theme.palette.text.primary, 0.05),
          },
        },
        text: {
          padding: 0,
          [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            paddingRight: 0,
          },
          '&:hover': {
            background: 'none',
          },
        },
        textPrimary: {
          '&:hover': {
            color: theme.palette.primary.dark,
          },
        },
        textSecondary: {
          '&:hover': {
            color: theme.palette.secondary.dark,
          },
        },
      },
    },
  };
}
