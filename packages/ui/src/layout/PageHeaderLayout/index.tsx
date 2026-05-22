/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description PageHeaderLayout component with breadcrumbs, back button, and configurable actions
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 04/02/2026
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
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  Stack,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

/* Relative Imports */
import { BackButton } from '@lektus/ui';

/* Local Imports */
import styles from './index.style';
import { LoadingButton } from '@mui/lab';
// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Breadcrumb item interface
 *
 * @interface BreadcrumbItem
 * @property {string} label - Display text for breadcrumb
 * @property {string} [href] - Optional link URL
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Cancel button configuration interface
 *
 * @interface CancelActionConfig
 * @property {string} [label] - Custom label for cancel button (default: "Cancel")
 * @property {() => void} [onClick] - Click handler for cancel button
 * @property {boolean} [disabled] - Disable state for cancel button
 */
export interface CancelActionConfig {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

/**
 * Save button configuration interface
 *
 * @interface SaveActionConfig
 * @property {string} [label] - Custom label for save button (default: "Save")
 * @property {() => void} [onClick] - Click handler for save button
 * @property {boolean} [loading] - Loading state for save button
 * @property {boolean} [disabled] - Disable state for save button
 */
export interface SaveActionConfig {
  label?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

/**
 * PageHeaderLayout component props interface
 *
 * @interface PageHeaderLayoutProps
 * @property {string} title - Main page title
 * @property {BreadcrumbItem[]} [breadcrumbs] - Array of breadcrumb items
 * @property {boolean} [showBackButton] - Show/hide back button (default: false)
 * @property {() => void} [onBackClick] - Custom back button click handler
 * @property {React.ReactNode} [actions] - Custom actions node (overrides default buttons)
 * @property {boolean} [showDefaultActions] - Show/hide default save and cancel buttons (default: true)
 * @property {CancelActionConfig} [cancelAction] - Cancel button configuration
 * @property {SaveActionConfig} [saveAction] - Save button configuration
 */
export interface PageHeaderLayoutProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  showBackButton?: boolean;
  onBackClick?: () => void;
  actions?: React.ReactNode;
  showDefaultActions?: boolean;
  cancelAction?: CancelActionConfig;
  saveAction?: SaveActionConfig;
}

// ----------------------------------------------------------------------

/**
 * PageHeaderLayout component for displaying page title, breadcrumbs, and actions
 *
 * Layout Structure:
 * Row 1: [BackButton] Title (vertically centered) | [Actions]
 * Row 2: Breadcrumbs
 *
 * @component
 * @param {string} title - Main page title
 * @param {BreadcrumbItem[]} [breadcrumbs] - Array of breadcrumb items
 * @param {boolean} [showBackButton=false] - Show/hide back button
 * @param {() => void} [onBackClick] - Custom back button click handler
 * @param {React.ReactNode} [actions] - Custom actions node
 * @param {boolean} [showDefaultActions=true] - Show/hide default buttons
 * @param {CancelActionConfig} [cancelAction] - Cancel button configuration
 * @param {SaveActionConfig} [saveAction] - Save button configuration
 * @returns {React.ReactElement}
 */
const PageHeaderLayout = ({
  title,
  breadcrumbs,
  showBackButton = false,
  onBackClick,
  actions,
  showDefaultActions = true,
  cancelAction,
  saveAction,
}: PageHeaderLayoutProps): React.ReactElement => {
  /* Hooks */
  /* Functions */
  /**
   * Render default action buttons (Cancel and Save)
   *
   * @returns {React.ReactElement}
   */
  const renderDefaultActions = (): React.ReactElement => (
    <Box sx={styles.actionsContainer}>
      <LoadingButton
        variant="contained"
        color="primary"
        size="small"
        onClick={saveAction?.onClick}
        disabled={saveAction?.disabled || saveAction?.loading}
        loading={saveAction?.loading}
        startIcon={saveAction?.icon}
        sx={styles.saveButton}
      >
        {saveAction?.label || 'Save'}
      </LoadingButton>
      <Button
        variant="outlined"
        color="inherit"
        size="small"
        onClick={cancelAction?.onClick}
        disabled={cancelAction?.disabled}
        startIcon={cancelAction?.icon}
        sx={styles.cancelButton}
      >
        {cancelAction?.label || 'Cancel'}
      </Button>
    </Box>
  );

  /**
   * Render breadcrumbs navigation
   *
   * @returns {React.ReactElement | null}
   */
  const renderBreadcrumbs = (): React.ReactElement | null => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={styles.breadcrumbsStyle}
      >
        {breadcrumbs.map((crumb, index) =>
          crumb.href ? (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={crumb.href}
              variant="bodyMMedium"
              sx={styles.breadcrumbLink}
            >
              {crumb.label}
            </Link>
          ) : (
            <Typography key={index} color="text.primary" variant="bodyMMedium">
              {crumb.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    );
  };

  /* Output */
  return (
    <Box sx={styles.rootStyle}>
      <Grid container spacing={2}>
        {/* Left Section: Back Button + Title */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, md: 4 }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            {showBackButton && (
              <BackButton
                handleGoback={onBackClick}
                buttonStyle={styles.backButtonStyle}
              />
            )}
            <Box>
              <Typography variant="h4">{title}</Typography>
              {breadcrumbs && breadcrumbs.length > 0 && (
                <Box sx={styles.secondaryRowStyle}>{renderBreadcrumbs()}</Box>
              )}
            </Box>
          </Stack>
        </Grid>

        {/* Right Section: Actions */}
        <Grid sx={styles.rightSectionStyle} size={{ xs: 12, sm: 6 }}>
          {actions ? actions : showDefaultActions && renderDefaultActions()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(PageHeaderLayout);
