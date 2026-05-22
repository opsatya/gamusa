import React from 'react';
import { Remove } from '@mui/icons-material';
import { Box, SxProps, Theme, useTheme } from '@mui/material';
import { TickIcon } from '../../icons';
import styles from './index.style';

// ----------------------------------------------------------------------

interface ToggleSwitchProps {
  checked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  disabled?: boolean;
  color?: 'primary' | 'secondary';
  sx?: SxProps<Theme>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  sx = {},
}) => {
  const theme = useTheme();

  const handleChange = (event: any) => {
    if (!disabled && onChange) {
      onChange(event, !checked);
    }
  };

  return (
    <Box
      component="label"
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: 36,
        height: 20,
        ...sx,
      }}
    >
      <Box
        sx={styles.track(checked, disabled)}
        onClick={handleChange}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            const syntheticEvent = {
              ...e,
              target: { checked: !checked },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            handleChange(syntheticEvent);
          }
        }}
      >
        <Box sx={styles.thumb(checked)}>
          {checked ? (
            <TickIcon
              style={{ ...styles.icon, color: theme.palette.primary.main }}
              strokeWidth={3.5}
            />
          ) : (
            <Remove
              style={{ ...styles.icon, color: theme.palette.grey[400] }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ToggleSwitch;
