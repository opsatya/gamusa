/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Reusable InlineAddRow component for adding a new row
 * directly inside a DataTable — Airtable-style, no popup/modal.
 *
 * Uses a render-props (children-as-function) pattern so the parent
 * controls column rendering while the component manages state.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Tanishak
 * Date Created: 17/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Stack,
  useTheme,
  Box,
  MenuItem,
  Typography,
} from '@mui/material';

/* MUI Icons */
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

/* Local Imports */
import ActionIconButton from '../ActionIconButton';
import styles from './index.style';

// ----------------------------------------------------------------------

interface FileFieldProps {
  value: any;
  fieldName: string;
  hasError: boolean;
  helperText?: string;
  onUpload?: (file: File) => Promise<string>;
  onChange: (field: string, value: any) => void;
}

const FileField = ({
  value,
  fieldName,
  hasError,
  helperText,
  onUpload,
  onChange,
}: FileFieldProps) => {
  const fileValue = value;
  const isLocalFile = fileValue instanceof File;
  const isRemoteUrl =
    typeof fileValue === 'string' && fileValue.startsWith('http');
  const [isUploading, setIsUploading] = useState(false);

  const hasFile = isLocalFile || isRemoteUrl;

  const handleView = () => {
    if (isLocalFile) {
      const url = URL.createObjectURL(fileValue);
      window.open(url, '_blank');
    } else if (isRemoteUrl) {
      window.open(fileValue, '_blank');
    }
  };

  const handlePickAndUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so the same file can be picked again if needed
    e.target.value = '';

    if (onUpload) {
      try {
        setIsUploading(true);
        const url = await onUpload(file);
        onChange(fieldName, url);
      } catch (error) {
        console.error('Upload failed', error);
      } finally {
        setIsUploading(false);
      }
    } else {
      // Fallback for when onUpload is not provided (shouldn't happen in our use case)
      onChange(fieldName, file);
    }
  };

  const iconButtonStyle = {
    backgroundColor: 'transparent !important',
    border: 'none !important',
    padding: '0 !important',
    width: 'auto !important',
    height: 'auto !important',
    minWidth: 'auto !important',
    '&:hover': {
      backgroundColor: 'transparent !important',
      transform: 'none !important',
      opacity: 0.7,
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
      }}
    >
      {/* ── Icons Row ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
        }}
      >
        {/* Upload icon — always visible */}
        <Box
          component="label"
          sx={{
            cursor: isUploading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: hasError ? 'error.main' : 'action.active',
            opacity: isUploading ? 0.5 : 1,
            '&:hover': { opacity: 0.7 },
          }}
          title="Upload Resume"
        >
          <FileUploadOutlinedIcon fontSize="small" />
          <input
            type="file"
            hidden
            onChange={handlePickAndUpload}
            disabled={isUploading}
          />
        </Box>

        {/* View icon — only shown when a file exists and not actively uploading */}
        {hasFile && !isUploading && (
          <ActionIconButton
            icon={<VisibilityOutlinedIcon fontSize="small" />}
            variant="secondary"
            onClick={handleView}
            title="View Resume"
            sx={iconButtonStyle}
          />
        )}
      </Box>

      {/* ── Uploading label — shown below icon during upload ── */}
      {isUploading && (
        <Typography
          variant="caption"
          sx={{ fontSize: '10px', color: 'text.secondary', lineHeight: 1 }}
        >
          Uploading...
        </Typography>
      )}

      {/* ── Validation error ── */}
      {hasError && helperText && (
        <Typography
          variant="caption"
          color="error"
          sx={{ fontSize: '10px', lineHeight: 1.2, whiteSpace: 'nowrap' }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

// ----------------------------------------------------------------------

/* Types/Interfaces */

/**
 * Configuration for each field in the inline add row.
 *
 * @interface InlineAddRowField
 * @property {string} field - key name matching the data model
 * @property {string} placeholder - placeholder text shown in the input
 * @property {boolean} [autoFocus] - whether this field auto-focuses when the row opens
 */
export interface InlineAddRowField {
  field: string;
  placeholder: string;
  autoFocus?: boolean;
  disabled?: boolean;
  type?: 'text' | 'select' | 'file';
  options?: { label: string; value: string | number }[];
  onChange?: (
    value: any,
    rowData: Record<string, any>,
    setValue: (field: string, value: any) => void
  ) => void | any;
}

/**
 * Props passed to the children render function.
 *
 * @interface InlineAddRowChildProps
 * @property {boolean} isAdding - whether the add row is currently visible
 * @property {Record<string, string>} newRowData - current field values
 * @property {function} renderField - renders a styled TextField for a given field
 * @property {function} renderActions - renders Save ✓ / Cancel ✗ buttons
 * @property {React.ReactNode} addButton - the "+ Add" button (null when adding)
 * @property {function} handleFieldChange - update a single field value
 * @property {function} handleSave - save the row and reset
 * @property {function} handleCancel - cancel and reset
 */
export interface InlineAddRowChildProps {
  isAdding: boolean;
  newRowData: Record<string, string>;
  renderField: (fieldName: string, extraProps?: object) => React.ReactNode;
  renderActions: () => React.ReactNode;
  addButton: React.ReactNode;
  handleFieldChange: (field: string, value: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

/**
 * InlineAddRow — Airtable-style inline row creation.
 *
 * @interface InlineAddRowProps
 * @property {InlineAddRowField[]} fields - field configurations
 * @property {Record<string, string>} [defaultValues] - initial values for fields
 * @property {function} onSave - callback when the row is saved (receives field data)
 * @property {string} [requiredField] - field that must be non-empty to allow save
 * @property {string} [buttonLabel] - label for the "+ Add" button
 * @property {object} [buttonSx] - additional sx overrides for the "+ Add" button
 * @property {function} children - render function receiving InlineAddRowChildProps
 */
interface InlineAddRowProps {
  fields: InlineAddRowField[];
  defaultValues?: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
  validationSchema?: any;
  requiredFields?: string[];
  buttonLabel?: string;
  buttonSx?: object;
  isAdding?: boolean;
  onIsAddingChange?: (isAdding: boolean) => void;
  onUpload?: (file: File) => Promise<string>;
  children: (props: InlineAddRowChildProps) => React.ReactNode;
}

// ----------------------------------------------------------------------

const InlineAddRow = ({
  fields,
  defaultValues = {},
  onSave,
  validationSchema,
  requiredFields = [],
  buttonLabel = 'Add Row',
  buttonSx = {},
  isAdding: controlledIsAdding,
  onIsAddingChange,
  onUpload,
  children,
}: InlineAddRowProps): React.ReactElement => {
  const theme = useTheme();

  // ---- Internal State ----
  const [internalIsAdding, setInternalIsAdding] = useState(false);
  const isAdding =
    controlledIsAdding !== undefined ? controlledIsAdding : internalIsAdding;

  const setIsAdding = (val: boolean) => {
    if (onIsAddingChange) onIsAddingChange(val);
    setInternalIsAdding(val);
  };

  const [rowData, setRowData] = useState<Record<string, any>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /** Update a single field in the new row */
  const handleFieldChange = (field: string, value: any) => {
    const fieldConfig = fields.find((f) => f.field === field);

    const setValue = (f: string, v: any) => {
      setRowData((prev) => ({ ...prev, [f]: v }));
    };

    const nextData = { ...rowData, [field]: value };
    setRowData(nextData);

    if (fieldConfig?.onChange) {
      fieldConfig.onChange(value, nextData, setValue);
    }

    // Clear error when field changes
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /** Save the row — calls parent onSave and resets */
  const handleSave = async () => {
    if (validationSchema) {
      try {
        await validationSchema.validate(rowData, { abortEarly: false });
        setErrors({});
        onSave(rowData);
        handleCancel();
      } catch (err: any) {
        const validationErrors: Record<string, string> = {};
        err.inner?.forEach((error: any) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
      return;
    }

    const hasMissingRequired = requiredFields.some(
      (f) =>
        !rowData[f] || (typeof rowData[f] === 'string' && !rowData[f]?.trim())
    );
    if (hasMissingRequired) return;
    onSave(rowData);
    setRowData(defaultValues);
    setIsAdding(false);
  };

  /** Cancel — reset and close the row */
  const handleCancel = () => {
    setRowData(defaultValues);
    setErrors({});
    setIsAdding(false);
  };

  /**
   * Render a styled TextField for a given field.
   * @param fieldName - the field key
   * @param extraProps - optional additional TextField props (e.g. onKeyDown)
   */
  const renderField = (
    fieldName: string,
    extraProps: object = {}
  ): React.ReactNode => {
    const fieldConfig = fields.find((f) => f.field === fieldName);
    const type = fieldConfig?.type || 'text';
    const hasError = !!errors[fieldName];

    if (type === 'select') {
      return (
        <TextField
          select
          error={hasError}
          helperText={errors[fieldName]}
          value={rowData[fieldName] || ''}
          onChange={(e) => handleFieldChange(fieldName, e.target.value)}
          size="small"
          disabled={fieldConfig?.disabled}
          sx={styles.fieldInput(theme)}
          SelectProps={{
            displayEmpty: true,
          }}
          {...extraProps}
        >
          <MenuItem value="" disabled>
            {fieldConfig?.placeholder || 'Select'}
          </MenuItem>
          {fieldConfig?.options?.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      );
    }

    if (type === 'file') {
      return (
        <FileField
          value={rowData[fieldName]}
          fieldName={fieldName}
          hasError={hasError}
          helperText={errors[fieldName]}
          onUpload={onUpload}
          onChange={handleFieldChange}
        />
      );
    }

    return (
      <TextField
        error={hasError}
        helperText={errors[fieldName]}
        placeholder={fieldConfig?.placeholder || fieldName}
        value={rowData[fieldName] || ''}
        onChange={(e) => handleFieldChange(fieldName, e.target.value)}
        size="small"
        autoFocus={fieldConfig?.autoFocus}
        disabled={fieldConfig?.disabled}
        sx={styles.fieldInput(theme)}
        {...extraProps}
      />
    );
  };

  const renderActions = (): React.ReactNode => (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%', height: '100%' }}
    >
      <ActionIconButton
        icon={<CheckIcon fontSize="small" />}
        variant="success"
        onClick={handleSave}
      />
      <ActionIconButton
        icon={<CloseIcon fontSize="small" />}
        variant="error"
        onClick={handleCancel}
      />
    </Stack>
  );

  /** The "+ Add" button — hidden when the row is open */
  const addButton: React.ReactNode = !isAdding ? (
    <Button
      startIcon={<AddIcon />}
      onClick={() => setIsAdding(true)}
      sx={{ ...styles.addButton(theme), ...buttonSx }}
    >
      {buttonLabel}
    </Button>
  ) : null;

  // ---- Render via children-as-function ----
  return children({
    isAdding,
    newRowData: rowData,
    renderField,
    renderActions,
    addButton,
    handleFieldChange,
    handleSave,
    handleCancel,
  }) as React.ReactElement;
};

export default InlineAddRow;
