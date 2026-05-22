/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Reusable action icon button component with variant-based styling
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 02/10/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import { memo } from 'react';
import { Box, SxProps, Theme, Tooltip, CircularProgress } from '@mui/material';

/* Local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface for ActionIconButton props
 *
 * @interface ActionIconButtonProps
 * @property {React.ReactNode} icon - Icon component to render
 * @property {'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'} variant - Button color variant
 * @property {() => void} onClick - Click handler function
 * @property {boolean} disabled - Disable button interaction
 * @property {SxProps<Theme>} sx - Additional MUI sx styles
 */
export interface ActionIconButtonProps {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  sx?: SxProps<Theme>;
}

// ----------------------------------------------------------------------

/**
 * Reusable action icon button component
 * Provides consistent styling for action buttons with different color variants
 *
 * @component
 * @param {React.ReactNode} icon - Icon to display
 * @param {string} variant - Color variant (primary, secondary, error, success, warning, info)
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {object} sx - Additional styles
 * @returns {React.ReactElement}
 */
const ActionIconButton = ({
  icon,
  variant = 'primary',
  onClick,
  disabled = false,
  loading = false,
  title = '',
  sx = {},
}: ActionIconButtonProps): React.ReactElement => {
  /* Output */
  const button = (
    <Box
      onClick={disabled || loading ? undefined : (e: any) => onClick?.(e)}
      sx={(theme: Theme) =>
        styles.containerStyles(theme, disabled || loading, variant, sx)
      }
    >
      {loading ? <CircularProgress size={16} color="inherit" /> : icon}
    </Box>
  );

  if (title) {
    return (
      <Tooltip title={title} arrow>
        {button}
      </Tooltip>
    );
  }

  return button;
};

export default memo(ActionIconButton);
