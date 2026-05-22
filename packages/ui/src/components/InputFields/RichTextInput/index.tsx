/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd.
 * @description Reusable Rich Text Input component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 06/02/2026
 */

// ----------------------------------------------------------------------

/* Imports */

import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Typography,
} from '@mui/material';
import { RichTextEditor, type RichTextEditorRef } from 'mui-tiptap';
import StarterKit from '@tiptap/starter-kit';
import type { Extensions } from '@tiptap/core';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/* Local Imports */
import styles from './index.style';
import EditorMenuControls from './EditMenuControls';

// ----------------------------------------------------------------------

/**
 * @interface RichTextInputProps
 * @description Props for the RichTextInput component.
 * @property {RichTextEditorRef} rteRef - Reference to the RichTextEditor.
 * @property {string} label - Label for the input field.
 * @property {boolean} required - Whether the input field is required.
 * @property {string} name - Name of the input field.
 * @property {string} content - Content of the input field.
 * @property {boolean} disabled - Whether the input field is disabled.
 * @property {boolean} readonly - Whether the input field is readonly.
 * @property {string} placeholder - Placeholder for the input field.
 * @property {boolean} error - Whether the input field is in error state.
 * @property {string} helperText - Helper text for the input field.
 * @property {(value: string) => void} onChange - Callback function for when the input value changes.
 * @property {(value: string) => void} onBlur - Callback function for when the input loses focus.
 * @property {object | (() => object)} containerStyles - Styles for the container.
 */
export interface RichTextInputProps {
  rteRef?: RichTextEditorRef;
  label?: string;
  required?: boolean;
  name: string;
  content?: string;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  containerStyles?: object | (() => object);
  extensions?: Extensions;
}

// ----------------------------------------------------------------------
/**
 * @function RichTextInput
 * @description Reusable Rich Text Input component.
 * @param {RichTextInputProps} props - Props for the RichTextInput component.
 * @returns {JSX.Element} - The RichTextInput component.
 */
const RichTextInput = ({
  content,
  name,
  rteRef,
  disabled,
  readonly,
  placeholder = 'Start typing…',
  label,
  error = false,
  helperText = '',
  required = false,
  onChange,
  onBlur,
  containerStyles = {},
  extensions = [],
}: RichTextInputProps) => {
  return (
    <FormControl
      fullWidth
      required={required}
      error={error}
      sx={styles.formControlStyle}
    >
      <Stack>
        {label && (
          <FormLabel htmlFor={name} sx={styles.formLabelStyle}>
            {label}
          </FormLabel>
        )}

        <Box sx={[styles.richtextContainer, containerStyles]}>
          <RichTextEditor
            // ref={rteRef}
            content={content}
            editable={!disabled && !readonly}
            extensions={[StarterKit, ...extensions]}
            onUpdate={({ editor }) => {
              onChange?.(editor.getHTML());
            }}
            onBlur={() => {
              onBlur?.(content ?? '');
            }}
            sx={[styles.proseMirrorStyle, containerStyles]}
            renderControls={() => <EditorMenuControls />}
          />
        </Box>

        {helperText && (
          <FormHelperText error sx={styles.formHelperTextStyle}>
            <ErrorOutlineIcon />
            <Typography component="span" variant="subtitle2">
              {helperText}
            </Typography>
          </FormHelperText>
        )}
      </Stack>
    </FormControl>
  );
};

export default RichTextInput;
