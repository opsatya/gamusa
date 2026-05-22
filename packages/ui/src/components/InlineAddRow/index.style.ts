/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Styles for InlineAddRow component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Tanishak
 * Date Created: 17/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default {
  fieldInput: (theme: Theme) => ({
    width: '100%',
    '& .MuiInputBase-root': {
      fontSize: '12px',
      height: 40,
      borderRadius: '8px',
      backgroundColor: theme.palette.common.white,
      '& fieldset': {
        borderColor: '#E5E7EB', // grey[200] roughly
      },
      '&:hover fieldset': {
        borderColor: '#D1D5DB', // grey[300] roughly
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiInputBase-input': {
      padding: '8px 12px',
      height: '40px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      '&::placeholder': {
        color: '#9CA3AF', // grey[400]
        opacity: 1,
      },
    },
    '& .MuiSelect-select': {
      // padding-top/bottom = (40px height - ~12px font) / 2 = 14px → perfect vertical center
      padding: '14px 36px 14px 12px !important',
      display: 'block',
      height: '40px !important',
      boxSizing: 'border-box',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '& .MuiSelect-icon': {
      right: '8px',
      position: 'absolute',
      pointerEvents: 'none',
    },

    '& .MuiFormHelperText-root': {
      fontSize: '10px',
      lineHeight: 1.2,
      marginLeft: 0,
      marginTop: theme.spacing(0.5),
      whiteSpace: 'nowrap',
      overflow: 'visible',
    },
  }),

  fileInputButton: (theme: Theme) => ({
    width: '100%',
    height: 40,
    borderRadius: '8px',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #E5E7EB',
    textTransform: 'none',
    justifyContent: 'flex-start',
    padding: '0 12px',
    fontSize: '12px',
    color: '#111827', // text.primary
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
      borderColor: '#D1D5DB',
    },
  }),

  // Save (✓) icon button — green tint
  saveButton: (theme: Theme) => ({
    color: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    },
  }),

  // Cancel (✗) icon button — red tint
  cancelButton: (theme: Theme) => ({
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  }),

  // "+ Add" button below the table
  addButton: (theme: Theme) => ({
    alignSelf: 'flex-start',
    textTransform: 'none',
    fontWeight: 600,
    color: theme.palette.text.secondary,
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.primary.main,
    },
  }),
};
