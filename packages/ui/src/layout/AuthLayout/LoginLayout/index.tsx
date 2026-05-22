/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create layout for auth pages.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 29/01/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

/* Relative Imports */
import WebsiteLogo from '../../../components/WebsiteLogo';

/* Local Imports */
import styles from './index.style';
// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create outer design layout for all auth pages.
 *
 * @interface LoginLayoutProps
 * @property {node} children - contains the child components.
 */
export interface LoginLayoutProps {
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
const LoginLayout: React.FC<LoginLayoutProps> = ({
  children,
  t,
}): React.ReactElement => {
  /* Output */
  return (
    <Box sx={styles.wrapperStyle}>
      <Box sx={(theme) => styles.loginContainerStyle(t?.leftPanelImage, theme)}>
        <Box sx={styles.leftPanelStyle}>
          <Box sx={styles.leftTemplateContainer}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box sx={styles.leftTemplateLogoContainer}>
                {t?.logo ? (
                  <WebsiteLogo sx={{ width: 133 }} src={t.logo} />
                ) : (
                  <Typography
                    variant="h4"
                    sx={{ color: 'common.white', fontWeight: 700 }}
                  >
                    {t?.companyName}
                  </Typography>
                )}
              </Box>
              <Box width={176} />
            </Stack>
            <Stack gap={2} mb={3.5}>
              <Typography variant="h2" sx={styles.leftTemplateTitleContainer}>
                {t.AUTH_PAGE_WELCOME_TITLE}
              </Typography>
              <Typography
                variant="bodyLRegular"
                sx={styles.leftTemplateSubTitleContainer}
              >
                {t.AUTH_PAGE_WELCOME_SUBTITLE}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box sx={styles.rightPanelStyle}>
          <Box sx={styles.formStyle}>{children}</Box>
          <Box sx={styles.footerContainer}>
            <Typography variant="caption" sx={styles.footerText}>
              {t.COPYRIGHT}
            </Typography>
            <Stack direction="row" alignItems="center" gap={2}>
              <Typography variant="caption" sx={styles.footerLink}>
                Terms & Conditions
              </Typography>
              <Box sx={styles.subFooterDivider} />
              <Typography variant="caption" sx={styles.footerLink}>
                Privacy Policy
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginLayout;
