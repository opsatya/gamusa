/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Popover component to override default Mui Popover's style.
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
 * Popover contains the styles to override default Mui Popover and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiPopover
 */
export default function Popover(theme: Theme): Components<Theme> {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.palette.background.default,
          boxShadow: theme.customShadows.z12,
          borderRadius: theme.shape.borderRadiusXs,
        },
      },
    },
  };
}
