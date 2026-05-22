/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Chip component to override default Mui Chip's style.
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
import CancelIcon from '@mui/icons-material/Cancel';
import { alpha, Theme } from '@mui/material';
import type { Components } from '@mui/material/styles';

import { pxToRem } from '@lektus/utils';

// ----------------------------------------------------------------------

/**
 * Chip contains the styles to override default Mui Chip and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiChip
 */
export default function Chip(theme: Theme): Components<Theme> {
  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: () => CancelIcon,
      },

      styleOverrides: {
        // Keep the original 6px radius — only the color scheme changes.
        // Background uses a soft tinted alpha; text uses the dark variant
        // of the same color family for legibility on the light bg.
        root: {
          borderRadius: '6px',
          height: '24px',
          border: 'none',
        },
        label: {
          fontSize: '10px',
          fontWeight: 700,
          lineHeight: 1.6,
          padding: '4px 10px',
        },
        icon: {
          fontSize: pxToRem(14),
        },
        colorDefault: {
          backgroundColor: alpha(theme.palette.text.primary, 0.06),
          color: theme.palette.text.secondary,
          '& .MuiChip-avatarMedium, .MuiChip-avatarSmall': {
            color: theme.palette.text.secondary,
          },
        },
        filled: {
          '&.MuiChip-filled': {
            '&.MuiChip-colorPrimary': {
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
              color: theme.palette.primary.dark,
            },
            '&.MuiChip-colorSecondary': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.12),
              color: theme.palette.secondary.dark,
            },
            '&.MuiChip-colorSuccess': {
              backgroundColor: alpha(theme.palette.success.main, 0.12),
              color: theme.palette.success.dark,
            },
            '&.MuiChip-colorWarning': {
              backgroundColor: alpha(theme.palette.warning.main, 0.14),
              color: theme.palette.warning.dark,
            },
            '&.MuiChip-colorError': {
              backgroundColor: alpha(theme.palette.error.main, 0.12),
              color: theme.palette.error.dark,
            },
            '&.MuiChip-colorInfo': {
              backgroundColor: alpha(theme.palette.info.main, 0.12),
              color: theme.palette.info.dark,
            },
          },
        },
        outlined: {
          borderColor: alpha(theme.palette.grey[500], 0.32),
          backgroundColor: 'transparent',
          '&.MuiChip-colorPrimary': {
            borderColor: alpha(theme.palette.primary.main, 0.4),
            color: theme.palette.primary.dark,
          },
          '&.MuiChip-colorSuccess': {
            borderColor: alpha(theme.palette.success.main, 0.4),
            color: theme.palette.success.dark,
          },
          '&.MuiChip-colorError': {
            borderColor: alpha(theme.palette.error.main, 0.4),
            color: theme.palette.error.dark,
          },
          '&.MuiChip-colorWarning': {
            borderColor: alpha(theme.palette.warning.main, 0.4),
            color: theme.palette.warning.dark,
          },
          '&.MuiChip-colorInfo': {
            borderColor: alpha(theme.palette.info.main, 0.4),
            color: theme.palette.info.dark,
          },
        },
      },
    },
  };
}
