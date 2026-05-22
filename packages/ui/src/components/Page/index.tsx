/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create auth page component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 11/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import React, { forwardRef, memo, ReactNode } from 'react';
import { Title } from 'react-head';
import { Box, BoxProps } from '@mui/material';

/* Local Imports */
import styles from './index.style';

/* Types/Interfaces */
/**
 * displays title, Layout for Auth components.
 *
 * @interface PageProps
 * @property {string} title - contains page title in tab bar.
 * @property {node} children - contains data or component.
 * @returns {React.ReactElement}
 */
export interface PageProps extends BoxProps {
  title?: string;
  children?: React.ReactNode;
}

/**
 * displays title, Layout for Auth components.
 *
 * @component
 * @param {string} title - contains page title in tab bar.
 * @param {node} children - contains data or component.
 * @returns {React.ReactElement}
 */
const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ title = 'Lektus', children, ...other }, ref) => {
    /* Output */
    return (
      <Box sx={styles.rootStyle} ref={ref} {...other}>
        <Title>{title}</Title>
        {children}
      </Box>
    );
  }
);

export default memo(Page);
