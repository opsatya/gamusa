/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Avatar component to override default Mui Avatar's style.
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
 * Avatar contains the styles to override default Mui Avatar and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiAvatar & MuiAvatarGroup
 */
export default function Avatar(theme: Theme): Components<Theme> {
  /* Output */
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          ...theme.typography.h5,
          textDecoration: 'none',
        },
        colorDefault: {
          color: theme.palette.grey[600],
          backgroundColor: theme.palette.grey[300],
        },
      },
    },
  };
}
