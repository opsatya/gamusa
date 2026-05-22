/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create confirmation dialog component.
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
import { memo } from 'react';
import {
  Box,
  Button,
  ButtonOwnProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Close } from '@mui/icons-material';
import { confirmDialogStyles as styles } from './index.style';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create popup dialog component for confirmation message.
 *
 * @interface ConfirmDialogProps
 * @property {boolean} open - to open and close the dialog
 * @property {string|node} title - title for the dialog
 * @property {string|node} description - describing the confirmation message
 * @property {boolean} isSubmitting - to show the loading for button
 * @property {string} agreeText - text for 'Yes' button
 * @property {string} disagreeText - text for 'No' button
 * @property {boolean} showLogo - to show the logo
 * @property {function} onAgreeAction - action for 'Yes' button
 * @property {function} onDisAgreeAction - action for 'No' button
 */
export interface ConfirmDialogProps {
  open?: boolean;
  onClose?: () => void;
  title?: string | React.ReactNode;
  description: string | React.ReactNode;
  isSubmitting?: boolean;
  agreeText?: string;
  disagreeText?: string;
  iconSrc?: string;
  showLogo?: boolean;
  onAgreeAction: () => void;
  onDisAgreeAction: () => void;
  buttonColor?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
}

// ----------------------------------------------------------------------

/**
 * Popup dialog component for confirmation message
 *
 * @component
 * @param {boolean} open - to open and close the dialog
 * @param {function} onClose - to close the dialog
 * @param {string|node} title - title for the dialog
 * @param {string|node} description - describing the confirmation message
 * @param {boolean} isSubmitting - to show the loading for button
 * @param {string} agreeText - text for 'Yes' button
 * @param {string} disagreeText - text for 'No' button
 * @param {boolean} showLogo - to show the logo
 * @param {function} onAgreeAction - action for 'Yes' button
 * @param {function} onDisAgreeAction - action for 'No' button
 * @param {enum} buttonColor - color for button
 * @returns {React.ReactElement}
 */
const ConfirmDialog = ({
  open = false,
  onClose,
  title,
  description,
  isSubmitting = false,
  agreeText = 'Agree',
  disagreeText = 'Disagree',
  showLogo = false,
  onAgreeAction,
  onDisAgreeAction,
  iconSrc,
  buttonColor,
}: ConfirmDialogProps): React.ReactElement => {
  /* Output */
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={() => onClose && onClose()}
      slotProps={{
        paper: {
          sx: styles.dialogContainer,
        },
      }}
    >
      <Stack>
        {showLogo && iconSrc && (
          <Box component="img" src={iconSrc} sx={styles.logoStyles} />
        )}

        <Stack gap={1.5} mt={0}>
          {title && <DialogTitle variant="h5">{title}</DialogTitle>}
          <DialogContent>
            <DialogContentText variant="bodyLRegular" color="textSecondary">
              {description}
            </DialogContentText>
          </DialogContent>
        </Stack>
        <DialogActions>
          <LoadingButton
            data-testid="buttonAgree"
            size="medium"
            color={buttonColor}
            variant="contained"
            loading={isSubmitting}
            onClick={onAgreeAction}
            fullWidth
          >
            {agreeText}
          </LoadingButton>
          <Button
            data-testid="buttonDisagree"
            variant="outlined"
            size="medium"
            onClick={onDisAgreeAction}
            fullWidth
          >
            {disagreeText}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default memo(ConfirmDialog);
