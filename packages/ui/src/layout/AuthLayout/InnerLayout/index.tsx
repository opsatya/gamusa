/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create layout for auth pages.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 10/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import React from 'react';
import { Box, Typography } from '@mui/material';

/* Relative Imports */
import WebsiteLogo from '../../../components/WebsiteLogo';

/* Local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create outer design layout for all auth pages.
 *
 * @interface InnerLayoutProps
 * @property {node} children - contains the child components.
 */
export interface InnerLayoutProps {
  children: React.ReactNode;
  hideLogo?: boolean;
  logo?: string;
  logoColor?: 'white' | 'black';
  companyName?: string | null;
}

// ----------------------------------------------------------------------

/**
 * Outer design layout for all auth pages
 *
 * @component
 * @param {node} children - contains the child components
 */
const InnerLayout: React.FC<InnerLayoutProps> = ({
  children,
  hideLogo = false,
  logo,
  logoColor = 'black',
  companyName,
}): React.ReactElement => {
  /* Output */
  return (
    <Box sx={styles.wrapperStyle}>
      <Box sx={styles.mainStyle}>
        {!hideLogo && (
          <Box sx={styles.mobileLogoContainer}>
            {logo ? (
              <WebsiteLogo src={logo} logoColor={logoColor} />
            ) : (
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {companyName}
              </Typography>
            )}
          </Box>
        )}
        <Box sx={styles.formStyle}>{children}</Box>
      </Box>
    </Box>
  );
};

export default InnerLayout;
