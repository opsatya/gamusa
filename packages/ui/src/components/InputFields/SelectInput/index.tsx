/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to select input component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 06/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { memo } from 'react';
import {
  BaseSelectProps,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Typography,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/* local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/* Types/Interfaces */

/**
 * Handles select from Select Input
 *
 * @interface SelectInputProps
 * @property {string} name - name for select
 * @property {string} label - label text for the select
 * @property {string} placeholder - placeholder text for the select
 * @property {string} size - size for the select form
 * @property {boolean} required - to indicate select is required or not
 * @property {boolean} error - contains error message
 * @property {string} helperText - it shows the hints
 */
export interface SelectInputProps extends BaseSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  size?: any;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  children?: React.ReactNode;
  compact?: boolean;
}

// ----------------------------------------------------------------------

/**
 * Handles select from Select Input
 *
 * @Components
 * @param {string} name - name for select
 * @param {string} label - label text for the select
 * @param {string} placeholder - placeholder text for the select
 * @param {string} size - size for the select form
 * @param {boolean} required - to indicate select is required or not
 * @param {boolean} error - contains error message
 * @param {string} helperText - it shows the hints
 *
 * @returns {React.ReactElement}
 */
const SelectInput = ({
  name,
  label = '',
  placeholder,
  size = 'small',
  required = false,
  error = false,
  helperText = '',
  children = <></>,
  compact = false,
  ...other
}: SelectInputProps): React.ReactElement => {
  /* Output */
  return (
    <FormControl
      fullWidth
      variant="standard"
      size={size}
      required={required}
      error={error}
      sx={styles.formControlStyle}
    >
      {label && (
        <FormLabel sx={styles.formLabelStyle} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <Select
        fullWidth
        id={name}
        name={name}
        displayEmpty
        variant="outlined"
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
          // '& .MuiSelect-select': {
          //   fontSize: '0.8125rem',
          //   fontWeight: 400,
          // },
          '& .MuiSvgIcon-root': {
            fontSize: '1.1rem',
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: (theme: any) => ({
              mt: 0.5,
              borderRadius: '10px',
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[4],
              '& .MuiList-root': { p: 0.75 },
              '& .MuiMenuItem-root': {
                ...(compact && { height: 36, fontSize: '0.75rem' }),
                py: 0.75,
                px: 1.5,
                borderRadius: '6px',
                transition: 'background-color 0.15s',
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.lighter,
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.lighter,
                  },
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              },
            }),
          },
        }}
        {...other}
      >
        {children}
      </Select>
      {error && helperText && (
        <FormHelperText error sx={styles.formHelperTextStyle}>
          <ErrorOutlineIcon />
          <Typography component="span" variant="subtitle2">
            {helperText}
          </Typography>
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default memo(SelectInput);
