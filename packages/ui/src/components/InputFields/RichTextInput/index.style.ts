/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to styles for select input component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 06/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

const styles = {
  formControlStyle: {
    width: '100%',
  },
  formLabelStyle: {
    mb: 0.5,
  },
  richtextContainer: {
    border: 'none',
    backgroundColor: 'transparent',
    '& .MuiRichTextEditor-root': {
      border: 'none',
    },
  },

  formHelperTextStyle: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  proseMirrorStyle: (theme: Theme) => ({
    /* Root container = OutlinedInput root */
    '& .MuiTiptap-FieldContainer-root': {
      borderRadius: theme.shape.borderRadius,

      /* Default outline */
      '& .MuiTiptap-FieldContainer-notchedOutline': {
        borderColor: theme.palette.grey[300],
      },

      /* Hover */
      '&:hover .MuiTiptap-FieldContainer-notchedOutline': {
        borderWidth: 1,
        borderColor: theme.palette.success.main,
      },

      /* Focus */
      '&:focus-within .MuiTiptap-FieldContainer-notchedOutline': {
        borderWidth: 1,
        borderColor: theme.palette.success.main,
      },

      /* Disabled */
      '&.Mui-disabled': {
        opacity: theme.palette.action.disabledOpacity,

        '& .MuiTiptap-FieldContainer-notchedOutline': {
          borderColor: theme.palette.action.disabledBackground,
        },
      },
    },

    /*
     * Fix MenuSelectHeading ("Para...") dropdown in the toolbar.
     * Global MuiInputBase overrides (height: 48, padding, overflow)
     * bleed into this Select, making it taller than the toolbar buttons
     * and causing it to visually shift upward.
     */
    '& .MuiTiptap-MenuControlsContainer-root': {
      alignItems: 'center',

      '& .MuiInputBase-root': {
        overflow: 'visible',
        minWidth: 90,

        '& .MuiInputBase-input': {
          width: '100%',
          height: 'auto',
          padding: '4px 32px 4px 8px',
          boxSizing: 'border-box',
          ...theme.typography.body3,
        },
      },

      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1px !important',
        top: 0,
        '& legend': {
          display: 'none',
        },
      },
    },

    /* Editor content = input padding/height */
    '& .ProseMirror': {
      padding: theme.spacing(1.25, 1.5),
      minHeight: 80,
      outline: 'none',
      ...theme.typography.body2,

      '& p': {
        margin: 0,
      },
    },
  }),
};

export default styles;
