/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Production-grade file upload component with validation and dual-mode support
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashiknat Yadav
 * Date Created: 04/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { memo, useRef, ChangeEvent, useCallback, useEffect } from 'react';
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
  IconButton,
  Alert,
  FormControl,
  FormLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Description as DocIcon,
  Image as ImageIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

/* Relative Imports */
import { ImportIcon } from '../../icons';

/* Local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/* Types/Interfaces */

/**
 * File status enumeration
 *
 * @enum {string}
 */
export enum FileStatus {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  COMPLETED = 'completed',
  ERROR = 'error',
}

/**
 * Uploaded file interface
 *
 * @interface UploadedFile
 * @property {string} id - Unique file identifier
 * @property {File} file - Native File object
 * @property {string} name - File name
 * @property {number} size - File size in bytes
 * @property {string} type - MIME type
 * @property {string} [preview] - Preview URL for images
 * @property {number} progress - Upload progress (0-100)
 * @property {FileStatus} status - Current file status
 * @property {string} [error] - Error message if failed
 * @property {string} [uploadedUrl] - URL after successful upload
 */
export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview?: string;
  progress: number;
  status: FileStatus;
  error?: string;
  uploadedUrl?: string;
}

/**
 * File validation error interface
 *
 * @interface FileValidationError
 * @property {string} fileName - Name of the invalid file
 * @property {string} message - Error message
 * @property {string} type - Error type (size, type, count)
 */
export interface FileValidationError {
  fileName: string;
  message: string;
  type: 'size' | 'type' | 'count' | 'duplicate';
}

/**
 * Error messages configuration
 *
 * @interface ErrorMessages
 */
export interface ErrorMessages {
  fileType?: string;
  fileSize?: string;
  maxFiles?: string;
  duplicate?: string;
  uploadFailed?: string;
}

/**
 * Upload response interface
 *
 * @interface UploadResponse
 * @property {string} url - Uploaded file URL
 */
export interface UploadResponse {
  url: string;
}

/**
 * UploadFile component props
 *
 * @interface UploadFileProps
 * @property {string} [label] - Label for the upload component
 * @property {boolean} [required=false] - Indicate if the field is required
 * @property {boolean} [multiple=false] - Allow multiple file selection
 * @property {string} [accept] - Accepted file types (e.g., "image/*,.pdf")
 * @property {number} [maxSize=5242880] - Maximum file size in bytes (default: 5MB)
 * @property {number} [maxFiles] - Maximum number of files (only for multiple mode)
 * @property {boolean} [disabled=false] - Disable the component
 * @property {UploadedFile[]} [value=[]] - Current files (controlled)
 * @property {(files: UploadedFile[]) => void} onChange - Callback when files change
 * @property {(file: File) => Promise<UploadResponse>} [uploadHandler] - Optional upload function
 * @property {(errors: FileValidationError[]) => void} [onError] - Validation error callback
 * @property {string} [uploadText] - Custom upload heading text
 * @property {string} [descriptionText] - Custom description text
 * @property {string} [browseButtonText] - Custom browse button text
 * @property {string} [helperText] - Helper text shown below component
 * @property {ErrorMessages} [errorMessages] - Custom error messages
 */
export interface UploadFileProps {
  label?: string;
  required?: boolean;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  value?: UploadedFile[];
  onChange: (
    files: UploadedFile[] | ((prev: UploadedFile[]) => UploadedFile[])
  ) => void;
  uploadHandler?: (file: File) => Promise<UploadResponse>;
  onError?: (errors: FileValidationError[]) => void;
  uploadText?: string;
  descriptionText?: string;
  browseButtonText?: string;
  helperText?: string;
  errorMessages?: ErrorMessages;
}

// ----------------------------------------------------------------------

/* Constants */

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_ERROR_MESSAGES: ErrorMessages = {
  fileType: 'File type not allowed',
  fileSize: 'File size exceeds maximum limit',
  maxFiles: 'Maximum number of files exceeded',
  duplicate: 'File already exists',
  uploadFailed: 'Upload failed. Please try again.',
};

// ----------------------------------------------------------------------

