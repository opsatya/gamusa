/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create footer component.
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
import { memo } from 'react';
import { Typography, Box } from '@mui/material';

/* Local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create footer Component for the authentication pages.
 *
 * @interface FooterProps
 * @property {object|function} containerStyle - styling for chips container
 */
export interface FooterProps {
  containerStyle?: object | (() => void);
  footerText?: string | null;
}

// ----------------------------------------------------------------------

/**
 * Footer Component for the authentication pages.
 *
 * @component
 * @param {object|function} containerStyle - styling for chips container
 * @param {string} footerText - text to display in footer
 * @returns {React.ReactElement}
 */
const Footer = ({
  containerStyle = {},
  footerText = null,
}: FooterProps): React.ReactElement => {
  /* Output */
  return (
    <Box sx={[styles.rootStyle, containerStyle]}>
      <Typography variant="caption">{footerText ?? ''}</Typography>
    </Box>
  );
};

export default memo(Footer);
