/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Reusable InlineEditCell component for editing table cells.
 * Click on a cell to edit, press Enter/blur to save, Escape to cancel.
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
import React, { useState, useRef, useEffect, memo } from 'react';
import { Box, TextField, Typography, useTheme } from '@mui/material';

/* Local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * InlineEditCell - Click-to-edit table cell component.
 *
 * @interface InlineEditCellProps
 * @property {string} value - current cell value
 * @property {function} onSave - callback when edit is saved (receives new value)
 * @property {string} [variant] - Typography variant for display mode
 * @property {string} [color] - Typography color for display mode
 * @property {React.ReactNode} [startAdornment] - optional element before text (e.g. Avatar)
 * @property {object} [containerSx] - optional additional sx for container
 */
interface InlineEditCellProps {
  value: string;
  onSave: (newValue: string) => void;
  variant?: any;
  color?: string;
  startAdornment?: React.ReactNode;
  containerSx?: object;
}

// ----------------------------------------------------------------------

const InlineEditCell = memo(
  ({
    value,
    onSave,
    variant = 'bodySRegular',
    color = 'text.primary',
    startAdornment,
    containerSx = {},
  }: InlineEditCellProps): React.ReactElement => {
    const theme = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync edit value when prop value changes externally
    useEffect(() => {
      if (!isEditing) {
        setEditValue(value);
      }
    }, [value, isEditing]);

    // Auto-focus and select text when entering edit mode
    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [isEditing]);

    /** Enter edit mode */
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // prevent row click from firing
      setIsEditing(true);
    };

    /** Save and exit edit mode */
    const handleSave = () => {
      const trimmedValue = editValue.trim();
      if (trimmedValue && trimmedValue !== value) {
        onSave(trimmedValue);
      } else {
        setEditValue(value); // revert if empty or unchanged
      }
      setIsEditing(false);
    };

    /** Handle keyboard events */
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSave();
      }
      if (e.key === 'Escape') {
        setEditValue(value); // revert
        setIsEditing(false);
      }
      // Stop event propagation to prevent table sorting
      e.stopPropagation();
    };

    // ---- Edit Mode ----
    if (isEditing) {
      return (
        <TextField
          inputRef={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          size="small"
          sx={styles.editInput(theme)}
          onClick={(e) => e.stopPropagation()}
        />
      );
    }

    // ---- Display Mode ----
    return (
      <Box
        sx={{ ...styles.cellContainer(theme), ...containerSx }}
        onClick={handleClick}
      >
        {startAdornment}
        <Typography variant={variant} color={color} noWrap>
          {value}
        </Typography>
      </Box>
    );
  }
);

export default InlineEditCell;
