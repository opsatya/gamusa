/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to define the snackbar hook.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 11/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// ----------------------------------------------------------------------

/**
 * Hook to customizing the snackbar
 * @component
 * @yields {function}
 */
function useSnackbarClose(): any {
  /* Hooks */
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  /**
   * Handles message, color and close action for snackbar
   * @param {string} message - 'info' | 'success' | 'warning' | 'error' messages from components
   * @param {string} color - 'info' | 'success' | 'warning' | 'error' colors from components
   * @returns {void}
   */
  const handleShowSnackbar = useCallback(
    (message: string, color: any): void => {
      enqueueSnackbar(message, {
        variant: color,
        // persist: true,
        action: (key: any) => (
          <IconButton
            size="small"
            sx={{ color: 'grey.900' }}
            onClick={() => closeSnackbar(key)}
          >
            <CloseIcon />
          </IconButton>
        ),
        ClickAwayListenerProps: {
          onClickAway: () => {
            closeSnackbar();
          },
        },
      });
    },
    [closeSnackbar, enqueueSnackbar]
  );

  /* Output */
  return {
    showSnackbar: handleShowSnackbar,
  };
}

export default useSnackbarClose;
