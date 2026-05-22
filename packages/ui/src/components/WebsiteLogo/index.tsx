/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create website logo component.
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
import React, { memo } from 'react';
import { Box, BoxProps } from '@mui/material';

/* Local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * styling the logo for Website.
 *
 * @interface BoxProps
 * @property {boolean} isIcon - flag to show original logo or icon
 */
export interface Props extends BoxProps {
  logoColor?: 'white' | 'black';
  src: string;
}

// ----------------------------------------------------------------------

/**
 * styling the logo for Website.
 *
 * @component
 * @param {boolean} isIcon - flag to show original logo or icon
 * @returns {React.ReactElement}
 */
const WebsiteLogo = ({
  logoColor = 'white',
  src,
  ...other
}: Props): React.ReactElement | null => {
  const [hasError, setHasError] = React.useState(false);

  if (!src || hasError) {
    return null;
  }

  const resolvedSrc =
    logoColor === 'black' ? src.replace('white_logo', 'black_logo') : src;

  return (
    <Box
      component="img"
      alt="lektus-logo"
      src={resolvedSrc}
      onError={() => setHasError(true)}
      sx={styles.logo}
      {...other}
    />
  );
};
export default memo(WebsiteLogo);
