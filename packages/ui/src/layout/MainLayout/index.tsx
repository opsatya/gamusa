/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create layout for dashboard pages.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 02/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import React from 'react';
import { Box, Button, Typography, SxProps, Theme } from '@mui/material';

/* Relative Imports */
import Page from '../../components/Page';
// import { t } from '../../constants/appConstant';
import { Add } from '@mui/icons-material';

/* Local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create outer design layout for landing page.
 *
 * @interface MainLayoutProps
 * @property {node} children - contains the child components.
 */
export interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  title?: string;
  subtitle?: string;
  /** Full override (search bar, filters, multiple buttons, etc.) */
  actions?: React.ReactNode;
  showPrimaryAction?: boolean;

  /** Default primary action button config */
  primaryAction?: {
    label: string;
    onClick: () => void;
    startIcon?: React.ReactNode;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    size?: 'small' | 'medium' | 'large';
  };
  align?: 'left' | 'center';
  extraHeaderContent?: React.ReactNode;
  /** Optional sx override for the title Typography */
  titleSx?: SxProps<Theme>;
  /** Optional sx override for the subtitle Typography */
  subtitleSx?: SxProps<Theme>;
}

// ----------------------------------------------------------------------

/**
 * Outer design layout for landing page
 *
 * @component
 * @param {node} children - contains the child components
 */
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  pageTitle = 'lektus',
  title,
  subtitle,
  actions,
  showPrimaryAction = false,
  primaryAction = {
    label: 'Raise New Requisition',
    onClick: () => {},
    startIcon: <Add />,
    variant: 'contained',
    color: 'primary',
    size: 'small',
  },
  align = 'left',
  extraHeaderContent,
  titleSx,
  subtitleSx,
}): React.ReactElement => {
  /**
   * Renders the action buttons based on the provided props.
   *
   * @returns {React.ReactNode} The action buttons.
   */
  const renderActions = (): React.ReactNode => {
    if (actions) return actions;

    if (primaryAction && showPrimaryAction) {
      const {
        label,
        onClick,
        startIcon,
        variant = 'contained',
        color = 'primary',
      } = primaryAction;

      return (
        <Button
          variant={variant}
          color={color}
          size={primaryAction.size ?? 'small'}
          startIcon={startIcon}
          onClick={onClick}
        >
          {label}
        </Button>
      );
    }

    return null;
  };

  return (
    <Page title={pageTitle}>
      <Box
        sx={(theme) => ({
          ...styles.wrapperStyle(theme),
          ...(align === 'center' && {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2,
          }),
        })}
      >
        <Box>
          {title && (
            <Typography
              variant="h4"
              sx={{
                color: 'text.primary',
                ...((titleSx || {}) as object),
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="bodyMMedium"
              sx={{
                color: 'text.secondary',
                display: 'block',
                mt: 0.5,
                ...((subtitleSx || {}) as object),
              }}
            >
              {subtitle}
            </Typography>
          )}
          {extraHeaderContent && <Box sx={{ mt: 1 }}>{extraHeaderContent}</Box>}
        </Box>
        <Box
          sx={{
            ...(align === 'center' && {
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }),
          }}
        >
          {renderActions()}
        </Box>
      </Box>
      {children}
    </Page>
  );
};

export default MainLayout;
