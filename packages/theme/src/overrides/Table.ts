/**
 * @copyright @2022 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Table component to override default Mui Table's style.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 14/Nov/2022
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
 * Table contains the styles to override default Mui Table and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiTable
 */
export default function Table(theme: Theme): Components<Theme> {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadiusXs,
        },
      },
    },

    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          ...theme.typography.bodySRegular,
          height: 48,
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
          padding: theme.spacing(0.75, 1.5),
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          textOverflow: 'ellipsis',
          '& .MuiInputBase-root': {
            ...theme.typography.bodySRegular,
            '& .MuiSelect-select': {
              fontSize: 'inherit',
              height: '30px !important',
            },
            '& .MuiInputBase-input': {
              fontSize: 'inherit',
            },
          },
        },
        head: {
          backgroundColor: theme.palette.grey[200],
          ...theme.typography.bodySBold,
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.secondary,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          padding: theme.spacing(1.75, 1.5),
          '&:first-of-type': {
            borderTopLeftRadius: theme.shape.borderRadiusXs,
            borderBottomLeftRadius: theme.shape.borderRadiusXs,
          },
          '&:last-of-type': {
            borderTopRightRadius: theme.shape.borderRadiusXs,
            borderBottomRightRadius: theme.shape.borderRadiusXs,
          },
        },
        footer: {
          padding: theme.spacing(1.5, 2),
        },
      },
    },
  };
}
