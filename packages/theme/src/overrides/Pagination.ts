/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Pagination component to override default Mui Pagination's style.
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
 * Pagination contains the styles to override default Mui Pagination and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiPagination
 */
export default function Pagination(theme: Theme): Components<Theme> {
  return {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          ...theme.typography.body1,
          borderRadius: theme.shape.borderRadiusXs,
          '&.Mui-selected': {
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
            '&:hover, &.Mui-focusVisible': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
          '&.MuiPaginationItem-previousNext': {
            borderRadius: theme.shape.borderRadius,
          },
          '&.MuiPaginationItem-firstLast': {
            borderRadius: theme.shape.borderRadius,
          },
        },
        outlined: {
          border: `1px solid ${theme.palette.divider}`,
        },
        outlinedPrimary: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            border: `1px solid ${theme.palette.primary.main}`,
          },
        },
      },
    },
  };
}
