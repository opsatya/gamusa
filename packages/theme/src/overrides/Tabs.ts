/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Tabs component to override default Mui Tabs/Tab styles.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 04/22/2026
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
 * Tabs contains the styles to override default Mui Tabs and Tab styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiTabs and MuiTab
 */
export default function Tabs(theme: Theme): Components<Theme> {
  return {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          textTransform: 'none',
          '&&': {
            fontWeight: 400,
          },
          '&&.Mui-selected': {
            fontWeight: 500,
            color: theme.palette.primary.main,
          },
        },
      },
    },
  };
}