/**
 * UploadFile component for handling file selection, validation, and upload
 *
 * Supports two modes:
 * 1. Form Data Mode (default) - Files selected and marked complete immediately
 * 2. Upload Mode - Files uploaded to bucket with real progress tracking
 *
 * @component
 * @param {string} [label] - Label for the upload component
 * @param {boolean} [required=false] - Indicate if the field is required
 * @param {boolean} [multiple=false] - Allow multiple file selection
 * @param {string} [accept] - Accepted file types
 * @param {number} [maxSize=5242880] - Maximum file size in bytes
 * @param {number} [maxFiles] - Maximum number of files
 * @param {boolean} [disabled=false] - Disable component
 * @param {UploadedFile[]} [value=[]] - Current files
 * @param {(files: UploadedFile[]) => void} onChange - Files change callback
 * @param {(file: File) => Promise<UploadResponse>} [uploadHandler] - Upload function
 * @param {(errors: FileValidationError[]) => void} [onError] - Error callback
 * @returns {React.ReactElement}
 */
const UploadFile = ({
  label,
  required = false,
  multiple = false,
  accept,
  maxSize = DEFAULT_MAX_SIZE,
  maxFiles,
  disabled = false,
  value = [],
  onChange,
  uploadHandler,
  onError,
  uploadText = 'Upload Your Documents Here',
  descriptionText = 'Please upload documents using “upload from computer” ',
  browseButtonText = 'Browse Files',
  helperText,
  errorMessages = DEFAULT_ERROR_MESSAGES,
}: UploadFileProps): React.ReactElement => {
  /*Hooks */
  const theme = useTheme();

  /* Refs */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAbortControllersRef = useRef<Map<string, AbortController>>(
    new Map()
  );

  /* Constants*/
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const variant = isSmallScreen ? 'h5' : 'h3';

  /* Functions */

  /**
   * Generate unique file ID
   *
   * @returns {string} Unique identifier
   */
  const generateFileId = (): string => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Format file size to human-readable format
   *
   * @param {number} bytes - File size in bytes
   * @returns {string} Formatted size (e.g., "2.5 MB")
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  /**
   * Get file icon based on MIME type
   *
   * @param {string} mimeType - File MIME type
   * @returns {React.ReactElement} Icon component
   */
  const getFileIcon = (mimeType: string): React.ReactElement => {
    if (mimeType.startsWith('image/')) {
      return <ImageIcon sx={styles.fileIcon} />;
    }
    if (mimeType.includes('pdf')) {
      return (
        <Box
          component="img"
          src="/assets/images/pdf.png"
          sx={styles.fileIcon}
        />
      );
    }
    return <DocIcon sx={styles.fileIcon} />;
  };

  /**
   * Generate preview URL for image files
   *
   * @param {File} file - File object
   * @returns {string | undefined} Preview URL or undefined
   */
  const generatePreview = (file: File): string | undefined => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return undefined;
  };

  /**
   * Validate single file
   *
   * @param {File} file - File to validate
   * @returns {FileValidationError | null} Error or null if valid
   */
  const validateFile = (file: File): FileValidationError | null => {
    // Check file size
    if (file.size > maxSize) {
      return {
        fileName: file.name,
        message:
          errorMessages.fileSize ||
          `${DEFAULT_ERROR_MESSAGES.fileSize} (${formatFileSize(maxSize)})`,
        type: 'size',
      };
    }

    // Check file type if accept is specified
    if (accept) {
      const acceptedTypes = accept.split(',').map((type) => type.trim());
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      const mimeType = file.type;

      const isAccepted = acceptedTypes.some((acceptedType) => {
        if (acceptedType.startsWith('.')) {
          return fileExtension === acceptedType.toLowerCase();
        }
        if (acceptedType.endsWith('/*')) {
          const baseType = acceptedType.split('/')[0];
          return mimeType.startsWith(baseType);
        }
        return mimeType === acceptedType;
      });

      if (!isAccepted) {
        return {
          fileName: file.name,
          message: errorMessages.fileType || DEFAULT_ERROR_MESSAGES.fileType!,
          type: 'type',
        };
      }
    }

    // Check for duplicate files
    const isDuplicate = value.some(
      (existingFile) =>
        existingFile.name === file.name && existingFile.size === file.size
    );

    if (isDuplicate) {
      return {
        fileName: file.name,
        message: errorMessages.duplicate || DEFAULT_ERROR_MESSAGES.duplicate!,
        type: 'duplicate',
      };
    }

    return null;
  };

  /**
   * Upload file to server/bucket
   *
   * @param {UploadedFile} uploadedFile - File object to upload
   */
  const uploadFile = async (uploadedFile: UploadedFile): Promise<void> => {
    if (!uploadHandler) {
      // Form data mode - add file and mark as completed
      onChange((prev) => {
        // Check if file already exists (prevent duplicates)
        if (prev.some((f) => f.id === uploadedFile.id)) {
          return prev;
        }
        return [
          ...prev,
          { ...uploadedFile, progress: 100, status: FileStatus.COMPLETED },
        ];
      });
      return;
    }

    try {
      // First, add the file to the list
      onChange((prev) => {
        if (prev.some((f) => f.id === uploadedFile.id)) {
          return prev;
        }
        return [
          ...prev,
          { ...uploadedFile, status: FileStatus.UPLOADING, progress: 0 },
        ];
      });
      // Create abort controller for this upload
      const abortController = new AbortController();
      uploadAbortControllersRef.current.set(uploadedFile.id, abortController);

      // Update status to uploading
      updateFileStatus(uploadedFile.id, {
        status: FileStatus.UPLOADING,
        progress: 0,
      });

      // Simulate progress (you can replace with real progress tracking)
      const progressInterval = setInterval(() => {
        updateFileStatus(uploadedFile.id, (prev) => ({
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 200);

      // Call upload handler
      const response = await uploadHandler(uploadedFile.file);

      // Clear progress interval
      clearInterval(progressInterval);

      // Update to completed
      updateFileStatus(uploadedFile.id, {
        progress: 100,
        status: FileStatus.COMPLETED,
        uploadedUrl: response.url,
      });

      // Remove abort controller
      uploadAbortControllersRef.current.delete(uploadedFile.id);
    } catch (error) {
      // Update to error state
      updateFileStatus(uploadedFile.id, {
        status: FileStatus.ERROR,
        error:
          errorMessages.uploadFailed || DEFAULT_ERROR_MESSAGES.uploadFailed!,
      });

      // Remove abort controller
      uploadAbortControllersRef.current.delete(uploadedFile.id);
    }
  };

  /**
   * Update file status
   *
   * @param {string} fileId - File identifier
   * @param {Partial<UploadedFile> | ((prev: UploadedFile) => Partial<UploadedFile>)} updates - Updates to apply
   */
  const updateFileStatus = (
    fileId: string,
    updates:
      | Partial<UploadedFile>
      | ((prev: UploadedFile) => Partial<UploadedFile>)
  ): void => {
    onChange((prev) =>
      prev.map((file) => {
        if (file.id !== fileId) return file;
        const patch = typeof updates === 'function' ? updates(file) : updates;
        return { ...file, ...patch };
      })
    );
  };

  /**
   * Handle file selection
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Input change event
   */
  const handleFileSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const files = Array.from(event.target.files || []);

      if (files.length === 0) return;

      const errors: FileValidationError[] = [];
      const validFiles: UploadedFile[] = [];

      // Check max files limit
      if (maxFiles && value.length + files.length > maxFiles) {
        errors.push({
          fileName: '',
          message:
            errorMessages.maxFiles ||
            `${DEFAULT_ERROR_MESSAGES.maxFiles} (${maxFiles})`,
          type: 'count',
        });
        onError?.(errors);
        return;
      }

      // Validate and process each file
      files.forEach((file) => {
        const validationError = validateFile(file);

        if (validationError) {
          errors.push(validationError);
        } else {
          const uploadedFile: UploadedFile = {
            id: generateFileId(),
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            preview: generatePreview(file),
            progress: 0,
            status: FileStatus.PENDING,
          };
          validFiles.push(uploadedFile);
        }
      });

      // Report errors if any
      if (errors.length > 0) {
        onError?.(errors);
      }

      // Add valid files and trigger upload
      if (validFiles.length > 0) {
        validFiles.forEach((file) => {
          uploadFile(file);
        });
      }

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [value, maxFiles, accept, maxSize, onChange, uploadHandler, onError]
  );

  /**
   * Handle browse button click
   */
  const handleBrowseClick = (): void => {
    fileInputRef.current?.click();
  };

  /**
   * Handle file removal
   *
   * @param {string} fileId - File identifier to remove
   */
  const handleRemoveFile = (fileId: string): void => {
    // Cancel upload if in progress
    const abortController = uploadAbortControllersRef.current.get(fileId);
    if (abortController) {
      abortController.abort();
      uploadAbortControllersRef.current.delete(fileId);
    }

    onChange((prev) => prev.filter((file) => file.id !== fileId));

    // Clean up preview URL if exists
    const file = value.find((f) => f.id === fileId);
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
  };

  /**
   * Get status text based on file status
   *
   * @param {UploadedFile} file - File object
   * @returns {string} Status text
   */
  const getStatusText = (file: UploadedFile): string => {
    switch (file.status) {
      case FileStatus.PENDING:
        return 'Preparing...';
      case FileStatus.UPLOADING:
        return `Uploading... ${file.progress}%`;
      case FileStatus.COMPLETED:
        return 'Completed';
      case FileStatus.ERROR:
        return file.error || 'Upload failed';
      default:
        return '';
    }
  };

  /**
   * Cleanup effect
   */
  useEffect(() => {
    return () => {
      // Abort all ongoing uploads
      uploadAbortControllersRef.current.forEach((controller) =>
        controller.abort()
      );
      uploadAbortControllersRef.current.clear();

      // Revoke all preview URLs
      value.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  /* Output */
  return (
    <Box>
      {label && (
        <FormControl required={required}>
          <FormLabel sx={styles.formLabelStyle}>{label}</FormLabel>
        </FormControl>
      )}
      <Stack gap={3} sx={styles.containerStyles}>
        {/* Upload Area */}
        <Box sx={styles.contentContainer}>
          <Box sx={styles.imageContainer}>
            <Box
              component="img"
              src="/assets/images/upload.png"
              sx={styles.image}
              alt="Upload"
            />
          </Box>

          <Stack gap={2}>
            <Typography variant={variant}>{uploadText}</Typography>
            <Typography variant="bodyLRegular">{descriptionText}</Typography>
          </Stack>

          <Stack direction="row" gap={2}>
            <Button
              startIcon={<ImportIcon />}
              variant="contained"
              onClick={handleBrowseClick}
              disabled={disabled || (!!maxFiles && value.length >= maxFiles)}
            >
              {browseButtonText}
            </Button>
          </Stack>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            disabled={disabled}
          />
        </Box>

        {/* Helper Text */}
        {helperText && (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {helperText}
          </Typography>
        )}

        {/* Uploaded Files List */}
        {value.length > 0 && (
          <Stack gap={2}>
            {value.map((file) => (
              <Box key={file.id} sx={styles.uploadingFilesContainer}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  {/* File Icon or Preview */}
                  {file.preview ? (
                    <Box
                      component="img"
                      src={file.preview}
                      sx={styles.filePreview}
                      alt={file.name}
                    />
                  ) : (
                    <Box sx={styles.fileIconContainer}>
                      {getFileIcon(file.type)}
                    </Box>
                  )}

                  {/* File Info */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    width="100%"
                  >
                    <Box minWidth={300}>
                      <Stack gap={1.5} flex={1}>
                        <Typography variant="bodyLBold" sx={styles.fileName}>
                          {file.name}
                        </Typography>

                        {/* Size and Status */}
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Typography
                            variant="bodyMRegular"
                            color="text.secondary"
                          >
                            {formatFileSize(file.size)}
                          </Typography>
                          <Typography
                            variant="bodyMRegular"
                            color="text.secondary"
                          >
                            •
                          </Typography>
                          <Typography
                            variant="bodyMBold"
                            color={
                              file.status === FileStatus.ERROR
                                ? 'error'
                                : file.status === FileStatus.COMPLETED
                                  ? 'success.main'
                                  : 'text.secondary'
                            }
                            sx={styles.statusText}
                          >
                            {file.status === FileStatus.COMPLETED && (
                              <CheckCircleIcon sx={styles.statusIcon} />
                            )}
                            {file.status === FileStatus.ERROR && (
                              <ErrorIcon sx={styles.statusIcon} />
                            )}
                            {getStatusText(file)}
                          </Typography>
                        </Stack>

                        {/* Progress Bar */}
                        {file.status === FileStatus.UPLOADING && (
                          <LinearProgress
                            variant="determinate"
                            value={file.progress}
                            sx={styles.progressBar}
                          />
                        )}

                        {/* Error Message */}
                        {file.status === FileStatus.ERROR && file.error && (
                          <Alert severity="error" sx={styles.errorAlert}>
                            {file.error}
                          </Alert>
                        )}
                      </Stack>
                    </Box>

                    {/* Delete Button */}
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveFile(file.id)}
                      disabled={disabled}
                      sx={styles.deleteButton}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default memo(UploadFile);
