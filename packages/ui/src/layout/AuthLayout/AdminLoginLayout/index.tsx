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
// import { t } from '../../../constants/appConstant';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create outer design layout for all auth pages.
 *
 * @interface AdminLoginLayoutProps
 * @property {node} children - contains the child components.
 */
export interface AdminLoginLayoutProps {
  children: React.ReactNode;
  t: any;
}

// ----------------------------------------------------------------------

/**
 * Outer design layout for all auth pages
 *
 * @component
 * @param {node} children - contains the child components
 */
const AdminLoginLayout: React.FC<AdminLoginLayoutProps> = ({
  children,
  t,
}): React.ReactElement => {
  /* Output */
  return (
    <Box sx={styles.wrapperStyle}>
      <Box sx={styles.loginContainerStyle}>
        <Box sx={styles.leftPanelStyle}>
          <Box sx={styles.coverContainerStyle}>
            <Box
              component="img"
              alt="cover"
              src="/assets/images/admin_auth_cover.png"
              sx={styles.coverImageStyle}
            />
          </Box>
          <Box sx={styles.leftTemplateContainer}>
            <Box sx={styles.leftTemplateLogoContainer}>
              <WebsiteLogo />
            </Box>
            <Typography variant="h1" sx={styles.leftTemplateTitleContainer}>
              {t.APP_NAME} <br />
            </Typography>
            <Typography variant="h6" sx={styles.leftTemplateSubTitleContainer}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quod.
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.rightPanelStyle}>
          <Box
            component="img"
            alt="cover"
            src="/assets/images/ornament.png"
            sx={styles.ornamentStyle}
          />
          <Box sx={styles.logoContainer}>
            <WebsiteLogo logoColor="black" />
          </Box>
          <Box sx={styles.formStyle}>{children}</Box>
          <Box sx={styles.footerContainer}>
            <Typography variant="body2" sx={styles.footerText}>
              {t.COPYRIGHT}
            </Typography>
            <Typography variant="body2" sx={styles.footerLink}>
              Terms & Conditions
            </Typography>
            <Typography variant="body2" sx={styles.footerLink}>
              Privacy Policy
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLoginLayout;
