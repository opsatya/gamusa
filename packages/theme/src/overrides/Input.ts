/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Input component to override default Mui Input's style.
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
 * Input contains the styles to override default Mui Input and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiInput
 */
export default function Input(theme: Theme): Components<Theme> {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          ...theme.typography.body1,
          overflow: 'hidden',
          '& .MuiInputAdornment-root': {
            '& .MuiIconButton-root': {
              marginRight: 0,
            },
          },
        },
        inputSizeSmall: {
          height: 40,
          padding: '10px 16px',
        },
        input: {
          height: 48,
          padding: '10px 20px',
          boxSizing: 'border-box',
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.grey[500],
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.common.white} inset`,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[300],
          },
          '&:after': {
            borderBottomWidth: 1,
          },
          '&:hover': {
            '&:before': {
              borderBottomWidth: '1px !important',
            },
          },
          '&.Mui-disabled': {
            '&:before': {
              borderColor: theme.palette.action.disabled,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadiusXs,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[300],
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            opacity: theme.palette.action.disabledOpacity,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.grey[400],
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
              borderColor: theme.palette.primary.main,
            },
          },
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
              borderColor: theme.palette.primary.main,
            },
          },
        },
        inputSizeSmall: {
          padding: '10px 16px',
        },
        input: {
          padding: '10px 20px',
        },
      },
    },
  };
}
