/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Lists component to override default Mui Lists' style.
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
 * Lists contains the styles to override default Mui Lists and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiLists
 */
export default function Lists(theme: Theme): Components<Theme> {
  /* Output */
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          minHeight: 40,
          padding: theme.spacing(1),
          '&.Mui-selected': {
            color: theme.palette.primary.main,
          },
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
          marginTop: 0,
          marginBottom: 0,
          '& .MuiTypography-root': {
            ...theme.typography.body2,
          },
        },
        multiline: {
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
  };
}
