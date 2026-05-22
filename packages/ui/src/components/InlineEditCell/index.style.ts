/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Styles for InlineEditCell component.
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

export default {
  // Container wrapping the display text — shows hover effect
  cellContainer: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    width: '100%',
    cursor: 'pointer',
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.25, 0.5),
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  }),

  // Input field shown during edit mode
  editInput: (theme: Theme) => ({
    width: '100%',
    '& .MuiInputBase-root': {
      fontSize: theme.typography.body2.fontSize,
      height: 32,
      borderRadius: theme.spacing(0.5),
      backgroundColor: theme.palette.common.white,
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(0.5, 1),
    },
  }),
};
