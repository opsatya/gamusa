/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Palette theme page to create custom palette colors.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 02/26/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { alpha } from '@mui/material';

// ----------------------------------------------------------------------

/**
 * To create a linear gradient using the given color parameters
 *
 * @param color1 - color that is used to create linear gradient
 * @param color2 - color that is used to create linear gradient
 * @returns linear-gradient of both the colors
 */
function createGradient(color1: string, color2: string): string {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// ----------------------------------------------------------------------
/* SETUP COLORS */
// ----------------------------------------------------------------------

const PRIMARY = {
  50: '#FAFAFF',
  lighter: '#F5EEFF',
  light: '#B289EF',
  main: '#AC73FF',
  dark: '#7230D8',
  darker: '#3E0099',
};

const SECONDARY = {
  lighter: '#FEE7DE',
  light: '#FDB89C',
  main: '#D37048',
  dark: '#8A4025',
};

const INFO = {
  lighter: '#E8F0FD',
  light: '#99C2FF',
  main: '#0066FF',
  dark: '#0053CF',
  darker: '#003D99',
};

const SUCCESS = {
  lighter: '#ECFFF6',
  light: '#5BE3A0',
  main: '#0CAF60',
  dark: '#0BA259',
  darker: '#087A43',
};

const WARNING = {
  lighter: '#FFFAE6',
  light: '#FFE680',
  main: '#FFD023',
  dark: '#E6BB20',
  darker: '#B38C00',
};

const ERROR = {
  lighter: '#FFEDEC',
  light: '#FF8080',
  main: '#E03137',
  dark: '#C02337',
  darker: '#8C0A12',
};

// Used in Calendar for interview type indicators
const PINK = {
  light: '#FCE4EC',
  main: '#EC407A',
  dark: '#C2185B',
};

const GREY = {
  50: '#FAFAFA',
  100: '#F8F8F8',
  200: '#F1F2F4',
  300: '#E9EAEC',
  400: '#CBD5E0',
  500: '#A0AEC0',
  600: '#687588',
  700: '#323B49',
  800: '#1F2937',
  900: '#111827',
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.lighter, PRIMARY.main),
  info: createGradient(INFO.lighter, INFO.main),
  success: createGradient(SUCCESS.lighter, SUCCESS.main),
  warning: createGradient(WARNING.lighter, WARNING.main),
  error: createGradient(ERROR.lighter, ERROR.main),
};

// ----------------------------------------------------------------------

const palette = {
  common: {
    black: '#000000',
    white: '#FFFFFF',
    orange: '#FE964A',
    blue: '#2F78EE',
    purple: '#8C62FF',
    pink: PINK.main,
    pinkLight: PINK.light,
    pinkDark: PINK.dark,
  },
  primary: { ...PRIMARY, contrastText: '#FFFFFF' },
  secondary: { ...SECONDARY, contrastText: '#FFFFFF' },
  info: { ...INFO, contrastText: '#FFFFFF' },
  success: { ...SUCCESS, contrastText: '#FFFFFF' },
  warning: { ...WARNING, contrastText: '#1A1A1A' },
  error: { ...ERROR, contrastText: '#FFFFFF' },
  grey: GREY,

  gradients: GRADIENTS,
  divider: GREY[200],
  text: {
    primary: GREY[900],
    secondary: GREY[600],
    disabled: GREY[500],
  },
  background: {
    default: '#FFFFFF',
    paper: GREY[100],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: GREY[500],
    disabledBackground: GREY[200],
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
