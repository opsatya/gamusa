/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create section wrapper component
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
import React, { memo } from 'react';
import {
  Box,
  Divider,
  IconButton,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

/* Local Imports */
import styles from './index.style';
import { EditIcon } from '../../../icons';

/**
 * Interface used to create section wrapper component
 * @interface SectionWrapperProps
 * @property {node} children - contains the child components
 * @property {string} title - title for the section
 * @property {boolean} hideDivider - hide the divider
 * @property {node} icon - icon for the section
 * @property {function} onIconClick - click handler for the icon
 * @property {object} containerStyle - container style for the section
 * @property {object} titleSx - optional sx overrides for the title Typography
 */
export interface SectionWrapperProps {
  children: React.ReactNode;
  title?: string;
  hideDivider?: boolean;
  icon?: React.ComponentType;
  onIconClick?: () => void;
  action?: React.ReactNode;
  containerStyle?: object | (() => void);
  titleSx?: SxProps<Theme>;
}

/**
 * Card wrapper component
 * @param {node} children - contains the child components
 * @param {string} title - title for the section
 * @param {boolean} hideDivider - hide the divider
 * @param {node} icon - icon for the section
 * @param {function} onIconClick - click handler for the icon
 * @param {object} containerStyle - container style for the section
 * @param {object} titleSx - optional sx overrides for the title Typography
 * @returns
 */
const SectionWrapper = ({
  children,
  title,
  hideDivider,
  icon = EditIcon,
  onIconClick,
  action,
  containerStyle = {},
  titleSx,
}: SectionWrapperProps): React.ReactElement => {
  const Icon = icon;

  const renderAction = () => {
    if (action) {
      return <Box>{action}</Box>;
    }
    return (
      !action &&
      onIconClick && (
        <IconButton onClick={onIconClick} sx={styles.iconStyle}>
          {React.createElement(icon)}
        </IconButton>
      )
    );
  };

  const hasHeader = title || onIconClick || action;

  return (
    <Box sx={[styles.rootStyle, containerStyle]}>
      {hasHeader && (
        <>
          <Box sx={styles.headerStyle}>
            <Typography
              variant="h5"
              sx={[
                ...(Array.isArray(titleSx)
                  ? titleSx
                  : titleSx
                    ? [titleSx]
                    : []),
              ]}
            >
              {title}
            </Typography>
            {renderAction()}
          </Box>
          {!hideDivider && <Divider />}
        </>
      )}
      <Box mt={hasHeader ? 2.5 : 0}>{children}</Box>
    </Box>
  );
};

export default SectionWrapper;
