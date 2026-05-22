/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Card component to override default Mui Card's style.
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
 * Card contains the styles to override default Mui Card and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiCard
 */
export default function Card(theme: Theme): Components<Theme> {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.z16,
          borderRadius: theme.shape.borderRadius,
          position: 'relative',
          zIndex: 0,
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h5' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(2, 3),
          [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
          [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
          [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
          },
        },
      },
    },
  };
}
