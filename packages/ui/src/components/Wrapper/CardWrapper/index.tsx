/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create card wrapper component
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
import { Box, SxProps, Theme } from '@mui/material';

/* Local Imports */
import styles from './index.style';

/**
 * Interface used to create card wrapper component
 * @interface CardWrapperProps
 * @property {node} children - contains the child components
 * @property {number} padding - padding for the card
 * @property {object} containerStyle - container style for the card
 */
export interface CardWrapperProps {
  children: React.ReactNode;
  padding?: number;
  containerStyle?: SxProps<Theme>;
}

/**
 * Card wrapper component
 * @param {node} children - contains the child components
 * @param {number} padding - padding for the card
 * @param {object} containerStyle - container style for the card
 * @returns
 */
const CardWrapper = ({
  children,
  padding,
  containerStyle,
}: CardWrapperProps): React.ReactElement => {
  return (
    <Box
      sx={(theme) => ({
        ...styles.rootStyle(theme),
        ...(containerStyle as any),
        padding,
      })}
    >
      {children}
    </Box>
  );
};

export default CardWrapper;
