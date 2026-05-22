/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create styles for notistack provider(snackbar) component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 11/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

/* Imports */
import { MaterialDesignContent } from 'notistack';

/* Theme Imports */
import { palette } from '@lektus/theme';
import { styled } from '@mui/material';

// ----------------------------------------------------------------------

export default {
  rootStyle: (theme: any) => ({
    height: '100%',
    width: '100%',
    '& .SnackbarContent-root': {
      backgroundColor: `${theme.palette.background.default} !important`,
      color: `${theme.palette.text.primary} !important`,
      borderRadius: 0.75,
      padding: theme.spacing(1, 2, 1, 1.25),
      maxWidth: 320,
      '&.SnackbarItem-variantSuccess': {
        borderLeft: `8px solid ${theme.palette.success.main}`,
      },
      '&.SnackbarItem-variantError': {
        backgroundColor: 'none',
        borderLeft: `8px solid ${theme.palette.error.main}`,
      },
      '&.SnackbarItem-variantWarning': {
        backgroundColor: 'none',
        borderLeft: `8px solid ${theme.palette.warning.main}`,
      },
      '&.SnackbarItem-variantInfo': {
        backgroundColor: 'none',
        borderLeft: `8px solid ${theme.palette.info.main}`,
      },
    },
    '& .SnackbarItem-message': {
      flex: 1,
    },
    '& .SnackbarItem-action': {
      paddingLeft: 1,
      marginTop: -0.25,
      marginRight: -0.5,
      alignSelf: 'flex-start',
      '& > .MuiIconButton-root': {
        padding: 0,
      },
    },
  }),
  iconBox: {
    mr: 1.25,
    display: 'flex',
    fontSize: 16,
  },
  StyledMaterialDesignContent: styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-success': {
      backgroundColor: palette.primary.lighter,
      color: palette.primary.main,
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: palette.error.lighter,
      color: palette.error.main,
    },
  })),
};
