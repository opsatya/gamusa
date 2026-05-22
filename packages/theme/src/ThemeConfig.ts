/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Theme Config is used to set themes to its children components.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 08/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { createTheme, ThemeOptions } from '@mui/material';

/* Local Imports */
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import shape from './shape';
import typography from './typography';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const themeOptions: ThemeOptions = {
  palette: { ...palette, mode: 'light' },
  shape,
  typography,
  breakpoints,
  direction: 'ltr',
  shadows: shadows.light,
  customShadows: customShadows.light,
};

/**
 * Creates a theme for the Laktus application.
 * @returns The theme for the Laktus application.
 */
export function createLaktusTheme() {
  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);
  return theme;
}
